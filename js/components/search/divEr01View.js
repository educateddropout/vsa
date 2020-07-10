Vue.component('divEr01View', {
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
                                                        <option :value='-1'>Select dropdown</option>
                                                        <option v-for="region in libRegions" :value="region.region_code">{{region.region_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" >Region</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.province_code" disabled>
                                                        <option :value='-1'>Select dropdown</option>
                                                        <option :value="householdDetail.province_code">{{householdDetail.province_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help">Province</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.city_code" disabled>
                                                        <option :value='-1'>Select dropdown</option>
                                                        <option :value="householdDetail.city_code">{{householdDetail.city_name}}</option>
                                                    </select>
                                                </div>
                                                <p class="help" >City</p>
                                            </div>
                                            <div class="w3-quarter">
                                                <div class="select is-fullwidth" >
                                                    <select v-model="householdDetail.barangay_code" disabled>
                                                        <option :value='-1'>Select dropdown</option>
                                                        <option :value="householdDetail.barangay_code">{{householdDetail.barangay_name}}</option>
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
                                                        maxlength="300" @change="validatePurokSitio"
                                                        :class="{'is-danger':householdDetailError.purok_sitio != ''}"
                                                    ></textarea>
                                                </div>
                                                <p class="help" >Purok/Sitio</p>
                                                <p class="help" :class="{'is-danger':householdDetailError.purok_sitio != ''}" >{{householdDetailError.purok_sitio}}</p>
                                            
                                            </div>
                                            <div class="w3-half">
                                                <div class="w3-row is-fullwidth">
                                                    <textarea class="textarea upperCase"
                                                        v-model="householdDetail.street_address" rows="3"
                                                        maxlength="300" @change="validateStreetAddress"
                                                        :class="{'is-danger':householdDetailError.street_address != ''}"
                                                    ></textarea>
                                                </div>
                                                <p class="help" >Street Address</p>
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
                                                    <th colspan="9" class="has-background-dark has-text-white-bis">Household Roster Detail</th>
                                                </tr>
                                                <tr class="has-background-grey has-text-white-bis">
                                                    <th >#</th>
                                                    <th >First Name</th>
                                                    <th >Middle Name</th>
                                                    <th >Last Name</th>
                                                    <th >Ext Name</th>
                                                    <th class="w3-center">Sex</th>
                                                    <th >Birthday</th>
                                                    <th ><abbr title="Relationship to Household Head">Rel HH</abbr></th>
                                                    <th class="w3-border-left">&nbsp</th>
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
                                                    <td class="w3-border-left w3-center has-text-link" @click="openUpdateRosterModal(index)"><i class="fas fa-edit"></i></td>
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
            <div class="modal" :class="{'is-active':showRosterUpdateModal}">
                <div class="modal-background" @click="closeUpdateRosterModal"></div>
                <div class="modal-content box">
                    
                    <br>
                    <div class="w3-row w3-container">
                        <label><strong>First Name</strong></label>
                        <input class="input upperCase" type="text" 
                            v-model="rosterToUpdate.firstName.value" 
                            :class="{'is-danger':rosterToUpdate.firstName.error !== ''}"
                             maxlength="40" @change="validateFirstName"
                        >
                        <p class="help is-danger">{{rosterToUpdate.firstName.error}}</p>
                    </div>
                    
                    <br>
                    <div class="w3-row w3-container">
                        <label><strong>Middle Name</strong></label>
                        <input class="input upperCase" type="text" 
                            v-model="rosterToUpdate.middleName.value" 
                            :class="{'is-danger':rosterToUpdate.middleName.error !== ''}"
                            maxlength="40" @change="validateMiddleName"
                        >
                        <p class="help is-danger">{{rosterToUpdate.middleName.error}}</p>
                    </div>
                    
                    <br>
                    <div class="w3-row w3-container">
                        <label><strong>Last Name</strong></label>
                        <input class="input upperCase" type="text" 
                            v-model="rosterToUpdate.lastName.value" 
                            :class="{'is-danger':rosterToUpdate.lastName.error !== ''}"
                            maxlength="40" @change="validateLastName"
                        >
                        <p class="help is-danger">{{rosterToUpdate.lastName.error}}</p>
                    </div>
                    
                    <br>
                    <div class="w3-row w3-container">
                        <label><strong>Ext Name</strong></label>
                        <div class="select is-fullwidth">
                            <select v-model="rosterToUpdate.extName.value">
                                <option v-for="extName in libExtensionNames" :value="extName.value">{{extName.label}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <br>
                    <div class="w3-row w3-container">
                        
                        <label><strong>Sex</strong></label>
                        <div class="select is-fullwidth" :class="{'is-danger':rosterToUpdate.sex.error !== ''}">
                            <select v-model="rosterToUpdate.sex.value" @change="validateSex">
                                <option value="-1" disabled>Please select</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            <p class="help is-danger">{{rosterToUpdate.sex.error}}</p>
                        </div>

                    </div>

                    <!-- <br>
                    <div class="w3-row w3-container">
                        
                        <label><strong>Pregnant?</strong></label>
                        <div class="select is-fullwidth">
                            <select v-model="rosterToUpdate.pregnant.value"  disabled>
                                <option value="-1" disabled>Please select</option>
                                <option value="S">Skipped</option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>

                        </div>

                    </div> -->
                    

                    <div class="is-divider" :class="{'is-danger':updatingRosterError != ''}" ></div>

                    <div class="w3-row w3-container">
                        <button class="button w3-right is-outlined is-link" @click="updateRoster"><i class="fas fa-pen-alt"></i>&nbsp Update</button>
                    </div>
                    <br>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="closeUpdateRosterModal"></button>
            </div>

            <div class="modal" :class="{'is-active':er01UpdatingError != ''}">
                <div class="modal-background" @click="removeErrorMessage"></div>
                <div class="modal-content box">
                    
                    <div class="w3-row has-text-danger">
                        {{this.er01UpdatingError}}
                    </div>

                </div>
                <button class="modal-close is-large" aria-label="close" @click="removeErrorMessage"></button>
            </div>

        </div>

	`,

    data(){
        return {

            libProvinces : [],
            libCities : [],
            libBarangay : [],
            libExtensionNames : extNameSelection(),

            er01UpdatingError : '',
            showRosterUpdateModal : false,

            rosterToUpdate : {
                firstName : { value : "", error : ""},
                middleName : { value : "", error : ""},
                lastName : { value : "", error : ""},
                extName : { value : "", error : ""},
                sex : { value : "", error : ""},
                pregnant : { value : "", error : ""}
            },
            householdDetailError : {
                street_address : "",
                purok_sitio : ""
            },

            selectedRoster : 0,
            updatingRosterError : ""

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

            this.er01UpdatingError = "";

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

        openUpdateRosterModal(index){
            
            this.selectedRoster = index;

            this.rosterToUpdate = {
                firstName : { value : this.householdRoster[index].firstName.value, error : ""},
                middleName : { value : this.householdRoster[index].middleName.value, error : ""},
                lastName : { value : this.householdRoster[index].lastName.value, error : ""},
                extName : { value : this.householdRoster[index].extName.value, error : ""},
                sex : { value : this.householdRoster[index].sex.value, error : ""},
                pregnant : { value : this.householdRoster[index].pregnant.value, error : ""}
            }

            this.showRosterUpdateModal = true;
        },

        closeUpdateRosterModal(){
            this.showRosterUpdateModal = false;
        },

        updateRoster(){

            this.validateFirstName();
            this.validateMiddleName();
            this.validateLastName();
            this.validateSex();

            this.updatingRosterError = validateUpdateChanges(this.householdRoster[this.selectedRoster], this.rosterToUpdate);

            if(this.rosterToUpdate.firstName.error == "" && this.rosterToUpdate.middleName.error == "" && this.rosterToUpdate.lastName.error == "" &&
                    this.rosterToUpdate.sex.error == "" && this.updatingRosterError == ""){
                   
                    this.householdRoster[this.selectedRoster].firstName.value = this.rosterToUpdate.firstName.value.toUpperCase();
                    this.householdRoster[this.selectedRoster].middleName.value = this.rosterToUpdate.middleName.value.toUpperCase();
                    this.householdRoster[this.selectedRoster].lastName.value = this.rosterToUpdate.lastName.value.toUpperCase();
                    this.householdRoster[this.selectedRoster].extName.value = this.rosterToUpdate.extName.value;
                    this.householdRoster[this.selectedRoster].sex.value = this.rosterToUpdate.sex.value;

                    this.householdRoster[this.selectedRoster].addCtr = 3; //updated

                    this.showRosterUpdateModal = false;
            }
        },

        
        validatePurokSitio(){

            this.householdDetailError.purok_sitio = validateName(this.householdDetail.purok_sitio,'PUROKSITIO');

        },

        validateStreetAddress(){

            this.householdDetailError.street_address = validateName(this.householdDetail.street_address,'STREETADDRESS');

        },

        validateFirstName(){
            this.rosterToUpdate.firstName.error = validateName(this.rosterToUpdate.firstName.value,'FIRSTNAME');
        },

        validateMiddleName(){

            this.rosterToUpdate.middleName.error = validateName(this.rosterToUpdate.middleName.value,'MIDDLENAME');

        },

        validateLastName(){

            this.rosterToUpdate.lastName.error = validateName(this.rosterToUpdate.lastName.value,'LASTNAME');

        },

        validateSex(){

            this.rosterToUpdate.sex.error = validateSelection(this.rosterToUpdate.sex.value);

        }

        

	}


});