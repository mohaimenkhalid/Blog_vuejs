<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <router-link to="/" class="navbar-brand" href="">Blogger</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto"></ul>
                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto" v-if="!isLogin">
                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link" href="">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link" href="">Register</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" v-if="isLogin">
                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <router-link to="/admin/dashboard" class="nav-link" href="">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/blog/create" class="nav-link" href="">Blog</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/category" class="nav-link" href="">Category</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/tags" class="nav-link" href="">Tag</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/logout" class="nav-link" href="">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Nav',
        data(){
            return{
                isLogin: ''
            }
        },
        created() {
            this.isLogin = User.loggedIn()
        }
    }
</script>
