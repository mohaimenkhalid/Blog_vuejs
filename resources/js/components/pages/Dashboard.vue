<template>
	<div>
        <Nav></Nav>
		<div class="container mt-4">
            <h1>Welcome to dashboard</h1>
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

			}
		},

		created(){
            if (!User.loggedIn()){
                this.$router.push({path: '/login'});
            }
        }

	}

</script>
