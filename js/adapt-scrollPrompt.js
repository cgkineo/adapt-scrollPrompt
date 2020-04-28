define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var scrollPromptView = Backbone.View.extend({

		className: 'scrollPrompt',

		events: {
			"click .js-scrollPrompt-btn": "onScrollPromptClick"
		},

		initialize: function() {
		var scrollPrompt = this.model.get('_scrollPrompt');

		if (!scrollPrompt || !scrollPrompt._isEnabled) return;
			this.render();
		},

		render: function() {
			var data = this.model.toJSON();
			var template = Handlebars.templates['scrollPrompt'];

			this.$el.html(template(data))
			_.defer(_.bind(this.postRender, this));
		},

		postRender: function() {
			this.listenTo(Adapt, 'remove', this.remove);
		},

		onScrollPromptClick: function(event) {
			var type = this.model.get("_type");
			/* set scroll to selector depending on model type */
			if (type === 'course') {
				Adapt.scrollTo('.js-children', { duration: 800 });
			} else if (type === 'page'){
				Adapt.scrollTo('.article', { duration: 800 });
			}
		}

	});

	Adapt.on('app:dataReady', function() {

		Adapt.on('menuView:ready pageView:ready', function(view) {

			var model = view.model;

			var scrollPrompt = model.get('_scrollPrompt');
			if (!scrollPrompt || !scrollPrompt._isEnabled) return;

			var modelType;

			switch (model.get("_type")) {
				case "page":
					modelType = "page";
					break;
				case "course":
					modelType = "menu";
			}
			/* set model type selector to append scroll prompt */
			var modelTypeSelector = '.' + modelType + '__header-inner';

			new scrollPromptView({
				model: view.model
			}).$el.appendTo(view.$(modelTypeSelector));

		});
	});

});
