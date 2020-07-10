Vue.component('familyRosterDivSelect', {
    props: ['object', 'value', 'disableCtr', 'helpLabel'],
    template: `
        <div class="w3-row-padding">
            <div class="w3-row">
                <label >
                    <strong><abbr :title="object.abbr">{{object.label}}</abbr></strong>
                    
                </label>
            </div>
            <div class="w3-row">
                <div class="select is-fullwidth" :class="{'is-danger': value.error != ''}">
                    <select  v-model="value.value" :disabled="disableCtr" @change="validateSelect(value.value)">
                        <option value="-1" >Please Select</option>
                        <option v-for="selection in object.lib" :value="selection.value" >{{selection.label}}</option>
                    </select>
                </div>
                <p class="help is-danger">{{value.error}}</p>
            </div>
        </div>
    `,

    methods : {
        validateSelect(value){

            this.$emit("validate-select");
            //this.value.error = validateSelections(value);
        }
    }
});