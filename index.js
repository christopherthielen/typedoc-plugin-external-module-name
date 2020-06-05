var plugin = require('./typedoc-plugin-external-module-name');
module.exports = function (PluginHost) {
  var app = PluginHost.owner;
  /**
   * used like so:
   * --disableAutoModuleName true
   */
  app.options.addDeclaration({ name: 'disableAutoModuleName', defaultValue: false });
  app.converter.addComponent('external-module-name', plugin.ExternalModuleNamePlugin);
};
