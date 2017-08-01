/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/
var count1 = 0;
var countCheck = 0;
const today = new Date();

Template.calendars.onDestroyed(function(){
	Template.instance().recognition.stop();
	Template.instance().lastquestion.set(true);
	window.speechSynthesis.cancel();
	return;
})

Template.calendars.onCreated(function() {
	console.log(Router.current().params._id);
	var calendarData = {
		teamid: Router.current().params._id,
		todoArray: [],
	}
	Meteor.call('calendars.insert', calendarData, Router.current().params._id, function(err, result){
		if(err){
			window.alert(err);
			return;
		}
	});

	this.recognizing = new ReactiveVar(false);
	this.lastquestion = new ReactiveVar(false);
	//this.isQuestionAAnswered = new ReactiveVar(false);
	//this.isQuestionBAnswered = new ReactiveVar(false);

	this.eventslist = new ReactiveVar();
	const recognizing_status = this.recognizing;
	const eventValue = this.eventslist;
	const isFinal = this.lastquestion;
	var pendingevent = "";

	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
			recognition.continuous = true;

			recognition.onstart = function() {
				recognizing_status.set(true);
			};

			recognition.onerror = function(event) {
				console.log(event.error);
			};

			recognition.onend = function() {
				//is final
				if (isFinal.get()) {
					recognizing_status.set(false);
					countCheck = 0;
				} else {
					setTimeout(function(){
						recognition.start();
					}, 3500);

				}
			};

			recognition.onresult = function(event) {

				const text = event.results[0][0].transcript;
				final_span.innerHTML = text;
				console.log(text);
				if ( text != "yes" && text != "no") {
					pendingevent = text;
					if (countCheck === 0 ) {
						var checkmsg = new SpeechSynthesisUtterance('Is this the event you want to add to ?');
						checkmsg.rate = 0.95;
						checkmsg.pitch = 0.9;
						countCheck++;
						window.speechSynthesis.speak(checkmsg);
						recognition.stop();

					} else if (countCheck === 1 ) {
						var checkmsg2 = new SpeechSynthesisUtterance('Is this what you want to be added? ');
						checkmsg2.rate = 0.95;
						checkmsg2.pitch = 0.9;
						countCheck++;
						window.speechSynthesis.speak(checkmsg2);
						recognition.stop();
					} else if (countCheck === 2 ) {
						var checkmsg3 = new SpeechSynthesisUtterance('Is everything correct and ready for submission?');
						checkmsg3.rate = 0.95;
						checkmsg3.pitch = 0.9;
						countCheck++;
						window.speechSynthesis.speak(checkmsg3);
						recognition.stop();
					} else {
						return;
					}

				} else if ( text == "no" ) {
					var repeatmsg = new SpeechSynthesisUtterance('Please state the event you want to add.');
					repeatmsg.rate = 0.95;
					repeatmsg.pitch = 0.9;
					window.speechSynthesis.speak(repeatmsg);
					recognition.stop();
				} else if ( text == "yes") {
					isFinal.set(true);
					Meteor.call("send_text_for_APIAI_processing", pendingevent, function(err, result){
						if(err){
							window.alert(err);
							return;
						}

						console.log(result);
						console.log(result.data.result.metadata.intentName);
						console.log(result.data.result.parameters.date);
						console.log(result.data.result.parameters.event);
						console.log(result.data.result.parameters.location);
						console.log(result.data.result.parameters.title);
						console.log(result.data.result.parameters.time);


						if(!!result.data.result.parameters){
								const parameters = result.data.result.parameters;
								var detail = pendingevent;
								console.log(detail+"before change");
								detail = detail.replace(/(add|next)/gi, ""),
								console.log(detail+"after change");
								if (!parameters.date) {
									if (!!parameters.relativedate) {

										if (parameters.relativedate == "tomorrow" || parameters.relativedate == "the next day") {
											result.data.result.parameters.date = getTomorrow();

										} else if (parameters.relativedate == "today") {
											result.data.result.parameters.date = getToday();

										} else if (parameters.relativedate == "tonight") {
											result.data.result.parameters.date = getToday();
										} else if (parameters.relativedate == "this evening") {
											result.data.result.parameters.date = getToday();
										};

										if (Calendars.findOne({date:result.data.result.parameters.date,
																			time:result.data.result.parameters.time,
																			teamid: Router.current().params._id}) ){
											var occupied = new SpeechSynthesisUtterance("You have things to do at that time.");
											occupied.rate = 0.95;
											occupied.pitch = 0.9;
											window.speechSynthesis.speak(occupied);
										} else {
											var todoevent =
							      	{ //thing:result.data.result.parameters.event,
												id: new Meteor.Collection.ObjectID()._str,
							        	time:result.data.result.parameters.time,
							        	date:result.data.result.parameters.date,
												location:result.data.result.parameters.location,
												title: result.data.result.parameters.title,
												detail: detail.replace(/(add|next|tomorrow|today|tonight|this evening|this afternoon)/gi, ""),
												owner:Meteor.userId()
							      	};
							    		Meteor.call('calendars.update', todoevent, Router.current().params._id,function(error, result){
											});

											var eventsave = new SpeechSynthesisUtterance('event is added to your calendar!');
											eventsave.rate = 0.95;
											eventsave.pitch = 0.9;
											window.speechSynthesis.speak(eventsave);
										}
									} else {
										var repeatDate = new SpeechSynthesisUtterance("I did not get the date of your event. Please click the microphone and repeat it.");
										repeatDate.rate = 0.95;
										repeatDate.pitch = 0.9;
										window.speechSynthesis.speak(repeatDate);
									};

								} else {

									if (Calendars.findOne({date:result.data.result.parameters.date,
																		time:result.data.result.parameters.time,
																		teamid: Router.current().params._id}) ){
										var occupied = new SpeechSynthesisUtterance("You have things to do at that time.");
										occupied.rate = 0.95;
										occupied.pitch = 0.9;
										window.speechSynthesis.speak(occupied);
									} else {
										var todoevent =
										{
											//thing:result.data.result.parameters.event,
											id: new Meteor.Collection.ObjectID()._str,
											time:result.data.result.parameters.time,
											date:result.data.result.parameters.date,
											location:result.data.result.parameters.location,
											title: result.data.result.parameters.title,
											detail: detail.replace(/(add|next|tomorrow|today|tonight|this evening|this afternoon)/gi, ""),
											owner: Meteor.userId()
										};
										Meteor.call('calendars.update', todoevent, Router.current().params._id, function(error, result){
										});

										var eventsave = new SpeechSynthesisUtterance('event is added to your calendar!');
										eventsave.rate = 0.95;
										eventsave.pitch = 0.9;
										window.speechSynthesis.speak(eventsave);
									}
						 }
					}
				});
					recognition.stop();
			};

				return;

		};
		this.recognition = recognition;
	}
})


