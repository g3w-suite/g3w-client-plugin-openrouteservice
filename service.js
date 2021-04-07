import {APP} from './config/index';
const { base, inherit, XHR , debounce} =  g3wsdk.core.utils;
const OpenRoutePanel = require('./components/panel/panel');
const PluginService = g3wsdk.core.plugin.PluginService;
const GUI = g3wsdk.gui.GUI;


function Service() {
  base(this);
  // init function
  this.init = function(config={}){
    this.config = config;
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
      } else {
        console.log(key, this.config[key])
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