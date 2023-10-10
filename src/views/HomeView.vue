<template>
    <!-- Include the HeaderComponent for navigation -->
    <HeaderComponent />

    <div>
        <h1 v-if="!isLoggedIn">Hello welcome to the Home Page</h1>
    </div>

    <!-- Display a welcome message with user's first name and last name and User is logged in -->
    <div>
        <h1 v-if="isLoggedIn">Hello {{ first_name }} {{ last_name }}, welcome...</h1>
    </div>


    <div style="text-align:center">
        <table class="zigzag">
            <thead>
                <tr>
                    <th class="header">ID</th>
                    <th class="header">NAME</th>
                    <th class="header">CONTACT</th>
                    <th class="header">ADDRESS</th>
                </tr>
            </thead>
            <tbody>
                <!-- Looping the Restaurants list -->
                <tr v-for="item in restaurants" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ item.address }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            first_name: '',
            last_name: '',

            // Initializing the restaurants array. It's an array....coz we have a lot of restaurants in the database(json-server).
            restaurants: []
        };
    },
    components: { HeaderComponent },
    computed: {
        isLoggedIn() {
            // Check if there is user data in localStorage
            return !!localStorage.getItem('user-info');
            // The double negation makes the code up there boolean(true or false)
        }
    },
    async mounted() {
        // Retrieve User information from local storage
        // 'user-info' is the name we used while storing data in local storage initially...
        let currentUser = localStorage.getItem('user-info');

        // If there's a user logged in
        if (currentUser) {

            // Parse user information and set first_name and last_name in data
            const userData = JSON.parse(currentUser);
            // 'JSON.parse' is used here to parse the string retrieved from local storage(currentUser) into a JavaScript Object(JSON).That's coz the data stored in the 'user-info' initially is in JSON format.
            // The data retrieved from the local storage is STRING by default.
            // So we save in JSON format and retrieve in JSON format.

            this.first_name = userData.first_name;
            this.last_name = userData.last_name;
        }
        // else {
            // Check if there's no user information, redirect to SignUp page
            this.$router.push({ name: 'HomeView' });
        // }

        // Fetching the Restaurants from the json-server
        let action = await axios.get("http://localhost:3000/restaurants");

        // Assigning the result to our 'restaurant' array
        this.restaurants = action.data
        // It's action.data coz I need access to the data inside the result
    }
};
</script>

<style>
/* Define styles for table cells */
table {
    font-family: sans-serif;
    text-align: center;

}

th,
td {
    padding: 1.55em 3.5em;
    text-align: center;
}

th:nth-child(2),
td:nth-child(2) {
    text-align: right;
}

td {
    background-color: #eee;
}

th {
    background-color: tomato;
    color: black;
}

/* Define styles for the zigzag effect */
.zigzag {
    border-collapse: separate;
    border-spacing: 0.25em 1em;
}

.zigzag tbody tr:nth-child(odd) {
    transform: rotate(2deg);
}

.zigzag thead tr,
.zigzag tbody tr:nth-child(even) {
    transform: rotate(-2deg);
}
</style>
