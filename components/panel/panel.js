import OpenRouteComponent from './panel.vue';
const {
  base,
  inherit
}               =  g3wsdk.core.utils;
const { Panel } = g3wsdk.gui;

function OpenRouteServicePanel(options={}) {
  options.title = "OPENROUTESERVICE";
  base(this, options);
  const {service} = options;
  this.setService(service);
  const internalPanel = Vue.extend(OpenRouteComponent);
  this.setInternalPanel(new internalPanel({
    service
  }));
  this.unmount = function() {
    return base(this, 'unmount')
      .then(() => this.service.clear())
  }
}

inherit(OpenRouteServicePanel, Panel);

module.exports = OpenRouteServicePanel;


