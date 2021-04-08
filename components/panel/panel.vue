<template>
    <div class="g3w-openservice-plugin-panel form-group" style="height: 100%;">
        <bar-loader :loading="loading"></bar-loader>
        <div class="form-group" style="display: flex; flex-direction: column; height: 100%">
            <div id="openrouteservice-plugin-form-isochrones" class="openrouteservice-form">
                <h5 class="openrouteservice-form-header skin-color">ISOCHRONE</h5>
                <form class="openrouteservice-form-inputs">
                    <div class="row" v-for="input in isochrones" :key="input.name">
                        <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                        <span style="height: 20px; width: 100%; "></span>
                    </div>
                </form>
            </div>
            <div id="openrouteservice-plugin-form-inputs" class="openrouteservice-form">
                <h5 class="openrouteservice-form-header skin-color">INPUTS</h5>
                <form class="openrouteservice-form-inputs">
                    <div class="openrouteservice-radio-buttons">
                        <div>
                            <input class="magic-radio" type="radio" name="radio" value="mapcoordinates" id="mapcoordinates" v-model="currentinputs">
                            <label for="mapcoordinates">Map Coordinates</label>
                        </div>
                        <div>
                            <input class="magic-radio" type="radio" name="radio" value="existingpointlayer" id="pointlayer"  v-model="currentinputs">
                            <label for="pointlayer">Existing Layer Point</label>
                        </div>
                    </div>
                    <div v-if="currentinputs === 'mapcoordinates'">
                        <div class="row" v-for="input in inputs.mapcordinates" :key="input.name">
                            <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                            <span style="height: 20px; width: 100%; "></span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row" v-for="input in inputs.existingpointlayer" :key="input.name">
                            <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                            <span style="height: 20px; width: 100%; "></span>
                        </div>
                    </div>
                </form>
            </div>
            <div id="openrouteservice-plugin-form-outputs" class="openrouteservice-form">
                <h5 class="openrouteservice-form-header skin-color">OUTPUTS</h5>
                <form class="openrouteservice-form-inputs">
                    <div class="openrouteservice-radio-buttons">
                        <div>
                            <input class="magic-radio" type="radio" name="radio" id="newlayer" value="newlayer" v-model="currentoutput">
                            <label for="newlayer">New Layer</label>
                        </div>
                        <div>
                            <input class="magic-radio" type="radio" name="radio" value="existinglayer" id="existinglayer" v-model="currentoutput">
                            <label for="existinglayer">Existing Layer</label>
                        </div>
                    </div>
                    <div v-if="currentoutput === 'newlayer'">
                        <div class="row" v-for="input in outputs.newlayer" :key="input.name">
                            <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                            <span style="height: 20px; width: 100%; "></span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row" v-for="input in outputs.existinglayer" :key="input.name">
                            <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                            <span style="height: 20px; width: 100%; "></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="openrouteservice-plugin-footer">
                <button style="font-weight: bold" class="btn btn-block skin-background-color" v-disabled="!validForm" @click.stop="run">Run</button>
            </div>
        </div>
    </div>
</template>

<script>
    const Inputs =  g3wsdk.gui.vue.Inputs.InputsComponents;
    export default {
        name: 'OpenRouteServiceForm',
        data(){
            return {
                loading: false,
                validForm: false,
                state: this.$options.service.state,
                currentinputs: 'mapcoordinates', //mapcoordinates, exintgpointlayer
                currentoutput: 'newlayer'

            }
        },
        components:{
          ...Inputs
        },
        computed: {
            form(){
                return this.state.form;
            },
            isochrones(){
               return this.state.form.isochrones
            },
            inputs(){
               return this.state.form.inputs
            },
            outputs(){
              return this.state.form.outputs
            }
        },
        methods: {
          validate(input){
             if (input.name === 'range') {
                 const intervalinpuit = this.isochrones[4];
                 input.value = input.value && input.value.trim().match(/[\d+],{0,1}/g);
                 input.value = input.value && input.value.join('')
                 const values = input.value ? input.value.split(',').filter(value => value) : [];
                 if (values.length === 0) {
                     input.value = null;
                     intervalinpuit.editable = true;
                     input.validate.valid = false;
                     intervalinpuit.input.options.max = 0;
                     intervalinpuit.value = 0;
                 } else if (values.length > 1){
                     intervalinpuit.editable = false;
                     intervalinpuit.input.options.max = 0;
                 } else {
                     intervalinpuit.editable = true;
                     intervalinpuit.input.options.max = 1*input.value.replace(',','');
                 }
             }
             this.validForm = this.isochrones.reduce((accumulator, current) => accumulator && (current.validate.valid === undefined || current.validate.valid), true)
          },
          run(){
              this.loading = true;
              setTimeout(()=>{
                  this.loading = false;
              }, 3000)
          }
        },
        async mounted(){}
    };
</script>

<style scoped>
    .openrouteservice-plugin-footer {
        margin-top: auto;
        font-weight: bold;
    }
    .row {
        padding: 2px;
    }
    .openrouteservice-radio-buttons {
        display: flex;
        justify-content: space-between;
        margin:5px 0 5px 0;
    }
    .openrouteservice-form-header {
        font-weight: bold;
        padding-bottom: 5px;
        margin: 0 0 2px 0;
        width: 100%;
        border-bottom: 1px solid #FFFFFF;
    }
</style>
