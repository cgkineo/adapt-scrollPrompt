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

    const selectorByType = {
      course: '.menu__header-inner',
      page: '.page__header-inner',
      block: '.block__inner',
      component: '.component__inner'
    };
    const selector = selectorByType[model.get('_type')];

    new ScrollPromptView({
      model
    }).$el.appendTo(view.$el.find(selector));
  }

};

export default new ScrollPrompt();
