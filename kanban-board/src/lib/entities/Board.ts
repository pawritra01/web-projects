import type { Story } from "@prisma/client";

export type Board = Record<string, Story[]>;

export enum StoryStatus {
    Progress = 'progress',
    Todo = 'todo',
    Done = 'done'
}