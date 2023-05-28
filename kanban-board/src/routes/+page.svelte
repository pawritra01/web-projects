<script lang="ts">
	import { StoryStatus } from '$lib/entities/Board';
	import Column from '$lib/components/Column.svelte';


	const getBoard = async () => {
		const response = await fetch('http://localhost:5173/api/stories')
		const body = await response.json();
		console.log("BODY", body);
		return body;
	}

	
	let data = getBoard();

	const onUpdate = () => data = getBoard();
</script>

<main>

<section class="board">
		<Column status={StoryStatus.Todo} board={data} onDrop={onUpdate} />
		<Column status={StoryStatus.Progress} board={data} onDrop={onUpdate} />
		<Column status={StoryStatus.Done} board={data} onDrop={onUpdate} />
	</section>
</main>

<style>
	.board {
		display: flex;
		min-height: 90vh;
		background: lightblue;
		border-radius: 8px;
		overflow: auto;
	}
</style>