Template.calendars.events({
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
	},

	'click #voice': function(elt, instance){

			if (instance.$('#search').val() == "") {
			if ('webkitSpeechRecognition' in window) {
			var recognition2 = new webkitSpeechRecognition();
				recognition2.continuous = false;

				recognition2.onaudioend = function() {
		    };

				recognition2.onresult = function(event) {
		      var text2 = event.results[0][0].transcript;

					Meteor.call("send_text_for_APIAI_processing", text2, function(err, result){
						if(err){
							window.alert(err);
							return;
						}

						if(!!result.data.result.parameters){
								text3 = result.data.result.parameters.date;
								instance.$("#search").val(text3);
						};
						const searchdate = instance.$('#search').val();
						todo = Calendars.find({"teamid":Router.current().params._id}).fetch().todoArray;
						console.log(todo.length);

						if (todo.length == 0) {
							var nothing = new SpeechSynthesisUtterance('You have nothing that date on your group calender.');
							nothing.rate = 0.95;
							nothing.pitch = 0.9;
							window.speechSynthesis.speak(nothing);
						} else {
							var thing ="";

							for (i = 0; i < todo.length; i++) {
								no = i+1;
								thing += "number " + no + " " + todo[i].detail + " ";
							}

							var msg = new SpeechSynthesisUtterance('What you need to do is ' + thing);
							msg.rate = 0.95;
							msg.pitch = 0.9;
							if (count1 % 2 === 0) {
									window.speechSynthesis.speak(msg);
									count1++;
							} else {
									window.speechSynthesis.cancel();
									count1++;
							}
						}
					});
				};
				recognition2.start();
			}
		} else {
			const searchdate = instance.$('#search').val();

			todo = Calendars.find({"teamid":Router.current().params._id}).fetch().todoArray;
			console.log(todo.length);

			if (todo.length == 0) {
				var nothing = new SpeechSynthesisUtterance('You have nothing to do on that day.');
				nothing.rate = 0.95;
				nothing.pitch = 0.9;
				window.speechSynthesis.speak(nothing);
			} else {
				var thing ="";

				for (i = 0; i < todo.length; i++) {
					no = i+1;
					thing += "number " + no + " " + todo[i].detail + " ";
				}

				var msg = new SpeechSynthesisUtterance('What you need to do is ' + thing);
				msg.rate = 0.95;
				msg.pitch = 0.9;
				if (count1 % 2 === 0) {
						window.speechSynthesis.speak(msg);
						count1++;
				} else {
						window.speechSynthesis.cancel();
						count1++;
				}
			}
		}
	},

});


