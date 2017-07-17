Template.connections.onCreated(function(){
  Meteor.subscribe('connections');
});

Template.connections.helpers({
  connectionslist() {return User.find()},
})

Template.person.helpers({
  isConnection(){return Connections.findOne({connection:this.u.owner,owner:Meteor.userId()})},
})

Template.person.events({
  "click #connect"(event, instance){
    Meteor.call('connections.insert', this.u.owner, Meteor.userId());
  },
  "click #unconnect"(event,instance){
    var r = Connections.findOne({connection:this.u.owner,owner:Meteor.userId()});
    console.log('removing');
    console.log(r)
    Meteor.call('connections.remove',r._id);
  },
})

//        Meteor.call('userprofile.update',Meteor.userId(), userprofile);