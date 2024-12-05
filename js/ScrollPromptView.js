import Adapt from 'core/js/adapt';
import Router from 'core/js/router';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

export default class ScrollPromptView extends Backbone.View {

  className() { return 'scrollPrompt'; }

  initialize() {
    const scrollPrompt = this.model.get('_scrollPrompt');
    if (!scrollPrompt || !scrollPrompt._isEnabled) return;

    this.onScrollPromptClick = this.onScrollPromptClick.bind(this);

    this.render();
  }

  render() {
    const data = {
      ...this,
      model: this.model.toJSON(),
      _scrollPrompt: this.model.get('_scrollPrompt'),
      _globals: Adapt.course.get('_globals')
    };
    ReactDOM.render(<templates.scrollPrompt {...data} />, this.el);

    _.defer(this.postRender.bind(this));
  }

  postRender() {
    this.listenTo(Adapt, 'remove', this.remove);
  }

  onScrollPromptClick(e) {
    // Set scroll to selector based on model type
    const type = this.model.get('_type');
    const nextEl = {
      course: '.js-children',
      page: '.article',
      block: this.$el.parents('.block').next(),
      component: this.$el.parents('.block').next()
    };
    Router.navigateToElement(nextEl[type], { duration: 800 });
  }

};
