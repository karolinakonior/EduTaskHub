export interface Assignment {
    assignment_id: number;
    name: string;
    description: string;
    due_date: Date;
    teacher_id: number;
    year_id: number;
    subject_id: number;
}

export const assignments: Assignment[] = [
    {
        assignment_id: 1,
        name: 'The effect of the concentration of salt solution on the mass of potatoes',
        description: 'Write an essay on the effect of the concentration of salt solution on the mass of potatoes. Include a hypothesis, method, results, discussion and conclusion.',
        due_date: new Date("2020-11-07"),
        teacher_id: 1,
        year_id: 1,
        subject_id: 1
    },
    {
        assignment_id: 2,
        name: "The effect of temperature during the rising process of dough on the volume of bread",
        description: "Write an essay on the effect of temperature during the rising process of dough on the volume of bread. Include a hypothesis, method, results, discussion and conclusion.",
        due_date: new Date("2020-11-07"),
        teacher_id: 1,
        year_id: 2,
        subject_id: 1
    },
    {
        assignment_id: 3,
        name: "State and explain Hund’s Rule. Write the electron configuration (orbital notation) for nitrogen using this rule.",
        description: "Write an essay on Hund’s Rule. Write the electron configuration (orbital notation) for nitrogen using this rule. Include a hypothesis, method, results, discussion and conclusion.",
        due_date: new Date("2020-11-07"),
        teacher_id: 2,
        year_id: 2,
        subject_id: 2
    }
]