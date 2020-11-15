class Token{

	isValid(token){
		const payload = this.payload(token);
		const base_url = window.location.origin;
		if (payload) {
			return payload.iss == base_url+'/api/auth/login' || base_url+'/api/auth/register' ? true : false // Check request get from which link
		}

		return false;
	}

	payload(token){
		const payload = token.split('.')[1];		//split from . and then decode and get name/id
		return this.decode(payload);
	}


	decode(payload){
		return JSON.parse(atob(payload));			//VERIFY SIGNATURE atob() is encode-decode Base64
	}
}

export default Token = new Token()
