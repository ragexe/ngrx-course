export interface Course {
    id: number
    seqNo: number
    url: string
    iconUrl: string
    courseListIcon: string
    description: string
    longDescription?: string
    category: string
    lessonsCount: number
    promo: boolean
}

export const coursesComparator = (leftCourse: Course, rightCourse: Course) => {
    const compare = leftCourse.seqNo - rightCourse.seqNo

    if (compare > 0) {
        return 1
    } else if (compare < 0) {
        return -1
    } else return 0
}
