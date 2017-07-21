/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

Template.calendar.onCreated(function() {
	Meteor.subscribe('todo');

	this.recognizing = new ReactiveVar(false);
	this.eventslist = new ReactiveVar();
	const recognizing_status = this.recognizing;
	const eventValue = this.eventslist;

	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
			recognition.continuous = false;

			recognition.onstart = function() {
				recognizing_status.set(true);
			};

			recognition.onerror = function(event) {
				console.log(event.error);
			};

			recognition.onend = function() {
				recognizing_status.set(false);
			};

			recognition.onresult = function(event) {

				const text = event.results[0][0].transcript;
				final_span.innerHTML = text;

				Meteor.call("send_text_for_APIAI_processing", text, function(err, result){
					if(err){
						window.alert(err);
						//voiceDict.set("api_status", "inactive");
						return;
					}

					console.log(result);
					console.log(result.data.result.metadata.intentName);
					console.log(result.data.result.parameters.date);
					console.log(result.data.result.parameters.date.substring(0,4));
					console.log(result.data.result.parameters.date.substring(5,7));
					console.log(result.data.result.parameters.date.substring(8,10));
					console.log(result.data.result.parameters.event);
					console.log(result.data.result.parameters.location);
					console.log(result.data.result.parameters.title);
					console.log(result.data.result.parameters.time);

					if(!!result.data.result.parameters){
						const parameters = result.data.result.parameters;
						//const entities = [];
						var entities = [];

					//save results to ReactiveDict
					for(entity in parameters){
						if(parameters[entity]){
							entities.push({
								name: entity,
								value: parameters[entity]
							})
						}
					}

					eventValue.set(entities);

					var todoevent =
			      { //thing:result.data.result.parameters.event,
			        time:result.data.result.parameters.time,
			        date:result.data.result.parameters.date,
							location:result.data.result.parameters.location,
							title: result.data.result.parameters.title,
							detail:text,
							owner: Meteor.userId()
			      };
			    Meteor.call('todo.insert', todoevent, function(error, result){
						console.dir(ToDo.find().fetch());
					});

					var eventsave = new SpeechSynthesisUtterance('event is added to your calendar!');
					window.speechSynthesis.speak(eventsave);
				}
			});
		};
		this.recognition = recognition;
	}
})


Template.calendar.events({
	'click #start_button': function(event){
		var recognition = Template.instance().recognition;
		recognition.lang = 'en-US';
		if (Template.instance().recognizing.get()) {
			recognition.stop();
			return;
		} else {
			recognition.start();
			final_span.innerHTML = '';
		}
	}

});

Template.calendar.helpers({
	eventlist() {
		console.dir(ToDo.find().fetch());
		return ToDo.find({owner: Meteor.userId()}).fetch();
		// .fetch().sort(function(event1, event2) {
		// 	if (!event1) {
		// 		return -1;
		// 	} else if (!event2) {
		// 		return 1;
		// 	} else {
		// 		var year1 = parseInt(event1.date.substring(0, 4));
		// 		var year2 = parseInt(event2.date.substring(0, 4));
		// 		if (year1 != year2) {
		// 			return year1 - year2;
		// 		} else {
		// 			var month1 = parseInt(event1.date.substring(5, 7));
		// 			var month2 = parseInt(event2.date.substring(5, 7));
		// 			if (month1 != month2) {
		// 				return month1 - month2;
		// 			} else {
		// 				var day1 = parseInt(event1.date.substring(8,10));
		// 				var day2 = parseInt(event2.date.substring(8,10));
		// 				return day1 - day2;
		// 			}
		// 		}
		// 	}
		//
		// })
		;
  }

})

Template.eventrow.events({
	'click span'(elt, instance) {
		Meteor.call('todo.remove', this.entity._id, function(error, result){});
	}
})

Template.eventrow.helpers({
	eventNo(index) {
		return index + 1;
	},
})
