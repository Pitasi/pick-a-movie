<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import MovieCard from './index.svelte';
</script>

<Meta title="Example/MovieCard" component={MovieCard} argTypes={{}} />

<Template let:args>
	<MovieCard {...args} />
</Template>

<Story
	name="Star Wars"
	args={{
		details: {
			id: 1,
			title: 'Star Wars',
			poster_path: '6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg'
		}
	}}
/>
