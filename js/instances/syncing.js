


var rp = new Vue({

	el: '#syncing',

	data: {
		
		pageCounter : 3,
		userData : {},
		regionCode : "",

		listOfUnsync : [],
		loadingUnsync : true,

		modalMessageSyncing : "",
		modalSyncingIsError : false
		
	},

	mounted(){

		this.fetchUnsycGrievances();
	
	},

	computed : {

		isCheckAll(){

			retVal = true;

			this.listOfUnsync.forEach(list =>  {

				if(!list.isChecked)
					retVal = false;
			});

			return retVal;

		}

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;
			this.regionCode = userData.regionCode;

		},

		syncGrievance(){

			let hasCheckedForSyncing = false;
			let self = this;
			let totalSync = 0;

			let listToSync = this.listOfUnsync.filter(list =>  list.isChecked == true);

			if(listToSync.length > 0){
				this.modalSyncingIsError = false;
				
				this.modalMessageSyncing = "Syncing. Please Wait!...";

				listToSync.forEach((list,index) => {

					self.modalMessageSyncing = "Syncing " + (index+1) + " out of " + listToSync.length  + " Grievance/s. Please wait!...";
					//console.log(index);
					
					axios.post('../php/api/syncGrievances.php', {
						grievanceId : list.uuid,
						grievanceType : list.complaint_type
					})
		            .then(function (response){
		            	
		            	console.log(response.data);

		            	totalSync++;
		            	/*self.loadingUnsync = false;
		            	if(response.data.status == "SUCCESS"){
		            		self.listOfUnsync = response.data.message.unSync.map(v => ({...v, isChecked: false}));
		            	}*/

		            })
		            .catch(function (error) { 
		                console.log(error);
		            });


		            self.modalMessageSyncing = "Successfully Synced " + listToSync.length + " out of " + listToSync.length + " .";

				});

				

			} else {
				this.modalMessageSyncing = "Should have atleast 1 grievance to sync.";
				this.modalSyncingIsError = true;
			}

		},

		closeSyncingMessage(){

			this.fetchUnsycGrievances();
			this.modalMessageSyncing = "";

		},

		fetchUnsycGrievances(){

			let self = this;

			axios.get('../php/api/fetchUnsync.php')
            .then(function (response){
            	
            	console.log(response.data);

            	self.loadingUnsync = false;
            	if(response.data.status == "SUCCESS"){
            		self.listOfUnsync = response.data.message.unSync.map(v => ({...v, isChecked: false}));
            		
            	}

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		toggleCheckAll(){

			if(this.isCheckAll == false){
				this.listOfUnsync.forEach(list => (list.isChecked = true));
			} else {
				this.listOfUnsync.forEach(list => (list.isChecked = false));
			}

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
