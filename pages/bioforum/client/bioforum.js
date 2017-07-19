Template.bioforum.onCreated(function() {
  Meteor.subscribe('biomessages');
})

Template.bioforum.onRendered(function(){

})

Template.showbiomessages.helpers({
  biomessagelist() {
    return Biomessages.find()
  },
})

Template.addbiomessages.events({
  'click button'(elt,instance) {
    const biomessagebox = instance.$('#biomessagebox').val();
    const name = instance.$('#name').val();
    console.log('adding '+name);
    instance.$('#messagebox').val("");
    var messagesinfo =
      { biomessagebox:biomessagebox,
        name:name
        //owner:Meteor.userID()
      };
    Meteor.call('biomessages.insert', messagesinfo);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})


Template.biomessagerow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.message._id
    console.log(id);
    Meteor.call('biomessages.remove', id);
  }
})
