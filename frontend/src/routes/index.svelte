<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts"></script>

<svelte:head>
	<title>Pick a movie</title>
</svelte:head>

<div class="main">
	<p>i'll write something here, maybe</p>
	<a href="/lists/1">Sample movie list</a>
</div>

<style>
	.main {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}
</style>
