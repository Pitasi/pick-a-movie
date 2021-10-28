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
import { dependenciesLocator } from '@pick-a-movie/core';
import { useRoute } from 'vue-router'

export default defineComponent({
	setup() {
		const route = useRoute()

		// useSession(id)
		const ploc = dependenciesLocator.provideSessionPloc();
		const state = ref(ploc.state);
		ploc.subscribe((sessionState) => {
			state.value = sessionState;
		});
		ploc.load(route.params.id as string);

		return {
			id: route.params.id,
			state,
		}
	},
})
</script>
