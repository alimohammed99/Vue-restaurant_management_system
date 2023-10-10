<template>
    <div class="nav">
        <!-- <a style="border-right:8px double grey" class="left" href="#">
            <span style="color:white">KLASSY</span> <span>TREATS</span>
        </a> -->
        <router-link to="/">
            <a style="border-right:8px double grey" class="left">
                <span style="color:white">KLASSY</span> <span>TREATS</span>
            </a>
        </router-link>


        <!-- This doesn't need any route. Once clicked, it's gonna perform the function assigned to it. -->
        <a @click="handleLogout" class="right" href="javascript:;">LOGOUT</a>

        <router-link class="right" to="/update">
            UPDATE RESTAURANT
        </router-link>

        <router-link class="right" to="add">
            ADD RESTAURANT
        </router-link>

         <router-link class="right" to="/">
                HOME
            </router-link>

    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    methods: {
        /**
   * Handles user logout by clearing local storage and navigating to the login page.
   */
        handleLogout() {
            localStorage.clear(); // Clear user session data
            this.$router.push({ name: 'LoginPage' }); // Redirect to the login page
        }

    }

};
</script>

<style scoped>
.nav {
    background-color: #333;
    overflow: hidden;
}

.nav a {
    color: #f2f2f2;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}

.nav a.left {
    float: left;
    color: tomato;
    font-size: 25px;
}

.nav a.right {
    float: right;
    font-size: 20px;
    padding-top: 20px;
}

.nav a.right:hover {
    background: #837c7c;
    color: white;
}

a.right.router-link-active {
    border-bottom: 3px dotted tomato;
    padding-bottom: 4px;
}
</style>