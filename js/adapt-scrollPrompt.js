import Adapt from 'core/js/adapt';
import ScrollPromptView from './ScrollPromptView';

class ScrollPrompt extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'menuView:ready pageView:ready componentView:postRender': this.setupView
    });
  }

  setupView(view) {
    const model = view.model;

    const scrollPrompt = model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    // model.set('scrollInstruction', scrollPrompt.instruction || '');

    const modelType = model.get('_type');
    const selector = modelType === 'component' ? '.component__inner' : `.${modelType}__header-inner`;

    new ScrollPromptView({
      model
    }).$el.appendTo(view.$el.find(selector));
  }

};

export default new ScrollPrompt();
