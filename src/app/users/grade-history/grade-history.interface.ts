export interface IStudentSubject {
    SUB_ID: string;
    SUB_NAME: string;
    GRADE: string;
    COURSE: number;
}

export interface Error {
    student_id: string;
    subject_id: string;
    grade: string;
}

export interface Success {
    student_id: string;
    subject_id: string;
    grade: string;
}

export interface TeacherAddGrade {
    error: Error[];
    success: Success[];
}
