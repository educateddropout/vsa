Vue.component('rosterForm', {
	props: ['showRosterUpdateModal', 'rosterToUpdate', 'selectedRoster', 'householdRoster', 'isAddRoster'],
	template: `
        <div>
            <div class="modal" :class="{'is-active':showRosterUpdateModal}">
                <div class="modal-background" ></div>
                <div class="modal-content modal-card">
                    
                    <section class="modal-card-body">
                        <div class="w3-container">
                        <br>
                        <fieldset class="w3-border w3-round w3-border-black">
                            <legend><strong>&nbspPersonal Information&nbsp</strong></legend>
                            <div class="w3-row">
                                <div class="w3-row-padding">
                                    <div class="w3-row">
                                        <strong>22. Name</strong>
                                    </div>
                                    <div class="w3-row">
                                        <div class="w3-row">
                                            <p class="help">Last</p>
                                            <input class="input upperCase" maxlength="40" :class="{'is-danger':rosterToUpdate.lastName.error != ''}" type="text" v-model="rosterToUpdate.lastName.value" >
                                            
                                            <p class="help is-danger">{{rosterToUpdate.lastName.error}}</p>
                                        </div>
                                        <div class="w3-row">
                                            <p class="help">First</p>
                                            <input class="input upperCase" type="text" maxlength="40" :class="{'is-danger':rosterToUpdate.firstName.error != ''}" v-model="rosterToUpdate.firstName.value" @change="validateFirstName(rosterToUpdate.firstName.value)" >
                                            
                                            <p class="help is-danger">{{rosterToUpdate.firstName.error}}</p>
                                        </div>
                                        <div class="w3-row">
                                            <p class="help">Middle</p>
                                            <input class="input upperCase" type="text" maxlength="40" :class="{'is-danger':rosterToUpdate.middleName.error != ''}" v-model="rosterToUpdate.middleName.value" @change="validateMiddleName(rosterToUpdate.middleName.value)" >
                                            
                                            <p class="help is-danger">{{rosterToUpdate.middleName.error}}</p>
                                        </div>
                                        <p class="help">Ext</p>
                                        <div class="select is-fullwidth" >
                                            <select v-model="rosterToUpdate.extName.value" >
                                                <option v-for="selection in extNames.lib" :value="selection.value" >{{selection.label}}</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <div class="w3-row-padding">
                                    <div class="w3-row">
                                        <div class="w3-row">
                                            <strong>23. DATE OF BIRTH/24. AGE</strong>
                                            <span class="w3-small">(Inputs will be cleared upon unchecking)</span>
                                        </div>
                                        <div class="w3-row">
                                            <div class="w3-col l8 w3-border-right">
                                                <div class="w3-row-padding">
                                                    <div class="w3-col l2">
                                                        <input class="w3-check w3-border" type="checkbox" v-model="rosterToUpdate.birthdayAge.birthday_checkbox" @click="toggleBirthdayAge('BIRTHDAY')" >
                                                    </div>
                                                    <div class="w3-col l3">
                                                        <input class="input" type="text" :class="{'is-danger' : rosterToUpdate.birthdayAge.birthMonth.error != ''}" maxlength="2" v-model="rosterToUpdate.birthdayAge.birthMonth.value" :disabled="!rosterToUpdate.birthdayAge.birthday_checkbox" @change="changeBirthMonth">
                                                        <p class="help">MM</p>
                                                        <p class="help is-danger">{{rosterToUpdate.birthdayAge.birthMonth.error}}</p>
                                                    </div>
                                                    <div class="w3-col l3">
                                                        <input class="input" type="text" :class="{'is-danger' : rosterToUpdate.birthdayAge.birthDay.error != ''}" maxlength="2" v-model="rosterToUpdate.birthdayAge.birthDay.value" :disabled="!rosterToUpdate.birthdayAge.birthday_checkbox" @change="changeBirthDay">
                                                        <p class="help">DD</p>
                                                        <p class="help is-danger">{{rosterToUpdate.birthdayAge.birthDay.error}}</p>
                                                    </div>
                                                    <div class="w3-col l4">
                                                        <input class="input" type="text" :class="{'is-danger' : rosterToUpdate.birthdayAge.birthYear.error != ''}" maxlength="4" v-model="rosterToUpdate.birthdayAge.birthYear.value" :disabled="!rosterToUpdate.birthdayAge.birthday_checkbox" @change="changeBirthYear">
                                                        <p class="help">YYYY</p>
                                                        <p class="help is-danger">{{rosterToUpdate.birthdayAge.birthYear.error}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w3-col l4">
                                                <div class="w3-row-padding">
                                                    <div class="w3-col l3">
                                                        <input class="w3-check" type="checkbox" v-model="rosterToUpdate.birthdayAge.age_checkbox" @click="toggleBirthdayAge('AGE')" >
                                                    </div>
                                                    <div class="w3-col l9">
                                                        <input class="input" type="text" :class="{'is-danger' : rosterToUpdate.birthdayAge.age.error != ''}" maxlength="3" v-model="rosterToUpdate.birthdayAge.age.value" :disabled="!rosterToUpdate.birthdayAge.age_checkbox" @change="changeAge">
                                                        <p class="help">Age</p>
                                                        <p class="help is-danger">{{rosterToUpdate.birthdayAge.age.error}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w3-row w3-padding">
                                            <p class="help is-danger">{{rosterToUpdate.birthdayAge.error}}</p>
                                        </div>
                                        <div class="w3-row">
                                            <family-roster-div-select
                                                :object = "sex"
                                                :value = "rosterToUpdate.sex"
                                                :disableCtr = "!isAddRoster"
                                                @validate-select = "changeSex"
                                            >
                                            </family-roster-div-select>
                                        </div>
                                        <br>
                                        <div class="w3-row">
                                            <family-roster-div-select
                                                :object = "pregnant"
                                                :value = "rosterToUpdate.pregnant"
                                                :disableCtr = "!isAddRoster && rosterToUpdate.pregnant.error == ''"
                                                @validate-select = "validatePregnant()"
                                            >
                                            </family-roster-div-select>
                                        </div>
                                    </div>
                                    <br>
                                    

                                    <div class="w3-row">
                                        <family-roster-div-select
                                            :object = "maritalStatus"
                                            :value = "rosterToUpdate.maritalStatus"
                                            
                                            @validate-select = "validateMaritalStatus()"
                                        >
                                        </family-roster-div-select>
                                    </div>
                                    <br>
                                    <div class="w3-row ">
                                        <family-roster-div-select
                                            :object = "soloParent"
                                            :value = "rosterToUpdate.soloParent"
                                            :disableCtr = "!isAddRoster  && rosterToUpdate.soloParent.error == ''"
                                            @validate-select = "validateSoloParent()"
                                        >
                                        </family-roster-div-select>
                                    </div>
                                    <br>
                                    <div class="w3-row ">
                                        <family-roster-div-select
                                            :object = "relHH"
                                            :value = "rosterToUpdate.relHH"
                                            :disableCtr = "!isAddRoster && this.rosterToUpdate.relHH.error == ''"
                                            @validate-select = "validateRelHH()"
                                        >
                                        </family-roster-div-select>
                                    </div>
                                    <br>
                                    <div class="w3-row ">
                                        <family-roster-div-select
                                            :object = "relFH"
                                            :value = "rosterToUpdate.relFH"
                                            :disableCtr = "!isAddRoster  && rosterToUpdate.relFH.error == ''"
                                            @validate-select = "validateRelFH()"
                                        >
                                        </family-roster-div-select>
                                    </div>
                                    <br>
                                    <div class="w3-row">
                                        <family-roster-div-select
                                            :object = "familyNumber"
                                            :value = "rosterToUpdate.familyNumber"
                                            :disableCtr = "!isAddRoster  && rosterToUpdate.familyNumber.error == ''"
                                            @validate-select = "validateFamilyNumber()"
                                        >
                                        </family-roster-div-select>
                                    </div>

                                </div>
                            </div>
                            <br>
                        </fieldset>
                        <br>
                        <fieldset class="w3-border w3-round w3-border-black">
                            <legend><strong>&nbspFunctional Difficulty&nbsp</strong></legend>
                            

                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "seeing"
                                    :value = "rosterToUpdate.seeing"
                                    :disableCtr = "!isAddRoster "
                                    @validate-select = "validateSeeing"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "hearing"
                                    :value = "rosterToUpdate.hearing"
                                    :disableCtr = "!isAddRoster"
                                    @validate-select = "validateHearing"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "walking"
                                    :value = "rosterToUpdate.walking"
                                    :disableCtr = "!isAddRoster"
                                    @validate-select = "validateWalking"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "remembering"
                                    :value = "rosterToUpdate.remembering"
                                    :disableCtr = "!isAddRoster"
                                    @validate-select = "validateRemembering"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "caring"
                                    :value = "rosterToUpdate.caring"
                                    :disableCtr = "!isAddRoster"
                                    @validate-select = "validateCaring"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "communicating"
                                    :value = "rosterToUpdate.communicating"
                                    :disableCtr = "!isAddRoster"
                                    @validate-select = "validateCommunicating"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                        </fieldset>
                        <br>

                        <fieldset class="w3-border w3-round w3-border-black">
                            <legend><strong>&nbspEducation&nbsp</strong></legend>
                            

                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "attendingSchool"
                                    :value = "rosterToUpdate.attendingSchool"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.attendingSchool.error == ''"
                                    @validate-select = "validateAttendingSchool"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "highestEducationAttained"
                                    :value = "rosterToUpdate.highestEducationAttained"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.highestEducationAttained.error == ''"
                                    @validate-select = "validateHighestEducationAttained()"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                        </fieldset>
                        <br>

                        <fieldset class="w3-border w3-round w3-border-black">
                            <legend><strong>&nbspEmployment Information&nbsp</strong></legend>


                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "employment"
                                    :value = "rosterToUpdate.employment"
                                    :disableCtr = "!isAddRoster && rosterToUpdate.employment.error == ''"
                                    @validate-select = "validateEmployment()"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <div class="w3-row-padding">
                                    <label>
                                        <strong><abbr :title="occupation.abbr">{{occupation.label}}</abbr></strong>
                                    </label>
                                </div>
                                <div class="w3-row">
                                    <family-roster-input-occupation
                                        :object = "occupation"
                                        :value = "rosterToUpdate.occupationEnumerator"
                                        :disableCtr = "!isAddRoster && rosterToUpdate.occupationEnumerator.error == ''"
                                        :maxLength = "250"
                                        :help-label = "1"
                                        @validate-text-input = "validateOccupationEnumerator()"
                                    >
                                    </family-roster-input-occupation>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <family-roster-input-occupation
                                        :object = "occupation"
                                        :value = "rosterToUpdate.occupationAreaSupervisor"
                                        :disableCtr = "!isAddRoster  && rosterToUpdate.occupationAreaSupervisor.error == ''"
                                        :maxLength = "250"
                                        :help-label = "2"
                                        @validate-text-input = "validateOccupationAreaSupervisor()"
                                    >
                                    </family-roster-input-occupation>
                                </div>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-input
                                    :object = "psoc"
                                    :value = "rosterToUpdate.psoc"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.psoc.error == ''"
                                    :maxLength = "4"
                                    @validate-text-input = "validatePsoc()"
                                >
                                </family-roster-input>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "classOfWorker"
                                    :value = "rosterToUpdate.classOfWorker"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.classOfWorker.error == ''"
                                    @validate-select = "validateClassOfWorker()"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "basisOfPayment"
                                    :value = "rosterToUpdate.basisOfPayment "
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.basisOfPayment.error == ''"
                                    @validate-select = "validateBasisOfPayment()"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "natureOfEmployment"
                                    :value = "rosterToUpdate.natureOfEmployment"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.natureOfEmployment.error == ''"
                                    @validate-select = "validateNatureOfEmployment()"
                                >
                                </family-roster-div-select>
                            </div>

                            <br>
                        </fieldset>

                        <br>
                        <fieldset class="w3-border w3-round w3-border-black">
                            <legend><strong>&nbspOverseas Indicator&nbsp</strong></legend>
                            

                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "overseas"
                                    :value = "rosterToUpdate.overseas"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.overseas.error == ''"
                                    @validate-select = "validateOverseas"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>

                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "ofi"
                                    :value = "rosterToUpdate.ofi"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.ofi.error == ''"
                                    @validate-select = "validateOfi()"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>

                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "sendingMoney"
                                    :value = "rosterToUpdate.sendingMoney"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.sendingMoney.error == ''"
                                    @validate-select = "validateSendingMoney()"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "howOften"
                                    :value = "rosterToUpdate.howOften"
                                    :disableCtr = "!isAddRoster  && rosterToUpdate.howOften.error == ''"
                                    @validate-select = "validateHowOften()"
                                >
                                </family-roster-div-select>
                            </div>

                            <br>

                        </fieldset>

                        </div>
                    </section>
                    <footer class="modal-card-foot">

                        <span v-if="isAddRoster"><button class="button is-success" @click="addRoster"><i class="fas fa-plus-square"></i> &nbsp Add Roster</button></span>
                        <span v-else=""><button class="button is-success"><i class="fas fa-pen-square" @click="updateRoster"></i> &nbsp Update Roster</button></span>
                        &nbsp&nbsp<button class="button" @click="closeRosterModal">Cancel</button>
                    </footer>

                </div>


            </div>
        </div>

	`,

    data(){
        return {

            disableCtr : false,
            updatingRosterError : "",
            libExtensionNames : extNameSelection(),
            dateEnumerated : '2020-07-09',

            extNames : {
                lib : extNameSelection()
            },
            sex : {
                abbr : 'Sex',
                label : '25. SEX',
                lib : sexSelection()
            },
            pregnant : {
                abbr : 'Pregnant',
                label : '26. PREG',
                lib : pregnantSelection()
            },
            maritalStatus : {
                abbr : 'Marital Status',
                label : '27. MS',
                lib : maritalStatusSelection()
            },
            soloParent : {
                abbr : 'Marital Status',
                label : '28. SP',
                lib : soloParentSelection()
            },
            relHH : {
                abbr : 'Relationship to Household Head',
                label : '29. RelHH',
                lib : relHHSelection()
            },
            relFH : {
                abbr : 'Relationship to Family Head',
                label : '30. RelFH',
                lib : relFHSelection()
            },

            familyNumber : {
                lib : familyNumberSelection(),
                abbr : 'Family Number',
                label : '31. FN',
            },
            attendingSchool : {
                abbr : 'Attending School',
                label : '38. AS',
                lib : attendingSchoolSelection()
            },
            highestEducationAttained : {
                abbr : 'Highest Educational Attained',
                label : '39. HEA',
                lib : highestEducationAttainedSelection()
            },
            seeing : {
                abbr : 'seeing',
                label : '32. SEE',
                lib : functionalDifficultySelection()
            },
            hearing : {
                abbr : 'hearing',
                label : '33. HEAR',
                lib : functionalDifficultySelection()
            },
            walking : {
                abbr : 'Walking or Climbing Steps',
                label : '34. WALK',
                lib : functionalDifficultySelection()
            },
            remembering : {
                abbr : 'Remembering or Concentrating',
                label : '35. REM',
                lib : functionalDifficultySelection()
            },
            caring : {
                abbr : 'Self-caring',
                label : '36. CARE',
                lib : functionalDifficultySelection()
            },
            communicating : {
                abbr : 'Communicating',
                label : '37. COM',
                lib : functionalDifficultySelection()
            },
            employment : {
                abbr : 'Employment',
                label : '40. EMP',
                lib : employmentSelection()
            },
            occupation : {
                abbr : 'Primary Occupation or Business',
                label : 'Primary Occupation/Business',
            },
            psoc : {
                abbr : 'Philippine Standard Occupational Classification',
                label : '43. PSOC',
                lib : psocSelection()
            },
            classOfWorker : {
                abbr : 'Class of Workers',
                label : '44. CW',
                lib : classOfWorkerSelection()
            },
            basisOfPayment : {
                abbr : 'Basis of Payment',
                label : '45. BP',
                lib : basisOfPaymentSelection()
            },
            natureOfEmployment : {
                abbr : 'Nature of Employment',
                label : '46. NE',
                lib : natureOfEmploymentSelection()
            },
            overseas : {
                abbr : 'Overseas',
                label : '47. OVE',
                lib : overseasSelection()
            },
            ofi : {
                abbr : 'Overseas Filipino Indicator',
                label : '48. OFI',
                lib : ofiSelection()
            },
            sendingMoney : {
                abbr : 'Sending money to the household',
                label : '49. SM',
                lib : sendingMoneySelection()
            },
            howOften : {
                abbr : 'How often members send money in a year',
                label : '50. HO',
                lib : frequencyOfSendingMoneySelection()
            }

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

	methods: {

        closeRosterModal(){

            this.$emit("close-update-roster-modal");

        },

        addRoster(){

            this.$emit('add-roster');

        },

        updateRoster(){

            this.validateFirstName();
            this.validateMiddleName();
            this.validateLastName();
            this.validateSex();

            this.updatingRosterError = validateUpdateChangesRoster(this.householdRoster[this.selectedRoster], this.rosterToUpdate);

            if(this.rosterToUpdate.firstName.error == "" && this.rosterToUpdate.middleName.error == "" && this.rosterToUpdate.lastName.error == "" &&
                    this.rosterToUpdate.sex.error == "" && this.updatingRosterError == ""){

                this.$emit('update-roster');

            }
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

        },

        validateAgeOnBirthdayInput(age){
            this.rosterToUpdate.birthdayAge.age.value = age;
            this.rosterToUpdate.birthdayAge.age.error = validateAge(age,this.rosterToUpdate.birthdayAge.age_checkbox);
            
            if(this.rosterToUpdate.pregnant.value != -1 || !this.addRoster) this.validatePregnant();

            if(this.rosterToUpdate.soloParent.value != -1  || !this.addRoster) this.validateSoloParent();

            if(this.rosterToUpdate.maritalStatus.value != -1  || !this.addRoster) this.validateMaritalStatus();

            if(this.rosterToUpdate.relHH.value != -1  || !this.addRoster) this.validateRelHH();
            
            if(this.rosterToUpdate.ofi.value != -1  || !this.addRoster) this.validateOfi();

            if(this.rosterToUpdate.employment.value != -1  || !this.addRoster) this.validateEmployment();

            if(this.rosterToUpdate.highestEducationAttained.value != -1  || !this.addRoster) this.validateHighestEducationAttained();

            if(this.rosterToUpdate.attendingSchool.value != -1  || !this.addRoster) this.validateAttendingSchool();
        },  



        changeBirthYear(){

            this.rosterToUpdate.birthdayAge.age.value = "";

            this.rosterToUpdate.birthdayAge.birthYear.error = validateYear(this.rosterToUpdate.birthdayAge.birthYear.value,this.rosterToUpdate.birthdayAge.birthday_checkbox);

            if(this.rosterToUpdate.birthdayAge.birthDay.value != ""){
                
                this.rosterToUpdate.birthdayAge.birthDay.error = validateDay(this.rosterToUpdate.birthdayAge.birthDay.value, this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value);

            }

            if(this.rosterToUpdate.birthdayAge.birthMonth.value != ""){
                this.rosterToUpdate.birthdayAge.birthMonth.error = validateMonth(this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value);  
            }
            
            if(this.rosterToUpdate.birthdayAge.birthYear.error == "" && this.rosterToUpdate.birthdayAge.birthDay.error == ""){

                this.validateAgeOnBirthdayInput(computeAge(this.dateEnumerated, this.rosterToUpdate.birthdayAge.birthDay.value, this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value));
                
            }

        },

        changeBirthMonth(){

            this.rosterToUpdate.birthdayAge.age.value = "";

            
            this.rosterToUpdate.birthdayAge.birthMonth.error = validateMonth(this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value);  
            

            if(this.rosterToUpdate.birthdayAge.birthDay.value != ""){
                
                this.rosterToUpdate.birthdayAge.birthDay.error = validateDay(this.rosterToUpdate.birthdayAge.birthDay.value, this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value);

            }

            if(this.rosterToUpdate.birthdayAge.birthMonth.value !== "") this.rosterToUpdate.birthdayAge.birthMonth.value = addZero(this.rosterToUpdate.birthdayAge.birthMonth.value);
            
            if(this.rosterToUpdate.birthdayAge.birthMonth.error == "" && this.rosterToUpdate.birthdayAge.birthDay.error == ""){
                
                this.validateAgeOnBirthdayInput(computeAge(this.dateEnumerated, this.rosterToUpdate.birthdayAge.birthDay.value, this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value));
                
            }
        },

        changeBirthDay(){

            this.rosterToUpdate.birthdayAge.age.value = "";
                
            this.rosterToUpdate.birthdayAge.birthDay.error = validateDay(this.rosterToUpdate.birthdayAge.birthDay.value, this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value);

            if(this.rosterToUpdate.birthdayAge.birthDay.value !== "") this.rosterToUpdate.birthdayAge.birthDay.value = addZero(this.rosterToUpdate.birthdayAge.birthDay.value);

            if(this.rosterToUpdate.birthdayAge.birthDay.error == "" ){
                
                this.validateAgeOnBirthdayInput(computeAge(this.dateEnumerated, this.rosterToUpdate.birthdayAge.birthDay.value, this.rosterToUpdate.birthdayAge.birthMonth.value, this.rosterToUpdate.birthdayAge.birthYear.value));
                
            }

        },

        changeAge(){
            this.rosterToUpdate.birthdayAge.age.error = validateAge(this.rosterToUpdate.birthdayAge.age.value,this.rosterToUpdate.birthdayAge.age_checkbox);
            
            if(this.rosterToUpdate.pregnant.value != -1) this.validatePregnant();

            if(this.rosterToUpdate.soloParent.value != -1) this.validateSoloParent();

            if(this.rosterToUpdate.maritalStatus.value != -1) this.validateMaritalStatus();

            if(this.rosterToUpdate.relHH.value != -1) this.rosterToUpdate.relHH.error = validateRelHH(this.rosterToUpdate.relHH.value,this.rosterToUpdate.birthdayAge.age.value, this.householdHeadCount, this.rosterToUpdate.maritalStatus.value);


        },

        toggleBirthdayAge(identifier){

            this.rosterToUpdate.birthdayAge.age.value = "";
            this.rosterToUpdate.birthdayAge.birthDay.value = "";
            this.rosterToUpdate.birthdayAge.birthMonth.value = "";
            this.rosterToUpdate.birthdayAge.birthYear.value = "";
            this.rosterToUpdate.birthdayAge.age.error = "";
            this.rosterToUpdate.birthdayAge.birthDay.error = "";
            this.rosterToUpdate.birthdayAge.birthMonth.error = "";
            this.rosterToUpdate.birthdayAge.birthYear.error = "";

            if(identifier == "BIRTHDAY"){
                this.rosterToUpdate.birthdayAge.age_checkbox = false;
            } else if (identifier == "AGE"){
                this.rosterToUpdate.birthdayAge.birthday_checkbox = false;
            }

        },

        changeSex(){

            // pregnant must be validate on change as it cross validate it
            // added false parameter to counter check if validation came from changing the pregnant field
            this.rosterToUpdate.sex.error = validateSelections(this.rosterToUpdate.sex.value);

            if(this.rosterToUpdate.pregnant.value != -1){
                this.validatePregnant();
            }

        },

        validatePregnant(){
            
            this.rosterToUpdate.pregnant.error = validatePregnant(this.rosterToUpdate.pregnant.value, this.rosterToUpdate.birthdayAge.age.value, this.rosterToUpdate.sex.value);
        
        },

        validateMaritalStatus(){

            this.rosterToUpdate.maritalStatus.error = validateMaritalStatus(this.rosterToUpdate.maritalStatus.value, this.rosterToUpdate.birthdayAge.age.value);
            if(this.rosterToUpdate.relHH.value != -1) this.rosterToUpdate.relHH.error = validateRelHH(this.rosterToUpdate.relHH.value,this.rosterToUpdate.birthdayAge.age.value, this.householdHeadCount, this.rosterToUpdate.maritalStatus.value);
            if(this.rosterToUpdate.relFH.value != -1) this.rosterToUpdate.relFH.error = validateRelFH(this.rosterToUpdate.relFH.value,this.rosterToUpdate.relHH.value, this.rosterToUpdate.maritalStatus.value);
            if(this.rosterToUpdate.soloParent.value != -1) this.validateSoloParent();
        },

        validateSoloParent(){

            this.rosterToUpdate.soloParent.error = validateSoloParent(this.rosterToUpdate.soloParent.value, this.rosterToUpdate.birthdayAge.age.value, this.rosterToUpdate.relHH.value, this.rosterToUpdate.maritalStatus.value);
        
        },

        validateRelHH(){

            this.rosterToUpdate.relHH.error = validateRelHH(this.rosterToUpdate.relHH.value,this.rosterToUpdate.birthdayAge.age.value, this.householdHeadCount, this.rosterToUpdate.maritalStatus.value);
            
            if(this.rosterToUpdate.relFH.value != -1) this.rosterToUpdate.relFH.error = validateRelFH(this.rosterToUpdate.relFH.value,this.rosterToUpdate.relHH.value, this.rosterToUpdate.maritalStatus.value);
            
            if(this.rosterToUpdate.familyNumber.value != -1) this.rosterToUpdate.familyNumber.error = validateFamilyNumber(this.rosterToUpdate.familyNumber.value,this.rosterToUpdate.relHH.value,this.currentMaxFn);
            
            if(this.rosterToUpdate.soloParent.value != -1) this.validateSoloParent();
        },

        validateRelFH(){

            this.rosterToUpdate.relFH.error = validateRelFH(this.rosterToUpdate.relFH.value,this.rosterToUpdate.relHH.value, this.rosterToUpdate.maritalStatus.value);
        },

        validateFamilyNumber(){
            
            this.rosterToUpdate.familyNumber.error = validateFamilyNumber(this.rosterToUpdate.familyNumber.value,this.rosterToUpdate.relHH.value, this.currentMaxFn);
        },

        validateSeeing(){

            this.rosterToUpdate.seeing.error = validateSelections(this.rosterToUpdate.seeing.value);
             
        },

        validateHearing(){

            this.rosterToUpdate.hearing.error = validateSelections(this.rosterToUpdate.hearing.value);
             
        },

        validateWalking(){

            this.rosterToUpdate.walking.error = validateSelections(this.rosterToUpdate.walking.value);
             
        },

        validateRemembering(){

            this.rosterToUpdate.remembering.error = validateSelections(this.rosterToUpdate.remembering.value);
             
        },

        validateCaring(){

             this.rosterToUpdate.caring.error = validateSelections(this.rosterToUpdate.caring.value);

        },

        validateCommunicating(){

            this.rosterToUpdate.communicating.error = validateSelections(this.rosterToUpdate.communicating.value);

        },

        validateAttendingSchool(){

            this.rosterToUpdate.attendingSchool.error = validateAttendingSchool(this.rosterToUpdate.attendingSchool.value, this.rosterToUpdate.birthdayAge.age.value);

        },

        validateHighestEducationAttained(){

            this.rosterToUpdate.highestEducationAttained.error = validateHighestEducationAttained(this.rosterToUpdate.highestEducationAttained.value, this.rosterToUpdate.birthdayAge.age.value);
        
        },

        validateEmployment(){


            this.rosterToUpdate.employment.error = validateEmployment(this.rosterToUpdate.employment.value, this.rosterToUpdate.birthdayAge.age.value);
            
            if(this.rosterToUpdate.basisOfPayment.value != -1) this.validateBasisOfPayment();
            if(this.rosterToUpdate.classOfWorker.value != -1) this.validateClassOfWorker();
            if(this.rosterToUpdate.natureOfEmployment.value != -1)this.validateNatureOfEmployment();
            if(this.rosterToUpdate.occupationEnumerator.value != '') this.validateOccupationEnumerator();
            if(this.rosterToUpdate.occupationAreaSupervisor.value != '') this.validateOccupationAreaSupervisor();
            if(!(this.rosterToUpdate.psoc.value == null || this.rosterToUpdate.psoc.value == "")) this.validatePsoc();

        },

        validateOccupationEnumerator(){

           this.rosterToUpdate.occupationEnumerator.error = validateOccupation(this.rosterToUpdate.occupationEnumerator.value,this.rosterToUpdate.employment.value);

        },

        validateOccupationAreaSupervisor(){

           this.rosterToUpdate.occupationAreaSupervisor.error = validateOccupation(this.rosterToUpdate.occupationAreaSupervisor.value,this.rosterToUpdate.employment.value);

        },

        validatePsoc(){

            this.rosterToUpdate.psoc.error = validatePsoc(this.rosterToUpdate.psoc.value,this.rosterToUpdate.employment.value);

        },

        validateClassOfWorker(){

            this.rosterToUpdate.classOfWorker.error = validateClassOfWorker(this.rosterToUpdate.classOfWorker.value,this.rosterToUpdate.employment.value);
            if(this.rosterToUpdate.basisOfPayment.value != -1) this.validateBasisOfPayment();

        },

        validateBasisOfPayment(){

            this.rosterToUpdate.basisOfPayment.error = validateBasisOfPayment(this.rosterToUpdate.basisOfPayment.value,this.rosterToUpdate.employment.value,this.rosterToUpdate.classOfWorker.value);

        },

        validateNatureOfEmployment(){

            this.rosterToUpdate.natureOfEmployment.error = validateNatureOfEmployment(this.rosterToUpdate.natureOfEmployment.value,this.rosterToUpdate.employment.value);

        },

        validateOverseas(){


            this.rosterToUpdate.overseas.error = validateSelections(this.rosterToUpdate.overseas.value);
            
            if(this.rosterToUpdate.ofi.value != -1) this.validateOfi();
            if(this.rosterToUpdate.sendingMoney.value != -1) this.validateSendingMoney();
            if(this.rosterToUpdate.howOften.value != -1) this.validateHowOften();

        },

        validateOfi(){
            
            this.rosterToUpdate.ofi.error = validateOfi(this.rosterToUpdate.ofi.value,this.rosterToUpdate.overseas.value,this.rosterToUpdate.birthdayAge.age.value);
            if(this.rosterToUpdate.sendingMoney.value != -1) this.validateSendingMoney();

        },

        validateSendingMoney(){

            this.rosterToUpdate.sendingMoney.error = validateSendingMoney(this.rosterToUpdate.sendingMoney.value,this.rosterToUpdate.overseas.value,this.rosterToUpdate.ofi.value);
            if(this.rosterToUpdate.howOften.value != -1) this.validateHowOften();

        },

        validateHowOften(){

            this.rosterToUpdate.howOften.error = validateHowOften(this.rosterToUpdate.howOften.value,this.rosterToUpdate.overseas.value,this.rosterToUpdate.sendingMoney.value);

        }


	}


});