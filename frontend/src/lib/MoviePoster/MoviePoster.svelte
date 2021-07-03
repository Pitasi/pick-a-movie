<script lang="ts">
	export let src: string = null;
	export let alt: string;
</script>

<picture border="rounded-xl" overflow="hidden" class="shadow-lg">
	<img
		loading="lazy"
		width="220px"
		height="330px"
		src={src || 'https://via.placeholder.com/220x330.png?text=%20'}
		{alt}
	/>
</picture>
