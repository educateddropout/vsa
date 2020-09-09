


var rp = new Vue({

	el: '#encodingEx',

	data: {
		
		pageCounter : 4,
		userData : {},
		statReports : [],
		statCtr : 1,

		libRegions : [],
		libProvinces : [],
		libCities : [],
		libBarangay : [],

		areaAssignment : {
			region : { value : -1, error : ''},
			province : { value : -1, error : ''},
			city : { value : -1, error : ''},
			barangay : { value : -1, error : ''}
		},

        isLoadingFetching : false,
        isLoadingUpdating : false,

		showSelectBarangayArea : true,
		areaAssignedLabel : "",
		grievanceList : "",
        previousGrievanceList : "",

        selectedPage : 1,
        recordsCount : 10

	},

	mounted(){

		this.fetchLibRegions();


	},

    computed : {   

        computedGrievanceList(){

            return this.grievanceList.slice(((this.selectedPage - 1)*this.recordsCount),this.selectedPage * this.recordsCount);

        },

        hasChanges(){

            return !(JSON.stringify(this.grievanceList) == this.previousGrievanceList);

        },

        numberOfPages(){
            return Math.ceil(this.grievanceList.length / 10);
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
			this.areaAssignment.region.value = userData.regionCode;
			this.fetchLibProvinces(userData.regionCode);

		},

        resetGrievanceList(){

            this.grievanceList = JSON.parse(this.previousGrievanceList);

        },  

        selectPage(page){
            
            if(!(page < 1 || page > this.numberOfPages)) this.selectedPage = page;
            
        },

		closeSelectBarangayArea(){

        	this.showSelectBarangayArea = false;
        },

        selectAreaAssigned(areaAssignedLabel){
			this.showSelectBarangayArea = false;
			this.areaAssignedLabel = areaAssignedLabel;
            this.fetchEx01();
		},

		showAreaAssignedSelection(){
			this.showSelectBarangayArea = true;
			this.areaAssignedLabel = "";
		},

        toggleQ1(index){
            if(this.grievanceList[index].q_a_1 == 'Y') this.grievanceList[index].q_a_1 = 'N';
            else this.grievanceList[index].q_a_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ2(index){
            if(this.grievanceList[index].q_b_1 == 'Y') this.grievanceList[index].q_b_1 = 'N';
            else this.grievanceList[index].q_b_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ3(index){
            if(this.grievanceList[index].q_c_1 == 'Y') this.grievanceList[index].q_c_1 = 'N';
            else this.grievanceList[index].q_c_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ4(index){
            if(this.grievanceList[index].q_c_2 == 'Y') this.grievanceList[index].q_c_2 = 'N';
            else this.grievanceList[index].q_c_2 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ5(index){
            if(this.grievanceList[index].q_d_1 == 'Y') this.grievanceList[index].q_d_1 = 'N';
            else this.grievanceList[index].q_d_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ6(index){
            if(this.grievanceList[index].q_d_2 == 'Y') this.grievanceList[index].q_d_2 = 'N';
            else this.grievanceList[index].q_d_2 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ7(index){
            if(this.grievanceList[index].q_e_1 == 'Y') this.grievanceList[index].q_e_1 = 'N';
            else this.grievanceList[index].q_e_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ8(index){
            if(this.grievanceList[index].q_e_2 == 'Y') this.grievanceList[index].q_e_2 = 'N';
            else this.grievanceList[index].q_e_2 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ9(index){
            if(this.grievanceList[index].q_e_3 == 'Y') this.grievanceList[index].q_e_3 = 'N';
            else this.grievanceList[index].q_e_3 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ10(index){
            if(this.grievanceList[index].q_e_4 == 'Y') this.grievanceList[index].q_e_4 = 'N';
            else this.grievanceList[index].q_e_4 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ11(index){
            if(this.grievanceList[index].q_f_1 == 'Y') this.grievanceList[index].q_f_1 = 'N';
            else this.grievanceList[index].q_f_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ12(index){
            if(this.grievanceList[index].q_g_1 == 'Y') this.grievanceList[index].q_g_1 = 'N';
            else this.grievanceList[index].q_g_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ13(index){
            if(this.grievanceList[index].q_g_2 == 'Y') this.grievanceList[index].q_g_2 = 'N';
            else this.grievanceList[index].q_g_2 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        toggleQ14(index){
            if(this.grievanceList[index].q_h_1 == 'Y') this.grievanceList[index].q_h_1 = 'N';
            else this.grievanceList[index].q_h_1 = 'Y';

            this.grievanceList[index].final_rating = computeFinalRating(this.grievanceList[index]);
        },

        printEvaluationForm(){

            let self = this;


            axios.post('../php/api/printEvaluationForm.php',{
                g_list : JSON.parse(this.previousGrievanceList),
                g_type : "Exclusion Grievance Type 1 (Ex01)",
                regionName : this.libRegions.filter(prov => prov.region_code == this.areaAssignment.region.value)[0].region_name,
                provinceName : this.libProvinces.filter(prov => prov.province_code == this.areaAssignment.province.value)[0].province_name,
                cityName : this.libCities.filter(prov => prov.city_code == this.areaAssignment.city.value)[0].city_name,
                barangayName : this.libBarangay.filter(prov => prov.barangay_code == this.areaAssignment.barangay.value)[0].barangay_name
            })
            .then(function (response){
                
                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    var name = `CLEAN_WAITLISTED_REGION_${self.areaAssignment.barangay.value}`;
                    window.open('../php/api/downloadGeneratedFilePdf.php?path='+ response.data.message + '&name='+ name, '_blank');

                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        fetchEx01(){

            let self = this;
            this.isLoadingFetching = true;

            axios.post('../php/api/fetchEx01.php',{
                barangayCode : this.areaAssignment.barangay.value
            })
            .then(function (response){
                
                self.isLoadingFetching = false;
                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.grievanceList = response.data.message;
                    self.previousGrievanceList = JSON.stringify(response.data.message);

                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        updateGrievanceList(){

            let self = this;
            this.isLoadingUpdating = true;

            axios.post('../php/api/updateGrievanceList.php',{
                grievanceList : this.computedGrievanceList
            })
            .then(function (response){
                
                self.isLoadingUpdating = false;
                console.log(response.data);
                if(response.data.status == "SUCCESS"){

                    self.fetchEx01();

                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

		fetchLibProvinces(regionCode){
            let self = this;


            axios.get('../php/api/fetchLibProvinces.php',{
                params : {
                    region_code : regionCode
                }
            })
            .then(function (response){
                
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

        fullName(g){


            return g.last_name + ", " + g.first_name + " " + g.middle_name + " " + g.ext_name;


        },

	}

});

function computeFinalRating(grievance){

    let retVal = 0;

    if(grievance.q_a_1 == 'Y') retVal += 10;
    if(grievance.q_b_1 == 'Y') retVal += 5;
    if(grievance.q_c_1 == 'Y') retVal += 10;
    if(grievance.q_c_2 == 'Y') retVal += 10;
    if(grievance.q_d_1 == 'Y') retVal += 5;
    if(grievance.q_d_2 == 'Y') retVal += 5;
    if(grievance.q_e_1 == 'Y') retVal += 5;
    if(grievance.q_e_2 == 'Y') retVal += 5;
    if(grievance.q_e_3 == 'Y') retVal += 5;
    if(grievance.q_e_4 == 'Y') retVal += 5;
    if(grievance.q_f_1 == 'Y') retVal += 10;
    if(grievance.q_g_1 == 'Y') retVal += 10;
    if(grievance.q_g_2 == 'Y') retVal += 10;
    if(grievance.q_h_1 == 'Y') retVal += 5;

    return retVal;


}
