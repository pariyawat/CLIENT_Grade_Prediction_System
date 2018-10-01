export interface ITeacher {
    teacher_key: number;
    teacher_id: string;
    first_name: string;
    last_name: string;
    email_address: string;
}

export interface IGroup {
    group_name: string;
    teacher_key: number;
    teacher_name: string;
}

export interface IStudent {
    student_id: string;
    first_name: string;
    last_name: string;
    group_name: string;
    email_address: string;
}
