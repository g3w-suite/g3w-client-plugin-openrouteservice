import {APP} from './config/index';
const { base, inherit, XHR , debounce} =  g3wsdk.core.utils;
const OpenRoutePanel = require('./components/panel/panel');
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
    // useful for task id url call
    this.taskId = null;
    Object.keys(this.config).forEach(key =>{
      if (key === 'isochrones'){
        const formProfileInput = APP.form[key][1];
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

  // clear function when clear when unload plugin
  this.clear = function(){

  }
}

inherit(Service, PluginService);

module.exports = new Service;