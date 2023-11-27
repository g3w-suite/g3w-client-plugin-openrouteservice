import pluginConfig from './config';
const {
  base,
  inherit
} = g3wsdk.core.utils;
const {Plugin:BasePlugin} = g3wsdk.core.plugin;
const {GUI} = g3wsdk.gui;
const Service = require('./service');

const Plugin = function() {

  base(this, {
    name: 'openrouteservice',
    i18n: pluginConfig.i18n,
    service: Service,
  });

  this.service.once('ready', () => {
    if (this.registerPlugin(this.config.gid)) {
      this.setupGUI();
      this.setReady(true);
    }
  });

  //initialize service
  this.service.init(this.config);
}


inherit(Plugin, BasePlugin);

Plugin.prototype.setupGUI = function () {
  const SiderBarComponent = this.createSideBarComponent({},
    {
      id: this.name,
      title: 'OPENROUTESERVICE',
      open: false,
      collapsible: false,
      iconConfig: {
        color: 'purple',
        icon: 'layers',
      },
      mobile: true,
      events: {
        open: {
          when: 'before',
          cb: bool => {
            this.service.openForm()
          }
        }
      }
    }
  );

  GUI.addComponent(SiderBarComponent, 'sidebar', {
    position: 1
  });

};


Plugin.prototype.unload = function() {
  this.service.clear();
}


new Plugin();
