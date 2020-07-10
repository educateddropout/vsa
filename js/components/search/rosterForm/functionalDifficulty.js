Vue.component('functionalDifficulty', {
    props: ['functionalDifficulty', 'seeing', 'hearing', 'walking', 'remembering', 'caring', 'communicating', 'disableCtr'],
    template: `
        <div class="w3-container ">
            
            <fieldset class="w3-border w3-round w3-border-black">
                <legend><strong>&nbspFunctional Difficulty&nbsp</strong></legend>
                

                <div class="w3-row">
                    <family-roster-div-select
                        :object = "seeing"
                        :value = "functionalDifficulty.seeing"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateSeeing"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "hearing"
                        :value = "functionalDifficulty.hearing"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateHearing"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "walking"
                        :value = "functionalDifficulty.walking"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateWalking"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "remembering"
                        :value = "functionalDifficulty.remembering"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateRemembering"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "caring"
                        :value = "functionalDifficulty.caring"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateCaring"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "communicating"
                        :value = "functionalDifficulty.communicating"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateCommunicating"
                    >
                    </family-roster-div-select>
                </div>
                <br>
            </fieldset>

        </div>
    `,

    methods : {

        validateSeeing(){

            this.functionalDifficulty.seeing.error = validateSelections(this.functionalDifficulty.seeing.value);
             
        },

        validateHearing(){

            this.functionalDifficulty.hearing.error = validateSelections(this.functionalDifficulty.hearing.value);
             
        },

        validateWalking(){

            this.functionalDifficulty.walking.error = validateSelections(this.functionalDifficulty.walking.value);
             
        },

        validateRemembering(){

            this.functionalDifficulty.remembering.error = validateSelections(this.functionalDifficulty.remembering.value);
             
        },

        validateCaring(){

             this.functionalDifficulty.caring.error = validateSelections(this.functionalDifficulty.caring.value);

        },

        validateCommunicating(){

            this.functionalDifficulty.communicating.error = validateSelections(this.functionalDifficulty.communicating.value);

        }
    }

});
