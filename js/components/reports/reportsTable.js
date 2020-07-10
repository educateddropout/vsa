Vue.component('reportsTable', {
	props: ['listOfGrievance', 'householdRoster','origHouseholdDetail','origHouseholdRoster', 'libRegions'],
	template: `
        <div>
            <div class="w3-row">
                <div class="w3-col l1" >&nbsp</div>
                <div class="w3-col l10">
                    <div class="w3-row w3-container">
                        <table class="table is-fullwidth is-striped" style="overflow-x:auto;">
                            <thead>
                                <tr>
                                <th>&nbsp</abbr></th>
                                <th>Province</th>
                                <th>City</abbr></th>
                                <th>Barangay</th>
                                <th><abbr title="Grievance Type">GT</abbr></th>
                                <th>Date Of Complaint</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                <div class="w3-col l1" >&nbsp</div>
            </div>
        </div>

	`,

    data(){
        return {

           

        }

    },

	methods: {

      

	}


});