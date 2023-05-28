import prisma from "$lib/prisma";
import type { Story } from "@prisma/client";
import { json } from "@sveltejs/kit";


export async function PATCH(event: any) {    
    const id = parseInt(event.params.id);
    const data: Partial<Story> = await event.request.json();

    console.log("BACKEND", data);

    await prisma.story.update({
        where: { id },
        data
    });

    return json(200);
}