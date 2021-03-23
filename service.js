const { base, inherit, XHR , debounce} =  g3wsdk.core.utils;
const PluginService = g3wsdk.core.plugin.PluginService;

function Service() {
  base(this);
  // init function
  this.init = function(config={}){
    this.config = config;
    this.emit('ready');
  };

  // clear function when clear when unload plugin
  this.clear = function(){

  }
}

inherit(Service, PluginService);

module.exports = new Service;