import  Token from './Token'
import  AppStorage from './AppStorage'

class User{

	responseAfterLogin(res){
		const access_token = res.data.access_token;
		const username = res.data.name;
		const user_id = res.data.user_id;
		if (Token.isValid(access_token)) {  //check token is it valid or not
			AppStorage.store(access_token, username, user_id); //if valid store data
		}
	}

	loggedIn(){
		return this.hasToken();  //if return token in storage
	}

	logout(){
		AppStorage.clear();
	}

	name(){
		if (this.loggedIn()) {    //if logged
			return AppStorage.getUser(); 	//then get username
		}
	}

    hasToken(){
        const storeToken = localStorage.getItem("token"); //get token from localstorage
        if (storeToken) {										//if get
            return Token.isValid(storeToken) ? true : false   	//then check valid or not
        }
        return false;
    }

	id(){

	}

}

export default User = new User();
