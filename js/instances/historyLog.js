


var rp = new Vue({

	el: '#historyLog',

	data: {
		
		pageCounter : 5,
		userData : {},
		regionCode : "",

		listOfGrievance : [],
		loadingUnsync : true,

		modalMessageSyncing : "",
		modalSyncingIsError : false,
		c1 : true,
		searchInput : "",

		selectedPage : 1,
        recordsCount : 15
		
	},

	mounted(){

		this.fetchGrievances();
	
	},

	computed : {

		filteredG(){

            return this.listOfGrievance.filter(p => {

                let searchHash = p.g_id + p.last_name + p.first_name + p.middle_name;

                return searchHash.toUpperCase().includes(this.searchInput.toUpperCase());

            });
            
        },

        computedG(){

            return this.filteredG.slice(((this.selectedPage - 1)*this.recordsCount),this.selectedPage * this.recordsCount);

        },

        numberOfPages(){
            return Math.ceil(this.filteredG.length / 10);
        },

        middlePage1(){
            let retVal = 0;
            if(this.selectedPage == 1) retVal = 2;
            else if(this.selectedPage == this.numberOfPages){
                retVal = this.selectedPage - 3;
                if(this.numberOfPages == 4) retVal = this.selectedPage - 2;
                if(this.numberOfPages == 3) retVal = this.selectedPage - 1;
            }
            else {
                retVal = this.selectedPage - 1;
                if(retVal == 1){
                    retVal = this.selectedPage;
                }  
            } 

            return retVal;
        },

        middlePage2(){
            let retVal = 0;

            if(this.selectedPage == 1 || this.selectedPage == 2) retVal = this.middlePage1 + 1;
            else if(this.selectedPage == this.numberOfPages){
                retVal = this.selectedPage - 2;
                if(this.numberOfPages == 4) retVal = this.selectedPage - 1;
            }
            else{
                retVal = this.selectedPage;

            } 

            return retVal;
        },

        middlePage3(){
            let retVal = 0;

            if(this.selectedPage == 1 || this.selectedPage == 2) retVal = this.middlePage1 + 2;
            else if(this.selectedPage == this.numberOfPages){
                retVal = this.selectedPage - 1;
            }
            else{
                retVal = this.selectedPage + 1;
            }

            return retVal;
        }

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;
			this.regionCode = userData.regionCode;

		},

		selectPage(page){
            
            if(!(page < 1 || page > this.numberOfPages)) this.selectedPage = page;
            
        },

		toggleSevenDays(){

			let self = this;

			this.$nextTick(() => {

				self.fetchGrievances();

			});

		},

		fetchGrievances(ctr){

			let self = this;

			axios.post('../php/api/fetchGrievanceByDate.php',{
				sevenDaysCtr : this.c1 ? 1 : 0
			})
            .then(function (response){
            	
            	console.log(response.data);

            	self.loadingUnsync = false;
            	if(response.data.status == "SUCCESS"){
            		self.listOfGrievance = response.data.message
            		
            	}

            })
            .catch(function (error) {
                console.log(error);
            });

		},


		grievanceType(index){
			let retVal = "General Inquiry";

			if(index == 2) retVal = "EX01";
			else if(index == 3) retVal = "EX02";
			else if(index == 4) retVal = "INC01";
			else if(index == 5) retVal = "INC02";
			else if(index == 6) retVal = "ER01";
			else if(index == 7) retVal = "ER03";
			else if(index == 8) retVal = "TR01";

			return retVal;

		}

	}

});
