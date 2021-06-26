<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 p-4 w-full">
	<nav>
		<ul class="flex gap-4">
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About</a></li>
		</ul>
	</nav>
</header>
