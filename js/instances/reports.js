


var rp = new Vue({

	el: '#reports',

	data: {
		
		pageCounter : 2,
		userData : {},
		regionCode : "",
		listOfGrievance : []
		
	},

	mounted(){

	
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;
			this.regionCode = userData.regionCode;

		}

	}

});
