<template>
	<div class="modal">
		<div class="overlay" @click="$emit('close-modal')"></div>
		<div class="modal-card">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'MdView',
};
</script>

<style>
/* Modal */
.modal,
.overlay {
	width: 100%;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
}
.overlay {
	opacity: 0.5;
	background-color: black;
}
.modal-card {
	position: relative;
	max-width: 80%;
	margin: auto;
	margin-top: 300px;
	padding: 20px;
	background-color: white;
	min-height: 300px;
	z-index: 10;
	opacity: 1;
}
a {
	color: inherit;
	text-decoration: none;
}
</style>
