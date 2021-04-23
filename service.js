import {APP} from './config/index';
const { base, inherit, XHR , colorHEXToRGB} =  g3wsdk.core.utils;
const ApplicationService = g3wsdk.core.ApplicationService;
const CatalogLayersStoresRegistry = g3wsdk.core.catalog.CatalogLayersStoresRegistry;
const TaskService = g3wsdk.core.task.TaskService;
const OpenRoutePanel = require('./components/panel/panel');
const ProjectsRegistry = g3wsdk.core.project.ProjectsRegistry;
const PluginService = g3wsdk.core.plugin.PluginService;
const GUI = g3wsdk.gui.GUI;

function Service() {
  base(this);
  this.urls = APP.api.urls;
  // init function
  this.init = function(config={}){
    this.config = config;
    // project id for api call url
    const projectId = this.config.gid.split(":")[1];
    this.initializeUrls(projectId);
    const project = ProjectsRegistry.getCurrentProject();
    // useful for task id url call
    this.taskId = null;
    Object.keys(this.config).forEach(key =>{
      if (key === 'isochrones'){
        const formProfileInput = APP.form[key][1];
        const outputLayer = APP.form.outputs.existinglayer[0];
        /**
         * fill compatible layers
         */
        this.config[key].compatible && this.config[key].compatible.forEach(({layer_id, qgis_layer_id}) =>{
          const findLayer = project.state.layers.find(layer => layer.id === qgis_layer_id);
          findLayer && outputLayer.input.options.values.push({
            key: findLayer.name,
            value: qgis_layer_id
          })
        });
        /**
         * Fill point layer input
         */
        this.config[key].pointlayers && this.config[key].pointlayers.forEach(({layer_id, qgis_layer_id}, index) => {
          const keyValue = {
            key: project.getLayerById(qgis_layer_id).getName(),
            value: layer_id
          };
          APP.form.inputs.from_layer[0].input.options.values.push(keyValue);
          if (index === 0) APP.form.inputs.from_layer[0].value = keyValue.value;
        });

        Object.keys(this.config[key].profiles).forEach(keyProfile =>{
          formProfileInput.value = formProfileInput.value === null ? keyProfile : formProfileInput.value;
          formProfileInput.input.options.values.push({
            key: this.config[key].profiles[keyProfile].name,
            value: keyProfile
          })
        })
      } else if (key === 'connections'){
        const connections = this.config[key] || [];
        connections.reverse().forEach(connection => {
          APP.form.outputs.newlayer[1].input.options.values.unshift({
            key: connection.name,
            value: connection.id
          });
          APP.form.outputs.newlayer[1].value = connection.id
        })
      }
    });

    this.state = {
      loading: false,
      form: null
    };
    
    this.emit('ready');
  };

  /**
   * Used to create a init start form 
   */
  this.createInitStateForm = function(){
    const form = JSON.parse(JSON.stringify(APP.form));
    this.state.form = form;
  };

  //set projectid to urls api
  this.initializeUrls = function(projectId){
    Object.keys(this.urls).forEach(key =>{
      this.urls[key] = `${this.urls[key]}/${projectId}/`
    });
  };

  this.openForm = function(bool=false){
    this.createInitStateForm();
    this.openFormPanel = new OpenRoutePanel({
      service: this
    });
    GUI.closeContent();
    this.openFormPanel.show()
  };

  this.handleTask = function(task_id, response){
    const {result, status } = response;
    if (status === 'complete') {

    } else console.log(status)
  };

  this.afterRun = function(qgis_layer_id){
    if (qgis_layer_id){
      const layer = CatalogLayersStoresRegistry.getLayerById(qgis_layer_id);
      layer && layer.change();
    } else ApplicationService.reloadCurrentProject()
  };

  this.run = async function({api, output, inputs=[]}){
    this.state.loading = true;
    //default params
    const data = {
      // Append to existing layer
      qgis_layer_id: null, // QGIS vector layer id, mutually exclusive with connection_id
      // In case of new layer:
      connection_id: null, // mutually exclusive with layer_id
      new_layer_name: null, // mutually exclusive with layer_id
      profile: null,
      color: null ,  // 0-255 RGB values ['Red', 'Green', 'Blue']
      transparency: 0, // 0-1, 0: fully opaque, 1: fully transparent
      name : '',
      stroke_width: 0.26, // float, QGIS default is 0.26
      // This goes straight to ORS API
      ors: {
        locations:null,  // May be null in case of `layer_id`
        range_type: "time",  // Time or distance
        range: [480],
        interval: 60,
        //fixed
        location_type: "start",
        attributes:[
          "area",
          "reachfactor",
          "total_pop"
        ]
      }
    };
    let url = this.urls[`isochrone_${api}`];
    inputs.forEach(({name, value}) =>{
      if (name === 'range') value = value.split(',').map(rangevalue => 1 * rangevalue);
      else if (name === 'interval'){
        if (data.ors.range.length > 1){
          value = null
        } else value = 1*value;
      } else if (name === 'color') {
        value = colorHEXToRGB(value);
      } else if (name === 'from_layer'){
        url = `${url}${value}`;
      }
      if (data[name] !== undefined){
        data[name] = value;
      } else if (data.ors[name] !== undefined){
        data.ors[name] = value
      } 
    });
    try {
      const params = {
        data: JSON.stringify(data),
        contentType: "application/json"
      };
      if (api !== 'from_layer') {
        const response = await XHR.post({
          url,
         ...params
        });
        if (response.result){
          this.afterRun(data.qgis_layer_id);
        } else {
          GUI.showUserMessage({
            type: 'alert',
            message: response.error,
            textMessage: true
          })
        }
        this.state.loading = false;
      } else {
        const listener = ({task_id, response}) => {
          const {result, status} = response;
          if (status === 'complete') {
            this.afterRun(data.qgis_layer_id);
            TaskService.stopTask({
              task_id
            });
            this.state.loading = false;
          }
          else console.log(task_id, response)
        };
        await TaskService.runTask({
          url,
          taskUrl: this.urls.task,
          params,
          method: 'POST',
          listener
        })
      }

    } catch(error){
      this.state.loading = false;
      const message = error.responseJSON ? error.responseJSON.error : 'server_error';
      GUI.showUserMessage({
        type: 'alert',
        message,
        textMessage: true
      })
    }
  };

  // clear function when clear when unload plugin
  this.clear = function(){
    this.openFormPanel = null;
  }
}

inherit(Service, PluginService);

module.exports = new Service;