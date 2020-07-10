

var lg = new Vue({

	el: '#login',


	data: {
		
		username: "",
		password: "",
		usernameError : "",
		passwordError : "",
		loginErrorMessage : "",
		loginLoading : false

	},

	mounted(){

		this.authentication();
		
	},

	methods: {

		changeUsername(){

			this.usernameError = validateLoginInput(this.username);
		},

		changePassword(){

			this.passwordError = validateLoginInput(this.password);

		},

		onSubmit() {

			this.changeUsername();
			this.changePassword();

			if(this.usernameError == '' && this.passwordError	== ''){
				axios.post('php/api/loginVerify.php', {
					username: this.username,
					password: this.password
				})
				.then(function (response){

					if(response.data.success == false){

						lg.loginErrorMessage = "Please check your username or password";
						
					}
					else window.location.replace("p/search.html");

				})
				.catch(function (error) {
					console.log(error);
				});
			}

		},

		authentication(){
			var self = this;

			axios.get('php/api/userAuthentication.php')
			.then(function (response){

				if(response.data.allowedAccess == 1){
					window.location.replace("p/search.html");
				}
				
			})
			.catch(function (error) {
				console.log(error);
			});

		}

	}

});

function validateLoginInput(input){
	let retVal = "";

	if(input.trim().length < 1) retVal = "This is required!";

	return retVal;
}
