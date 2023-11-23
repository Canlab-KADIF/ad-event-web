<template>
	<div class="modal">
		<div class="overlay">
			<img src="/gn/images/loading.png" />
		</div>
	</div>
</template>
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
	opacity: 0.7;
	background-color: black;
}
/* .modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 20%;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
} */
</style>
