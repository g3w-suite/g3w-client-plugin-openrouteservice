import TEST_DATA from './test/data';
const { base, inherit, XHR , debounce} =  g3wsdk.core.utils;
const OpenRoutePanel = require('./components/panel/panel');
const PluginService = g3wsdk.core.plugin.PluginService;
const GUI = g3wsdk.gui.GUI;

function Service() {
  base(this);
  // init function
  this.init = function(config={}){
    this.config = config;
    this.state = {
      loading: false,
      form: TEST_DATA.GET
    };
    this.openFormPanel = new OpenRoutePanel({
      service: this
    });
    this.emit('ready');
  };

  this.openForm = function(bool=false){
    GUI.closeContent();
    this.openFormPanel.show()
    this.state.loading = true;
    setTimeout(()=>{
      this.state.loading = false
    }, 4000)
  };

  // clear function when clear when unload plugin
  this.clear = function(){

  }
}

inherit(Service, PluginService);

module.exports = new Service;