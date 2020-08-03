Vue.component('complaintForm', {
	props: ['generalInfo', 'listOfSearchedNames', 'libRegions', 'libProvinces', 'libCities', 'libBarangay'],
	template: `

		<div class=" w3-row">
            
            <div class="w3-col l3">&nbsp</div>
            <div class="w3-col l6 w3-card-4 w3-round-large">
                
                <div class="w3-col l1">&nbsp</div>
                <div class="w3-col l10">
                    <div class="w3-row">
                    
                        <div class="w3-row">
                            <div class="w3-container">
                                <div class="w3-row">
                                    <br><br>
                                    <div class="w3-row">
                                        <label class="label is-size-4"> Name </label>
                                    </div>
                                    <br>
                                    <div class="w3-row" v-if="editOn">
                                        <div class="w3-row">
                                            <input class="input upperCase is-medium" type="text" v-model="generalInfo.firstName.value" @change="validateFirstName" :class="{ 'is-danger' : generalInfo.firstName.error != ''}"  maxlength="60" >
                                            <p class="help" :class="{ 'is-danger' : generalInfo.firstName.error != ''}">First Name</p>
                                            <p class="help is-danger">{{ generalInfo.firstName.error }}</p>
                                        </div>
                                        <br>
                                        <div class="w3-row">
                                            <input class="input upperCase is-medium" type="text" v-model="generalInfo.middleName.value"  @change="validateMiddleName" :class="{ 'is-danger' : generalInfo.middleName.error != ''}"  maxlength="60" >
                                            <p class="help" :class="{ 'is-danger' : generalInfo.middleName.error != ''}">Middle Name</p>
                                            <p class="help is-danger">{{ generalInfo.middleName.error }}</p>
                                        </div>
                                        <br>
                                        <div class="w3-row">
                                            <input class="input upperCase is-medium" type="text" v-model="generalInfo.lastName.value" @change="validateLastName" :class="{ 'is-danger' : generalInfo.lastName.error != ''}"  maxlength="60" >
                                            <p class="help" :class="{ 'is-danger' : generalInfo.lastName.error != ''}">Last Name</p>
                                            <p class="help is-danger">{{ generalInfo.lastName.error }}</p>
                                        </div>
                                        <br>
                                        <div class="w3-row">
                                            <div class="select is-fullwidth is-medium">
                                                <select v-model="generalInfo.extName.value">
                                                    <option v-for="extName in libExtensionNames" :value="extName.value">{{extName.label}}</option>
                                                </select>
                                            </div>
                                            <p class="help">Ext Name</p>
                                        </div>
                                        <br>
                                        <div class="w3-row">
                                            <button class="button w3-right is-link is-medium" @click="toggleEdit"><i class="fas fa-wrench"></i>&nbspUpdate</button>
                                        </div>
                                    </div>
                                    <div class="w3-row is-size-5" v-else="">
                                        <span class="has-text-link pointer" @click="toggleEdit"><i class="fas fa-edit"></i></span> | {{complainantName}}
                                    </div>

                                </div>
                                <div class="is-divider" ></div>
                            </div>
                        </div>

                    </div>
                    <br>
                    <div class="w3-row">
                    
                        <div class="w3-row">
                            <div class="w3-container">
                                <div class="w3-row">
                                    <label>
                                        <strong>Complaint Type </strong>
                                            
                                        <grievance-type-helper
                                        >
                                        </grievance-type-helper>
                                        
                                        <matched-household-ids
                                            :list-of-searched-names = "listOfSearchedNames"
                                        >
                                        </matched-household-ids>
                                    </label>
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.typeOfComplaint.error !== ''}">
                                        <select v-model="generalInfo.typeOfComplaint.value"   @change="changeComplaint">
                                            <option v-for="grievanceType in libGrievanceType" :value="grievanceType.value">{{grievanceType.label}}</option>
                                        </select>
                                        <p class="help is-danger">{{generalInfo.typeOfComplaint.error}}</p>
                                    </div>
                                </div>

                                <br>
                                <br>
                                <div class="w3-row">
                                    <label><strong>Household ID</strong></label>
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.selectedHHID.error !== ''}">
                                        <select v-model="generalInfo.selectedHHID.value" 
                                            :disabled = "generalInfo.typeOfComplaint.value == 3 || generalInfo.typeOfComplaint.value == 1" @change="changeHhid"
                                        >
                                            <option value="-1" disabled>Please select</option>
                                            <option v-for="hhid in listOfHhid" :value="hhid.hhid">{{hhid.hhid}}</option>
                                        </select>
                                        <p class="help is-danger">{{generalInfo.selectedHHID.error}}</p>
                                    </div>
                                </div>
                                
                                <br>
                                <div class="w3-row">
                                    <span><button class="button is-info is-outlined w3-right" @click="saveComplaintDetails" v-show="generalInfo.typeOfComplaint.value == 1"> <i class="fas fa-save"></i> &nbsp Save </button></span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="w3-row" v-show="(generalInfo.typeOfComplaint.value != 1  && generalInfo.selectedHHID.value != -1) || generalInfo.typeOfComplaint.value == 3 && generalInfo.typeOfComplaint.error == ''">
                        
                        <div class="w3-row">
                            <div class="w3-container">
                                <div class="is-divider" data-content="Additional Information"></div>

                                
                                <div class="w3-row">
                                    <label class="label is-size-4" :class="{'has-text-danger' : addressError != ''}">Address</label>
                                </div>
                                <br>
                                <!-- <div class="w3-row w3-right-align">
                                    <div class="">
                                        <input class="w3-check is-large" type="checkbox" v-model="copyAddress" @click="toggleCopyAddress" :disabled="isHouseholdEmpty">
                                        <p class="help">copy selected household address</p>
                                    </div>
                                </div>
                                <br> -->
                                <div class="w3-row">
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger': generalInfo.region.error !== ''}">
                                        <select v-model="generalInfo.region.value" @change="changeRegion" disabled>
                                            <option :value='-1'>Select dropdown</option>
                                            <option v-for="region in libRegions" :value="region.region_code">{{region.region_name}}</option>
                                        </select>
                                    </div>
                                    <p class="help" :class="{'is-danger': generalInfo.region.error !== ''}">Region</p>
                                    <p class="help is-danger">{{generalInfo.region.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger': generalInfo.province.error !== ''}">
                                        <select v-model="generalInfo.province.value" @change="changeProvince" disabled>
                                            <option :value='-1'>Select dropdown</option>
                                            <option v-for="province in libProvinces" :value="province.province_code">{{province.province_name}}</option>
                                        </select>
                                    </div>
                                    <p class="help" :class="{'is-danger': generalInfo.province.error !== ''}">Province</p>
                                    <p class="help is-danger">{{generalInfo.province.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger': generalInfo.city.error !== ''}">
                                        <select v-model="generalInfo.city.value" @change="changeCity" disabled>
                                            <option :value='-1'>Select dropdown</option>
                                            <option v-for="city in libCities" :value="city.city_code">{{city.city_name}}</option>
                                        </select>
                                    </div>
                                    <p class="help" :class="{'is-danger': generalInfo.city.error !== ''}">City</p>
                                    <p class="help is-danger">{{generalInfo.city.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger': generalInfo.barangay.error !== ''}">
                                        <select v-model="generalInfo.barangay.value" @change="validateBarangay" disabled>
                                            <option :value='-1'>Select dropdown</option>
                                            <option v-for="barangay in libBarangay" :value="barangay.barangay_code">{{barangay.barangay_name}}</option>
                                        </select>
                                    </div>
                                    <p class="help" :class="{'is-danger': generalInfo.barangay.error !== ''}">Barangay</p>
                                    <p class="help is-danger">{{generalInfo.barangay.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <div class="w3-row is-fullwidth">
                                        <textarea class="textarea upperCase" :class="{'is-danger':generalInfo.purokSitio.error !== ''}"
                                            v-model="generalInfo.purokSitio.value" rows="3" @change="validatePurokSitio" :disabled="copyAddress"
                                        ></textarea>
                                    </div>
                                    <p class="help" :class="{'is-danger':generalInfo.purokSitio.error !== ''}">Purok/Sitio</p>
                                    <p class="help is-danger">{{generalInfo.purokSitio.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <div class="w3-row is-fullwidth">
                                        <textarea class="textarea upperCase" :class="{'is-danger':generalInfo.streetAddress.error !== ''}"
                                            v-model="generalInfo.streetAddress.value" @change="validateStreetAddress" :disabled="copyAddress"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <p class="help" :class="{'is-danger':generalInfo.streetAddress.error !== ''}">Street Address</p>
                                    <p class="help is-danger">{{generalInfo.streetAddress.error}}</p>
                                </div>
                                <br>
                                <p class="has-text-danger">{{addressError}}</p>
                                <br>
                                <div class="w3-row">
                                    <label class="label is-size-4">Personal Information</label>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <label :class="{'is-danger':generalInfo.sex.error !== ''}"><b>Sex</b></label>
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.sex.error !== ''}">
                                        <select v-model="generalInfo.sex.value" @change="validateSex">
                                            <option value="-1" disabled>Please select</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </select>
                                        <p class="help is-danger" >{{generalInfo.sex.error}}</p>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <div class="w3-row">
                                    <label><b>Date Of Birth</b></label>
                                    <div class="w3-row">
                                        <div class="w3-col l3">
                                            <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.birthday.error !== ''}">
                                                <select v-model="generalInfo.dateOfBirthMM.value" @change="validateBirthday">
                                                    <option value="-1" disabled></option>
                                                    <option v-for="mm in libMonth" :value="mm">{{mm}}</option>
                                                </select>
                                                <p class="help">MM</p>
                                            </div>
                                        </div>
                                        <div class="w3-col l1">&nbsp</div>
                                        <div class="w3-col l3">
                                            <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.birthday.error !== ''}">
                                                <select v-model="generalInfo.dateOfBirthDD.value" @change="validateBirthday">
                                                    <option value="-1" disabled></option>
                                                    <option v-for="dd in libDay" :value="dd">{{dd}}</option>
                                                </select>
                                                <p class="help">DD</p>
                                            </div>
                                        </div>
                                        <div class="w3-col l1">&nbsp</div>
                                        <div class="w3-col l4">
                                            <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.birthday.error !== ''}">
                                                <select v-model="generalInfo.dateOfBirthYYYY.value" @change="validateBirthday">
                                                    <option value="-1" disabled></option>
                                                    <option v-for="yy in libYear" :value="yy">{{yy}}</option>
                                                </select>
                                                <p class="help">YYYY</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <p class="help is-danger">{{generalInfo.birthday.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <label><b>Contact Number</b></label>
                                    <input class="input is-medium" :class="{'is-danger':generalInfo.contactNumber.error !== ''}" 
                                        type="text" v-model="generalInfo.contactNumber.value" name="contactNumber" maxlength="11"
                                        @change="validateContactNumber"
                                    >
                                    <p class="help is-danger">{{generalInfo.contactNumber.error}}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <label ><b>Email Address(Optional)</b></label>
                                    <input class="input is-medium" type="text" v-model="generalInfo.emailAddress.value" name="emailAddress" @change="validateEmail" maxlength="60">
                                    <p class="help is-danger">{{generalInfo.emailAddress.error}}</p> 
                                </div>
                                <br>
                                <div class="w3-row">
                                    <label><strong>ID Presented</strong></label>
                                    <div class="select is-fullwidth is-medium" :class="{'is-danger':generalInfo.idPresented.error !== ''}">
                                        <select v-model="generalInfo.idPresented.value" @change="validateIdPresented">
                                            <option value="-1" disabled>Please select</option>
                                            <option value="1">Barangay ID</option>
                                            <option value="2">National ID</option>
                                            <option value="3">UMID</option>
                                            <option value="4">Police Clearance</option>
                                            <option value="5">Birth Certification</option>
                                        </select>
                                        <p class="help is-danger">{{generalInfo.idPresented.error}}</p>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <div class="w3-row">
                                    <label><strong>Remarks</strong></label>
                                    <textarea class="textarea is-fullwidth upperCase" rows="3" 
                                        v-model="generalInfo.remarks.value" @change = "validateRemarks" :class="{'is-danger':generalInfo.remarks.error !== ''}"></textarea>
                                    <p class="help is-danger">{{generalInfo.remarks.error}}</p>
                                </div>
                                <br>
                                <div class=" w3-row">
                                    <span><button class="button is-info is-outlined w3-right" @click="saveComplaintDetails" v-show="generalInfo.typeOfComplaint.value == 3 || generalInfo.typeOfComplaint.value == 4 || generalInfo.typeOfComplaint.value == 5 || generalInfo.typeOfComplaint.value == 2 || generalInfo.typeOfComplaint.value == 8"> <i class="fas fa-save"></i> &nbsp Save </button></span>   
                                </div>
                                <br>
                            </div>
                        </div>

                    </div>

                    <div class="w3-row" v-if="generalInfo.typeOfComplaint.value == 6 || generalInfo.typeOfComplaint.value == 7 && generalInfo.typeOfComplaint.error == ''" >
                        
                        <div class="w3-row">
                            <div class="w3-row w3-container">
                                <div class="is-divider" data-content="Household Information"></div>
                                <div class="w3-row w3-center" v-if="generalInfo.selectedHHID.value == -1">
                                    <strong>PLEASE SELECT A HOUSEHOLD ID</strong>
                                </div>
                                <div v-else="">
                                    <div class="w3-row has-text-link w3-center pointer" @click="toggleHouseholdDetail">
                                        <b><u>OPEN HOUSEHOLD DETAIL</u></b>
                                        <p class="help is-danger">{{hasChanges}}</p>
                                    </div>
                                    <div>
                                        
                                       
                                        <div v-if="generalInfo.typeOfComplaint.value == 7">
                                            
                                            <div-er03-view

                                                ref = "er03"
                                                :household-detail = "householdDetail"
                                                :household-roster = "householdRoster"
                                                :orig-household-detail = "origHouseholdDetail"
                                                :orig-household-roster = "origHouseholdRoster"
                                                :lib-regions = "libRegions"
                                                :is-show-household-detail-modal = "isShowHouseholdDetailModal"

                                                @save-changes = "saveChanges"
                                                @toggle-household-detail = "toggleHouseholdDetail"

                                            >
                                            </div-er03-view>
                                            
                                        </div>
                                        <div v-else-if="generalInfo.typeOfComplaint.value == 6">
                                            
                                            <div-er01-view

                                                ref = "er01"
                                                :household-detail = "householdDetail"
                                                :household-roster = "householdRoster"
                                                :orig-household-detail = "origHouseholdDetail"
                                                :orig-household-roster = "origHouseholdRoster"
                                                :lib-regions = "libRegions"
                                                :is-show-household-detail-modal = "isShowHouseholdDetailModal"
                                                
                                                @save-changes = "saveChanges"
                                                @toggle-household-detail = "toggleHouseholdDetail"
                                            >
                                            </div-er01-view>
                                            
                                        </div>
                                            
                                    </div>
                    
                                </div>
                                <br>
                                <div class=" w3-row">
                                    <span><button class="button is-info is-outlined w3-right" @click="saveComplaintDetails" > <i class="fas fa-save"></i> &nbsp Save </button></span>   
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w3-col l1">&nbsp</div>

            </div>

            <div class="w3-col l3">&nbsp</div>

            <div class="modal" :class="{'is-active':savingModalMessage != ''}">
                <div class="modal-background" @click = "removeSavingMessage"></div>
                <div class="modal-content box">
                    <span :class="{'has-text-success': isSaving == 1, 'has-text-danger': isSaving == -1}">{{savingModalMessage}}</span>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="removeSavingMessage" :class="{'not-allowed':isSaving == 0}" :disabled="isSaving == 0"></button>
            </div>

        </div>

	`,

    data() {
        return {

            libExtensionNames : extNameSelection(),
            libGrievanceType : grievanceTypeSelection(),
            libMonth : monthSelection(),
            libDay : daySelection(),
            libYear : yearSelection(),
            //libProvinces : [],
            //libCities : [],
            //libBarangay : [],
            //listOfHhid : [],
            listOfHhid : [
                {"firstName":"KENNETH","middleName":"","lastName":"MOLINA","isMatch":1,"hhid":"1600000004016","poorStatus":"1"},
                {"firstName":"KENNETH","middleName":"","lastName":"MOLINA","isMatch":1,"hhid":"1600000003262","poorStatus":"1"},
                {"firstName":"KENNETH","middleName":"","lastName":"MOLINA","isMatch":1,"hhid":"1600000004009","poorStatus":"1"}
            ],
            householdDetail : {},
            householdRoster : [],
            origHouseholdDetail : {},
            origHouseholdRoster : [],
            currentHouseholdDetail : {},
            currentHouseholdRoster : [],
            addressError : "", // TR only

            savingModalMessage : '',
            isSaving : 0, // 0 means still saving, 1 successfully saved -1 failed saving

            editOn : false,

            isShowHouseholdDetailModal : false,
            copyAddress : false,
            hasBeenUpdated : false

        }
    },

    computed : {

        isHouseholdEmpty(){

            return _.isEmpty(this.origHouseholdDetail);

        },

        complainantName(){

            fName = this.generalInfo.firstName.value.trim().length > 0 ? `${this.generalInfo.firstName.value.trim()} ` : "";
            mName = this.generalInfo.middleName.value.trim().length > 0 ? `${this.generalInfo.middleName.value.trim()} ` : "";
            lName = this.generalInfo.lastName.value.trim().length > 0 ? `${this.generalInfo.lastName.value.trim()} ` : "";
            eName = this.generalInfo.extName.value.trim().length > 0 ? `${this.generalInfo.extName.value.trim()} ` : "";

            return `${fName.toUpperCase()}${mName.toUpperCase()}${lName.toUpperCase()}${eName.toUpperCase()}`;

        },

        hasChanges(){

            let retVal = "No changes made yet!";

            if(JSON.stringify(this.origHouseholdRoster) != JSON.stringify(this.householdRoster)){
                retVal = "";
            }

            if(JSON.stringify(this.origHouseholdDetail) != JSON.stringify(this.householdDetail)){
                retVal = "";
            }

            if(!(this.generalInfo.typeOfComplaint.value == 6 || this.generalInfo.typeOfComplaint.value == 7)){
                retVal = "";
            }

            return retVal;

        },

    },

	methods: {
        
        toggleCopyAddress(){

            
            this.generalInfo.province.error = "";
            this.generalInfo.city.error = "";
            this.generalInfo.barangay.error = "";
            this.generalInfo.purokSitio.error = "";
            this.generalInfo.streetAddress.error = "";

            if( !this.copyAddress ){

                this.generalInfo.region.value = this.origHouseholdDetail.region_code;
                this.fetchLibProvinces(this.origHouseholdDetail.region_code);
                this.generalInfo.province.value = this.origHouseholdDetail.province_code;
                this.fetchLibCities(this.origHouseholdDetail.province_code);
                this.generalInfo.city.value = this.origHouseholdDetail.city_code;
                this.fetchLibBarangay(this.origHouseholdDetail.city_code);
                this.generalInfo.barangay.value = this.origHouseholdDetail.barangay_code;
                this.generalInfo.purokSitio.value = this.origHouseholdDetail.purok_sitio;
                this.generalInfo.streetAddress.value = this.origHouseholdDetail.street_address;
            } else {
                this.generalInfo.province.value = -1;
                this.generalInfo.city.value = -1;
                this.generalInfo.barangay.value = -1;
                this.generalInfo.purokSitio.value = "";
                this.generalInfo.streetAddress.value = "";
            }

        },

        toggleHouseholdDetail(){

            
            this.householdDetail = _.cloneDeep(this.currentHouseholdDetail);
            this.householdRoster = _.cloneDeep(this.currentHouseholdRoster);
            

            if(this.isShowHouseholdDetailModal){
                this.isShowHouseholdDetailModal = false;
                this.$emit('toggle-step-footer');
            } 
            else{
                this.isShowHouseholdDetailModal = true;
                this.$emit('toggle-step-footer');
            }

        },

        saveChanges(){

            this.currentHouseholdDetail = _.cloneDeep(this.householdDetail);
            this.currentHouseholdRoster = _.cloneDeep(this.householdRoster);

            this.isShowHouseholdDetailModal = false;
            this.$emit('toggle-step-footer');
            this.hasBeenUpdated = true;

        },

        toggleEdit(){

            if(this.editOn) this.editOn = false;
            else this.editOn = true;
            

        },

        removeSavingMessage() {

            if(this.isSaving != 0){

                if(this.isSaving == 1){
                    this.$emit('reset-page');
                }

                this.savingModalMessage = '';
                this.isSaving = 0;

            }

        },

        validateFirstName(){
            this.generalInfo.firstName.error = validateName(this.generalInfo.firstName.value,'FIRSTNAME');
        },

        validateMiddleName(){

            this.generalInfo.middleName.error = validateName(this.generalInfo.middleName.value,'MIDDLENAME');

        },

        validateLastName(){

            this.generalInfo.lastName.error = validateName(this.generalInfo.lastName.value,'LASTNAME');

        },

        validateRegion(){

            this.generalInfo.region.error = validateSelection(this.generalInfo.region.value);
        },

        validateProvince(){

            this.generalInfo.province.error = validateSelection(this.generalInfo.province.value);
        },

        validateCity(){

            this.generalInfo.city.error = validateSelection(this.generalInfo.city.value);
        },

        validateBarangay(){

            this.generalInfo.barangay.error = validateSelection(this.generalInfo.barangay.value);
        },

        validatePurokSitio(){

            this.generalInfo.purokSitio.error = validateName(this.generalInfo.purokSitio.value,'ADDRESS');

        },

        validateStreetAddress(){

            this.generalInfo.streetAddress.error = validateName(this.generalInfo.streetAddress.value,'ADDRESS');

        },

        validateSex(){

            this.generalInfo.sex.error = validateSelection(this.generalInfo.sex.value);

        },

        validateBirthday(){

            this.generalInfo.birthday.error = validateBirthDate(this.generalInfo.dateOfBirthMM.value,this.generalInfo.dateOfBirthDD.value,this.generalInfo.dateOfBirthYYYY.value);

        },

        validateIdPresented(){

            this.generalInfo.idPresented.error = validateSelection(this.generalInfo.idPresented.value);

        },

        validateHhid(){

            this.generalInfo.selectedHHID.error = validateSelection(this.generalInfo.selectedHHID.value);

        },

        validateContactNumber(){

            this.generalInfo.contactNumber.error = validateContactNumber(this.generalInfo.contactNumber.value);

        },

        validateEmail(){

            this.generalInfo.emailAddress.error = validateEmail(this.generalInfo.emailAddress.value);

        },


        validateComplaint(){

            this.generalInfo.typeOfComplaint.error = validateSelection(this.generalInfo.typeOfComplaint.value);

        },
        
        validateRemarks(){

            this.generalInfo.remarks.error = validateRemarks(this.generalInfo.remarks.value, this.generalInfo.typeOfComplaint.value);

        },

        changeHhid(){

            let self = this;

            this.validateHhid();

            axios.post('../php/api/fetchHouseholdDetail.php',{
                
                hhid : this.generalInfo.selectedHHID.value,
                
            })
            .then(function (response){


                console.log(response.data.message.rosterDetail)
                if(response.data.status == "SUCCESS"){
                    self.householdDetail = response.data.message.householdDetail[0];
                    self.householdRoster = convertRosters(response.data.message.rosterDetail);

                    console.log(self.householdRoster);
                    self.origHouseholdDetail = _.cloneDeep(self.householdDetail);
                    self.origHouseholdRoster = _.cloneDeep(self.householdRoster);
                    self.currentHouseholdDetail = _.cloneDeep(self.householdDetail);
                    self.currentHouseholdRoster = _.cloneDeep(self.householdRoster);

                    if( self.generalInfo.typeOfComplaint.value == 7){

                        self.$refs.er03.fetchLibProvinces(response.data.message.householdDetail[0].region_code);
                        self.$refs.er03.fetchLibCities(response.data.message.householdDetail[0].province_code);
                        self.$refs.er03.fetchLibBarangay(response.data.message.householdDetail[0].city_code);

                    }

                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

        changeComplaint(){


            this.generalInfo.typeOfComplaint.error = "";
            this.generalInfo.selectedHHID.value = -1;

            if(this.generalInfo.typeOfComplaint.value == 2){
                this.listOfHhid = this.listOfSearchedNames.filter(list => list.isMatch == 1 && list.poorStatus == 0);

                if(this.listOfSearchedNames.filter(list => list.poorStatus == 0).length == 0){
                    this.generalInfo.typeOfComplaint.error = "Searched Name/s should have a match with non-poor status";
                }

            } else if(this.generalInfo.typeOfComplaint.value == 4 || this.generalInfo.typeOfComplaint.value == 5 || 
                        this.generalInfo.typeOfComplaint.value == 6 || this.generalInfo.typeOfComplaint.value == 7 || 
                        this.generalInfo.typeOfComplaint.value == 8){

                this.listOfHhid = this.listOfSearchedNames.filter(list => list.isMatch == 1 && list.poorStatus == 1);

                if(this.listOfSearchedNames.filter(list => list.poorStatus == 1).length == 0){
                    this.generalInfo.typeOfComplaint.error = "Searched Name/s should have a match with poor status";
                }

            } else if(this.generalInfo.typeOfComplaint.value == 3){
                if(this.listOfSearchedNames.filter(list => list.isMatch == 1).length > 0){
                    this.generalInfo.typeOfComplaint.error = "All of Searched Name/s should should be tagged as 'No Match.'";
                }
            }

        },

        saveComplaintDetails(){

            let self = this;

            this.validateFirstName();
            this.validateMiddleName();
            this.validateLastName();

            if(this.generalInfo.typeOfComplaint.value != 1){

                this.validateSex();
                this.validateRegion();
                this.validateProvince();
                this.validateCity();
                this.validateBarangay();
                this.validatePurokSitio();
                this.validateStreetAddress();
                this.validateIdPresented();
                this.validateBirthday();
                this.validateEmail();
                this.validateContactNumber();
                this.validateRemarks();

                this.generalInfo.selectedHHID.error = "";
                if(this.generalInfo.typeOfComplaint.value != 3 ) this.validateHhid();

            }

            if(this.generalInfo.typeOfComplaint.value == 8){

                this.addressError = "";

                if(this.generalInfo.region.value == this.currentHouseholdDetail.region_code && this.generalInfo.province.value == this.currentHouseholdDetail.province_code &&
                    this.generalInfo.city.value == this.currentHouseholdDetail.city_code && this.generalInfo.barangay.value == this.currentHouseholdDetail.barangay_code &&
                    this.generalInfo.streetAddress.value == this.currentHouseholdDetail.street_address && this.generalInfo.purokSitio.value == this.currentHouseholdDetail.purok_sitio){

                    this.addressError = "Household Address and Complaint Address should not be the same if TR01.";
                }


            }
            

            if(this.generalInfo.lastName.error == "" && this.generalInfo.firstName.error == "" && this.generalInfo.middleName.error == "" && this.generalInfo.sex.error == "" &&
                this.generalInfo.region.error == "" && this.generalInfo.province.error == "" && this.generalInfo.city.error == "" && this.generalInfo.barangay.error == "" &&
                this.generalInfo.purokSitio.error == "" && this.generalInfo.streetAddress.error == "" && this.generalInfo.selectedHHID.error == "" && this.generalInfo.typeOfComplaint.error == "" &&
                this.generalInfo.typeOfComplaint.error == "" && this.generalInfo.birthday.error == "" && this.generalInfo.emailAddress.error == "" &&
                this.generalInfo.contactNumber.error == "" && this.generalInfo.idPresented.error == "" && this.hasChanges == "" && 
                this.addressError == "" && this.generalInfo.remarks.error == ""){

                this.savingModalMessage = "Saving grievance details . . . Please wait!";
                console.log(this.generalInfo);
                
                axios.post('../php/api/saveComplaintDetails.php',{
            
                    generalInfo : this.generalInfo,
                    listOfSearchedNames : this.listOfSearchedNames,
                    householdDetail : this.currentHouseholdDetail,
                    rosterDetail : this.currentHouseholdRoster
                    
                })
                .then(function (response){

                    console.log(response.data);
                    if(response.data.status == "SUCCESS"){
                        self.savingModalMessage = "Successfully saved grievance. Thank you!";
                        self.isSaving = 1;
                    } else {
                        self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                        self.isSaving = -1;
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

            }


            

        },

        changeRegion(){

            this.validateProvince();
            this.generalInfo.city.value = -1;
            this.generalInfo.barangay.value = -1;
            this.generalInfo.province.value = -1;
            this.fetchLibProvinces(this.generalInfo.region.value);


        },


        changeProvince(){

            this.validateProvince();
            this.generalInfo.city.value = -1;
            this.generalInfo.barangay.value = -1;
            this.fetchLibCities(this.generalInfo.province.value);


        },

        changeCity(){

            this.validateCity();
            this.generalInfo.barangay.value = -1;
            this.fetchLibBarangay(this.generalInfo.city.value);

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

        }

        

	}


});

function grievanceTypeSelection(){

    return [
                { 'label' : 'General Inquiry', 'value' : 1 },
                { 'label' : 'EX01', 'value' : 2 }, 
                { 'label' : 'EX02', 'value' : 3 },
                { 'label' : 'INC01', 'value' : 4 },
                { 'label' : 'INC02', 'value' : 5 },
                { 'label' : 'ER01', 'value' : 6 },
                { 'label' : 'ER03', 'value' : 7 },
                { 'label' : 'TR01', 'value' : 8 }
            ];

}