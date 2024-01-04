export interface Feedback {
    feedback_id: number;
    submission_id: number;
    student_id: string;
    feedback: string;
    grade: string;
    submitted_at: Date;
    teacher_id: number
}