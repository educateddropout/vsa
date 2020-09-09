Vue.component('reportsTable', {
	props: ['statReports', 'statCtr'],
	template: `
        <div>
            <div class="w3-row w3-container">
                <div class="w3-col l12">
                    <div class="w3-row">
                        <table class="table w3-border w3-round is-fullwidth is-striped is-hoverable" style="overflow-x:auto;">
                            <thead>
                                <tr class="has-background-dark">
                                    <th class='w3-border-right has-text-white'>
                                        <span v-if="statCtr == 1">Province Name</span>
                                        <span v-else-if="statCtr == 2">City/Municipality Name</span>
                                        <span v-else-if="statCtr == 3">Barangay Name</span>
                                    </th>
                                    <th class="has-text-white w3-center">General Inquiry</th>
                                    <th class="has-text-white w3-center"><abbr title="Exclusion Error 01">Ex01</abbr></th>
                                    <th class="has-text-white w3-center"><abbr title="Exclusion Error 02">Ex02</abbr></th>
                                    <th class="has-text-white w3-center"><abbr title="Inclusion Error 01">Inc01</abbr></th>
                                    <th class="has-text-white w3-center"><abbr title="Inclusion Error 02">Inc02</abbr></th>
                                    <th class="has-text-white w3-center"><abbr title="Error 01">ER01</abbr></th>
                                    <th class="has-text-white w3-center"><abbr title="Error 02">ER03</abbr></th>
                                    <th class="has-text-white w3-center"><abbr title="Tranfer Of Residence">TR01</abbr></th>
                                    <th class="w3-border-left w3-center has-text-white">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s,index in statReports">
                                    <td class=" w3-border-right" v-if="(index+1) != statReports.length"
                                        @click="fetchStatGrievanceType(s.code,statCtr+1, s.name)"
                                    >
                                        <span class="pointer has-text-link" v-if="statCtr != 3"><u>{{s.name}}</u></span>
                                        <span v-else="">{{s.name}}</span>
                                    </td>
                                    <td class="pointer w3-border-right has-background-grey-light" v-else=""><b>TOTAL</b></td>

                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_1}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_2}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_3}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_4}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_5}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_6}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_7}}</td>
                                    <td class="w3-center" :class="{'bold has-background-grey-light' : (index+1) == statReports.length}">{{s.c_8}}</td>
                                    <td class="w3-border-left has-text-white has-background-grey-dark w3-center" :class="{'bold' : (index+1) == statReports.length}"><b>{{s.total}}</b></td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>

            </div>
        </div>

	`,

    data(){
        return {

           fetchStatGrievanceType(code, statCtr, name){

                this.$emit('fetch-stat-grievance-type', code, statCtr, name);

           }

        }

    },

	methods: {

      

	}


});