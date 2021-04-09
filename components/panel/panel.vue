<template>
    <div class="g3w-openservice-plugin-panel form-group" style="height: 100%;">
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
                <h5 class="openrouteservice-form-header skin-color">INPUT</h5>
                <form class="openrouteservice-form-inputs">
                    <div class="openrouteservice-radio-buttons">
                        <div>
                            <input class="magic-radio" type="radio" name="radio" value="mapcoordinates" id="mapcoordinates" v-model="currentinputs">
                            <label for="mapcoordinates">Map Coordinates</label>
                        </div>
                        <div>
                            <input class="magic-radio" type="radio" name="radio" value="from_layer" id="pointlayer" :disabled="inputs.from_layer[0].input.options.values.length === 0" v-model="currentinputs">
                            <label for="pointlayer">Existing Layer Point</label>
                        </div>
                    </div>
                    <div class="row" v-for="input in inputs[this.currentinputs]" :key="input.name">
                        <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                        <span style="height: 20px; width: 100%; "></span>
                    </div>
                </form>
            </div>
            <div id="openrouteservice-plugin-form-outputs" class="openrouteservice-form">
                <h5 class="openrouteservice-form-header skin-color">OUTPUT</h5>
                <form class="openrouteservice-form-inputs">
                    <div class="openrouteservice-radio-buttons">
                        <div>
                            <input class="magic-radio" type="radio" name="radio" id="newlayer" value="newlayer" v-model="currentoutputs">
                            <label for="newlayer">New Layer</label>
                        </div>
                        <div>
                            <input class="magic-radio" type="radio" name="radio" value="existinglayer" :disabled="this.outputs.existinglayer[0].input.options.values.length === 0" id="existinglayer" v-model="currentoutputs">
                            <label for="existinglayer">Existing Layer</label>
                        </div>
                    </div>
                    <div class="row" v-for="input in outputs[this.currentoutputs]" :key="input.name">
                        <component @changeinput="validate" :is="`${input.input.type}_input`" :state="input" ></component>
                        <span style="height: 20px; width: 100%; "></span>
                    </div>
                </form>
            </div>
            <div class="openrouteservice-plugin-footer">
                <bar-loader :loading="loading"></bar-loader>
                <button style="font-weight: bold" class="btn btn-block skin-background-color" v-disabled="!validForm" @click.stop="run">Run</button>
            </div>
        </div>
    </div>
</template>

<script>
    const Inputs =  g3wsdk.gui.vue.Inputs.InputsComponents;
    const GUI = g3wsdk.gui.GUI;
    export default {
        name: 'OpenRouteServiceForm',
        data(){
            return {
                loading: false,
                validForm: false,
                state: this.$options.service.state,
                currentinputs: 'mapcoordinates', //mapcoordinates, from_layer
                currentoutputs: 'newlayer'

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
             if (input){
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
             }
             this.validForm = [...this.isochrones,
                 ...this.inputs[this.currentinputs],
                 ...this.outputs[this.currentoutputs]].reduce((accumulator, current) => accumulator && (current.validate.valid === undefined || current.validate.valid), true)
          },
          async run(){
              this.loading = true;
              GUI.disableSideBar(true);
              await this.$options.service.run({
                  api: this.currentinputs,
                  inputs: [...this.isochrones, ...this.inputs[this.currentinputs], ...this.outputs[this.currentoutputs]]
              });
              this.loading = false;
              GUI.disableSideBar(false)
          }
        },
        watch: {
            currentinputs(){
                this.validate()
            },
            currentoutputs(){
                this.validate()
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
