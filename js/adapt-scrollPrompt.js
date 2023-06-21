define([
  'core/js/adapt',
  './scrollPromptView'
], function(Adapt, ScrollPromptView) {

  Adapt.on('menuView:ready pageView:ready componentView:postRender', function(view) {

    const model = view.model;

    const scrollPrompt = model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    let modelType;

    switch (model.get('_type')) {
      case 'page':
        modelType = 'page';
        break;
      case 'course':
        modelType = 'menu';
        break;
      case 'component':
        modelType = 'component';
        break;
    }

    // Set model type selector to append scroll prompt to
    const modelTypeSelector = '.' + modelType + '__header-inner';

    new ScrollPromptView({
      model
    }).$el.appendTo(view.$(modelTypeSelector));

  });

});
