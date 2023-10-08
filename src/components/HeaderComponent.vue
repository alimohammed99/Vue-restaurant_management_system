<template>
    <div class="nav">
        <a class="left" href="#"><span style="color:green" class="lll">KLASSY</span> <span class="rrr">TREATS</span></a>
        <a class="right" href="#">HOME</a>
        <a class="right" href="#">ADD RESTAURANT</a>
        <a class="right" href="#">UPDATE RESTAURANT</a>
        <a class="right" href="#">LOGOUT</a>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',

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
    font-size: 30px;
}

.nav a.right {
    float: right;
}

.nav a:hover {
    background: #ddd;
    color: #333;
}</style>