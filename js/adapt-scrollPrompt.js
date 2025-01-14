import Adapt from 'core/js/adapt';
import ScrollPromptView from './ScrollPromptView';

class ScrollPrompt extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'menuView:ready pageView:ready blockView:postRender componentView:postRender': this.setupView
    });
  }

  setupView(view) {
    const model = view.model;

    const scrollPrompt = model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    let type = model.get('_type');
    if (type === 'course') type = 'menu';
    const suffix = ['component', 'block'].includes(type) ? '__inner' : '__header-inner';
    const selector = `.${type}${suffix}`;

    new ScrollPromptView({
      model
    }).$el.appendTo(view.$el.find(selector));
  }

};

export default new ScrollPrompt();
