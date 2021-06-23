<script lang="ts">
	import { page } from '$app/stores';
</script>

<header bg="pink-200" class="sticky top-0 p-4 w-full">
	<nav>
		<ul class="flex flex-row gap-4 sm:flex-col">
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About</a></li>
		</ul>
	</nav>
</header>
