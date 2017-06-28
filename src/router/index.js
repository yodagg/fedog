import Vue from 'vue'
import router from 'vue-router'
import home from '../template/home.vue'
import user from '../template/user.vue'
import admin from '../template/admin.vue'

Vue.use(router)

export default new router({
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/admin',
            component: admin
        },
        {
            path: '/user',
            component: user
        },
        {
            path: '/:search',
            component: home
        }
    ]
})