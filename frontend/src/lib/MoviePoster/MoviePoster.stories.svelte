<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import MoviePoster from './MoviePoster.svelte';
</script>

<Meta title="Example/MoviePoster" component={MoviePoster} argTypes={{}} />

<Template let:args>
	<MoviePoster {...args} />
</Template>

<Story
	name="Simple movie poster"
	args={{
		src: 'https://image.tmdb.org/t/p/w220_and_h330_face/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg'
	}}
/>

<Story
	name="Fallback"
	args={{
		src: 'https://image.tmdb.org/t/p/xxxxxxxxxx.jpg'
	}}
/>

<Story
	name="No src"
	args={{
		src: undefined
	}}
/>
