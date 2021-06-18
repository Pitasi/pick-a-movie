<script lang="ts">
	// TODO this component appears to be unnecessary since everything is
	// prerendered before actually loading the page

	// import 'skeleton-elements/skeleton-elements.css';

	// import { SkeletonBlock } from 'skeleton-elements/svelte';
</script>

<article class="skeleton-effect-fade">
	<p>loading</p>
	<!-- <SkeletonBlock tag="h2" width="200px" />
	<SkeletonBlock tag="a" width="100px" /> -->
</article>

<style>
	article {
		background: rgba(0, 0, 0, 0.02);
		border-radius: 8px;
		padding: 1em;
		margin-bottom: 1em;
	}
</style>
