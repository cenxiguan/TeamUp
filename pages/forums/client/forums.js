Template.forums.onCreated(function() {
  Meteor.subscribe('messages');
})

Template.showmessages.helpers({
  messagelist() {return Messages.find()},
})

Template.addmessages.events({
  'click button'(elt,instance) {
    const messagebox = instance.$('#messagebox').val();
    const name = instance.$('#name').val();
    console.log('adding '+name);
    instance.$('#messagebox').val("");
    var messagesinfo =
      { messagebox:messagebox,
        name:name
        //owner:Meteor.userID()
      };
    Meteor.call('messages.insert', messagesinfo);
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
