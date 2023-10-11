<template>
    <!-- To ignore some unnecessary warnings -->
    <!-- eslint-disable-next-line -->
    <HeaderComponent />
    <div>
        <h1>Edit Restaurant</h1>

        <form style="width: 100%" class="add">
            <input type="text" name="name" v-model="Restaurant.name" required />
            <input type="text" name="contact" v-model="Restaurant.contact" required />
            <input type="text" name="address" v-model="Restaurant.address" required />
            <button @click="updateRestaurant" type="submit">UPDATE</button>
        </form>
    </div>
</template>

<script>

// To ignore some unnecessary warnings
/* eslint-disable */

import HeaderComponent from "../components/HeaderComponent.vue";
import axios from "axios";
export default {
    name: "EditRestaurant",
    components: { HeaderComponent },
    data() {
        return {
            Restaurant: {
                name: "",
                contact: "",
                address: "",
            },
        };
    },
    async mounted() {
        // When DOM has been mounted and there's no user data in the local storage, i.e User has launched the app but hasn't signed up or anything push the User to the sign up route.
        // let status = localStorage.getItem('user-info')
        // if (!status) {
        //     this.$router.push({ name: 'SignUp' })

        // Getting the route parameter using "this.$route.params"
        let special_id = this.$route.params.xy;
        // "xy" was used to denote the id in the router page

        // getting the particular restaurant clicked since I now have the ID
        const result = await axios.get(
            "http://localhost:3000/restaurants/" + special_id
        );

        this.Restaurant = result.data
    },
    methods: {
        async updateRestaurant() {

            // Getting the route parameter using "this.$route.params"
            let special_id = this.$route.params.xy;
            // "xy" was used to denote the id in the router page

            try {
                // Check if any of the required fields are empty
                if (!this.Restaurant.name || !this.Restaurant.contact || !this.Restaurant.address) {
                    alert('Please fill in all the required fields.');
                } else {
                    // Proceed with adding the restaurant
                    const strike = await axios.put("http://localhost:3000/restaurants/" + special_id, {
                        // I used PUT and not POST request since I wanna update an existing resource
                        name: this.Restaurant.name,
                        contact: this.Restaurant.contact,
                        address: this.Restaurant.address
                    });

                    // Check if all is well and no error
                    if (strike.status == 200) {
                        // After successfully updating the restaurant, alert a message and redirect to the home page:
                        alert('Restaurant updated successfully!');

                        this.$router.push({ name: 'HomeView' });

                    } else {
                        // Handle other status codes (e.g., display an error message)
                        alert('Failed to add the restaurant. Please try again later.');
                    }
                }
            } catch (error) {
                // Handle any network or server errors here
                console.error('An error occurred while updating the restaurant:', error);
                alert('An error occurred while updating the restaurant. Please try again later.');
            }

        }
    }

};
</script>

<style scoped>
body {
    padding: 0;
    margin: 0;
}

.add input {
    width: 800px;
    height: 70px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}

.add button {
    width: 320px;
    height: 40px;
    border: none;
    background: rgb(24, 146, 24);
    color: #fff;
    cursor: pointer;
    border-radius: 15px;
}
</style>
