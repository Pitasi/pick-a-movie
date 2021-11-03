import { Ref } from 'vue';
import { Ploc } from '@pick-a-movie/core';

export function usePloc<StateT>(ploc: Ploc<StateT>) {
	const state = ref(ploc.state) as Ref<StateT>;
	ploc.subscribe((nextVal) => {
		state.value = nextVal;
	});
	return state;
}