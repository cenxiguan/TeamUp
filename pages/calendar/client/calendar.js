/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/
	var text = "";
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

				text = event.results[0][0].transcript;
	      final_span.innerHTML = text;

				Meteor.call("send_text_for_APIAI_processing", event.results[0][0].transcript, function(err, result){
					if(err){
						window.alert(err);
						return;
					}

					console.log(result);
				})
	    };
	}

	function startDictation(event) {
	  if (recognizing) {
	    recognition.stop();
	    return;
	  }
	  	final_transcript = '';
	  	recognition.lang = 'en-US';
	  	recognition.start();
	  	final_span.innerHTML = '';
	  	//interim_span.innerHTML = '';
		}

  Template.calendar.events({
	'click #start_button': function(event){
		startDictation(event);
	},

});
