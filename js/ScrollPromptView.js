import Adapt from 'core/js/adapt';
import Router from 'core/js/router';
import React from 'react';
import ReactDOM from 'react-dom';
import logging from 'core/js/logging';
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

  getNextBlock() {
    const currentBlock = this.$el.parents('.block');
    const nextSibling = currentBlock.next('.block');
    if (nextSibling.length) return nextSibling;
    return currentBlock.parents('.article').next('.article').find('.block').first();
  }

  getTarget(type) {
    switch (type) {
      case 'course': return '.js-children';
      case 'page': return '.article';
      case 'block':
      case 'component': return this.getNextBlock();
    }
  }

  onScrollPromptClick() {
    const type = this.model.get('_type');
    const target = this.getTarget(type);
    if (target instanceof $ && !target.length) {
      logging.warn(`scrollPrompt: no next element found for type ${type} on ${this.model.get('_id')}`);
      return;
    }
    Router.navigateToElement(target, { duration: 800 });
  }

};
