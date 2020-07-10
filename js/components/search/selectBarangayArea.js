Vue.component('selectBarangayArea', {
	props: ['isShow', 'userData', 'libRegions', 'libProvinces', 'libCities', 'libBarangay', 'areaAssignment'],
	template: `

		<div>
            <div class="modal" :class="{'is-active':isShow}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="w3-row w3-container">
                        <div class="w3-row">
                            <p class="is-size-5"><strong> Please Select Area </strong></p>
                        </div>
                        <div class="is-divider"></div>
                        <div class="w3-row">
                            
                            <p><strong>Region</strong></p>
                            <div class="select is-fullwidth is-medium" :class="{'is-danger': areaAssignment.region.error !== ''}">
                                <select v-model="areaAssignment.region.value" disabled>
                                    <option :value='-1'>Select dropdown</option>
                                    <option v-for="region in libRegions" :value="region.region_code">{{region.region_name}}</option>
                                </select>
                            </div>
                            
                            <p class="help is-danger">{{areaAssignment.region.error}}</p>

                        </div>
                        
                        <br>
                        <div class="w3-row">
                            
                            <p><strong>Province</strong></p>
                            <div class="select is-fullwidth is-medium" :class="{'is-danger': areaAssignment.province.error !== ''}">
                                <select v-model="areaAssignment.province.value" @change="changeProvince" @blur="validateProvince">
                                    <option :value='-1'>Select dropdown</option>
                                    <option v-for="province in libProvinces" :value="province.province_code">{{province.province_name}}</option>
                                </select>
                            </div>
                            <p class="help is-danger">{{areaAssignment.province.error}}</p>

                        </div>
                        
                        <br>
                        <div class="w3-row">
                            
                            <p><strong>Municipality/City</strong></p>
                            <div class="select is-fullwidth is-medium" :class="{'is-danger': areaAssignment.city.error !== ''}">
                                <select v-model="areaAssignment.city.value" @change="changeCity" @blur="validateCity" >
                                    <option :value='-1'>Select dropdown</option>
                                    <option v-for="city in libCities" :value="city.city_code">{{city.city_name}}</option>
                                </select>
                            </div>
                            
                            <p class="help is-danger">{{areaAssignment.city.error}}</p>

                        </div>
                        
                        <br>
                        <div class="w3-row">
                            
                            <p><strong>Barangay</strong></p>
                            <div class="select is-fullwidth is-medium" :class="{'is-danger': areaAssignment.barangay.error !== ''}">
                                <select v-model="areaAssignment.barangay.value" @change="validateBarangay" >
                                    <option :value='-1'>Select dropdown</option>
                                    <option v-for="barangay in libBarangay" :value="barangay.barangay_code">{{barangay.barangay_name}}</option>
                                </select>
                            </div>
                            
                            <p class="help is-danger">{{areaAssignment.barangay.error}}</p>

                        </div>

                        <br>
                        <div class="w3-row">
                            <button class="is-outlined is-info button w3-right" @click="selectAreaAssigned">Select &nbsp<i class="fas fa-hand-pointer"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <button class="modal-close is-large" aria-label="close"></button> -->
            </div>
        </div>

	`,

    data(){
        return {
            libExtensionNames : extNameSelection(),
        }
    },

	methods: {

        selectAreaAssigned(){
            this.validateProvince();
            this.validateCity();
            this.validateBarangay();

            if(this.areaAssignment.province.error == "" || this.areaAssignment.city.error == "" || this.areaAssignment.barangay.error == ""){

                let self = this;
                let provinceName = this.libProvinces.filter(prov => prov.province_code == this.areaAssignment.province.value)[0].province_name;
                let cityName = this.libCities.filter(prov => prov.city_code == this.areaAssignment.city.value)[0].city_name;
                let barangayName = this.libBarangay.filter(prov => prov.barangay_code == this.areaAssignment.barangay.value)[0].barangay_name;

                this.$emit('select-area-assigned', provinceName + " / " + cityName + " / " + barangayName );
            }
        },

        validateRegion(){

            this.areaAssignment.region.error = validateSelection(this.areaAssignment.region.value);
        },

        validateProvince(){
            this.areaAssignment.province.error = validateSelection(this.areaAssignment.province.value);
        },

        validateCity(){

            this.areaAssignment.city.error = validateSelection(this.areaAssignment.city.value);
        },

        validateBarangay(){

            this.areaAssignment.barangay.error = validateSelection(this.areaAssignment.barangay.value);
        },

        changeProvince(){

            this.validateProvince();
            this.areaAssignment.city.value = -1;
            this.areaAssignment.barangay.value = -1;

            this.$emit('fetch-lib-cities', this.areaAssignment.province.value);

        },

        changeCity(){

            this.validateCity();
            this.areaAssignment.barangay.value = -1;
            this.$emit('fetch-lib-barangay', this.areaAssignment.city.value);

        }

	}


});


