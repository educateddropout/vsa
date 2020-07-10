Vue.component('education', {
    props: ['education', 'attendingSchool', 'highestEducationAttained', 'disableCtr', 'age'],
    template: `
        <div class="w3-container ">
            
            <fieldset class="w3-border w3-round w3-border-black">
                <legend><strong>&nbspEducation&nbsp</strong></legend>
                

                <div class="w3-row">
                    <family-roster-div-select
                        :object = "attendingSchool"
                        :value = "education.attendingSchool"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateAttendingSchool"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "highestEducationAttained"
                        :value = "education.highestEducationAttained"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateHighestEducationAttained()"
                    >
                    </family-roster-div-select>
                </div>

                
                <br>
            </fieldset>

        </div>
    `,

    methods : {

        validateAttendingSchool(){

            this.education.attendingSchool.error = validateAttendingSchool(this.education.attendingSchool.value, this.age);

        },

        validateHighestEducationAttained(){

            this.education.highestEducationAttained.error = validateHighestEducationAttained(this.education.highestEducationAttained.value, this.age);
        
        }
    }

});
