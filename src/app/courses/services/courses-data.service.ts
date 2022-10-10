import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { CourseEntityName } from '../courses.module'
import { Course } from '../model/course'

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
    constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super(CourseEntityName, httpClient, httpUrlGenerator)
    }

    // add(entity: T): Observable<T>;
    // delete(id: number | string): Observable<number | string>;
    // getAll(): Observable<T[]>;
    // getById(id: any): Observable<T>;
    // getWithQuery(params: QueryParams | string): Observable<T[]>;
    // update(update: Update<T>): Observable<T>;
    // upsert(entity: T): Observable<T>;

    override getAll(): Observable<Course[]> {
        return this.http.get('/api/courses').pipe(map<Object, Course[]>(res => res['payload']))
    }
}
