
<template>
    <!-- Displaying our NavBars -->
    <HeaderComponent />

    <div>
        <h1 style="border:10px double tomato; padding:2px; border-radius: 50px; margin-top:20px">LOGIN</h1> <br>
        <img class="logo" src="../assets/res.jpg" style="width:30%; height:30%; border-radius:50px" alt="">
        <div class="container">
            <div class="wrapper">
                <div class="title"><span>Welcome Back</span></div>
                <form @submit.prevent="handleLogin" action="#">
                    <div class="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-person" viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                        <input type="email" v-model="email" placeholder="Email" required>
                    </div>
                    <div class="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-lock"
                            viewBox="0 0 16 16">
                            <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                        <input type="password" v-model="password" placeholder="Password" required>
                    </div>
                    <div class="pass"><a href="#">Forgot password?</a></div>
                    <div class="row button">
                        <input @click="handleLogin" type="submit" value="Login">
                    </div>
                    <div class="signup-link">Not a member? <router-link
                            style="color:red; font-size:20px; text-decoration:underline" to="/sign-up">Signup
                            now</router-link></div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// Importing axios so I can use it
import axios from 'axios'

import HeaderComponent from './HeaderComponent.vue';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    components: { HeaderComponent },
    methods: {
        async handleLogin() {
            try {
                // I wanna get the logged in User
                // Getting the User whose email and password were just typed, using the "$this" keyword
                // i.e searching the database, looking for a User that has this email&password that were just typed.
                // I'm using axios for fetching instead of fetch()
                let result = await axios.get(
                    // Ordinary quotation won't work. I have to use backticks. That's template literals.
                    `http://localhost:3000/users?email=${this.email}&password=${this.password}`
                );

                // Check if the response status is 200 (OK) and if data is returned.........Response 200 means "Everything is okay"
                // Also checking if there's some data.
                if (result.status == 200 && result.data.length > 0) {

                    // If successful, store user information in local storage and redirect User to the Home page.
                    localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                    // I wrote 'result.data[0]' coz the response from our API endpoint appears to be an array of user data objects, and I want to store the first user's data in local storage after a successful login......it's like this local storage deals with the current User or current data at the moment
                    // SO I'm interested in only the first User that logs in and the first element of an array start from 0.

                    this.$router.push({ name: 'HomeView' })
                } else {
                    // If User inputs wrong details
                    alert("Invalid credentials")
                    console.warn("Invalid credentials")
                }
                console.log(result)
            } catch (error) {
                console.warn(error)
            }
        }
    },
    mounted() {
        // After User that logs in, I need to hide the login route for such User. Because when you're logged in already, why do you need to see the login route again?

        // Checking the local storage if there exist a user data.
        // Any User that logs in, his/her data will be saved in the local storage so I'm checking the local storage if the user data has been saved.
        let user = localStorage.getItem('user-info')
        // "user-info" is the key we used while saving data into the local storage.

        // If there is a user data in the local storage, redirect such User to the home page.
        if (user) {
            this.$router.push({ name: 'HomeView' })
        } else {
            // If it's empty,i.e, if no User is available in the local storage
            this.$router.push({ name: 'LoginPage' })
        }
    }
}

</script>

<style scoped>
/*TO HIDE THE COUNTER ARROW IN "INPUT-TYPE-NUMBER"*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: rgb(135, 33, 207);
    overflow: hidden;
}

::selection {
    background: rgba(110, 26, 170, 0.8);
}

.container {
    max-width: 440px;
    padding: 0 20px;
    margin: 30px auto;
}

.wrapper {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
}

.wrapper .title {
    height: 90px;
    background: rgba(110, 26, 170, 0.8);
    border-radius: 5px 5px 0 0;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wrapper form {
    padding: 30px 25px 25px 25px;
}

.wrapper form .row {
    height: 45px;
    margin-bottom: 15px;
    position: relative;
}

.wrapper form .row input {
    height: 100%;
    width: 100%;
    outline: none;
    padding-left: 60px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    font-size: 16px;
    transition: all 0.3s ease;
}

form .row input:focus {
    border-color: #16a085;
    box-shadow: inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25);
}

form .row input::placeholder {
    color: #999;
}

.wrapper form .row i,
.wrapper form .row svg {
    position: absolute;
    width: 47px;
    height: 100%;
    color: #fff;
    font-size: 10px;
    background: rgba(110, 26, 170, 0.8);
    border: none;
    border-radius: 5px 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
}

.wrapper form .pass {
    margin: -8px 0 20px 0;
}

.wrapper form .pass a {
    color: #16a085;
    font-size: 17px;
    text-decoration: none;
}

.wrapper form .pass a:hover {
    text-decoration: underline;
}

.wrapper form .button input {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    padding-left: 0px;
    background: #16a085;
    border: 1px solid #16a085;
    cursor: pointer;
}

form .button input:hover {
    background: #12876f;
}

.wrapper form .signup-link {
    text-align: center;
    margin-top: 20px;
    font-size: 17px;
}

.wrapper form .signup-link a {
    color: #16a085;
    text-decoration: none;
}

form .signup-link a:hover {
    text-decoration: underline;
}
</style>