<template>
    <HeaderComponent />
    <div>
        <h1>Add Restaurant</h1>

        <form style="width: 100%" class="add" action="" @submit="addRestaurant">
            <input type="text" name="name" placeholder="Enter Name" v-model="Restaurant.name" required>
            <input type="text" name="contact" placeholder="Enter Contact Number" v-model="Restaurant.contact" required>
            <input type="text" name="address" placeholder="Enter Address" v-model="Restaurant.address" required>
            <button @click="addRestaurant" type="submit">ADD</button>
        </form>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
export default {
    name: 'AddRestaurant',
    components: { HeaderComponent },
    mounted() {
        // When DOM has been mounted and there's no user data in the local storage, i.e User has launched the app but hasn't signed up or anything push the User to the sign up route.
        let status = localStorage.getItem('user-info')
        if (!status) {
            this.$router.push({ name: 'SignUp' })
        }
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
        addRestaurant() {
            // Check if any of the required fields are empty
            if (!this.Restaurant.name || !this.Restaurant.contact || !this.Restaurant.address) {
                alert('Please fill in all the required fields.');
            } else {
                // Proceed with adding the restaurant (you can implement this logic)
                // ...
                // After successfully adding the restaurant, you may want to clear the form:
                this.Restaurant.name = '';
                this.Restaurant.contact = '';
                this.Restaurant.address = '';
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