import { Injectable } from '@angular/core'
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
    QueryParams,
} from '@ngrx/data'
import { Observable } from 'rxjs'

import { CourseEntityName } from '../courses.module'
import { Course } from '../model/course'

@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super(CourseEntityName, serviceElementsFactory)
    }

    override getAll(): Observable<Course[]> {
        return super.getAll().pipe(/*data manupulation*/)
    }

    override getWithQuery(params: string | QueryParams): Observable<Course[]> {
        return super.getWithQuery(params).pipe(/*data manupulation*/)
    }
}
