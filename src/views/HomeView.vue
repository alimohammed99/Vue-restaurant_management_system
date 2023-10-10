<template>
    <!-- Include the HeaderComponent for navigation -->
    <HeaderComponent />

    <!-- Display a welcome message with user's first name and last name -->
    <div>
        <h1>Hello {{ first_name }} {{ last_name }}, welcome...</h1>
    </div>
</template>


<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
    name: 'HomeView',
    data() {
        return {
            first_name: '',
            last_name: ''
        }
    },
    components: { HeaderComponent },
    mounted() {
        // Retrieve User information from local storage
        // 'user-info' is the name we used while storing data in the local storage initially...
        let currentUser = localStorage.getItem('user-info');

        // Parse user information and set first_name and last_name in data
        this.first_name = JSON.parse(currentUser).first_name;
        this.last_name = JSON.parse(currentUser).last_name;
        // 'JSON.parse' is used to parse the string retrieved from local storage(currentUser) into a JavaScript Object(JSON).That's coz the data stored in the 'user-info' initially is in JSON format.
        // The data retrieved from the local storage is STRING by default.
        // So we save in JSON format and retrieve in JSON format.

        // After parsing the JSON string, I have access to its properties as if it were a regular JavaScript object. So I was able to extract first_name and last_name that I need.

        // Check if there's no user information, redirect to SignUp page
        if (!currentUser) {
            this.$router.push({ name: 'SignUp' });
        }
    }
}
</script>


<style></style>