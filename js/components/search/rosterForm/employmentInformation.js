Vue.component('employmentInformation', {
    props: ['employmentInformation', 'employment', 'occupation', 'psoc', 'classOfWorker', 'natureOfEmployment', 'basisOfPayment', 'disableCtr', 'age'],
    template: `
        <div class="w3-container ">
            
            <fieldset class="w3-border w3-round w3-border-black">
                <legend><strong>&nbspEmployment Information&nbsp</strong></legend>


                <div class="w3-row">
                    <family-roster-div-select
                        :object = "employment"
                        :value = "employmentInformation.employment"
                        :disableCtr = "disableCtr"
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
                            :value = "employmentInformation.occupationEnumerator"
                            :disableCtr = "disableCtr"
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
                            :value = "employmentInformation.occupationAreaSupervisor"
                            :disableCtr = "disableCtr"
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
                        :value = "employmentInformation.psoc"
                        :disableCtr = "disableCtr"
                        :maxLength = "4"
                        @validate-text-input = "validatePsoc()"
                    >
                    </family-roster-input>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "classOfWorker"
                        :value = "employmentInformation.classOfWorker"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateClassOfWorker()"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "basisOfPayment"
                        :value = "employmentInformation.basisOfPayment"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateBasisOfPayment()"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "natureOfEmployment"
                        :value = "employmentInformation.natureOfEmployment"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateNatureOfEmployment()"
                    >
                    </family-roster-div-select>
                </div>

                <br>
            </fieldset>

        </div>
    `,

    methods : {

        validateEmployment(){

            this.employmentInformation.employment.error = validateEmployment(this.employmentInformation.employment.value, this.age);
            
            if(this.employmentInformation.basisOfPayment.value != -1) this.validateBasisOfPayment();
            if(this.employmentInformation.classOfWorker.value != -1) this.validateClassOfWorker();
            if(this.employmentInformation.natureOfEmployment.value != -1)this.validateNatureOfEmployment();
            if(this.employmentInformation.occupationEnumerator.value != '') this.validateOccupationEnumerator();
            if(this.employmentInformation.occupationAreaSupervisor.value != '') this.validateOccupationAreaSupervisor();
            if(!(this.employmentInformation.psoc.value == null || this.employmentInformation.psoc.value == "")) this.validatePsoc();

        },

        validateOccupationEnumerator(){

           this.employmentInformation.occupationEnumerator.error = validateOccupation(this.employmentInformation.occupationEnumerator.value,this.employmentInformation.employment.value);

        },

        validateOccupationAreaSupervisor(){

           this.employmentInformation.occupationAreaSupervisor.error = validateOccupation(this.employmentInformation.occupationAreaSupervisor.value,this.employmentInformation.employment.value);

        },

        validatePsoc(){

            this.employmentInformation.psoc.error = validatePsoc(this.employmentInformation.psoc.value,this.employmentInformation.employment.value);

        },

        validateClassOfWorker(){

            this.employmentInformation.classOfWorker.error = validateClassOfWorker(this.employmentInformation.classOfWorker.value,this.employmentInformation.employment.value);
            if(this.employmentInformation.basisOfPayment.value != -1) this.validateBasisOfPayment();

        },

        validateBasisOfPayment(){

            this.employmentInformation.basisOfPayment.error = validateBasisOfPayment(this.employmentInformation.basisOfPayment.value,this.employmentInformation.employment.value,this.employmentInformation.classOfWorker.value);

        },

        validateNatureOfEmployment(){

            this.employmentInformation.natureOfEmployment.error = validateNatureOfEmployment(this.employmentInformation.natureOfEmployment.value,this.employmentInformation.employment.value);

        }

    }

});
