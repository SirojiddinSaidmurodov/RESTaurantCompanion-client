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
        },
        {
            path: "/users",
            name: "Users",
            component: () => import("../views/UserList")
        },
        {
            path: "/users/:id",
            name: "User Details",
            component: () => import("../views/User")
        },
        {
            path: "/orders",
            name: "Orders",
            component: () => import("../views/OrderList")
        },
        {
            path: "/orders/:id",
            name: "Order Details",
            component: () => import("../views/Order")
        },
        {
            path: "/orders/:id/:itemID",
            name: "Order Details",
            component: () => import("../views/OrderItem")
        }
    ]
});
export default router;