<script lang="ts">
	import Skeleton from './wrapper.svelte';
	import type { Page } from '$app/stores';

	export let page: Page = null;
</script>

{#if page.path.startsWith('/list')}
	<div>
		<Skeleton height={560} width={360}>
			{#each Array(6) as _, i}
				<rect width="96" height="72" x="0" y={i * 96} rx="12" ry="12" />
				<rect width="260" height="10" x="108" y={19 + i * 96} rx="5" ry="5" />
				<rect width="150" height="10" x="108" y={19 + 19 + i * 96} rx="5" ry="5" />
			{/each}
		</Skeleton>
	</div>
{:else}
	<p>loading...</p>
{/if}
