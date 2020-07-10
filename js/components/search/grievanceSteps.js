Vue.component('grievanceSteps', {
	props: ['stepCounter', 'isShowHouseholdDetailModal', 'isShowStepFooter'],
	template: `

		<div>
            <footer class="footer has-background-dark " style="z-index : 1000" v-if="isShowStepFooter">
                <div class="content " >
                    <div class="w3-row has-text-white">

                        <div class="steps">
                            <div class="step-item" :class="{'is-completed is-info':stepCounter > 1}">
                                <div class="step-marker pointer" @click="openMoveToStep(1)">
                                    <span v-if="stepCounter < 2">1</span>
                                    <span class="icon" v-else-if="stepCounter > 1">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <div class="step-details">
                                    <p class="step-title pointer" @click="openMoveToStep(1)">Step 1</p>
                                    <p>Complete Name of the Person Inquires</p>
                                </div>
                            </div>
                            <div class="step-item" :class="{'is-active':stepCounter > 1, 'is-completed is-info':stepCounter > 2}">
                                <div class="step-marker pointer" @click="openMoveToStep(2)">
                                    <span v-if="stepCounter < 3">2</span>
                                    <span class="icon " v-else-if="stepCounter > 2">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <div class="step-details">
                                    <p class="step-title pointer" @click="openMoveToStep(2)">Step 2</p>
                                    <p>Searching of Names</p>
                                </div>
                            </div>
                            <div class="step-item" :class="{'is-active':stepCounter > 2, 'is-completed is-info':stepCounter > 3}">
                                <div class="step-marker pointer">
                                    <span v-if="stepCounter < 4">3</span>
                                    <span class="icon" v-else-if="stepCounter > 3">
                                        <i class="fa fa-check"></i>
                                    </span>
                                </div>
                                <div class="step-details">
                                    <p class="step-title pointer" >Step 3</p>
                                    <p>Completion of Grivance Form</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </footer>

            <div class="modal" :class="{'is-active':modalMessage != ''}">
                <div class="modal-background" @click = "closeModal"></div>
                <div class="modal-card">
                    <section class="modal-card-body is-size-5">
                        {{modalMessage}}
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-info is-medium" @click = "moveToStep">&nbsp&nbspYes&nbsp&nbsp</button>
                        <button class="button is-danger is-medium" @click = "closeModal">Cancel</button>
                    </footer>
                </div>
            </div>

        </div>

	`,

    data(){
        return {
            modalMessage : "",
            moveToStepCounter : -1,
        }
    },

	methods: {

        closeLoadingModal(){

            this.$emit('close');

        },

        closeModal(){
            this.modalMessage = "";
        },

        moveToStep(){

            this.closeModal();
            this.$emit('move-to-step', this.moveToStepCounter);

        },

        openMoveToStep(stepNumber){

            this.moveToStepCounter = stepNumber;

            if(this.stepCounter == 3){
                if(stepNumber == 2) this.modalMessage = "This will remove all changes made on this step. Are you sure you want to go back?";
                
                if(stepNumber == 1) this.modalMessage = "This will delete all the things you have done. Are you sure you want to sacrifice all of it just to start all over again?";
            } else if(this.stepCounter == 2){
                if(stepNumber == 1) this.modalMessage = "This will remove all changes made on this step. Are you sure you want to go back?";
            }

        }

	}


});