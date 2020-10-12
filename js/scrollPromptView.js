define([
  'core/js/adapt'
], function(Adapt) {

  var ScrollPromptView = Backbone.View.extend({

    className: 'scrollPrompt',

    events: {
      'click .js-scrollPrompt-btn': 'onScrollPromptClick'
    },

    initialize: function() {
      var scrollPrompt = this.model.get('_scrollPrompt');
      if (!scrollPrompt || !scrollPrompt._isEnabled) return;

      this.render();
    },

    render: function() {
      var data = this.model.toJSON();
      var template = Handlebars.templates.scrollPrompt;

      this.$el.html(template(data));

      _.defer(this.postRender.bind(this));
    },

    postRender: function() {
      this.listenTo(Adapt, 'remove', this.remove);
    },

    onScrollPromptClick: function(event) {
      var type = this.model.get('_type');
      /* set scroll to selector depending on model type */
      if (type === 'course') {
        Adapt.scrollTo('.js-children', { duration: 800 });
      } else if (type === 'page'){
        Adapt.scrollTo('.article', { duration: 800 });
      }
    }

  });

  return ScrollPromptView;

});
