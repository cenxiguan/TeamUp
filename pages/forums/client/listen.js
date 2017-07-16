/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

	var final_transcript = '';
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
				myevent = event;
				for (var i = event.resultIndex; i < event.results.length; ++i) {
			  console.log("i="+i+" words="+words);
			var words = event.results[i][0].transcript;
			if (words.includes("message is finished")) {
				recognition.stop();
				var msgsave0 = new SpeechSynthesisUtterance('message is saved!');
		    window.speechSynthesis.speak(msgsave0);
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
	        } else {
	          //interim_transcript += Math.round(100*event.results[i][0].confidence) + "%: "+ event.results[i][0].transcript+"<br>";
			  //console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	        }
	      }
	      final_transcript = capitalize(final_transcript);
	      messagebox.innerHTML = linebreak(final_transcript);
				const text = event.results[0][0].transcript;
	      //final_span.innerHTML = text;
				//messagebox.innerHTML = text;
	    };
	}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
	return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
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
