import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
    {
        path: "/",
        redirect:'/index',
        component: () => import("@/views/Index.vue"),
        children:[
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/redirect/index.vue')
            },
            {
                path: 'chartBar',
                name: 'chartBar',
                component: () => import('@/views/redirect/chartBar.vue')
            },
            {
                path: 'upload',
                name: 'upload',
                component: () => import('@/views/redirect/upload.vue')
            },
            {
                path: 'keyboard',
                name: 'keyboard',
                component: () => import('@/views/redirect/keyboard.vue')
            },
            {
                path: 'brokenLine',
                name: 'brokenLine',
                component: () => import('@/views/redirect/brokenLine.vue')
            },
            {
                path: 'table',
                name: 'table',
                component: () => import('@/views/redirect/table.vue')
            },
            {
                path: 'kanBan',
                name: 'kanBan',
                component: () => import('@/views/redirect/kanBan.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/redirect/user.vue')
            },
            {
                path: 'map',
                name: 'map',
                component: () => import('@/views/redirect/map.vue')
            },
            {
                path: 'world',
                name: 'world',
                component: () => import('@/views/redirect/world.vue')
            },
            {
                path: 'calendar',
                name: 'calendar',
                component: () => import('@/views/redirect/calendar.vue')
            },
            {
                path: 'paricla',
                name: 'paricla',
                component: () => import('@/views/redirect/paricla.vue')
            },
            {
                path: 'login&regiest',
                name: 'login&regiest',
                component: () => import('@/views/redirect/login&regiest.vue')
            }
        ]
    },
    {
        path: "/banner",
        name: "Banner",
        component: () => import("@/components/Banner.vue") 
    },
    {
        path: "/subMenu",
        name: "subMenu",
        component: () => import("@/components/subMenu.vue")  
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
