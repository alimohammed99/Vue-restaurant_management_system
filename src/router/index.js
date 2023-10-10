import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../components/SignUp.vue'
import LoginPage from '../components/LoginPage.vue'
import AddRestaurant from '../views/AddRestaurant.vue'
import UpdateRestaurant from '../views/UpdateRestaurant.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/update',
        name: 'UpdateRestaurant',
        component: UpdateRestaurant
    },
    {
        path: '/add',
        name: 'AddRestaurant',
        component: AddRestaurant
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
