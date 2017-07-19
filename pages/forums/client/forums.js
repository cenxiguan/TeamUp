Template.forums.onCreated(function() {
  Meteor.subscribe('messages');
  Meteor.subscribe('user');
})

Template.showmessages.helpers({
  messagelist() {
    return Messages.find({field: "public"})
  },
})

Template.addmessages.events({
  'click button'(elt,instance) {
    const messagebox = instance.$('#messagebox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log('adding '+name);

    instance.$('#messagebox').val("");
    var messagesinfo =
      { messagebox:messagebox,
        name:name,
        field: "public"
      };
    Meteor.call('messages.insert', messagesinfo);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})


Template.messagerow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.message._id
    console.log(id);
    Meteor.call('messages.remove', id);
  }
})
