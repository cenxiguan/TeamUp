Template.talk1.events({
	'click span'(elt, instance){
		var msg = new SpeechSynthesisUtterance('Joshua Alvarado is a rising junior pursuing his major in Computer Science. He is from Queens, New York City and has developed a love for coding during his time at Brandeis. Having once participated in Pito Salas’ class “Software Entrepreneurship”, he and his team worked on a startup named AmIFull, which served to provide businesses valuable metrics on their own customer tendencies, as well as their local competitors. He created a forum named “Mighty-IT”. Click here to join his forum');
		window.speechSynthesis.speak(msg);
	}
})

Template.talk4.events({
	'click button'(elt, instance){
		var msg = new SpeechSynthesisUtterance('Rong Guan is a Master student in Computer Science. She likes to develop different kinds of games. For example, console-based games such as memory card game and 3D Animation games such as "SuperApple" and "Hit Mushroom". You may check it out at her 3D Animation World. Rong received her Ph.D. degree in BioMedical Science at UT Southwestern Medical Center at Dallas. So she created a forum "From Bio to CS". Click here to join her forum.');
		window.speechSynthesis.speak(msg);
	}
})
