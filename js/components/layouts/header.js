Vue.component('headerNav', {
	props: ['pageCounter'],
	template: `
		
		<div class="w3-row is-dark ">
			<div class="w3-col l12 w3-border-bottom">
				<nav class="navbar is-light priority" role="navigation" aria-label="main navigation ">
			        <div class="navbar-brand">
			            <a class="navbar-item" >
			                <img src="../assets/images/Listahanan-2copy.png" width="120" height="100">
			            </a>

			            <a role="button" class="navbar-burger" :class="{'is-active' : showNavbarMobile}" aria-label="menu" aria-expanded="false" @click="toggleNavbarMobile">
						  <span aria-hidden="true"></span>
						  <span aria-hidden="true"></span>
						  <span aria-hidden="true"></span>
						</a>
			        </div>

			        <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active' : showNavbarMobile}">
			            <div class="navbar-start">

			                <a class="navbar-item" :class="{'w3-bottombar w3-border-pink' : pageCounter == 1}" href="search.html">
			                    <span class="has-text-link"><i class="fas fa-clipboard-list"></i></span> &nbsp GRIEVANCE
			                </a>

			                <!-- <a class="navbar-item" :class="{'w3-bottombar w3-border-pink' : pageCounter == 2}" href="reports.html">
			                    <span class="has-text-link"><i class="fas fa-newspaper"></i></span> &nbsp REPORTS
			                </a> -->

			                <a class="navbar-item" :class="{'w3-bottombar w3-border-pink' : pageCounter == 3}" href="syncing.html">
			                    <span class="has-text-link"><i class="fas fa-sync"></i></span> &nbsp SYNCING
			                </a>

			                

			            </div>

			            <div class="navbar-end">
			            <div class="navbar-item">
							
							
			                <div class="buttons">
			                    &nbsp&nbsp
			                    <a class="button is-light w3-border" @click="signOut">
			                        <i class="fas fa-sign-out-alt"></i> &nbsp Sign out
			                    </a>
			                </div>

			            </div>
			            </div>
			        </div>
			    </nav>
		    </div>
		    <div class="modal" :class="{'is-active' : closeAuthenticationMessage != ''}">

				<div class="modal-background" @click="closeAuthenticationError"></div>
				<div class="modal-content box has-text-danger">
					{{closeAuthenticationMessage}}
				</div>
			</div>
		</div>

	`,

	data(){

		return {
			pendingPatientInfo : 0,
			userData : {
				userId : -1,
				userName : "",
				userFullName : "",
				userType : -1,
				regionCode : -1,
				allowedAccess : 0
			},
			showNavbarMobile : false,
			closeAuthenticationMessage : ""
		}

	},
	created(){
		this.authentication();
		this.isIdle(); 
	},

	methods : {

		isIdle() {

            var self = this;

            let idleCountdown;
            window.onload = resetTimer;
            window.onmousemove = resetTimer;
            window.onmousedown = resetTimer;  // catches touchscreen presses as well      
            window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
            window.onclick = resetTimer;      // catches touchpad clicks as well
            window.onkeypress = resetTimer;   
            window.addEventListener('scroll', resetTimer, true);

            function logOutUser() {

                self.logoutSession();

            }

            function resetTimer() {
                clearTimeout(idleCountdown);
                idleCountdown = setTimeout(logOutUser, 900000);  // time is in milliseconds 1000 == 1 second

            }
        },

        logoutSession(){
            var self = this;
            
            axios.get('../php/api/logout.php')
			.then(function (response){

				self.$emit("logout");
				self.showAuthenticationErrorMessage("It seems your not doing anything for 15 minutes. Sorry you will be log out!");

			})
			.catch(function (error) {
				alert(error);
			});

        },

		toggleNavbarMobile(){

			if(this.showNavbarMobile == true) this.showNavbarMobile = false;
			else this.showNavbarMobile = true;
			
		},

		signOut(){

			axios.get('../php/api/logout.php')
			.then(function (response){

				window.location.replace("../index.html");

			})
			.catch(function (error) {
				alert(error);
			});

		},

		authentication(){
			var self = this;

			axios.get('../php/api/userAuthentication.php')
			.then(function (response){

				if(response.data.allowedAccess == 0){
					self.showAuthenticationErrorMessage("You're not allowed to access this system");
				} 

				let userData = {
					userId : response.data.id,
					userName : response.data.username,
					userType : response.data.userType,
					regionCode : response.data.region,
					userFullName : response.data.name,
					allowedAccess : response.data.allowedAccess
				};

				self.userData = userData;
				self.$emit("copy-user-data", self.userData);
				


			})
			.catch(function (error) {
				self.showAuthenticationErrorMessage("Network Error. Cannot connect to server.");
				console.log(error);
			});

		},

		showAuthenticationErrorMessage(errorMessage){
			this.closeAuthenticationMessage = errorMessage;
		},

		closeAuthenticationError(){
			this.closeAuthenticationMessage = "";
			window.location.replace("../index.html");
		}

	}


});