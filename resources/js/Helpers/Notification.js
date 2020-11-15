class Notification{

	success(msg){
		iziToast.success({
            title: "Success!",
            message: msg,
            position: 'topRight',
        });
	}

	error(msg){
		iziToast.error({
            title: "Error!",
            message: msg,
            position: 'topRight',
        });
	}

}

export default Notification = new Notification();
