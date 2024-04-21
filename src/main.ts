import { createApp } from 'vue'
// import VueMask from '@devindex/vue-mask'; // <-- ADD THIS LINE

import './style.css'
import App from './App.vue'
// import { MaskInput } from 'vue-3-mask';

const app = createApp(App)
// app.component(VueMask);  // <-- ADD THIS LINE

// app.component('MaskInput', MaskInput);
app.mount('#app')
