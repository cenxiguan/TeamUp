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
					console.log(result.data.result.parameters.event);
					console.log(result.data.result.parameters.location);
					console.log(result.data.result.parameters.person);
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

var count = 0;

Template.calendar.helpers({
	eventlist() {
		if (Template.instance().eventslist) {
			count++;
			console.log(count);
			return Template.instance().eventslist.get();
		}
  },

	eventNo() {
		return count;
	}
})
