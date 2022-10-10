import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { asyncScheduler, Observable, Subscription } from 'rxjs'
import { map, observeOn, tap, withLatestFrom } from 'rxjs/operators'

import { Course } from '../model/course'
import { Lesson } from '../model/lesson'
import { CourseEntityService } from '../services/course-entity.service'
import { LessonEntityService } from '../services/lesson-entity.service'

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit, OnDestroy {
    course$!: Observable<Course>

    loading$!: Observable<boolean>

    lessons$!: Observable<Lesson[]>

    displayedColumns = ['seqNo', 'description', 'duration'] as const

    nextPage = 0

    private subscriptions = new Subscription()

    constructor(
        private courseEntityService: CourseEntityService,
        private lessonEntityService: LessonEntityService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const courseUrl = this.route.snapshot.paramMap.get('courseUrl')

        this.loading$ = this.lessonEntityService.loading$.pipe(observeOn(asyncScheduler))

        this.course$ = this.courseEntityService.entities$.pipe(
            map(courses => courses.find(course => course.url === courseUrl))
        )

        this.lessons$ = this.lessonEntityService.entities$.pipe(
            withLatestFrom(this.course$),
            tap(([lessons, currentCourse]) => {
                if (this.nextPage !== 0) return

                this.loadLessonsPage(currentCourse)
            }),
            map(([lessons, currentCourse]) => {
                if (!currentCourse) return []

                return lessons.filter(lesson => lesson.courseId === currentCourse.id)
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    loadLessonsPage(course: Course) {
        this.lessonEntityService.getWithQuery({
            courseId: course.id.toString(),
            pageNumber: `${this.nextPage}`,
            pageSize: `3`,
        })

        this.nextPage += 1
    }
}
