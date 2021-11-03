<template>
	<div v-if="state.kind === 'LoadingSessionState'">
		<p>Loading session...</p>
	</div>
	<div v-else>
		<p>{{ JSON.stringify(state) }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useSession } from '../../composables';

export default defineComponent({
	setup() {
		const route = useRoute();
		const state = useSession(route.params.id as string);

		return {
			id: route.params.id,
			state,
		}
	},
})
</script>
