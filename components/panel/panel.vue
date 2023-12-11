<template>
  <div
    class="g3w-openservice-plugin-panel form-group"
    style="height: 100%;"
  >
    <div
      class="form-group"
      style="display: flex; flex-direction: column; height: 100%"
    >
      <div
        id="openrouteservice-plugin-form-isochrones"
        class="openrouteservice-form"
      >
        <h5
          class="openrouteservice-form-header skin-color"
          v-t-plugin="'openrouteservice.isochrones.title'"
        ></h5>
        <form class="openrouteservice-form-inputs">
          <div
            v-for="input in isochrones"
            :key="input.name"
            class="row"
          >
            <component
              @changeinput="validate"
              :is="`${input.input.type}_input`"
              :state="input"/>

            <span style="height: 20px; width: 100%;"></span>
          </div>
        </form>
      </div>
      <div
        id="openrouteservice-plugin-form-inputs"
        class="openrouteservice-form"
      >
        <h5 class="openrouteservice-form-header skin-color">INPUT</h5>
        <form class="openrouteservice-form-inputs">
          <div class="openrouteservice-radio-buttons">
            <div>
              <input
                id="mapcoordinates"
                class="magic-radio"
                type="radio"
                name="radio"
                value="mapcoordinates"
                v-model="currentinputs">
              <label for="mapcoordinates" v-t-plugin="'openrouteservice.isochrones.label.mapcoordinates'"></label>
            </div>
            <div>
              <input
                id="pointlayer"
                class="magic-radio"
                type="radio"
                name="radio"
                value="from_layer"
                :disabled="inputs.from_layer[0].input.options.values.length === 0"
                v-model="currentinputs">
              <label for="pointlayer" v-t-plugin="'openrouteservice.isochrones.label.pointlayer'"></label>
            </div>
          </div>
          <div
            v-for="input in inputs[this.currentinputs]"
            :key="input.name"
            class="row"
          >
            <component
              @changeinput="validate"
              :is="`${input.input.type}_input`"
              :state="input"/>
            <span style="height: 20px; width: 100%; "></span>
          </div>
        </form>
      </div>
      <div
        id="openrouteservice-plugin-form-outputs"
        class="openrouteservice-form"
      >
        <h5 class="openrouteservice-form-header skin-color">OUTPUT</h5>
        <form class="openrouteservice-form-inputs">
          <div class="openrouteservice-radio-buttons">
            <div>
              <input
                id="newlayer"
                class="magic-radio"
                type="radio"
                name="radio"
                value="newlayer"
                v-model="currentoutputs"
              >
                <label
                  for="newlayer"
                  v-t-plugin="'openrouteservice.outputs.newlayer'"></label>
            </div>
            <div>
              <input
                id="existinglayer"
                class="magic-radio"
                type="radio"
                name="radio"
                value="existinglayer"
                :disabled="this.outputs.existinglayer[0].input.options.values.length === 0"
                v-model="currentoutputs">
              <label
                for="existinglayer"
                v-t-plugin="'openrouteservice.outputs.existinglayer'"></label>
            </div>
          </div>
          <div
            v-for="input in outputs[this.currentoutputs]"
            :key="input.name"
            class="row"
          >
            <component
              @changeinput="validate"
              :is="`${input.input.type}_input`"
              :state="input"/>
            <span style="height: 20px; width: 100%; "></span>
          </div>
        </form>
      </div>
      <div class="openrouteservice-plugin-footer">
        <progressbar
          :progress="state.task.progress"/>
        <button
          style="font-weight: bold; margin-bottom: 10px; margin-top: 5px;"
          class="btn btn-block skin-background-color"
          v-disabled="!validForm || state.loading"
          @click.stop="run"
          v-t-plugin="'openrouteservice.run'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
  const { ApplicationState } = g3wsdk.core;
  const Inputs               = g3wsdk.gui.vue.Inputs.InputsComponents;
  const { tPlugin }          = g3wsdk.core.i18n;
  const {GUI}                = g3wsdk.gui;

  const MAX_RANGE = {
    time: 60,
    distance: 100000
  };

  export default {
    name: 'OpenRouteServiceForm',
    data() {
      return {
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
      form() {
        return this.state.form;
      },
      isochrones() {
        return this.state.form.isochrones;
      },
      inputs() {
        return this.state.form.inputs;
      },
      outputs() {
        return this.state.form.outputs;
      }
    },
    methods: {

      /**
       * @since v3.7.0
       */
      translateInputsLabel() {
        const _translateInputLabel = (input) => {
          if (undefined === input.labels) {
            input.label = tPlugin(input.i18n_label);
            if (input.input.options && Array.isArray(input.input.options.values)) {
              input
                .input
                .options
                .values
                .filter((value) => {
                  if (undefined !== value.i18n_key) {
                    value.key =  tPlugin(value.i18n_key);
                  }
                })
            }
          } else {
            Object
              .keys(input.labels)
              .forEach((key) => {
                input.labels[key] = tPlugin(input.i18n_labels[key])
              })
          }
        };

        Object
          .keys(this.state.form)
          .forEach((key) => {
            if (Array.isArray(this.state.form[key])) {
              this
                .state
                .form[key]
                .forEach(_translateInputLabel)
            } else {
              Object
                .keys(this.state.form[key])
                .forEach((subkey) => {
                  this
                    .state
                    .form[key][subkey]
                    .forEach(_translateInputLabel)
                })

            }
          })
      },
      validate(input) {
        if (input) {
          if (input.name === 'range') {
            const range_typeinput = this.isochrones[2];
            const intervalinput = this.isochrones[4];
            input.value = input.value && input.value.trim().match(/\d+,{0,1}/g).splice(0,10);
            input.value = input.value && input.value.filter(value => 1*value.replace(',','') <= MAX_RANGE[range_typeinput.value]).join('');
            const values = input.value ? input.value.split(',').filter(value => value) : [];
            if (values.length === 0) {
              input.value = null;
              intervalinput.editable = false;
              input.validate.valid = false;
              intervalinput.value = 0;
            } else if (values.length > 1) {
              intervalinput.editable = false;
              intervalinput.value = 0;
              intervalinput.input.options.min = 0;
              intervalinput.input.options.max = 0;
            } else {
              intervalinput.editable = true;
              input.value = input.value > MAX_RANGE[range_typeinput.value] ? `${MAX_RANGE[range_typeinput.value]}` : input.value;
              input.validate.valid = input.value > 0;
              intervalinput.editable = 1*input.value > 0;
              if (intervalinput.editable){
                intervalinput.input.options.min = Math.round(1*input.value / 10);
                intervalinput.input.options.max = 1*input.value;
                intervalinput.value = intervalinput.input.options.max;
              }
            }
          } else if (input.name === 'range_type'){
            const rangeinput = this.isochrones[3];
            rangeinput.value = 1*rangeinput.value > MAX_RANGE[input.value] ? `${MAX_RANGE[input.value]}` : rangeinput.value;
            rangeinput.info = `[MIN: 1 - MAX: ${MAX_RANGE[input.value]}]`;
            if (!rangeinput.validate.valid) rangeinput.validate.message = rangeinput.info;
          }
        }
        this.validForm = [...this.isochrones,
          ...this.inputs[this.currentinputs],
          ...this.outputs[this.currentoutputs]].reduce((accumulator, current) => accumulator && (current.validate.valid === undefined || current.validate.valid), true)
        },
      async run() {
        GUI.disableSideBar(true);
        await this.$options.service.run({
          api: this.currentinputs,
          output: this.currentoutputs,
          inputs: [...this.isochrones, ...this.inputs[this.currentinputs], ...this.outputs[this.currentoutputs]]
        });

        GUI.disableSideBar(false)
      }
    },
    watch: {
      currentinputs(value) {
        this.inputs[value]
          .forEach(input => {
            if (input.input.type === 'select' && input.value === null) {
              input.value = input.input.options.values[0].value;
            }
          });
        this.validate()
      },
      currentoutputs(value) {
        this.outputs[value]
          .forEach(input => {
            if (input.input.type === 'select' && input.value === null) {
              input.value = input.input.options.values[0].value;
            }
          });
        this.validate();
      }
    },
    created() {
      /**
       * Need to translate isochrones panel because input label is not
       * translate at g3w-client v3.7.0
       */
      this.translateInputsLabel();
      this.$watch(() => ApplicationState.language, () => this.translateInputsLabel());
    },
    async mounted() {},
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
    padding-bottom: 3px;
    margin: 0 0 2px 0;
    width: 100%;
    border-bottom: 1px solid #FFFFFF;
  }
</style>
