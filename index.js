import pluginConfig from './config';
const {base, inherit} = g3wsdk.core.utils;
const Plugin = g3wsdk.core.plugin.Plugin;
const ComponentsFactory = g3wsdk.gui.ComponentsFactory;
const Service = require('./service');
const GUI = g3wsdk.gui.GUI;
let SiderBarComponent;


const _Plugin = function() {
  base(this, {
    name: 'openrouteservice',
    service: Service,
    i18n: true,
  });
  this.init = function() {
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

new _Plugin;

