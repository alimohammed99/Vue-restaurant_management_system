<template>
    <div>
        <div class="header">
            <h1 style="border:20px double tomato; padding:5px; border-radius: 50px">KLASSY RESTAURANT</h1>

            <marquee scrollamount="12px">
                <h3 style="color: indigo; font-size:30px">A taste is gonna convince you...</h3>
            </marquee>
        </div>
        <img class="logo" src="../assets/res.jpg" style="width:20%; height:20%; border-radius:50px" alt="">
        <h1 style="color:grey">Sign Up</h1>

        <section class="register">

            <input v-model="first_name" type="text" placeholder="Enter First Name" required="required">

            <input v-model="last_name" type="text" placeholder="Enter Last Name" required="required">

            <input v-model="email" type="email" placeholder="Enter Email" required="required">

            <input v-model="phone_number" type="number" placeholder="Enter Phone number" required="required">

            <input v-model="password" type="password" placeholder="Enter Password" required="required">

            <button @click="signUp" type="submit">Sign Up</button>

        </section>

    </div>
</template>

<script>
// Importing axios so I can use it
import axios from 'axios'
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
            if (result.status == 201) {
                alert("Signed up successfully.....well-done  :)")

                // Converting the response to STRING before saving. The response was an object before.
                // To get access to the data inside the result, it has to be "result.data". "result" alone is an object so we needs the data inside it.
                let result_in_string = JSON.stringify(result.data)

                // Saving the credentials inside local storage.
                localStorage.setItem("user-info", result_in_string)
                // "user-info" can be anything. It's like a variable to hold our data.

                 // Redirect to Home page after successful sign-up
                this.$router.push({ name: 'HomeView' })

            } else {
                alert("Something went wrong. Can't sign up User now")
            }
        }
    }
}

</script>

<style>
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