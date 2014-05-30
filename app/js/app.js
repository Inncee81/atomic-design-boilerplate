var App = {

	init: function (settings) {
		this.config = {
			enableLog: true
		};

		$.extend(this.config, settings);

		this.setup();
	},

	setup: function () {
		if (this.config.enableLog) {
			console.group('Setting up page');
		}

		// Call functions


		if (this.config.enableLog) {
			console.groupEnd();
		}
	},


	// Helpers
	log: function () {
		if (App.config.enableLog) {
			console.log.apply(console, arguments);
			return arguments[0];
		}
	}
};



// Load document
$(function () { App.init(); });
