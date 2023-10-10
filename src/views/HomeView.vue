<template>
    <!-- Include the HeaderComponent for navigation -->
    <HeaderComponent />

    <div>
        <h1 v-if="!isLoggedIn">Hello welcome to the Home Page</h1>
    </div> <br>

    <!-- Display a welcome message with user's first name and last name and User is logged in -->
    <div>
        <h1 v-if="isLoggedIn">Hello {{ first_name }} {{ last_name }}, welcome...</h1>
    </div><br>


    <div style="text-align:center; margin-top:16px">
        <table class="zigzag">
            <thead>
                <tr>
                    <th class="header">ID</th>
                    <th class="header">NAME</th>
                    <th class="header">CONTACT</th>
                    <th class="header">ADDRESS</th>
                    <th colspan="2" class="header">ACTION</th>

                </tr>
            </thead>
            <tbody>
                <!-- Looping the Restaurants list -->
                <tr class="ttt" v-for="item in restaurants" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ item.address }}</td>
                    <td>
                        <!-- Displaying the Edit button with svg, then as a router link -->
                        <router-link
                            style="text-decoration: none; background-color:rgb(124, 59, 170); color:white; padding:10px; border-radius: 15px"
                            :to="'/edit/' + item.id">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                            </svg>
                        </router-link>
                    </td>
                    <!-- Delete button -->
                    <td>
                        <svg style="text-decoration: none; background-color:rgb(211, 37, 37); color:white; padding:10px; border-radius: 15px; cursor: pointer"
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path
                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </td>
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
        // this.$router.push({ name: 'HomeView' });
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

.zigzag tbody tr:nth-child(even) {
    transform: rotate(3deg);
}

.zigzag tbody tr:nth-child(odd) {
    transform: rotate(-3deg);
}
</style>
