<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import MovieDetails from './MovieDetails.svelte';
</script>

<Meta title="Example/MovieDetails" component={MovieDetails} argTypes={{}} />

<Template let:args>
	<MovieDetails {...args} />
</Template>

<Story
	name="Simple movie"
	args={{
		title: 'Star Wars',
		href: 'http://google.it',
		actionName: undefined
	}}
/>

<Story
	name="Custom action name"
	args={{
		title: 'Star Wars',
		href: 'http://google.it',
		actionName: 'Click here to see magic things happen'
	}}
/>
