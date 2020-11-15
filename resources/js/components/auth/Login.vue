<template>
	<div>
        <Nav></Nav>
		<div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"> Login </div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-mail Address</label>
                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control " name="email" value=""  autocomplete="email" autofocus v-model="form.email">
                                <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control "  name="password"  autocomplete="current-password" v-model="form.password">
                                <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small><br>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                   Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
	import Nav from "../partials/Nav";

    export default{
        components: {
            Nav
        },
        data(){
            return{
                form:{
                    email: '',
                    password: '',
                },
                errors: {},
            }

        },
        mounted(){

        },

        methods:{
            login(){
                axios.post('/api/auth/login', this.form)
                .then(res=>{
                   /* console.log(res.data)*/
                    User.responseAfterLogin(res);
                    this.$router.push({path: '/admin/dashboard'});
                    Notification.success('Login successfully!!'); //Notification get from helper

                })
                .catch(error =>{
                    /*console.log(error.response.data)*/
                    if (error.response.data.errors) {
                         this.errors = error.response.data.errors;
                    }

                    if (error.response.data.error) {
                        Notification.error(error.response.data.error);
                    }

                })
            },

        },

        created(){
            if (User.loggedIn()){
                this.$router.push({path: '/admin/dashboard'});
            }
        }

	}

</script>
