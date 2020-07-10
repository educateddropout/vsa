Vue.component('personalInformation', {
    props: ['personalInformation', 'extNames', 'sex', 'pregnant', 'maritalStatus', 'soloParent', 'relHH', 'relFH', 'familyNumber', 'disableCtr', 'dateEnumerated', 'householdHeadCount', 'currentMaxFn'],
    template: `
        <div class="w3-container ">
            
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
                                <input class="input" maxlength="40" :class="{'is-danger':personalInformation.lastName.error != ''}" @change="validateLastName(personalInformation.lastName.value)" @keyup="personalInformation.lastName.value = personalInformation.lastName.value.toUpperCase()" type="text" v-model="personalInformation.lastName.value" :disabled="disableCtr">
                                
                                <p class="help is-danger">{{personalInformation.lastName.error}}</p>
                            </div>
                            <div class="w3-row">
                                <p class="help">First</p>
                                <input class="input" type="text" maxlength="40" :class="{'is-danger':personalInformation.firstName.error != ''}" v-model="personalInformation.firstName.value" @keyup="personalInformation.firstName.value = personalInformation.firstName.value.toUpperCase()" @change="validateFirstName(personalInformation.firstName.value)" :disabled="disableCtr">
                                
                                <p class="help is-danger">{{personalInformation.firstName.error}}</p>
                            </div>
                            <div class="w3-row">
                                <p class="help">Middle</p>
                                <input class="input" type="text" maxlength="40" :class="{'is-danger':personalInformation.middleName.error != ''}" v-model="personalInformation.middleName.value" @keyup="personalInformation.middleName.value = personalInformation.middleName.value.toUpperCase()" @change="validateMiddleName(personalInformation.middleName.value)" :disabled="disableCtr">
                                
                                <p class="help is-danger">{{personalInformation.middleName.error}}</p>
                            </div>
                            <p class="help">Ext</p>
                            <div class="select is-fullwidth" >
                                <select v-model="personalInformation.extName.value" :disabled="disableCtr">
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
                                            <input class="w3-check w3-border" type="checkbox" v-model="personalInformation.birthdayAge.birthday_checkbox" @click="toggleBirthdayAge('BIRTHDAY')" :disabled = "disableCtr">
                                        </div>
                                        <div class="w3-col l3">
                                            <input class="input" type="text" :class="{'is-danger' : personalInformation.birthdayAge.birthMonth.error != ''}" maxlength="2" v-model="personalInformation.birthdayAge.birthMonth.value" :disabled="disableCtr || !personalInformation.birthdayAge.birthday_checkbox" @change="changeBirthMonth">
                                            <p class="help">MM</p>
                                            <p class="help is-danger">{{personalInformation.birthdayAge.birthMonth.error}}</p>
                                        </div>
                                        <div class="w3-col l3">
                                            <input class="input" type="text" :class="{'is-danger' : personalInformation.birthdayAge.birthDay.error != ''}" maxlength="2" v-model="personalInformation.birthdayAge.birthDay.value" :disabled="disableCtr || !personalInformation.birthdayAge.birthday_checkbox" @change="changeBirthDay">
                                            <p class="help">DD</p>
                                            <p class="help is-danger">{{personalInformation.birthdayAge.birthDay.error}}</p>
                                        </div>
                                        <div class="w3-col l4">
                                            <input class="input" type="text" :class="{'is-danger' : personalInformation.birthdayAge.birthYear.error != ''}" maxlength="4" v-model="personalInformation.birthdayAge.birthYear.value" :disabled="disableCtr || !personalInformation.birthdayAge.birthday_checkbox" @change="changeBirthYear">
                                            <p class="help">YYYY</p>
                                            <p class="help is-danger">{{personalInformation.birthdayAge.birthYear.error}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="w3-col l4">
                                    <div class="w3-row-padding">
                                        <div class="w3-col l3">
                                            <input class="w3-check" type="checkbox" v-model="personalInformation.birthdayAge.age_checkbox" @click="toggleBirthdayAge('AGE')" :disabled = "disableCtr">
                                        </div>
                                        <div class="w3-col l9">
                                            <input class="input" type="text" :class="{'is-danger' : personalInformation.birthdayAge.age.error != ''}" maxlength="3" v-model="personalInformation.birthdayAge.age.value" :disabled="disableCtr || !personalInformation.birthdayAge.age_checkbox" @change="changeAge">
                                            <p class="help">Age</p>
                                            <p class="help is-danger">{{personalInformation.birthdayAge.age.error}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-row w3-padding">
                                <p class="help is-danger">{{personalInformation.birthdayAge.error}}</p>
                            </div>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "sex"
                                    :value = "personalInformation.sex"
                                    :disableCtr = "disableCtr"
                                    @validate-select = "changeSex"
                                >
                                </family-roster-div-select>
                            </div>
                            <br>
                            <div class="w3-row">
                                <family-roster-div-select
                                    :object = "pregnant"
                                    :value = "personalInformation.pregnant"
                                    :disableCtr = "disableCtr"
                                    @validate-select = "validatePregnant()"
                                >
                                </family-roster-div-select>
                            </div>
                        </div>
                        <br>
                        

                        <div class="w3-row">
                            <family-roster-div-select
                                :object = "maritalStatus"
                                :value = "personalInformation.maritalStatus"
                                :disableCtr = "disableCtr"
                                @validate-select = "validateMaritalStatus()"
                            >
                            </family-roster-div-select>
                        </div>
                        <br>
                        <div class="w3-row ">
                            <family-roster-div-select
                                :object = "soloParent"
                                :value = "personalInformation.soloParent"
                                :disableCtr = "disableCtr"
                                @validate-select = "validateSoloParent()"
                            >
                            </family-roster-div-select>
                        </div>
                        <br>
                        <div class="w3-row ">
                            <family-roster-div-select
                                :object = "relHH"
                                :value = "personalInformation.relHH"
                                :disableCtr = "disableCtr"
                                @validate-select = "validateRelHH()"
                            >
                            </family-roster-div-select>
                        </div>
                        <br>
                        <div class="w3-row ">
                            <family-roster-div-select
                                :object = "relFH"
                                :value = "personalInformation.relFH"
                                :disableCtr = "disableCtr"
                                @validate-select = "validateRelFH()"
                            >
                            </family-roster-div-select>
                        </div>
                        <br>
                        <div class="w3-row">
                            <family-roster-div-select
                                :object = "familyNumber"
                                :value = "personalInformation.familyNumber"
                                :disableCtr = "disableCtr"
                                @validate-select = "validateFamilyNumber()"
                            >
                            </family-roster-div-select>
                        </div>

                    </div>
                </div>
                <br>
            </fieldset>

        </div>
    `,

    data(){

        return{
            helpLabel : true,
        }

    },

    methods : {

        validateFirstName(name){

            this.personalInformation.firstName.error = validateName(name, 'FIRSTNAME');

        },

        validateMiddleName(name){

            this.personalInformation.middleName.error = validateName(name, 'MIDDLENAME');

        },

        validateLastName(name){

            this.personalInformation.lastName.error = validateName(name, 'LASTNAME');

        },

        validateAgeOnBirthdayInput(age){

            this.personalInformation.birthdayAge.age.value = age;
            this.personalInformation.birthdayAge.age.error = validateAge(age,this.personalInformation.birthdayAge.age_checkbox);
            
            if(this.personalInformation.pregnant.value != -1) this.validatePregnant();

            if(this.personalInformation.soloParent.value != -1) this.validateSoloParent();

            if(this.personalInformation.maritalStatus.value != -1) this.validateMaritalStatus();

            if(this.personalInformation.relHH.value != -1) this.personalInformation.relHH.error = validateRelHH(this.personalInformation.relHH.value,this.personalInformation.birthdayAge.age.value, this.householdHeadCount, this.personalInformation.maritalStatus.value);
            
            // trigger validate fields with age cross validation
            this.$emit('change-age');

        },

        changeBirthYear(){

            this.personalInformation.birthdayAge.age.value = "";

            this.personalInformation.birthdayAge.birthYear.error = validateYear(this.personalInformation.birthdayAge.birthYear.value,this.personalInformation.birthdayAge.birthday_checkbox);

            if(this.personalInformation.birthdayAge.birthDay.value != ""){
                
                this.personalInformation.birthdayAge.birthDay.error = validateDay(this.personalInformation.birthdayAge.birthDay.value, this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value);

            }

            if(this.personalInformation.birthdayAge.birthMonth.value != ""){
                this.personalInformation.birthdayAge.birthMonth.error = validateMonth(this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value);  
            }
            
            if(this.personalInformation.birthdayAge.birthYear.error == "" && this.personalInformation.birthdayAge.birthDay.error == ""){

                this.validateAgeOnBirthdayInput(computeAge(this.dateEnumerated, this.personalInformation.birthdayAge.birthDay.value, this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value));
                
            }

        },

        changeBirthMonth(){

            this.personalInformation.birthdayAge.age.value = "";

            
            this.personalInformation.birthdayAge.birthMonth.error = validateMonth(this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value);  
            

            if(this.personalInformation.birthdayAge.birthDay.value != ""){
                
                this.personalInformation.birthdayAge.birthDay.error = validateDay(this.personalInformation.birthdayAge.birthDay.value, this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value);

            }

            if(this.personalInformation.birthdayAge.birthMonth.value !== "") this.personalInformation.birthdayAge.birthMonth.value = addZero(this.personalInformation.birthdayAge.birthMonth.value);
            
            if(this.personalInformation.birthdayAge.birthMonth.error == "" && this.personalInformation.birthdayAge.birthDay.error == ""){
                
                this.validateAgeOnBirthdayInput(computeAge(this.dateEnumerated, this.personalInformation.birthdayAge.birthDay.value, this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value));
                
            }
        },

        changeBirthDay(){

            this.personalInformation.birthdayAge.age.value = "";
                
            this.personalInformation.birthdayAge.birthDay.error = validateDay(this.personalInformation.birthdayAge.birthDay.value, this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value);

            if(this.personalInformation.birthdayAge.birthDay.value !== "") this.personalInformation.birthdayAge.birthDay.value = addZero(this.personalInformation.birthdayAge.birthDay.value);

            if(this.personalInformation.birthdayAge.birthDay.error == "" ){
                
                this.validateAgeOnBirthdayInput(computeAge(this.dateEnumerated, this.personalInformation.birthdayAge.birthDay.value, this.personalInformation.birthdayAge.birthMonth.value, this.personalInformation.birthdayAge.birthYear.value));
                
            }

        },

        changeAge(){

            this.personalInformation.birthdayAge.age.error = validateAge(this.personalInformation.birthdayAge.age.value,this.personalInformation.birthdayAge.age_checkbox);
            
            if(this.personalInformation.pregnant.value != -1) this.validatePregnant();

            if(this.personalInformation.soloParent.value != -1) this.validateSoloParent();

            if(this.personalInformation.maritalStatus.value != -1) this.validateMaritalStatus();

            if(this.personalInformation.relHH.value != -1) this.personalInformation.relHH.error = validateRelHH(this.personalInformation.relHH.value,this.personalInformation.birthdayAge.age.value, this.householdHeadCount, this.personalInformation.maritalStatus.value);

            // trigger validate fields with age cross validation
            this.$emit('change-age');

        },

        toggleBirthdayAge(identifier){

            this.personalInformation.birthdayAge.age.value = "";
            this.personalInformation.birthdayAge.birthDay.value = "";
            this.personalInformation.birthdayAge.birthMonth.value = "";
            this.personalInformation.birthdayAge.birthYear.value = "";
            this.personalInformation.birthdayAge.age.error = "";
            this.personalInformation.birthdayAge.birthDay.error = "";
            this.personalInformation.birthdayAge.birthMonth.error = "";
            this.personalInformation.birthdayAge.birthYear.error = "";

            if(identifier == "BIRTHDAY"){
                this.personalInformation.birthdayAge.age_checkbox = false;
            } else if (identifier == "AGE"){
                this.personalInformation.birthdayAge.birthday_checkbox = false;
            }

        },

        changeSex(){

            // pregnant must be validate on change as it cross validate it
            // added false parameter to counter check if validation came from changing the pregnant field
            this.personalInformation.sex.error = validateSelections(this.personalInformation.sex.value);

            if(this.personalInformation.pregnant.value != -1){
                this.validatePregnant();
            }

        },

        validatePregnant(){
            
            this.personalInformation.pregnant.error = validatePregnant(this.personalInformation.pregnant.value, this.personalInformation.birthdayAge.age.value, this.personalInformation.sex.value);
        
        },

        validateMaritalStatus(){

            this.personalInformation.maritalStatus.error = validateMaritalStatus(this.personalInformation.maritalStatus.value, this.personalInformation.birthdayAge.age.value);
            if(this.personalInformation.relHH.value != -1) this.personalInformation.relHH.error = validateRelHH(this.personalInformation.relHH.value,this.personalInformation.birthdayAge.age.value, this.householdHeadCount, this.personalInformation.maritalStatus.value);
            if(this.personalInformation.relFH.value != -1) this.personalInformation.relFH.error = validateRelFH(this.personalInformation.relFH.value,this.personalInformation.relHH.value, this.personalInformation.maritalStatus.value);
            if(this.personalInformation.soloParent.value != -1) this.validateSoloParent();
        },

        validateSoloParent(){

            this.personalInformation.soloParent.error = validateSoloParent(this.personalInformation.soloParent.value, this.personalInformation.birthdayAge.age.value, this.personalInformation.relHH.value, this.personalInformation.maritalStatus.value);
        
        },

        validateRelHH(){

            this.personalInformation.relHH.error = validateRelHH(this.personalInformation.relHH.value,this.personalInformation.birthdayAge.age.value, this.householdHeadCount, this.personalInformation.maritalStatus.value);
            
            if(this.personalInformation.relFH.value != -1) this.personalInformation.relFH.error = validateRelFH(this.personalInformation.relFH.value,this.personalInformation.relHH.value, this.personalInformation.maritalStatus.value);
            
            if(this.personalInformation.familyNumber.value != -1) this.personalInformation.familyNumber.error = validateFamilyNumber(this.personalInformation.familyNumber.value,this.personalInformation.relHH.value,this.currentMaxFn);
            
            if(this.personalInformation.soloParent.value != -1) this.validateSoloParent();
        },

        validateRelFH(){

            this.personalInformation.relFH.error = validateRelFH(this.personalInformation.relFH.value,this.personalInformation.relHH.value, this.personalInformation.maritalStatus.value);
        },

        validateFamilyNumber(){
            
            this.personalInformation.familyNumber.error = validateFamilyNumber(this.personalInformation.familyNumber.value,this.personalInformation.relHH.value, this.currentMaxFn);
        }
    }

});
