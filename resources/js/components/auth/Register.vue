<template>
	<div>
        <Nav></Nav>
		<div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Register</div>
                <div class="card-body">
                    <form  @submit.prevent="register">
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control " name="name" value=""  autocomplete="name" autofocus v-model="form.name">
                                <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control " name="email" value=""  autocomplete="email" v-model="form.email">

                                <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control " name="password"  autocomplete="new-password" v-model="form.password">
                                <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation"  autocomplete="new-password" v-model="form.password_confirmation">
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Create Account
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
                form: {
                name: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
            },

            errors:{}

            }
        },

        mounted(){

        },

        methods:{
            register(){
                axios.post('/api/auth/signup', this.form)
                .then(res=>{
                    User.responseAfterLogin(res);
                    this.$router.push({path: '/dashboard'});
                    Notification.success('Registration successfully done!!'); //Notification get from helper
                })
                .catch(error=>{
                    if (error.response.data.errors) {
                         this.errors = error.response.data.errors;
                    }
                    if (error.response.data.error) {
                        Notification.error(error.response.data.error);
                    }
                })
            }
        },

        created(){
            if (User.loggedIn()){
                this.$router.push({path: '/dashboard'});
            }
        }
	}

</script>
