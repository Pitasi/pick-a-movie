<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts"></script>

<svelte:head>
	<title>Pick a movie</title>
</svelte:head>

<div class="main">
	<p>i'll write something here, maybe</p>

	<br />

	<a href="/lists/new" bg="pink-500" p="4" font="bold" display="block"
		>CLICK HERE TO CREATE A NEW LIST!!!!1!!!
	</a>
</div>

<style>
	.main {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}
</style>
