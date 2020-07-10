Vue.component('searchedList', {
	props: ['listOfSearchedNames', 'hasSelectedMatch'],
	template: `
        <div>
            
    		<section class=" is-paddingless">
                        
                <div class="hero-body">
                    <div class=" w3-row overflow">
                        
                        <div class="w3-row w3-container " >
                            <span class="has-text-info"><strong><i class="fas fa-th-list"></i> List of Searched Names</strong></span>
                            <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round " >
                                <thead class="has-background-grey-darker">
                                    <tr>
                                        <th class=" has-text-white-bis ">#</th>
                                        <th class=" has-text-white-bis ">First Name</th>
                                        <th class=" has-text-white-bis ">Middle Name</th>
                                        <th class=" has-text-white-bis ">Last Name</th>
                                        <th class=" has-text-white-bis ">Poverty Status</th>
                                        <th class=" has-text-white-bis w3-center">Matched?</th>
                                        <th class=" has-text-white-bis w3-center w3-border-left"></th>
                                    </tr>
                                    <tr class="has-background-grey-light" v-show="listOfSearchedNames.length < 1">
                                        <th class=" " colspan="7">Please search a name. &nbsp<i class="fas fa-mug-hot"></i></th>
                                    </tr>
                                </thead>
                                <tbody v-show="listOfSearchedNames.length > 0">
                                    <tr v-for="list,index in listOfSearchedNames" >
                                        <td>{{index+1}}</td>
                                        <td>{{list.firstName}}</td>
                                        <td>{{list.middleName}}</td>
                                        <td>{{list.lastName}}</td>
                                        <td>
                                            <span class="has-text-danger" v-if="list.poorStatus == '1'">POOR</span>
                                            <span class="has-text-success" v-else-if="list.poorStatus == '0'">NON-POOR</span>
                                        </td>
                                        <td class="w3-center">
                                            <span v-if="list.isMatch == 1" class="has-text-success">Match &nbsp  <i class="fas fa-check-circle"></i> </span>
                                            <span v-else-if="list.isMatch == -1" class="has-text-danger">  No Match &nbsp <i class="fas fa-not-equal"></i></span>
                                            <span v-else="list.isMatch">&nbsp</span>
                                        </td>
                                        <td class="w3-border-left has-text-danger w3-center"><span @click="deleteSearched(index)"><i class="fas fa-trash-alt"></i></span></td>
                                    </tr>
                                </tbody>
                            </table>

                            
                        </div>

                    </div>
                </div>

            </section>
        </div>

	`,

	methods: {

        deleteSearched(index){
            this.listOfSearchedNames.splice(index, 1);
        }

	}


});