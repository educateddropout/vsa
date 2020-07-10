Vue.component('searchSection', {
	props: ['searchData','isShowLoadingModal', 'hasSelectedMatch','listOfSearchedNames'],
	template: `

		<section class=" is-paddingless">
                    
            <div class="hero-body">
                <div class=" w3-row">
                        
                        <div class="w3-row w3-container">
                            <label class="label is-size-4"> Search <i class="fas fa-search"></i> </label>
                        </div>
                        <div class="w3-row">
                            <div class="w3-col l11">
                                <div class="w3-row-padding">
                                    <div class="w3-third">
                                        <input class="input upperCase is-medium" type="text" v-model="searchData.firstName.value" :class="{ 'is-danger' : searchData.firstName.error != ''}" :disabled="!hasSelectedMatch">
                                        <p class="" :class="{ 'is-danger' : searchData.firstName.error != ''}">First Name</p>
                                        <p class="help is-danger">{{ searchData.firstName.error }}</p>
                                        <br>
                                    </div>
                                    <div class="w3-third">
                                        <input class="input upperCase is-medium" type="text" v-model="searchData.middleName.value"   :class="{ 'is-danger' : searchData.middleName.error != ''}" :disabled="!hasSelectedMatch">
                                        <p class="" :class="{ 'is-danger' : searchData.middleName.error != ''}">Middle Name</p>
                                        <p class="help is-danger">{{ searchData.middleName.error }}</p>
                                        <br>
                                    </div>
                                    <div class="w3-third">
                                        <input class="input upperCase is-medium" type="text" v-model="searchData.lastName.value"  :class="{ 'is-danger' : searchData.lastName.error != ''}" :disabled="!hasSelectedMatch">
                                        <p class="" :class="{ 'is-danger' : searchData.lastName.error != ''}">Last Name</p>
                                        <p class="help is-danger">{{ searchData.lastName.error }}</p>
                                        <br>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-col l1 w3-right">
                                <div class="w3-row w3-row-padding w3-container">
                                    <button class="button is-link is-outlined is-medium" @click="searchNames" :disabled="isShowLoadingModal || !hasSelectedMatch"> <i class="fas fa-search"></i> </button>
                                </div>
                            </div>
                        </div>


                </div>
            </div>
            <div class="modal" :class="{'is-active':modalMessage != ''}">
                <div class="modal-background" @click = "closeModal"></div>
                <div class="modal-card">
                    <section class="modal-card-body is-size-5 has-text-warning">
                        <b><i class="fas fa-exclamation-circle"></i>&nbsp {{modalMessage}}</b>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-warning is-medium" @click = "searchName">Continue</button>
                        <button class="button is-danger is-medium" @click = "closeModal">Cancel</button>
                    </footer>
                </div>
            </div>
        </section>

	`,

    data(){
        return {
            modalMessage : "",
            moveToStepCounter : -1,
        }
    },

	methods: {

        closeModal(){
            this.modalMessage = "";
        },

        searchNames(){

            this.searchData.lastName.error = searchNames(this.searchData.lastName.value);
            
            if(this.searchData.lastName.error == ""){
                if(this.listOfSearchedNames.length > 2){
                    this.modalMessage = "You already have 3 searched names.";
                }
                else{
                    this.searchName();
                }
            } 

        },

        searchName(){
            this.$emit("search-names");
            this.closeModal();
        }

	},

    computed: {

        loadingColor(){
            return {
                'is-danger' : this.count < 21,
                'is-warning' : this.count > 20 && this.count < 41,
                'is-link' : this.count > 40 && this.count < 61,
                'is-info' : this.count > 60 && this.count < 81,
                'is-primary' : this.count > 80 && this.count < 100,
                'is-success' : this.count > 99
            }
        }
    }


});