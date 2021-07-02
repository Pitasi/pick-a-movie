<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Skeletons from './index.svelte';
</script>

<Meta title="Example/Skeletons" component={Skeletons} argTypes={{}} />

<Template let:args>
	<Skeletons {...args} />
</Template>

<Story
	name="Fallback"
	args={{
		page: {
			path: '/any-page'
		}
	}}
/>

<Story
	name="List page"
	args={{
		page: {
			path: '/list/1'
		}
	}}
/>
