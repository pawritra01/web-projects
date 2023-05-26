<script lang="ts">
	import Card from "../components/Card.svelte";
import { StoryStatus, type Board, type Story } from "../entities/Board";

    

    let board: Board = {
        todo: [
            {
                id: 1,
                title: "Hello",
                startedAt: Date.now(),
                status: "todo",
            }
        ],
        progress: [],
        done: [],
    }


    const handleDrop = (event: DragEvent, status: string) => {
    if (event.stopPropagation) {
        event.stopPropagation(); // stops the browser from redirecting.
    }

    if(event?.dataTransfer) {
        const data = JSON.parse(event.dataTransfer.getData('text/plain')) as Story;

        board = {
            ...board,
            [status]: [{ ...data, status }, ...board[status]],
            [data.status]: [...(board[data.status]).filter((s: Story) => s.id != data.id)],
        }

        console.log(board);
    }
    
    return false;
  }

  const handleDragOver = (event: DragEvent) => event.preventDefault();
</script>

<main>
    <section class="board">
        <div class="board-column todo" on:drop={(event) => handleDrop(event, StoryStatus.Todo)} on:dragover={handleDragOver}>
            {#each board.todo as story}
                <Card story={story} />
            {/each}
        </div>
        <div class="board-column progress" on:drop={(event) => handleDrop(event, StoryStatus.Progress)} on:dragover={handleDragOver}>
            {#each board.progress as story}
            <Card story={story} />
        {/each}
        </div>
        <div class="board-column done" on:drop={(event) => handleDrop(event, StoryStatus.Done)} on:dragover={handleDragOver}>
            {#each board.done as story}
            <Card story={story} />
        {/each}
        </div>
    </section>
</main>


<style>
    .board{
        display: flex;
        min-height: 90vh;
        background: lightblue;
        border-radius: 8px;
        overflow: auto;
    }

    .board-column {
        flex: 1;
        padding: .65em;
        min-width: 400px;
    }

    .todo{
        background-color: rgb(240, 238, 213);
    }

    .progress{
        background-color: rgb(253, 248, 175);
    }

    .done{
        background-color: rgb(209, 235, 179);
    }
</style>