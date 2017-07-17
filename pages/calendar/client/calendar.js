/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/
var recognizing = false;

if ('webkitSpeechRecognition' in window) {
	console.log("webkit is available!");
	var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;

		recognition.onstart = function() {
			recognizing = true;
		};

		recognition.onerror = function(event) {
			console.log(event.error);
		};

		recognition.onend = function() {
			recognizing = false;
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
				console.log(result.data.result.parameters.person);
				console.log(result.data.result.parameters.time);
				console.log(result.data.result.parameters.event);
				console.log(result.data.result.parameters);

				if(!!result.data.result.parameters){
					const parameters = result.data.result.parameters;
					const entities = [];

				//save results to ReactiveDict
				for(entity in parameters){
					if(parameters[entity]){
						entities.push({
							name: entity,
							value: parameters[entity]
						})
					}
				}

		//voiceDict.set("entitiesResult", entities);
		//voiceDict.set("intentResult", result.data.result.metadata.intentName);
			}

	//voiceDict.set("api_status", "inactive");
	//voiceDict.set("hasResult", true);
		});
	};
}

function startDictation(event) {
	if (recognizing) {
		recognition.stop();
		var eventsave = new SpeechSynthesisUtterance('event is added to your calendar!');
		window.speechSynthesis.speak(eventsave);
		return;
	}
	final_transcript = '';
	recognition.lang = 'en-US';
	recognition.start();
	final_span.innerHTML = '';
}

Template.calendar.events({
'click #start_button': function(event){
	startDictation(event);
}
});
