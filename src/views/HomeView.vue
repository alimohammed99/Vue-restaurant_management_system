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

     <div v-if="!restaurants.length">
        <SpinnerComponent />
        </div>

        <div style="margin-top:16px"><h1 style="text-decoration:underline; color:indigo">Available Restaurants</h1></div>

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
                    <TheBigTableData :mydata="item" @delete-restaurant="deleteRestaurant" />
                    <!-- "delete-restaurant" is the custom event sent from TheBigTableData.vue -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import TheBigTableData from '../components/TheBigTableData.vue'; //This is the component that has our table
import SpinnerComponent from '../components/SpinnerComponent.vue';
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
    components: { HeaderComponent, TheBigTableData, SpinnerComponent },
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

        // Add a 2-second delay using setTimeout
        setTimeout(async () => {
            // Fetching the Restaurants from the json-server
            try {
                let action = await axios.get("http://localhost:3000/restaurants");

                // Filling the restaurants array with all our restaurants
                this.restaurants = action.data;

                // Handle errors
            } catch (error) {
                console.error('An error occurred while fetching restaurants:', error);
                alert('Failed to fetch restaurants. Please try again later.');
            }
        }, 2000); // 2000 milliseconds (2 seconds)
        // The above code fetches us our Restaurants after 2 secs delay
    },
    methods: {
        deleteRestaurant(id) {
            const confirmed = window.confirm('Are you sure you want to delete this restaurant?');
            if (confirmed) {
                axios.delete(`http://localhost:3000/restaurants/${id}`)
                    .then(() => {
                        // Remove the restaurant from the local list after successful deletion
                        this.restaurants = this.restaurants.filter(list => list.id !== id);
                        alert('Restaurant deleted successfully!');
                    })
                    .catch(error => {
                        console.error('An error occurred while deleting the restaurant:', error);
                        alert('Failed to delete the restaurant. Please try again later.');
                    });
            }
        }
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
