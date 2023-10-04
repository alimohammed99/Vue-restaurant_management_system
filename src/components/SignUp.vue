<template>
    <div>
        <img class="logo" src="../assets/res.jpg" style="width:20%; height:20%; border-radius:50px" alt="">
        <h1>Sign Up</h1>
        <section class="register">
            <input type="text" placeholder="Enter First Name" required="required">
            <input type="text" placeholder="Enter Last Name" required="required">
            <input type="email" placeholder="Enter Email" required="required">
            <input type="number" placeholder="Enter Phone number" required="required">
            <input type="password" placeholder="Enter Password" required="required">
            <button type="submit">Sign Up</button>
        </section>
    </div>
</template>

<script>
export default {
    name: 'SignUp'
}

</script>

<style>
/*TO HIDE THE COUNTER ARROW IN "INPUT-TYPE-NUMBER"*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type=number] {
    -moz-appearance:textfield; /* Firefox */
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
</style>