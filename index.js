import pluginConfig from './config';
const {base, inherit} = g3wsdk.core.utils;
const Plugin = g3wsdk.core.plugin.Plugin;
const ComponentsFactory = g3wsdk.gui.ComponentsFactory;
const Service = require('./service');
const addI18nPlugin = g3wsdk.core.i18n.addI18nPlugin;
const GUI = g3wsdk.gui.GUI;

const _Plugin = function() {
  base(this);
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
    const SiderBarComponent = ComponentsFactory.build(
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
              console.log(bool);
              this.service.openForm()
            }
          }
        }
      }
    );
    const options = {
      position: 1
    };

    GUI.addComponent(SiderBarComponent, 'sidebar', options);

  };

  this.unload = function() {
    this.service.clear();
  }
};

inherit(_Plugin, Plugin);

(function(plugin){
  plugin.init();
})(new _Plugin);
