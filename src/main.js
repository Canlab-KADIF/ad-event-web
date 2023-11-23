import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VModal from 'vue-js-modal';
import VueToastr from 'vue-toastr';
import VueMoment from 'vue-moment';

Vue.use(VModal, { dynamic: true });
Vue.use(VueMoment);
Vue.use(VueToastr, {
	defaultTimeout: 2000,
	defaultProgressBar: true,
	defaultPosition: 'toast-top-right',
	defaultClassNames: ['animated'],
});

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
