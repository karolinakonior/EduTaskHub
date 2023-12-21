export interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const students: Student[] = [
    {
        student_id: 1,
        first_name: "Kayleigh",
        last_name: "Smith",
        email: "student1@gmail.com",
        password: "password"
    },
    {
        student_id: 2,
        first_name: "Jane",
        last_name: "Sutton",
        email: "student2@gmail.com",
        password: "password"
    },
    {
        student_id: 3,
        first_name: "Bob",
        last_name: "Jones",
        email: "student3@gmail.com",
        password: "password"
    },
    {
        student_id: 4,
        first_name: "Mary",
        last_name: "Smith",
        email: "student4@gmail.com",
        password: "password"
    },
    {
        student_id: 5,
        first_name: "Joe",
        last_name: "Adamson",
        email: "student5@gmail.com",
        password: "password"
    }
]