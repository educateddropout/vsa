Vue.component('divEr03View', {
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
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.province_code" @change="changeProvince" disabled>
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="province in libProvinces" :value="province.province_code">{{province.province_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help">Province</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.city_code" @change="changeCity" disabled>
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="city in libCities" :value="city.city_code">{{city.city_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" >City</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.barangay_code" >
                                                        <option :value='-1' disabled>Select dropdown</option>
                                                        <option v-for="barangay in libBarangay" :value="barangay.barangay_code">{{barangay.barangay_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" >Barangay</p>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="w3-row-padding">
                                            <div class="w3-half">
                                                 <div class="w3-row is-fullwidth">
                                                    <textarea class="textarea upperCase"
                                                        v-model="householdDetail.purok_sitio" rows="3"
                                                        maxlength="300"
                                                    ></textarea>
                                                </div>
                                                <p class="help" >Purok/Sitio</p>
                                            </div>
                                            <div class="w3-half">
                                                <div class="w3-row is-fullwidth">
                                                    <textarea class="textarea upperCase"
                                                        v-model="householdDetail.street_address" rows="3"
                                                        maxlength="300"
                                                    ></textarea>
                                                </div>
                                                <p class="help" >Street Address</p>
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
                                    <div class="w3-row w3-right">
                                        <button class="button is-outlined is-success" @click="openAddRosterModal"><i class="fas fa-plus-square"></i> &nbsp Add Household Roster</button>
                                    </div>
                                    <br>
                                    <br>
                                    <p class="w3-center has-text-danger is-size-5"> {{rosterError}}</p>
                                    <br>
                                    <br>
                                    <p><b>Household Type</b>: {{householdType}}</p>

                                    
                                    <div class="w3-row">
                                        <table class="table is-fullwidth w3-border w3-round is-striped" :class="{'w3-border-red': rosterError != ''}">
                                            <thead >
                                                <tr >
                                                    <th colspan="10" class="has-background-dark has-text-white-bis">Household Roster Detail</th>
                                                </tr>
                                                <tr class="has-background-grey has-text-white-bis">
                                                    <th >#</th>
                                                    <th >First Name</th>
                                                    <th >Middle Name</th>
                                                    <th >Last Name</th>
                                                    <th >Ext Name</th>
                                                    <th class="w3-center">Sex</th>
                                                    <th class="w3-center"> Birthday/Age </th>
                                                    <th ><abbr title="Relationship to Household Head">Rel HH</abbr></th>
                                                    <th class="w3-border-left">&nbsp</th>
                                                    <th class="w3-border-left">&nbsp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="roster,index in computedFamilyRoster" v-if="roster.archive != 1">
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
                                                    <td class="w3-border-left w3-center has-text-link pointer" @click="openUpdateRosterModal(roster.id)"><i class="fas fa-edit"></i></td>
                                                    <th class="w3-border-left w3-center has-text-danger pointer" @click="deleteRoster(roster.id)"><i class="fas fa-trash-alt"></i></th>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="w3-col l1" >&nbsp</div>
                            
                            

                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="modal-button-close button is-success" @click="saveChanges">Save changes</button>
                        <button class="modal-button-close button" @click="toggleHouseholdDetail">Cancel</button>
                    </footer>
                </div>
            </div>

            <roster-form
                :show-roster-update-modal="showRosterUpdateModal"
                :roster-to-update = "rosterToUpdate"
                :household-roster = "householdRoster"
                :selected-roster = "selectedRoster"
                :is-add-roster = "isAddRoster"
                :household-head-count = "householdHeadCount"
                :current-max-fn="currentMaxFn"

                @close-update-roster-modal = "closeUpdateRosterModal"
                @update-roster = "updateRoster"
                @add-roster = "addRoster"
            >
            </roster-form>

        </div>

	`,

    data(){
        return {

            libProvinces : [],
            libCities : [],
            libBarangay : [],

            tr08UpdatingError : '',
            showRosterUpdateModal : false,
            isAddRoster : true,

            rosterToUpdate : {
                id : '',
                archive : 0, // means active
                firstName : { value : '', error : '' },
                middleName : { value : '', error : '' },
                lastName : { value : '', error : '' },
                extName : { value : '', error : '' },
                birthdayAge : {
                    birthday_checkbox : false,
                    age_checkbox : false,
                    birthMonth : { value : '', error : ''  },
                    birthDay : { value : '', error : '' },
                    birthYear : { value : '', error : '' },
                    age : { value : '', error : '' },
                    error : ''
                },
                sex : { value : '-1', error : '' },
                pregnant : { value : '-1', error : '' },
                maritalStatus : { value : '-1', error : '' },
                soloParent : { value : '-1', error : '' },
                relHH : {  value : '-1', error : '' },
                relFH : { value : '-1', error : '' },
                familyNumber : { value : '-1', error : '' },
                attendingSchool : { value : '-1', error : '' },
                highestEducationAttained : { value : '-1', error : '' },
                seeing : { value : '-1', error : '' },
                hearing : { value : '-1', error : '' },
                walking : {  value : '-1',  error : '' },
                remembering : { value : '-1', error : '' },
                caring : { value : '-1', error : '' },
                communicating : { value : '-1', error : '' },
                employment : { value : '-1', error : '' },
                occupationEnumerator : { value : '', error : '' },
                occupationAreaSupervisor : { value : '', error : '' },
                psoc : { value : '', error : '' },
                classOfWorker : { value : '-1', error : '' },
                basisOfPayment : { value : '-1', error : '' },
                natureOfEmployment : { value : '-1', error : '' },
                overseas : { value : '-1', error : '' },
                ofi : { value : '-1', error : '' },
                sendingMoney : { value : '-1', error : '' },
                howOften : { value : '-1', error : '' },
                hasError : false
            },

            householdDetailError : {
                street_address : "",
                purok_sitio : ""
            },

            selectedRoster : 0,

            householdType : "",
            rosterError : ""

        }

    },

    computed : {

        computedFamilyRoster(){

            return this.householdRoster.filter(roster => roster.archive != 1);

        },

        householdHeadCount(){

            return this.computedFamilyRoster.filter((roster, index) => roster.relHH.value == 1  && index != this.selectedRow).length;

        },

        currentMaxFn(){
            let retVal = 0;

            if(this.computedFamilyRoster.length == 0) retVal = 0;
            else{
                this.computedFamilyRoster.forEach(function(roster){

                    if(roster.familyNumber.value > retVal ) retVal = roster.familyNumber.value;

                });
            }

            return retVal;
        }

    },

    watch : {

        householdRoster(){

            var self = this;

            this.householdRoster.forEach(function(roster){

                if(roster.id >= self.highestRosterId){
                    self.highestRosterId = roster.id;
                }

            });

            this.householdType = getHouseholdType(this.computedFamilyRoster);
            this.rosterError = validateRosters(this.computedFamilyRoster, this.pageIndicator);
            
        }

    },

	methods: {

        toggleHouseholdDetail(){
            this.$emit('toggle-household-detail');

        },

        saveChanges(){
            this.$emit('save-changes');
        },

        saveComplaintDetails(){

            this.tr08UpdatingError = validateTr08Changes(this.origHouseholdDetail, this.householdDetail);
            if(this.tr08UpdatingError == ""){
                this.$emit('save-complaint-details');
            }

        },

        openAddRosterModal(){

            this.isAddRoster = true;
            this.rosterToUpdate = {
                id : '',
                archive : 0, // means active
                firstName : { value : '', error : '' },
                middleName : { value : '', error : '' },
                lastName : { value : '', error : '' },
                extName : { value : '', error : '' },
                birthdayAge : {
                    birthday_checkbox : false,
                    age_checkbox : false,
                    birthMonth : { value : '', error : ''  },
                    birthDay : { value : '', error : '' },
                    birthYear : { value : '', error : '' },
                    age : { value : '', error : '' },
                    error : ''
                },
                sex : { value : '-1', error : '' },
                pregnant : { value : '-1', error : '' },
                maritalStatus : { value : '-1', error : '' },
                soloParent : { value : '-1', error : '' },
                relHH : {  value : '-1', error : '' },
                relFH : { value : '-1', error : '' },
                familyNumber : { value : '-1', error : '' },
                attendingSchool : { value : '-1', error : '' },
                highestEducationAttained : { value : '-1', error : '' },
                seeing : { value : '-1', error : '' },
                hearing : { value : '-1', error : '' },
                walking : {  value : '-1',  error : '' },
                remembering : { value : '-1', error : '' },
                caring : { value : '-1', error : '' },
                communicating : { value : '-1', error : '' },
                employment : { value : '-1', error : '' },
                occupationEnumerator : { value : '', error : '' },
                occupationAreaSupervisor : { value : '', error : '' },
                psoc : { value : '', error : '' },
                classOfWorker : { value : '-1', error : '' },
                basisOfPayment : { value : '-1', error : '' },
                natureOfEmployment : { value : '-1', error : '' },
                overseas : { value : '-1', error : '' },
                ofi : { value : '-1', error : '' },
                sendingMoney : { value : '-1', error : '' },
                howOften : { value : '-1', error : '' },
                hasError : false
            };
            this.showRosterUpdateModal = true;
        },

        openUpdateRosterModal(id){

            this.isAddRoster = false;
            
            this.selectedRoster = this.householdRoster.findIndex(roster => roster.id === id);

            this.rosterToUpdate = _.cloneDeep(this.householdRoster[this.householdRoster.findIndex(roster => roster.id === id)]);

            this.showRosterUpdateModal = true;
        },

        closeUpdateRosterModal(){
            this.showRosterUpdateModal = false;
        },

        updateRoster(){
            
            if(this.rosterToUpdate.archive != 3) this.rosterToUpdate.archive = 2; // updated 

            Vue.set(this.householdRoster, this.selectedRoster, this.rosterToUpdate)
            //this.householdRoster[this.selectedRoster] = this.rosterToUpdate;
            this.closeUpdateRosterModal();

        },

        addRoster(){

            this.rosterToUpdate.archive = 3; //added
            this.rosterToUpdate.id = this.householdRoster.length;
            this.householdRoster.push(this.rosterToUpdate);
            this.closeUpdateRosterModal();

        },

        deleteRoster(id){
            
            let index = this.householdRoster.findIndex(roster => roster.id === id);

            //pull the roster data
            let roster = this.householdRoster[index];

            // change roster archive to 1 = deleted
            roster.archive = 1;

            // replace the current data to the new updated roster data
            Vue.set(this.householdRoster, index, roster);

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

        },

        changeCity(){

            this.householdDetail.barangay_code = -1;
            this.fetchLibBarangay(this.householdDetail.city_code);

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

        }

	}


});