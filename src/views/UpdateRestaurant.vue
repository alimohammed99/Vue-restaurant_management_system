<template>
    <HeaderComponent />
    <div>
        <h1>Update Restaurant</h1>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
    name: 'UpdateRestaurant',
    components: { HeaderComponent },
    mounted() {
        // When DOM has been mounted and there's no user data in the local storage, i.e User has launched the app but hasn't signed up or anything push the User to the sign up route.
        let status = localStorage.getItem('user-info')
        if (!status) {
            this.$router.push({ name: 'SignUp' })
        }
    }
}


</script>

<style></style>