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
	      //final_span.innerHTML = text;
				messagebox.innerHTML = text;
	    };
	}

	function startDictation(event) {
	  if (recognizing) {
	    recognition.stop();
			var msgsave = new SpeechSynthesisUtterance('message is saved!');
	    window.speechSynthesis.speak(msgsave);
	    return;
	  }
	  final_transcript = '';
	  recognition.lang = 'en-US';
	  recognition.start();
	  messagebox.innerHTML = '';
	}

  Template.listen.events({
	'click #start_button': function(event){
		startDictation(event);
	}
  });
