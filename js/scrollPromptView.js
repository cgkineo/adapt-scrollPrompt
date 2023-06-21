define([
  'core/js/adapt',
  'core/js/router'
], function(Adapt, router) {

  const ScrollPromptView = Backbone.View.extend({

    className: 'scrollPrompt',

    events: {
      'click .js-scrollPrompt-btn': 'onScrollPromptClick'
    },

    initialize: function() {
      const scrollPrompt = this.model.get('_scrollPrompt');
      if (!scrollPrompt || !scrollPrompt._isEnabled) return;

      this.render();
    },

    render: function() {
      const data = this.model.toJSON();
      const template = Handlebars.templates.scrollPrompt;

      this.$el.html(template(data));

      _.defer(this.postRender.bind(this));
    },

    postRender: function() {
      this.listenTo(Adapt, 'remove', this.remove);
    },

    onScrollPromptClick: function(e) {
      // Set scroll to selector depending on model type
      switch (this.model.get('_type')) {
        case 'course':
          router.navigateToElement('.js-children', { duration: 800 });
          break;
        case 'page':
          router.navigateToElement('.article', { duration: 800 });
          break;
        case 'component':
          this.$nextBlock = this.$el.parents('.block').next();
          router.navigateToElement(this.$nextBlock, { duration: 800 });
          break;
      }
    }

  });

  return ScrollPromptView;
});
