import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component'
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component'
import { CoursesHttpService } from './services/courses-http.service'
import { CourseComponent } from './course/course.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { ReactiveFormsModule } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule, Routes } from '@angular/router'
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data'
import { coursesComparator, Course } from './model/course'

import { lessonsComparator, Lesson } from './model/lesson'
import { CourseEntityService } from './services/course-entity.service'
import { CoursesResolver } from './services/courses.resolver'
import { CoursesDataService } from './services/courses-data.service'
import { LessonEntityService } from './services/lesson-entity.service'
import { LessonsDataService, PaginatedLessonsDataService } from './services/lessons-data.service'

export const coursesRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            courses: CoursesResolver,
        },
    },
    {
        path: ':courseUrl',
        component: CourseComponent,
        resolve: {
            courses: CoursesResolver,
        },
    },
]

export const CourseEntityName = 'Course'
export const LessonEntityName = 'Lesson'

const entityMetadata: EntityMetadataMap = {
    [CourseEntityName]: {
        sortComparer: coursesComparator,
        entityDispatcherOptions: { optimisticUpdate: true },
    },
    [LessonEntityName]: {
        sortComparer: lessonsComparator,
        additionalCollectionState: {
            foo: 'Foo',
            bar: 3.14,
        },
    },
}

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        RouterModule.forChild(coursesRoutes),
    ],
    declarations: [
        HomeComponent,
        CoursesCardListComponent,
        EditCourseDialogComponent,
        CourseComponent,
    ],
    exports: [HomeComponent, CoursesCardListComponent, EditCourseDialogComponent, CourseComponent],
    entryComponents: [EditCourseDialogComponent],
    providers: [
        CoursesHttpService,
        CourseEntityService,
        CoursesResolver,
        CoursesDataService,
        LessonEntityService,
        LessonsDataService,
        // PaginatedLessonsDataService,
    ],
})
export class CoursesModule {
    constructor(
        entityDefinitionService: EntityDefinitionService,
        entityDataService: EntityDataService,
        coursesDataService: CoursesDataService,
        lessonsDataService: LessonsDataService
    ) {
        entityDefinitionService.registerMetadataMap(entityMetadata)
        entityDataService.registerService(CourseEntityName, coursesDataService)
        entityDataService.registerService(LessonEntityName, lessonsDataService)
    }
}
