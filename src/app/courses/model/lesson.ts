export interface Lesson {
    id: number
    description: string
    duration: string
    seqNo: number
    courseId: number
}

export const lessonsComparator = (leftLesson: Lesson, rightLEsson: Lesson) => {
    const compareCourses = leftLesson.courseId - rightLEsson.courseId

    if (compareCourses > 0) {
        return 1
    } else if (compareCourses < 0) {
        return -1
    } else {
        return leftLesson.seqNo - rightLEsson.seqNo
    }
}
