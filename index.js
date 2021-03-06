import pluginConfig from './config';
const {base, inherit} = g3wsdk.core.utils;
const Plugin = g3wsdk.core.plugin.Plugin;
const ComponentsFactory = g3wsdk.gui.ComponentsFactory;
const Service = require('./service');
const addI18nPlugin = g3wsdk.core.i18n.addI18nPlugin;
const GUI = g3wsdk.gui.GUI;

const _Plugin = function() {
  base(this);
  let SiderBarComponent;
  this.name = 'openrouteservice';
  this.init = function() {
    addI18nPlugin({
      name: this.name,
      config: pluginConfig.i18n
    });
    this.setService(Service);
    this.config = this.getConfig();
    this.service.once('ready', () => {
      if (this.registerPlugin(this.config.gid)) {
        this.setupGUI();
        this.setReady(true);
      }
    });
    //inizialize service
    this.service.init(this.config);
  };

  this.setupGUI = function(){
    SiderBarComponent = ComponentsFactory.build(
      {
        vueComponentObject:{}
      },
      {
        id: this.name,
        title: 'OPENROUTESERVICE',
        open: false,
        collapsible: false,
        iconColor: 'purple',
        icon: GUI.getFontClass('layers'),
        mobile: true,
        events: {
          open :{
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

  this.unload = function() {
    GUI.removeComponent(this.name, 'sidebar');
    this.service.clear();
  }
};

inherit(_Plugin, Plugin);

(function(plugin){
  plugin.init();
})(new _Plugin);
