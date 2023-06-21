define([
  'core/js/adapt',
  './scrollPromptView'
], function(Adapt, ScrollPromptView) {

  Adapt.on('menuView:ready pageView:ready componentView:postRender', function(view) {

    const model = view.model;

    const scrollPrompt = model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    let modelTypeSelector;

    switch (model.get('_type')) {
      case 'page':
        modelTypeSelector = '.page__header-inner';
        break;
      case 'course':
        modelTypeSelector = '.menu__header-inner';
        break;
      case 'component':
        modelTypeSelector = '.component__inner';
        break;
    }

    new ScrollPromptView({
      model
    }).$el.appendTo(view.$(modelTypeSelector));

  });

});
