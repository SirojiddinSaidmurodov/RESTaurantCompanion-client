import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../components/MainPage")
        },
        {
            path: "/meals",
            name: "Meals",
            component: () => import("../views/MealList")
        },
        {
            path: "/meals/:id",
            name: "Meal Details",
            component: () => import("../views/Meal")
        }
    ]
});
export default router;