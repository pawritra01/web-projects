<script lang="ts">
	import type { Story } from "../entities/Board";

    let hover = false;


    const handleDragStart = (event: DragEvent) => {
        hover = true;
        if(event?.dataTransfer){
            event.dataTransfer.setData('text/plain', JSON.stringify(story));
        }
    }

    const handleDragEnd = (event: DragEvent) => {
        hover = false;
    }


    export let story: Story;

</script>



<div 
    class="card"
    class:dragging='{hover}'
    draggable="true"
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
>
    <h2>{story.title}</h2>
    <div>{story.startedAt}</div>
</div>


<style>
    .card{
        padding: 1em;
        background: white;
        user-select: none;
    }
    
    h2 {
        margin-bottom: .5em;
    }
</style>