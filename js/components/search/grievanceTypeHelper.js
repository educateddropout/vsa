Vue.component('grievanceTypeHelper', {
	props: [],
	template: `

		<div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
                <span><i class="far fa-question-circle"></i></span>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                    <div class="dropdown-item">
                        <p>Exclusion Grievance Type 1 <strong> (EX01)</strong> - A specific household is poor and must be included in the list of poor households.</p>
                    </div>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                        <p>Exclusion Grievance Type 2 <strong> (EX02)</strong> - A specific household is poor but is not interviewed during the data collection period.</p>
                    </div>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                        <p>Inclusion Grievance Type 1 <strong> (INC01)</strong> - A household in the initial list of poor households is wrongly classified.</p>
                    </div>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                        <p>Inclusion Grievance Type 2 <strong> (INC02)</strong> - A poor household claims to have been erroneously classified and wants to be removed from the list.</p>
                    </div>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                        <p>Error Grievance Type 1  <strong> (ER01)</strong> - A household in the initial list of poor has incorrect information in the database (name, sex, and street address).</p>
                    </div>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                        <p>Error Grievance Type 3  <strong> (ER03)</strong> - A household in the initial list of poor has incorrect information in the database (barangay address, date of birth, marital status, and addition/deletion of roster members).</p>
                    </div>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item">
                        <p>Transfer (of residence) Grievance 1 <strong> (TR01)</strong> - A household in the initial list of poor has transferred residence. This also includes those who were previously interviewed in evacuation centers and temporary shelters but have moved to their permanent residence.</p>
                    </div>
                </div>
            </div>
        </div>

	`,


});