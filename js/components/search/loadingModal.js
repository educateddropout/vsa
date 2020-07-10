Vue.component('loadingModal', {
	props: ['searchNamesList', 'count', 'isShowLoadingModal'],
	template: `

		<div class="modal" :class="{'is-active' : isShowLoadingModal }">
            <div class="modal-background" @click="closeLoadingModal"></div>
            <div class="modal-content">
                <div class="box">
                    <br>
                    <div class="w3-row">
                        <progress class="progress" :class="loadingColor" :value="count" max="100">{{count}}%</progress>
                        <p v-if="count < 100" >Searching... Please wait! {{count}}%</p>
                        <p v-else="" >
                            <span class="has-text-success" v-if="searchNamesList.length > 0">{{count}}% Success...</span>
                            <span class="has-text-danger" v-else="">{{count}}% No Result Found!..</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

	`,

	methods: {

        closeLoadingModal(){

            if(this.count > 99) this.$emit('close');

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