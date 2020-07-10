Vue.component('householdProfileModal', {
	props: [ 'householdDetail', 'householdRoster', 'isShowHouseholdDetailModal'],
	template: `

		<div id="modal-id" class="modal modal-fx-slideRight modal-full-screen"  :class="{ 'is-active' : isShowHouseholdDetailModal}" >
            <div class="modal-content modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Household Details</p>
                    <button class=" delete" @click="hideHouseholdDetail"></button>
                </header>
                <section class="modal-card-body">
                    <div class="w3-row">
                        <div class="w3-col l1" >&nbsp</div>
                        <div class="w3-col l10">
                            <div class="w3-row w3-container">
                                <div class="w3-row">
                                    <p><label><strong> Household ID :</strong></label> {{householdDetail.hh_id}}</p>
                                    <p>
                                        <label><strong> Address :</strong></label> 
                                            <span>{{householdDetail.region_name}}</span>
                                            <span>, {{householdDetail.province_name}}</span>
                                            <span>, {{householdDetail.city_name}}</span>
                                            <span>, {{householdDetail.barangay_name}}</span>
                                            <span v-if="householdDetail.purok_sitio != ''">, {{householdDetail.purok_sitio}}</span>
                                            <span v-if="householdDetail.street_address != ''">, {{householdDetail.street_address}}</span>
                                    </p>
                                    <p>
                                        <label><strong> Classification Status :</strong></label> 
                                        <span v-if="householdDetail.poor == 1" class="has-text-danger">POOR</span>
                                        <span v-else="" class="has-text-success">NON-POOR</span>
                                    </p>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <span class="w3-right"><button class="button is-success is-outlined" @click="matchHousehold">Match &nbsp<i class="fas fa-user-check"></i></button></span>
                                </div>
                                <br>
                                <div class="w3-row">
                                    <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round ">
                                        <thead>
                                            <tr class="has-background-grey-darker">
                                                <th colspan="8" class=" has-text-white-bis ">Household Roster Detail &nbsp<i class="fas fa-house-user"></i></th>
                                            </tr>
                                            <tr class="has-background-grey-light">
                                                <th class=" has-text-white-bis ">#</th>
                                                <th class=" has-text-white-bis ">First Name</th>
                                                <th class=" has-text-white-bis ">Middle Name</th>
                                                <th class=" has-text-white-bis ">Last Name</th>
                                                <th class=" has-text-white-bis ">Ext Name</th>
                                                <th class=" has-text-white-bis ">Sex</th>
                                                <th class=" has-text-white-bis ">Birthday</th>
                                                <th class=" has-text-white-bis "><abbr title="Relationship to Household Head">Rel HH</abbr></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="roster,index in householdRoster">
                                                <td>{{index+1}}</td>
                                                <td>{{roster.first_name}}</td>
                                                <td>{{roster.middle_name}}</td>
                                                <td>{{roster.last_name}}</td>
                                                <td>{{roster.ext_name}}</td>
                                                <td>{{roster.sex}}</td>
                                                <td>{{roster.birthdate}}</td>
                                                <td>{{defineRelHH(roster.rel_hh)}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="w3-col l1" >&nbsp</div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="hideHouseholdDetail">Cancel</button>
                </footer>
            </div>
        </div>

	`,

	methods: {

		hideHouseholdDetail(){

            this.$emit("close");

        },

        matchHousehold(){

            this.$emit("match-household");

        },

        defineRelHH(relHH){

            let retVal = "";
            
            if(relHH == "1") retVal = "1 - Household Head";
            else if(relHH == "2") retVal = "2 - Spouse";
            else if(relHH == "3") retVal = "3 - Son/Daughter";
            else if(relHH == "4") retVal = "4 - Brother/Sister";
            else if(relHH == "5") retVal = "5 - Son-in-law/Daughter-in-law";
            else if(relHH == "6") retVal = "6 - Grandson/Granddaughter";
            else if(relHH == "7") retVal = "7 - Father/Mother";
            else if(relHH == "8") retVal = "8 - Other relative";
            else if(relHH == "9") retVal = "9 - Boarder";
            else if(relHH == "10") retVal = "10 - Domestic helper";
            else if(relHH == "11") retVal = "11 - Non-relative";

            return retVal;
            
        }

	}


});