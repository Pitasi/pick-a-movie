<script lang="ts">
	type Size = 'small' | 'medium' | 'large';
	export let size: Size | string;

	let pxSize =
		{
			small: '10px',
			medium: '15px',
			large: '20px'
		}[size] || size;
</script>

<div class="spinner" style="--size:{pxSize};">
	<div bg="pink-600" class="bounce1" />
	<div bg="pink-600" class="bounce2" />
	<div bg="pink-600" class="bounce3" />
</div>

<style>
	.spinner {
		margin: 0 auto 0;
		width: 70px;
		text-align: center;
	}

	.spinner > div {
		width: var(--size);
		height: var(--size);

		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	}

	.spinner .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.spinner .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes sk-bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
		}
	}

	@keyframes sk-bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
</style>
