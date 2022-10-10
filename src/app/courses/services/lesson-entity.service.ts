import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'

import { LessonEntityName } from '../courses.module'
import { Lesson } from '../model/lesson'

@Injectable()
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super(LessonEntityName, serviceElementsFactory)
    }
}