Template.calendars.helpers({
	getTeamName() {
		var x = Groups.findOne({_id:Router.current().params._id});
		return x.groupname;
	},
	eventlist() {
		var c = Calendars.findOne({teamid:Router.current().params._id}).todoArray;
		console.dir(c);
		return c.sort(function(event1, event2) {
			if (!event1) {
				return -1;
			} else if (!event2) {
				return 1;
			} else {
				var year1 = parseInt(event1.date.substring(0, 4));
				var year2 = parseInt(event2.date.substring(0, 4));
				if (year1 != year2) {
					return year1 - year2;
				} else {
					var month1 = parseInt(event1.date.substring(5, 7));
					var month2 = parseInt(event2.date.substring(5, 7));
					if (month1 != month2) {
						return month1 - month2;
					} else {
						var day1 = parseInt(event1.date.substring(8,10));
						var day2 = parseInt(event2.date.substring(8,10));
						if (day1 != day2) {
							return day1 - day2;
						} else if (!!event1.time) {
							var time1 = parseInt(event1.time.substring(0,2));
							var time2 = parseInt(event2.time.substring(0,2));
							return time1 - time2;
						} else {

						}
					}
				}
			}
		});
  }
})

Template.eventrows.events({
	'click span'(elt, instance) {
		console.log(this.entity.id);
		Meteor.call('calendars.remove', this.entity.id, Router.current().params._id, function(error, result){});
	},
})

Template.eventrows.helpers({
	eventNo(index) {
		return index + 1;
	},
})

function day() {
	if (today.getDate() < 10) {
		var d = "0" + today.getDate();
	} else {
		var d = "" + today.getDate();
	}
		return d;
}

function month() {
	if (today.getMonth() < 9) {
		var currentM = today.getMonth() + 1;
		var m = "0" + currentM;
	} else {
		var m = today.getMonth()+1;
	}
		return m;
}

function year() {
		return "" + today.getFullYear();
}

function getToday() {
	return year() + "-" + month() + "-" + day();
}

/* Currently only consider no-leap year*/
function getTomorrow() {
	var tmr = today.getDate() + 1;
	if (tmr < 10) {
		var tmrToString = "0" + tmr;
		return year() + "-" + month() + "-" + tmrToString;
	} else if (tmr < 29) {
		return year() + "-" + month() + "-" + tmr;
	} else if (tmr == 29 && today.getMonth() == 1) {
		return year() + "-03-01";
	} else if (tmr == 31 && (today.getMonth() == 3 || today.getMonth() == 5 || today.getMonth() == 8 )) {
		var nextMonth = today.getMonth() + 2;
		return year() + "-0" + nextMonth + "-01";
	} else if (tmr == 31 && (today.getMonth() == 10 )) {
		var nextMonth = today.getMonth() + 2;
		return year() + "-" + nextMonth + "-01";
	} else if (tmr == 32 && (today.getMonth() == 0 || today.getMonth() == 2 || today.getMonth() == 4 || today.getMonth() == 6 || today.getMonth() == 7)){
		var nextMonth = today.getMonth() + 2;
		return year() + "-0" + nextMonth + "-01";
	} else if (tmr == 32 && today.getMonth() == 9){
		var nextMonth = today.getMonth() + 2;
		return year() + "-" + nextMonth + "-01";
	} else if (tmr == 32 && today.getMonth() == 11) {
		var nextYear = today.getFullYear() + 1;
		return nextYear + "-01-01";
	} else {
		return year() + "-" + month() + "-" + tmr;
	}
}
