Vue.component('overseasIndicator', {
    props: ['overseasIndicator', 'overseas', 'ofi', 'sendingMoney', 'howOften', 'disableCtr', 'age'],
    template: `
        <div class="w3-container ">
            
            <fieldset class="w3-border w3-round w3-border-black">
                <legend><strong>&nbspOverseas Indicator&nbsp</strong></legend>
                

                <div class="w3-row">
                    <family-roster-div-select
                        :object = "overseas"
                        :value = "overseasIndicator.overseas"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateOverseas"
                    >
                    </family-roster-div-select>
                </div>
                <br>

                <div class="w3-row">
                    <family-roster-div-select
                        :object = "ofi"
                        :value = "overseasIndicator.ofi"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateOfi()"
                    >
                    </family-roster-div-select>
                </div>
                <br>

                <div class="w3-row">
                    <family-roster-div-select
                        :object = "sendingMoney"
                        :value = "overseasIndicator.sendingMoney"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateSendingMoney()"
                    >
                    </family-roster-div-select>
                </div>
                <br>
                <div class="w3-row">
                    <family-roster-div-select
                        :object = "howOften"
                        :value = "overseasIndicator.howOften"
                        :disableCtr = "disableCtr"
                        @validate-select = "validateHowOften()"
                    >
                    </family-roster-div-select>
                </div>

                <br>

            </fieldset>

        </div>
    `,

    methods : {

        validateOverseas(){


            this.overseasIndicator.overseas.error = validateSelections(this.overseasIndicator.overseas.value);
            
            if(this.overseasIndicator.ofi.value != -1) this.validateOfi();
            if(this.overseasIndicator.sendingMoney.value != -1) this.validateSendingMoney();
            if(this.overseasIndicator.howOften.value != -1) this.validateHowOften();

        },

        validateOfi(){
            
            this.overseasIndicator.ofi.error = validateOfi(this.overseasIndicator.ofi.value,this.overseasIndicator.overseas.value,this.age);
            if(this.overseasIndicator.sendingMoney.value != -1) this.validateSendingMoney();

        },

        validateSendingMoney(){

            this.overseasIndicator.sendingMoney.error = validateSendingMoney(this.overseasIndicator.sendingMoney.value,this.overseasIndicator.overseas.value,this.overseasIndicator.ofi.value);
            if(this.overseasIndicator.howOften.value != -1) this.validateHowOften();

        },

        validateHowOften(){

            this.overseasIndicator.howOften.error = validateHowOften(this.overseasIndicator.howOften.value,this.overseasIndicator.overseas.value,this.overseasIndicator.sendingMoney.value);

        }

        
    }

});
