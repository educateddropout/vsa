Vue.component('searchListDiv', {
	props: ['searchNamesList', 'hasSelectedMatch'],
	template: `
        
        <div>
		<section class=" is-paddingless" >
                    
            <div class="hero-body" v-show="!hasSelectedMatch">
                <div class="w3-container">
                    <div class="w3-row" >
                        <span class="w3-right"><button class="button is-danger is-outlined" v-show="searchNamesList.length > 0 " @click="noMatchHousehold"><i class="fas fa-not-equal"></i> &nbsp No Match</button></span>
                        <br>
                    </div>
                    <div class="w3-row overflow" >
                        <span class="has-text-info"><strong><i class="fas fa-poll-h"></i> Search Result/s</strong></span>
                        <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round " >
                            <thead class="has-background-grey-dark">
                                <tr>
                                    <th class=" has-text-white-bis ">#</th>
                                    <th class=" has-text-white-bis ">First Name</th>
                                    <th class=" has-text-white-bis ">Middle Name</th>
                                    <th class=" has-text-white-bis ">Last Name</th>
                                    <th class=" has-text-white-bis ">Ext Name</th>
                                    <th class=" has-text-white-bis ">Sex</th>
                                    <th class=" has-text-white-bis ">Birthday</th>
                                    <th class=" has-text-white-bis "><abbr title="Household ID">HHID</abbr></th>
                                </tr>
                                <tr class="has-background-grey-light" v-show="searchNamesList.length < 1">
                                    <th class=" " colspan="8">No Result/s found. &nbsp<i class="fa fa-ban" aria-hidden="true"></i></th>
                                </tr>
                            </thead>
                            <tbody v-show="searchNamesList.length > 0">
                                <tr v-for="list,index in searchNamesList">
                                    <td>{{index+1}}</td>
                                    <td>{{list.first_name}}</td>
                                    <td>{{list.middle_name}}</td>
                                    <td>{{list.last_name}}</td>
                                    <td>{{list.ext_name}}</td>
                                    <td>{{list.sex}}</td>
                                    <td>{{list.birthdate}}</td>
                                    <td class="has-text-link pointer" @click="getHouseholdDetail(list.hh_id)"><u>{{list.hh_id}}</u></td>
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

		getHouseholdDetail(hhid){

			this.$emit('get-household-detail', hhid);

		},

        noMatchHousehold(){
            this.$emit('no-match-household');
        }

	}


});