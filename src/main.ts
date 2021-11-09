import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {Form, Steps,Step,Input,Button,Alert} from "ant-design-vue";
import 'ant-design-vue/dist/antd.css'
const app = createApp(App);
app.use(Steps)
app.use(Step)
app.use(Form)
app.use(Input)
app.use(Button)
app.use(Alert)
app.use(router).mount('#app')
