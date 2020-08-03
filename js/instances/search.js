


var sc = new Vue({

	el: '#search',

	data: {
		
		showSelectBarangayArea : true,
		pageCounter : 1,
		stepCounter : 1,
		userData : {},
		search : {
			firstName : { value : '', error : ''},
			middleName : { value : '', error : ''},
			lastName : { value : '', error : ''},
		},

		libRegions : [],
		libProvinces : [],
		libCities : [],
		libBarangay : [],
		grievanceList : [],
		
		hasSelectedMatch : true,
		areaAssignment : {
			region : { value : -1, error : ''},
			province : { value : -1, error : ''},
			city : { value : -1, error : ''},
			barangay : { value : -1, error : ''}
		},
		areaAssignedLabel : "",
		generalInfo : {
			firstName : { value : '', error : ''},
			lastName : { value : '', error : ''},
			middleName : { value : '', error : ''},
			extName : { value : '', error : ''},
			sex : { value : -1, error : ''},
			dateOfBirthYYYY : { value : '', error : ''},
			dateOfBirthMM : { value : '', error : ''},
			dateOfBirthDD : { value : '', error : ''},
			birthday : { value : '', error : ''},
			contactNumber : { value : '', error : ''},
			emailAddress : { value : '', error : ''},
			idPresented : { value : -1, error : ''},
			typeOfComplaint : { value : 1, error : ''},
			region : { value : -1, error : ''},
			province : { value : -1, error : ''},
			city : { value : -1, error : ''},
			barangay : { value : -1, error : ''},
			purokSitio : { value : '', error : ''},
			streetAddress : { value : '', error : ''},
			selectedHHID : { value : -1, error : ''},
			remarks : { value : "", error : ''}
		},
		
		searchNamesList : [],
		listOfSearchedNames : [],
		householdDetail : {},
		householdRoster : [],

		timer : 0,
		t : '',
		count : 0,

		isShowHouseholdDetailModal : false,
		isShowLoadingModal : false,
		isShowStepFooter : false
		
	},

	mounted(){

		this.fetchLibRegions();
		this.fetchGrievanceByUser();
	
	},

	methods: {

		toggleStepFooter(){
			if(this.isShowStepFooter){
                this.isShowStepFooter = false;
            } 
            else{
                this.isShowStepFooter = true;
            }
		},


		copyUserData(userData){

			this.userData = userData;
			this.areaAssignment.region.value = userData.regionCode;
			this.generalInfo.region.value = userData.regionCode;
			this.fetchLibProvinces(userData.regionCode);


		},

		fetchLibProvinces(regionCode){
            let self = this;

            axios.get('../php/api/fetchLibProvinces.php',{
                params : {
                    region_code : regionCode
                }
            })
            .then(function (response){
                
                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.libProvinces = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        

        fetchLibCities(provinceCode){

            let self = this;

            axios.get('../php/api/fetchLibCities.php',{
                params : {
                    province_code : provinceCode
                }
            })
            .then(function (response){
                
                if(response.data.status == "SUCCESS"){
                    self.libCities = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        fetchLibBarangay(cityCode){

            let self = this;

            axios.get('../php/api/fetchLibBarangay.php',{
                params : {
                    city_code : cityCode
                }
            })
            .then(function (response){
                
                if(response.data.status == "SUCCESS"){
                    self.libBarangay = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        closeSelectBarangayArea(){

        	this.showSelectBarangayArea = false;
        	this.toggleStepFooter();

        },

		showAreaAssignedSelection(){
			this.showSelectBarangayArea = true;
			this.areaAssignedLabel = "";
			this.toggleStepFooter();
		},

		selectAreaAssigned(areaAssignedLabel){
			this.showSelectBarangayArea = false;
			this.areaAssignedLabel = areaAssignedLabel;
		},

		clearSearchData(){

			this.search = {
				firstName : { value : '', error : ''},
				middleName : { value : '', error : ''},
				lastName : { value : '', error : ''},
			};

		},

		matchHousehold(){

			this.hideHouseholdDetail();
			this.searchNamesList = [];

			this.listOfSearchedNames[this.listOfSearchedNames.length - 1].isMatch = 1;
			this.listOfSearchedNames[this.listOfSearchedNames.length - 1].hhid = this.householdDetail.hh_id;
			this.listOfSearchedNames[this.listOfSearchedNames.length - 1].poorStatus = this.householdDetail.poor;

			this.hasSelectedMatch = true;
			this.clearSearchData();

		},

		noMatchHousehold(){

			this.searchNamesList = [];
			this.listOfSearchedNames[this.listOfSearchedNames.length - 1].isMatch = -1;
			this.listOfSearchedNames[this.listOfSearchedNames.length - 1].hhid = "";
			this.listOfSearchedNames[this.listOfSearchedNames.length - 1].poorStatus = -1;

			this.hasSelectedMatch = true;
			this.clearSearchData();

		},

		hideHouseholdDetail(){

			this.isShowHouseholdDetailModal = false;
			this.toggleStepFooter();

		},

		hideLoadingModal(){
			this.isShowLoadingModal = false;
			this.count = 0;
		},

		getHouseholdDetail(hhid){

			let self = this;

			axios.post('../php/api/fetchHouseholdDetail.php',{
                
                hhid : hhid,
                
            })
            .then(function (response){

            	console.log(response.data);
            	if(response.data.status == "SUCCESS"){
            		self.householdDetail = response.data.message.householdDetail[0];
            		self.householdRoster = response.data.message.rosterDetail;
            		self.isShowHouseholdDetailModal = true;
            		self.toggleStepFooter();
            	}

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		moveToStep(stepNumber){

			this.stepCounter = stepNumber;

			this.sex = { value : -1, error : ''};

			
			this.generalInfo.dateOfBirthYYYY = { value : '', error : ''};
			this.generalInfo.dateOfBirthMM = { value : '', error : ''};
			this.generalInfo.dateOfBirthDD = { value : '', error : ''};
			this.generalInfo.birthday = { value : '', error : ''};
			this.generalInfo.contactNumber = { value : '', error : ''};
			this.generalInfo.emailAddress = { value : '', error : ''};
			this.generalInfo.idPresented = { value : -1, error : ''};
			this.generalInfo.typeOfComplaint = { value : 1, error : ''};
			this.generalInfo.region = { value : -1, error : ''};
			this.generalInfo.province = { value : -1, error : ''};
			this.generalInfo.city = { value : -1, error : ''};
			this.generalInfo.barangay = { value : -1, error : ''};
			this.generalInfo.purokSitio = { value : '', error : ''};
			this.generalInfo.streetAddress = { value : '', error : ''};
			this.generalInfo.selectedHHID = { value : -1, error : ''};
			this.generalInfo.remarks = { value : "", error : ''};

			if(stepNumber == 1){

				this.searchNamesList = [];
				this.listOfSearchedNames = [];
				this.householdDetail = {};
				this.householdRoster = [];
			}

		},

		moveToSearch(){
			
			this.stepCounter = 2;

		},

		moveToComplaintForm(){

			this.stepCounter = 3;
			this.generalInfo.region.value = this.areaAssignment.region.value;
			this.generalInfo.province.value = this.areaAssignment.province.value;
			this.generalInfo.city.value = this.areaAssignment.city.value;
			this.generalInfo.barangay.value = this.areaAssignment.barangay.value;

		},

		resetPage(){

			this.generalInfo = {
				firstName : { value : '', error : ''},
				lastName : { value : '', error : ''},
				middleName : { value : '', error : ''},
				extName : { value : '', error : ''},
				sex : { value : -1, error : ''},
				dateOfBirthYYYY : { value : '', error : ''},
				dateOfBirthMM : { value : '', error : ''},
				dateOfBirthDD : { value : '', error : ''},
				birthday : { value : '', error : ''},
				contactNumber : { value : '', error : ''},
				emailAddress : { value : '', error : ''},
				idPresented : { value : -1, error : ''},
				typeOfComplaint : { value : 1, error : ''},
				region : { value : -1, error : ''},
				province : { value : -1, error : ''},
				city : { value : -1, error : ''},
				barangay : { value : -1, error : ''},
				purokSitio : { value : '', error : ''},
				streetAddress : { value : '', error : ''},
				selectedHHID : { value : -1, error : ''},
				remarks : { value : "", error : ''}
			};

			this.listOfSearchedNames = [];
			this.householdDetail = {};
			this.householdRoster = [];
			this.stepCounter = 1;
			this.fetchGrievanceByUser();

		},

		searchNames(){
			
			var self = this;
			let searchedName = {
				firstName : this.search.firstName.value.toUpperCase(),
                middleName : this.search.middleName.value.toUpperCase(),
                lastName : this.search.lastName.value.toUpperCase(),
                isMatch : 0 // neutral
			}

			this.isShowLoadingModal = true;
			this.startCount();
			this.hasSelectedMatch = false;
			this.listOfSearchedNames.push(searchedName);

			axios.post('../php/api/searchNames.php',{
            
                firstName : this.search.firstName.value.toUpperCase(),
                middleName : this.search.middleName.value.toUpperCase(),
                lastName : this.search.lastName.value.toUpperCase()

                
            })
            .then(function (response){
            	
            	if(response.data.status == "SUCCESS"){
            		self.searchNamesList = response.data.message;
            		self.stopCount();
            		self.count = 100;

            		if(response.data.message.length == 0){
            			self.noMatchHousehold();
            		}
            	}

            })
            .catch(function (error) {
                console.log(error);
            });

		},


		timedCount() {

			let self = this;

			if(this.count < 100){
				this.count = this.count + 1;
				this.t = setTimeout( self.timedCount, 1000);
			}

		},

		startCount() {

			if (!this.timer) {
				this.timer = 1;
				this.timedCount();
			}
		},

		stopCount() {

			clearTimeout(this.t);
			this.timer = 0;

		},


        fetchLibRegions(){

            let self = this;

            axios.get('../php/api/fetchLibRegions.php')
            .then(function (response){

                if(response.data.status == "SUCCESS"){
                    self.libRegions = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        fetchGrievanceByUser(hhid){

			let self = this;

			axios.post('../php/api/fetchGrievanceByUser.php',{
                
            })
            .then(function (response){

            	console.log(response.data);
            	if(response.data.status == "SUCCESS"){
            		self.grievanceList = response.data.message;
            	}

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		complainantName(firstName, middleName, lastName, extName){

            fName = firstName.trim().length > 0 ? `${firstName.trim()} ` : "";
            mName = middleName.trim().length > 0 ? `${middleName.trim()} ` : "";
            lName = lastName.trim().length > 0 ? `${lastName.trim()} ` : "";
            eName = extName.trim().length > 0 ? `${extName.trim()} ` : "";

            return `${fName}${mName}${lName}${eName}`;

        },

        grievanceType(input){

        	let retVal = 'General Inquiry';
        	if(input == 2) retVal = "EX01";
        	else if(input == 3) retVal = "EX02";
        	else if(input == 4) retVal = "INC01";
        	else if(input == 5) retVal = "INC02";
        	else if(input == 6) retVal = "ER01";
        	else if(input == 7) retVal = "ER03";
        	else if(input == 8) retVal = "TR01";

        	return retVal;
        }

	}

});


function extNameSelection(){

    return [
                { 'label' : '', 'value' : '' },
                { 'label' : 'SR', 'value' : 'SR' }, 
                { 'label' : 'JR', 'value' : 'JR' },
                { 'label' : 'I', 'value' : 'I' },
                { 'label' : 'II', 'value' : 'II' },
                { 'label' : 'III', 'value' : 'III' },
                { 'label' : 'IV', 'value' : 'IV' },
                { 'label' : 'V', 'value' : 'V' },
                { 'label' : 'VI', 'value' : 'VI' },
                { 'label' : 'VII', 'value' : 'VII' },
                { 'label' : 'VIII', 'value' : 'VIII' },
                { 'label' : 'IX', 'value' : 'IX' },
                { 'label' : 'X', 'value' : 'X' }
            ];

}

