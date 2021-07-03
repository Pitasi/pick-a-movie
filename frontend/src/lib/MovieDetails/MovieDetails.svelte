<script lang="ts">
	export let title: string;
	export let href: string;
	export let actionName: string = 'See this movie on TMDB';
</script>

<div>
	<h2 font="bold">{title}</h2>
	<a text="xs" {href} target="_blank">
		{actionName}
	</a>
</div>
