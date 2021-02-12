define([
  'core/js/adapt',
  './scrollPromptView'
], function(Adapt, ScrollPromptView) {

  Adapt.on('menuView:ready pageView:ready componentView:postRender', function(view) {

    var model = view.model;

    var scrollPrompt = model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    var modelType;

    switch (model.get("_type")) {
      case "page":
        modelType = "page";
        break;
      case "course":
        modelType = "menu";
        break;
      case "component":
        modelType = "component";
        break;
    }

    /* set model type selector to append scroll prompt to */
    var modelTypeSelector = '.' + modelType + '__header-inner';

    new ScrollPromptView({
      model: model
    }).$el.appendTo(view.$(modelTypeSelector));

  });

});
