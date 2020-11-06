define([
  'core/js/adapt',
  './scrollPromptView'
], function(Adapt, ScrollPromptView) {

  Adapt.on('menuView:ready pageView:ready', function(view) {

    var model = view.model;

    var scrollPrompt = model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    var modelType = model.get('_type');
    if (modelType === 'course') modelType = 'menu';

    /* set model type selector to append scroll prompt to */
    var modelTypeSelector = '.' + modelType + '__header-inner';

    new ScrollPromptView({
      model: model
    }).$el.appendTo(view.$(modelTypeSelector));

  });

});
