<script lang="ts">
	import FavButton from '../FavButton/FavButton.svelte';

	export let title: string;
	export let href: string;
	export let actionName: string = 'See this movie on TMDB';

	export let isFavorite: boolean;
	export let favoriteCount: number = 0;
</script>

<div class="flex" justify="between" gap="4">
	<div>
		<h2 font="bold">{title}</h2>
		<a text="xs" {href} target="_blank">
			{actionName}
		</a>
	</div>

	<div class="flex" flex="col" align="center">
		<FavButton {isFavorite} on:addFavorite on:removeFavorite />
		{favoriteCount}
	</div>
</div>
