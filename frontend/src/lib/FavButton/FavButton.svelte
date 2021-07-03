<script lang="ts">
	import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
	import { createEventDispatcher } from 'svelte';

	export let isFavorite: boolean;

	const dispatch = createEventDispatcher();
	const handleClick = async () => {
		isFavorite = !isFavorite;
		if (isFavorite) {
			dispatch('addFavorite');
		} else {
			dispatch('removeFavorite');
		}
	};
</script>

<button h="6" w="6" class="flex" flex="shrink-0" on:click|preventDefault={handleClick}>
	{#if isFavorite}
		<div text="pink-600">
			<IoMdHeart />
		</div>
	{:else}
		<div text="pink-200">
			<IoMdHeart />
		</div>
	{/if}
</button>
