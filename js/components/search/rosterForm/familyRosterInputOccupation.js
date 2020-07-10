Vue.component('familyRosterInputOccupation', {
    props: ['object', 'value', 'disableCtr', 'maxLength', 'helpLabel'],
    template: `
        <div class="w3-row-padding">
            <div class="w3-row ">
                <p class="help"><strong>{{helpLabelComputed}}</strong></p>
                <input type="text" class="input" :class="{'is-danger': value.error != ''}" :maxlength="maxLength" v-model="value.value" @keyup="value.value = value.value.toUpperCase()" :disabled="disableCtr" @change="validateInput()">
                <p class="help is-danger">{{value.error}}</p>
                
                
            </div>
        </div>
    `,
    methods : {

        validateInput(value){

            this.$emit('validate-text-input');

        }
    },

    computed : {
        helpLabelComputed(){
            return (this.helpLabel == 1? '41. Enumerator' : '42. Area Supervisor');
        }
    }
});