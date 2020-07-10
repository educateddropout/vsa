Vue.component('divTr08View', {
	props: ['householdDetail', 'householdRoster','origHouseholdDetail','origHouseholdRoster', 'libRegions', 'isShowHouseholdDetailModal'],
	template: `
        <div>
            <div id="modal-id" class="modal modal-fx-slideRight modal-full-screen"  :class="{ 'is-active' : isShowHouseholdDetailModal}" >
                <div class="modal-content modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Household Details</p>
                        <button class=" delete" @click="toggleHouseholdDetail"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="w3-row">
                            <div class="w3-col l1" >&nbsp</div>
                            <div class="w3-col l10">
                                <div class="w3-row w3-container">
                                    <div class="w3-row">
                                        <div class="w3-row">
                                            <p><label><strong> Household ID :</strong></label> {{householdDetail.hh_id}}</p>
                                        </div>
                                        <br>

                                        <div class="w3-row w3-container">
                                            <label class="label is-size-4">Address</label>
                                        </div>
                                        <div class="w3-row-padding">
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.region_code" disabled>
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="region in libRegions" :value="region.region_code">{{region.region_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" >Region</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" :class="{'is-danger':householdDetailError.province != ''}">
                                                    <select v-model="householdDetail.province_code" @change="changeProvince" >
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="province in libProvinces" :value="province.province_code">{{province.province_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" :class="{'is-danger':householdDetailError.province != ''}">Province</p>
                                                <p class="help is-danger">{{householdDetailError.province}}</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" :class="{'is-danger':householdDetailError.city != ''}">
                                                    <select v-model="householdDetail.city_code" @change="changeCity" >
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="city in libCities" :value="city.city_code">{{city.city_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" :class="{'is-danger':householdDetailError.city != ''}">City</p>
                                                <p class="help is-danger">{{householdDetailError.city}}</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" :class="{'is-danger':householdDetailError.barangay != ''}">
                                                    <select v-model="householdDetail.barangay_code" @change="validateBarangay">
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="barangay in libBarangay" :value="barangay.barangay_code">{{barangay.barangay_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" :class="{'is-danger':householdDetailError.barangay != ''}">Barangay</p>
                                                <p class="help is-danger">{{householdDetailError.barangay}}</p>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="w3-row-padding">
                                            <div class="w3-half">
                                                 <div class="w3-row is-fullwidth">
                                                    <textarea class="textarea upperCase"
                                                        v-model="householdDetail.purok_sitio" rows="3"
                                                        maxlength="300"
                                                        :class="{'is-danger':householdDetailError.purok_sitio != ''}"
                                                        @blur = "validatePurokSitio"
                                                    ></textarea>
                                                </div>
                                                <p class="help" :class="{'is-danger':householdDetailError.purok_sitio != ''}">Purok/Sitio</p>
                                                <p class="help" :class="{'is-danger':householdDetailError.purok_sitio != ''}" >{{householdDetailError.purok_sitio}}</p>
                                            </div>
                                            <div class="w3-half">
                                                <div class="w3-row is-fullwidth">
                                                    <textarea class="textarea upperCase"
                                                        v-model="householdDetail.street_address" rows="3"
                                                        maxlength="300"
                                                        :class="{'is-danger':householdDetailError.street_address != ''}"
                                                        @blur = "validateStreetAddress"
                                                    ></textarea>
                                                </div>
                                                <p class="help" :class="{'is-danger':householdDetailError.street_address != ''}">Street Address</p>
                                                <p class="help" :class="{'is-danger':householdDetailError.street_address != ''}" >{{householdDetailError.street_address}}</p>
                                            
                                            </div>
                                        </div>

                                        <br>
                                        <div class="w3-row">

                                            <p>
                                                <label><strong> Classification Status :</strong></label> 
                                                <span v-if="householdDetail.poor == 1" class="has-text-danger">POOR</span>
                                                <span v-else="" class="has-text-success">NON-POOR</span>
                                            </p>

                                        </div>
                                    </div>
                                    <br>
                                    <br>
                                    
                                    <div class="w3-row">
                                        <table class="table is-fullwidth w3-border w3-round is-striped">
                                            <thead >
                                                <tr >
                                                    <th colspan="8" class="has-background-dark has-text-white-bis">Household Roster Detail</th>
                                                </tr>
                                                <tr class="has-background-grey has-text-white-bis">
                                                    <th >#</th>
                                                    <th >First Name</th>
                                                    <th >Middle Name</th>
                                                    <th >Last Name</th>
                                                    <th >Ext Name</th>
                                                    <th >Sex</th>
                                                    <th >Birthday</th>
                                                    <th ><abbr title="Relationship to Household Head">Rel HH</abbr></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="roster,index in householdRoster">
                                                    <td>{{index+1}}</td>
                                                    <td>{{roster.firstName.value}}</td>
                                                    <td>{{roster.middleName.value}}</td>
                                                    <td>{{roster.lastName.value}}</td>
                                                    <td>{{roster.extName.value}}</td>
                                                    <td class="w3-center">
                                                        <span v-if="roster.sex.value == 'M'" class="w3-text-blue"><i class="fas fa-male fa-2x"></i></span>
                                                        <span v-else-if="roster.sex.value == 'F'" class="w3-text-pink"><i class="fas fa-female fa-2x"></i></span>
                                                    </td>
                                                    <td class="w3-center">
                                                        <span v-if="roster.birthdayAge.birthdayCheckbox">{{birthDate(roster.birthdayAge.birthMonth.value,roster.birthdayAge.birthDay.value,roster.birthdayAge.birthYear.value)}}</span>
                                                        <span v-else="">{{roster.birthdayAge.age.value}}</span>
                                                        
                                                    </td>
                                                    <td>{{defineRelHH(roster.relHH.value)}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br>
                                <div class="w3-row w3-container">
                                    <span><button class="button is-info is-outlined w3-right" @click="saveComplaintDetails"  > <i class="fas fa-save"></i> &nbsp Save </button></span>
                                </div>
                            </div>
                            <div class="w3-col l1" >&nbsp</div>
                            
                            <div class="modal" :class="{'is-active':tr08UpdatingError != ''}">
                                <div class="modal-background" @click="removeErrorMessage"></div>
                                <div class="modal-content box">
                                    
                                    <div class="w3-row has-text-danger">
                                        {{this.tr08UpdatingError}}
                                    </div>

                                </div>
                                <button class="modal-close is-large" aria-label="close" @click="removeErrorMessage"></button>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="modal-button-close button is-success" @click="saveChanges">Save changes</button>
                        <button class="modal-button-close button" @click="toggleHouseholdDetail">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>

	`,

    data(){
        return {

            libProvinces : [],
            libCities : [],
            libBarangay : [],
            

            tr08UpdatingError : '',
            householdDetailError : {
                street_address : "",
                purok_sitio : "",
                province : "",
                city : "",
                barangay : ""
            },

        }

    },

	methods: {

        toggleHouseholdDetail(){
            this.$emit('toggle-household-detail');

        },

        saveChanges(){
            this.$emit('save-changes');
        },

        removeErrorMessage(){

            this.tr08UpdatingError = "";

        },

        saveComplaintDetails(){

            this.tr08UpdatingError = validateTr08Changes(this.origHouseholdDetail, this.householdDetail);
            this.validateStreetAddress();
            this.validatePurokSitio();

            if(this.tr08UpdatingError == "" && this.householdDetailError.purok_sitio == "" && this.householdDetailError.street_address == ""){
                this.$emit('save-complaint-details');
            }

        },

        birthDate(mm,dd,yyyy){

            return mm + "/" + dd + "/" + yyyy;
        },

        defineRelHH(relHH){

            let retVal = "";
            
            if(relHH == "1") retVal = "1 - Household Head";
            else if(relHH == "2") retVal = "2 - Spouse";
            else if(relHH == "3") retVal = "3 - Son/Daughter";
            else if(relHH == "4") retVal = "4 - Brother/Sister";
            else if(relHH == "5") retVal = "5 - Son-in-law/Daughter-in-law";
            else if(relHH == "6") retVal = "6 - Grandson/Granddaughter";
            else if(relHH == "7") retVal = "7 - Father/Mother";
            else if(relHH == "8") retVal = "8 - Other relative";
            else if(relHH == "9") retVal = "9 - Boarder";
            else if(relHH == "10") retVal = "10 - Domestic helper";
            else if(relHH == "11") retVal = "11 - Non-relative";

            return retVal;
        },

        changeProvince(){

            this.householdDetail.city_code = -1;
            this.householdDetail.barangay_code = -1;
            this.fetchLibCities(this.householdDetail.province_code);
            this.validateProvince();
        },

        changeCity(){

            this.householdDetail.barangay_code = -1;
            this.fetchLibBarangay(this.householdDetail.city_code);
            this.validateCity();

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

        validatePurokSitio(){

            this.householdDetailError.purok_sitio = validateName(this.householdDetail.purok_sitio,'PUROKSITIO');

        },

        validateStreetAddress(){

            this.householdDetailError.street_address = validateName(this.householdDetail.street_address,'STREETADDRESS');

        },

        validateProvince(){

            this.householdDetailError.province = validateSelection(this.householdDetail.province_code);
        },

        validateCity(){

            this.householdDetailError.city = validateSelection(this.householdDetail.city_code);
        },

        validateBarangay(){

            this.householdDetailError.barangay = validateSelection(this.householdDetail.barangay_code);
        }

	}


});