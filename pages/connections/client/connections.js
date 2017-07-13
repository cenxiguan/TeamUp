Template.connections.onCreated(function(){
  Meteor.subscribe('connections');
});

Template.connections.helpers({
  connectionslist() {return User.find()},
})

Template.person.helpers({
  isConnection(){return User.findOne({connection:this.u.owner,owner:Meteor.userId()})},
})

Template.person.events({
  "click #js-connect"(event, instance){
    Meteor.call('connections.insert', this.u.owner, Meteor.userID());
  },
  "click #js-deconnect"(event,instance){
    var r = Connections.findOne({connection:this.u.owner,owner:Meteor.userId()});
    console.log('removing'); console.dir(r);
    Meteor.call('connections.remove',r._id);
  },
})
