/*
* master data module
*/


(function() {
"use strict";


angular
	.module("FTravel.ChatBot", [])
	.config(function($stateProvider) {

		$stateProvider
			.state("app.chat-bot", {
				url: "/chat-bot",
				cache: false,
				params: { id: null },
				views: {
					"menuContent": {
						templateUrl: "app/chat-bot/chat-bot.view.html",
						controller: "ChatBotCtrl"
					}
				}
			})
		;
	});


})();
