Vue.component('headerNav', {
	props: ['pageCounter'],
	template: `
		
		<div class="w3-row" >
			<div class="w3-col l12">
				<nav class="navbar priority is-fixed-top w3-card" role="navigation" aria-label="main navigation">
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

			                <a class="navbar-item" :class="{'w3-bottombar w3-pale-blue  w3-border-blue' : pageCounter == 1}" href="search.html">
			                    <span class="has-text-link"><i class="fas fa-clipboard-list"></i></span> &nbsp Grievance
			                </a>

			                <a class="navbar-item" :class="{'w3-bottombar w3-pale-blue  w3-border-blue' : pageCounter == 2}" href="reports.html">
			                    <span class="has-text-link"><i class="fas fa-newspaper"></i></span> &nbsp Reports
			                </a>

			                <a class="navbar-item" :class="{'w3-bottombar w3-pale-blue  w3-border-blue' : pageCounter == 3}" href="syncing.html">
			                    <span class="has-text-link"><i class="fas fa-sync"></i></span> &nbsp Syncing
			                </a>

			                <div class="navbar-item has-dropdown is-hoverable">
								<a class="navbar-link" :class="{'w3-bottombar w3-pale-blue  w3-border-blue' : pageCounter == 4}">
									<i class="fas fa-pencil-ruler has-text-link"></i> &nbsp Evaluation Form Encoding
								</a>

								<div class="navbar-dropdown">
									<a class="navbar-item" href="encoding-ex.html">
										<i class="fab fa-wpforms has-text-link"></i>&nbsp EX 01
									</a>
									<a class="navbar-item"  href="encoding-inc.html">
										<i class="fab fa-wpforms has-text-link"></i>&nbsp INC 01
									</a>
								</div>
							</div>

			                <a class="navbar-item" :class="{'w3-bottombar w3-pale-blue  w3-border-blue' : pageCounter == 5}" href="historyLog.html">
			                    <span class="has-text-link"><i class="fas fa-history"></i></span> &nbsp Histoy Log
			                </a>

			            </div>

			            <div class="navbar-end">
			            <div class="navbar-item">
							
							<p><b>Hi!</b> {{userData.userFullName}}</p>
			                <div class="buttons">
			                    &nbsp&nbsp
			                    <a class="button is-dark is-outlined" @click="signOut">
			                        <span class="has-text-link"><i class="fas fa-sign-out-alt"></i></span> &nbsp Sign out
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
				regionName : "",
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
					
					self.$emit("logout");
					self.showAuthenticationErrorMessage("You're not allowed to access this system");
					
				} else{

					let userData = {
						userId : response.data.id,
						userName : response.data.username,
						userType : response.data.userType,
						regionCode : response.data.region,
						regionName : response.data.regionName,
						userFullName : response.data.name,
						allowedAccess : response.data.allowedAccess
					};

					self.userData = userData;
					self.$emit("copy-user-data", self.userData);
				}
				


			})
			.catch(function (error) {
				self.showAuthenticationErrorMessage("Network Error. Cannot connect to server.");
				console.log(error);
			});

		},

		showAuthenticationErrorMessage(errorMessage){
			this.closeAuthenticationMessage = errorMessage;
			this.$emit("close-select-barangay");
		},

		closeAuthenticationError(){
			this.closeAuthenticationMessage = "";
			window.location.replace("../index.html");
		}

	}


});