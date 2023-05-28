<script lang="ts">
	import type { Board, StoryStatus } from '$lib/entities/Board';
	import type { Story } from '@prisma/client';
	import Card from './Card.svelte';

	export let status: StoryStatus;
	export let board: Promise<Board>;
    export let onDrop: () => {};

	const handleDrop = async (event: DragEvent) => {
		if (event.stopPropagation) {
			event.stopPropagation(); // stops the browser from redirecting.
		}

		if (event.dataTransfer) {
			console.log(event.dataTransfer.getData('text/plain'));
			const story: Story = JSON.parse(event.dataTransfer.getData('text/plain'));
			await fetch(`http://localhost:5173/api/stories/${story.id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					...story,
					status
				})
			});

            onDrop();
		}
	};

	const handleDragOver = (event: DragEvent) => event.preventDefault();
</script>

<div class="board-column {status}" on:drop={handleDrop} on:dragover={handleDragOver}>
	{#await board}
		<div>Loading...</div>
	{:then data}
		{#each data[status] as story}
			<Card {story} />
		{/each}
	{/await}
</div>

<style>
	.board-column {
		flex: 1;
		padding: 0.65em;
		min-width: 400px;
	}

	.todo {
		background-color: rgb(240, 238, 213);
	}

	.progress {
		background-color: rgb(253, 248, 175);
	}

	.done {
		background-color: rgb(209, 235, 179);
	}
</style>
