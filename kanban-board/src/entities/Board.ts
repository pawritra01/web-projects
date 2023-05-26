export type Board = Record<string, Story[]>;

export type Story = {
    id: number;
    title: string;
    startedAt: number;
    status: string;
}


export enum StoryStatus {
    Progress = 'progress',
    Todo = 'todo',
    Done = 'done'
}