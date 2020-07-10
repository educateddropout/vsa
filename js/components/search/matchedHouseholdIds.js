Vue.component('matchedHouseholdIds', {
	props: ['listOfSearchedNames'],
	template: `

		<div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
                <span class="has-text-link"><u><b>HHIDs</b></u></span>
            </div>

            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                    <div v-for="list in listOfSearchedNames" v-if="list.hhid != ''">
                        <div class="dropdown-item">
                            {{list.hhid}} |
                            <span v-if="list.poorStatus == 1" class="has-text-danger">P</span>
                            <span v-else="" class="has-text-success">NP</span>
                        </div>
                        <hr class="dropdown-divider">
                    </div>
                    
                </div>
            </div>
        </div>

	`,


});