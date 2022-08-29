import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Router from "./infra/router/Router";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import ServiceFactoryHttp from "./infra/factory/ServiceFactoryHttp";
import ServiceFactoryMemory from "./infra/factory/ServiceFactoryMemory";

// const httpClient = new AxiosAdapter();
// const serviceFactory = new ServiceFactoryHttp(httpClient, 'http://localhost:3000');
const serviceFactory = new ServiceFactoryMemory();

createApp(App)
.use(Router.build())
.provide("serviceFactory", serviceFactory)
.mount("#app");
