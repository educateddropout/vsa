Vue.component('nameRequirements', {
	props: ['generalInfo'],
	template: `

		<div>
        
            <div class="w3-row">
            
                <div class="w3-col l3">&nbsp</div>
                <div class="w3-col l6">
                    <div class="w3-row w3-card-4 w3-round-large">
                        <div class="w3-col l1">&nbsp</div>
                        <div class="w3-col l10">
                            <div class="w3-row  w3-container">
                                <br><br>
                                <div class="w3-row">
                                    <label class="label is-size-4"> Name </label>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <input class="input upperCase is-medium" type="text" v-model="generalInfo.firstName.value" @change="validateFirstName" :class="{ 'is-danger' : generalInfo.firstName.error != ''}" >
                                    <p class="" :class="{ 'is-danger' : generalInfo.firstName.error != ''}">First Name</p>
                                    <p class="help is-danger">{{ generalInfo.firstName.error }}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <input class="input upperCase is-medium" type="text" v-model="generalInfo.middleName.value"  @change="validateMiddleName" :class="{ 'is-danger' : generalInfo.middleName.error != ''}" >
                                    <p class="" :class="{ 'is-danger' : generalInfo.middleName.error != ''}">Middle Name</p>
                                    <p class="help is-danger">{{ generalInfo.middleName.error }}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <input class="input upperCase is-medium" type="text" v-model="generalInfo.lastName.value" @change="validateLastName" :class="{ 'is-danger' : generalInfo.lastName.error != ''}" >
                                    <p class="" :class="{ 'is-danger' : generalInfo.lastName.error != ''}">Last Name</p>
                                    <p class="help is-danger">{{ generalInfo.lastName.error }}</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <div class="select is-fullwidth is-medium">
                                        <select v-model="generalInfo.extName.value">
                                            <option v-for="extName in libExtensionNames" :value="extName.value">{{extName.label}}</option>
                                        </select>
                                    </div>
                                    <p class="">Ext Name</p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <button class="button w3-right is-link is-large" @click="moveToSearch">Next &nbsp <i class="fas fa-chevron-circle-right"></i></button>
                                </div>
                                    
                                <br><br>
                            </div>
                        </div>
                        <div class="w3-col l1">&nbsp</div>
                    </div>
                </div>
                <div class="w3-col l3">&nbsp</div>
            </div>

        </div>

	`,

    data(){
        return {
             libExtensionNames : extNameSelection()
        }
    },  

	methods: {

        validateFirstName(){
            this.generalInfo.firstName.error = validateName(this.generalInfo.firstName.value,'FIRSTNAME');
        },

        validateMiddleName(){

            this.generalInfo.middleName.error = validateName(this.generalInfo.middleName.value,'MIDDLENAME');

        },

        validateLastName(){

            this.generalInfo.lastName.error = validateName(this.generalInfo.lastName.value,'LASTNAME');

        },

        moveToSearch(){
            
            this.validateLastName();

            if(this.generalInfo.lastName.error == "") this.$emit('move-to-search');

        }

	}


});


