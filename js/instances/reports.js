


var rp = new Vue({

	el: '#reports',

	data: {
		
		pageCounter : 2,
		userData : {},
		statReports : [],
		statCtr : 1,

		region : { name : "" , code : "" },
		province : { name : "" , code : "" },
		city : { name : "", code : "" }

	},

	mounted(){

	
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;
			this.fetchStatGrievanceType(userData.regionCode, this.statCtr, userData.regionName);

		},

		fetchStatGrievanceType(code, statCtr, name){

			this.statCtr = statCtr;
			let self = this;
			
			if(statCtr < 4){
				
				if(statCtr == 1){
					this.region.name = name;
					this.region.code = code;
				} else if(statCtr == 2){
					this.province.name = name;
					this.province.code = code;
				} else if(statCtr == 3){
					this.city.name = name;
					this.city.code = code;
				}

	            axios.post('../php/api/fetchStatGrievanceType.php',{

	                    code : code,
	                    statCtr : statCtr

	            })
	            .then(function (response){
	                
	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                    self.statReports = response.data.message;
	                }

	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        } else {
	        	this.statCtr =  3;
	        }
		}

	}

});
