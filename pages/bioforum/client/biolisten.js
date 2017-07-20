/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

Template.biolisten.onCreated(function() {
	this.recognizing = new ReactiveVar(false);
	const recognizing_status = this.recognizing;

	var final_transcript = '';


	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;

			recognition.lang = 'en-US';

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
				myevent = event;
				for (var i = event.resultIndex; i < event.results.length; ++i) {
			  console.log("i="+i+" words="+words);
			var words = event.results[i][0].transcript;
			if (words.includes("finish")) {
				recognition.stop();
				var msgsave0 = new SpeechSynthesisUtterance('post is saved!');
		    window.speechSynthesis.speak(msgsave0);
				return;
			} else if (words.includes("read it back")){
				var msg = new SpeechSynthesisUtterance(words);
				window.speechSynthesis.speak(msg);
			}
	        if (event.results[i].isFinal) {
	        	console.log("final result is |"+event.results[i][0].transcript.trim()+"|");
	          final_transcript +=
	                ""+
	                capitalize(event.results[i][0].transcript.trim()) +".\n";
			  console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	        }
	      }
	      final_transcript = capitalize(final_transcript);
	      biopostbox.innerHTML = linebreak(final_transcript);
				const text = event.results[0][0].transcript;
	    };

			this.recognition = recognition;
	}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, ' ');
}

function capitalize(s) {
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

})

Template.biolisten.events({
	'click #start_button': function(event){
		alert("Please speak your post slowly with break between sentences and end it with 'finish'!");

		var recognition = Template.instance().recognition;

		if (Template.instance().recognizing.get()) {
			recognition.stop();
			var msgsave = new SpeechSynthesisUtterance('post is saved!');
			window.speechSynthesis.speak(msgsave);
			return;
		}
		recognition.start();
		biopostbox.innerHTML = '';
	}
});
