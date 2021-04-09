import {APP} from './config/index';
const { base, inherit, XHR , colorHEXToRGB} =  g3wsdk.core.utils;
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
    // get current poinMulpipoint layer from project
    const pointMulipointsLayers = ProjectsRegistry.getCurrentProject().state.layers
      .filter(layer => layer.geometrytype === "Point" || layer.geometrytype === "MultiPolint").map(layer => ({
      key: layer.name,
      value: layer.id
    }));

    if (pointMulipointsLayers.length) {
      APP.form.inputs.from_layer[0].input.options.values = pointMulipointsLayers;
      APP.form.inputs.from_layer[0].value = pointMulipointsLayers[0].value;
    }
    // useful for task id url call
    this.taskId = null;
    Object.keys(this.config).forEach(key =>{
      if (key === 'isochrones'){
        const formProfileInput = APP.form[key][1];
        const outputLayer = APP.form.outputs.existinglayer[0];
        this.config[key].compatible.forEach(value =>
          outputLayer.input.options.values.push({
            key: ProjectsRegistry.getCurrentProject().state.layers.find(layer.id === value).name,
            value
          }))
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
      form: APP.form
    };
    this.openFormPanel = new OpenRoutePanel({
      service: this
    });
    this.emit('ready');
  };

  //set projectid to urls api
  this.initializeUrls = function(projectId){
    Object.keys(this.urls).forEach(key =>{
      this.urls[key] = `${this.urls[key]}/${projectId}/`
    });
  };

  this.openForm = function(bool=false){
    GUI.closeContent();
    this.openFormPanel.show()
  };

  this.run = async function({api, inputs=[]}){
    let locations = null;
    if (api === 'mapcoordinates'){
      const longitude = 1*inputs.find(input => input.name === 'longitude').value;
      const latitude = 1*inputs.find(input=> input.name === 'latitude').value;
      locations = [[longitude, latitude]]
    }

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
    data.ors.locations = locations;
    inputs.forEach(({name, value}) =>{
      if (name === 'range'){
        value = value.split(',').map(rangevalue => 1*rangevalue)
      } else if (name === 'color'){
        value = colorHEXToRGB(value);
      }
      if (data[name] !== undefined){
        data[name] = value;
      } else if (data.ors[name] !== undefined){
        data.ors[name] = value
      }
    });
    try {
      const response = XHR.post({
        url: this.urls[`isochrone_${api}`],
        data: JSON.stringify(data),
        contentType: "application/json"
      });
      console.log(response)
    } catch(err){
      console.log(err)
    }
  };

  // clear function when clear when unload plugin
  this.clear = function(){

  }
}

inherit(Service, PluginService);

module.exports = new Service;