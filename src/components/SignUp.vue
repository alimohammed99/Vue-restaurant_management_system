<template>
    <!-- Displaying our NavBars -->
    <HeaderComponent />
    <div>
        <div class="header">
            <h1 style="border:10px double tomato; padding:2px; border-radius: 50px">BECOME A MEMBER TODAY</h1>

            <marquee scrollamount="12px">
                <p style="color: indigo; font-size:30px">A trial is 💯 gonna convince you...</p>
            </marquee>
        </div>
        <img class="logo" src="../assets/ttt.jpg" style="width:25%; height:25%; border-radius:50px" alt="">
        <h1 style="color:grey">Sign Up</h1>

        <section class="register">

            <input v-model="first_name" type="text" placeholder="Enter First Name" required="required">

            <input v-model="last_name" type="text" placeholder="Enter Last Name" required="required">

            <input v-model="email" type="email" placeholder="Enter Email" required="required">

            <input v-model="phone_number" type="number" placeholder="Enter Phone number" required="required">

            <input v-model="password" type="password" placeholder="Enter Password" required="required">

            <button @click="signUp" type="submit">Sign Up</button>

            <p style="color:red;"><router-link style="color:red; font-size:25px" to="/login">Already have an account?
                    Login</router-link></p>

        </section>

    </div>
</template>

<script>
// Importing axios so I can use it
import axios from 'axios'
import HeaderComponent from './HeaderComponent.vue';
export default {
    name: 'SignUp',
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            password: ''
        }
    },
    components: { HeaderComponent },
    methods: {
        async signUp() {
            // 'fetch' can also be used instead of 'axios'.
            // It is "axios.post" coz I'm making a post request(storing data somewhere)
            let result = await axios.post("http://localhost:3000/users", {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                phone_number: this.phone_number,
                password: this.password
            })
            console.log(result)

            // Checking for the response message. If it's successful, it's gonna return status 201. This has been tested using POSTMAN. 
            // Status 201 means "Resource created successfully...."
            if (result.status == 201) {
                if (this.first_name != '' && this.last_name != '' && this.email != '' && this.phone_number != '' && this.password != '') {
                    alert("Signed up successfully.....well-done  :)")

                    // Converting the response to STRING before saving. The response was an object before.
                    // It's always better to save in JSON format.
                    // To get access to the data inside the result, it has to be "result.data". "result" alone is an object so we needs the data inside it.
                    let result_in_string = JSON.stringify(result.data)

                    // Saving the credentials inside local storage.
                    localStorage.setItem("user-info", result_in_string)
                    // "user-info" can be anything. It's like a variable to hold our data.

                    // Redirect to Home page after successful sign-up
                    this.$router.push({ name: 'HomeView' })

                } else {
                    alert("Can't submit empty fields! Kindly fill all fields")
                }
            } else {
                alert("Something went wrong. Can't sign up User now")
            }
        }
    },
    mounted() {
        // Since any User that signs up is gonna be logged in, I need to hide the Sign-up route for such User. Because when you're logged in already, why do you need to sign up again?

        // Checking the local storage if there exist a user data.
        // Any User that registers, his/her data will be saved in the local storage so I'm checking the local storage if the user data has been saved.
        let user = localStorage.getItem('user-info')
        // "user-info" is the key we used while saving data into the local storage.

        // If there is a user data in the local storage, redirect such User to the home page.
        if (user) {
            this.$router.push({ name: 'HomeView' })
        } else {
            // If it's empty,i.e, if no User is available in the local storage
            this.$router.push({ name: 'SignUp' })
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

input[type=number] {
    -moz-appearance: textfield;
    /* Firefox */
}

/*TO HIDE THE COUNTER ARROW IN "INPUT-TYPE-NUMBER"*/

.register input {
    width: 400px;
    height: 50px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
    font-size: 17px;
    border-radius: 15px;
}

.register button {
    width: 200px;
    height: 40px;
    border: none;
    background: green;
    color: #fff;
    cursor: pointer;
    border-radius: 30px;
    font-size: 20px;
}

.register {
    margin-bottom: 50px;
}
</style>