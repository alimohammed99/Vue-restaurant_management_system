<template>
    <td>{{ mydata.id }}</td>
    <td>{{ mydata.name }}</td>
    <td>{{ mydata.contact }}</td>
    <td>{{ mydata.address }}</td>
    <td>
        <!-- Displaying the Edit button with svg, then as a router link -->
        <router-link
            style="text-decoration: none; background-color:rgb(124, 59, 170); color:white; padding:10px; border-radius: 15px"
            :to="'/edit/' + mydata.id">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill"
                viewBox="0 0 16 16">
                <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
            </svg>
        </router-link>
    </td>
    <!-- Delete button -->
    <td>
        <a @click="confirmDeleteRestaurant(mydata.id)" href="javascript:void(0)">
            <!-- "item" now stands for
                                individual restaurant, from up there -->
            <svg style="text-decoration: none; background-color:rgb(211, 37, 37); color:white; padding:10px;
                                border-radius: 15px; cursor: pointer" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                <path
                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
        </a>
    </td>
</template>

<script>
// import axios from 'axios';
export default {
    props: ['mydata'],
    name: 'TheBigTableData',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

        // The id here is the mydata.id attached to @click event in the template
        confirmDeleteRestaurant(id) {

            // Emitting this custom event(delete-restaurant) to the parent Component(HomeView). I wanna handle the deletion there...and I have to pass the id along. That's the id of the restaurant I wanna delete.
            this.$emit('delete-restaurant', id);
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