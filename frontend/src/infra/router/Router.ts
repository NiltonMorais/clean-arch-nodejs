import { createRouter, createWebHistory } from "vue-router";
import PlaceOrderView from "../../views/PlaceOrderView.vue";
import LoginView from "../../views/LoginView.vue";

export default class Router {
    static build() {
        const router = createRouter({
            history: createWebHistory(),
            routes: [
                { path: "/", component: PlaceOrderView },
                { path: "/login", component: LoginView },
            ],
        });
        return router;
    }
}
