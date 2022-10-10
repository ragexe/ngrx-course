import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
    DefaultDataService,
    DefaultDataServiceConfig,
    HttpUrlGenerator,
    QueryParams,
} from '@ngrx/data'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { LessonEntityName } from '../courses.module'
import { Lesson } from '../model/lesson'

@Injectable()
export class LessonsDataService extends DefaultDataService<Lesson> {
    constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super(LessonEntityName, httpClient, httpUrlGenerator)
    }

    // override getAll(): Observable<Course[]> {
    //     return this.http.get('/api/courses').pipe(map<Object, Course[]>(res => res['payload']))
    // }

    override getWithQuery(queryParams: string | QueryParams): Observable<Lesson[]> {
        const qParams =
            typeof queryParams === 'string'
                ? { fromString: queryParams }
                : { fromObject: queryParams }
        const params = new HttpParams(qParams)

        return this.http.get('api/lessons/', { params, observe: 'response' }).pipe(
            map(res => {
                const total = +res.headers.get('total')
                res.body['_total'] = total
                return res.body as Lesson[]
            })
        )
        // return super.getWithQuery(queryParams)
    }
}

@Injectable()
export class PaginatedLessonsDataService extends DefaultDataService<Lesson> {
    private nextPageUrl: string = ''
    private count = 0

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super(LessonEntityName, http, httpUrlGenerator)
        this.nextPageUrl = this.entitiesUrl
        this.count = 0
    }

    // Override to store nextUrl as well as map response.body.
    override getAll(): Observable<Lesson[]> {
        return this.execute('GET', this.entitiesUrl).pipe(
            tap(response => {
                this.nextPageUrl = response.next
                this.count = +response.headers.get('total')
            }),
            map(response => response.body)
        )
    }

    // Override to store nextUrl as well as map response.body.
    override getWithQuery(queryParams: QueryParams | string): Observable<Lesson[]> {
        const qParams =
            typeof queryParams === 'string'
                ? { fromString: queryParams }
                : { fromObject: queryParams }
        const params = new HttpParams(qParams)
        return this.execute('GET', this.entitiesUrl, undefined, {
            params,
            observe: 'response',
        }).pipe(
            tap(response => {
                // response.next would include the queryparams.
                this.nextPageUrl = response.next
                this.count = +response.headers.get('total')
            }),
            map(response => response.body)
        )
    }

    /**
     * Get next page of results. Or empty array if remote data is
     * exhausted.
     */
    getMore(): Observable<Lesson[]> {
        if (!this.hasMore()) {
            // or throwError?
            return of([])
        }

        return this.execute('GET', this.nextPageUrl).pipe(
            tap(response => {
                this.nextPageUrl = response.next
                this.count = +response.headers.get('total')
            }),
            map(response => response.body)
        )
    }

    /**
     * Returns total number of objects
     */
    totalCount() {
        return this.count
    }

    /**
     * Returns boolean indicating if there's more data at server.
     */
    hasMore(): boolean {
        return !!this.nextPageUrl
    }
}
