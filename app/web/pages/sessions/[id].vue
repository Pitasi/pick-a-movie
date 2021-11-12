<template>
	<div>
		<div v-if="pending">
			<p>Loading session...</p>
		</div>
		<div v-else>
			<h1>{{ data.title }}</h1>
			<div v-for="movie in data.movies" :key="movie.movieId">
				<p>{{ movie.movieId }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router'
import { useSession } from '../../composables';

export default defineComponent({
	async setup() {
		const route = useRoute();
		const { pending, data } = await useSession(route.params.id as string);

		return {
			id: route.params.id,
			pending,
			data,
		}
	},
})
</script>
