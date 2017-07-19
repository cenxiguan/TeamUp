Template.bioforum.onCreated(function() {
  Meteor.subscribe('messages');
  Meteor.subscribe('user');
})

Template.showbiomessages.helpers({
  biomessagelist() {
    return Messages.find({field: "bio"})
  },
})

Template.addbiomessages.events({
  'click button'(elt,instance) {
    const biomessagebox = instance.$('#biomessagebox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log(biomessagebox);

    instance.$('#biomessagebox').val("");
    var messagesinfo =
      { messagebox:biomessagebox,
        name:name,
        field: "bio"
      };
    Meteor.call('messages.insert', messagesinfo);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})

Template.biomessagerow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.message._id
    console.log(id);
    Meteor.call('messages.remove', id);
  }
})
