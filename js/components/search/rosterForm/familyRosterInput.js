Vue.component('familyRosterInput', {
    props: ['object', 'value', 'disableCtr', 'maxLength', 'type'],
    template: `
        <div class="w3-row-padding">
            <div class="w3-row my-padding-top my-padding-bottom">
                <label>
                    <strong><abbr :title="object.abbr">{{object.label}}</abbr></strong>
                </label>
            </div>
            <div class="w3-row ">
                <input :type="type" class="input upperCase" :class="{'is-danger': value.error != ''}" max="20" :maxlength="maxLength" v-model="value.value" :disabled="disableCtr" @change="validateInput()">
                <p class="help is-danger">{{value.error}}</p>
            </div>
            <div class="w3-row " v-if="listOfSelectedPsoc.length > 0">
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Code</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(psoc,index) in listOfSelectedPsoc">
                                <td>{{index+1}}</td>
                                <td>{{psoc.code}}</td>
                                <td class="has-text-info">{{psoc.name.substr(0,psoc.name.length-6)}}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    `,
    methods : {

        validateInput(){

            this.$emit('validate-text-input');

        }
    },

    computed: {

        listOfSelectedPsoc(){
            let list = [];
            let self = this;

            if(this.value.error == ""){
                list = this.object.lib.filter(psoc => psoc.code == self.value.value);
            }

            return list;
        }

    }

});