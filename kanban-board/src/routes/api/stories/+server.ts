import prisma from "$lib/prisma";
import type { Story } from "@prisma/client";
import { json } from "@sveltejs/kit";


export async function GET() {    
    const todo: Story[] = await prisma.story.findMany({ where: { status: 'todo' }});
    const progress: Story[] = await prisma.story.findMany({ where: { status: 'progress' }});
    const done: Story[] = await prisma.story.findMany({ where: { status: 'done' }});

    return json({
        todo,
        progress,
        done
    });
}