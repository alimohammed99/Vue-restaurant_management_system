<template>
     <!-- eslint-disable-next-line -->
    <HeaderComponent />
    <div>
        <h1>Add Restaurant</h1>

        <form style="width: 100%" class="add">
            <input type="text" name="name" placeholder="Enter Name" v-model="Restaurant.name" required>
            <input type="text" name="contact" placeholder="Enter Contact Number" v-model="Restaurant.contact" required>
            <input type="text" name="address" placeholder="Enter Address" v-model="Restaurant.address" required>
            <button @click="addRestaurant" type="submit">ADD</button>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import HeaderComponent from '../components/HeaderComponent.vue'
import axios from 'axios';
export default {
    name: 'AddRestaurant',
    components: { HeaderComponent },
    mounted() {
        // When DOM has been mounted and there's no user data in the local storage, i.e User has launched the app but hasn't signed up or anything push the User to the sign up route.
        // let status = localStorage.getItem('user-info')
        // if (!status) {
        //     this.$router.push({ name: 'SignUp' })
        // }
    },
    data() {
        return {
            Restaurant: {
                name: "",
                contact: "",
                address: ""
            }
        }
    },
    methods: {
        async addRestaurant() {
            try {
                // Check if any of the required fields are empty
                if (!this.Restaurant.name || !this.Restaurant.contact || !this.Restaurant.address) {
                    alert('Please fill in all the required fields.');
                } else {
                    // Proceed with adding the restaurant
                    const bomb = await axios.post("http://localhost:3000/restaurants", {
                        name: this.Restaurant.name,
                        contact: this.Restaurant.contact,
                        address: this.Restaurant.address
                    });

                    // Check if the bomb status indicates a successful addition (e.g., 201)
                    if (bomb.status == 201) {
                        // After successfully adding the restaurant, alert a message, clear the form and redirect to the home page:
                        // alert('Restaurant added successfully!');

                        this.$router.push({ name: 'HomeView' });

                        this.Restaurant.name = '';
                        this.Restaurant.contact = '';
                        this.Restaurant.address = '';

                    } else {
                        // Handle other status codes (e.g., display an error message)
                        alert('Failed to add the restaurant. Please try again later.');
                    }
                }
            } catch (error) {
                // Handle any network or server errors here
                console.error('An error occurred while adding the restaurant:', error);
                alert('An error occurred while adding the restaurant. Please try again later.');
            }
        }

    }

}


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