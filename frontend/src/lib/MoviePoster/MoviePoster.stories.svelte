<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import MoviePoster from './MoviePoster.svelte';
</script>

<Meta title="Example/MoviePoster" component={MoviePoster} argTypes={{}} />

<Template let:args>
	<MoviePoster {...args} />
</Template>

<Story
	name="Simple movie"
	args={{
		href: 'https://image.tmdb.org/t/p/w220_and_h330_face/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg'
	}}
/>

<Story
	name="Custom action name"
	args={{
		href: 'https://image.tmdb.org/t/p/w220_and_h330_face/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg'
	}}
/>
