<template>
	
</template>

<script>

export default{

mounted(){

	localStorage.removeItem("token");
	localStorage.removeItem("user");
	this.$router.push({ path : '/login' });
	Notification.success('Logout successfully!!');
	}
}
	
</script>