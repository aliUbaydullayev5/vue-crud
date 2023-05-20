import { createApp } from 'vue';
import App from "src/App.vue"
import store from "src/store"
import { Notify } from 'quasar'


Notify.registerType('my-notif', {
  icon: 'announcement',
  progress: true,
  color: 'brown',
  textColor: 'white',
  classes: 'glossy'
})

const app = createApp(App);

app.use(store);

app.mount('#app');
