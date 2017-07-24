Template.connections.onCreated(
  function(){
  var connectionsData = {
    connectionsid:Meteor.userId(),
    connectionsArray: [],
  }
  Meteor.call('connections.insert', connectionsData, function(err, result){
    if(err){
      window.alert(err);
      return;
    }
  });
});

Template.connections.helpers({
  connectionslist() {
    // If something entered in search.
    if (false) {
      return User.find({firstname:/p/}).fetch();
    } else {
      return User.find();
    }
  },
})

Template.person.helpers({
  notCurrentUser(){
    return this.u.owner != Meteor.userId()},
  // Must check by using MID to find matching Connection object, then by checking if their friends array contains this.u.owner.
  isConnection(){
    return Connections.findOne({"connectionsid":Meteor.userId()}).connectionsArray.includes(this.u.owner)},
})

Template.person.events({
  "click #connect"(event, instance){
    const connectionsData = Connections.findOne({"connectionsid":Meteor.userId()});
    Meteor.call('connections.update', connectionsData, this.u.owner);
  },
  "click #unconnect"(event,instance){
    const connectionsData = Connections.findOne({"connectionsid":Meteor.userId()});
    console.log('removing');
    Meteor.call('connections.remove', connectionsData, this.u.owner);
    const connectionsDataAfter = Connections.findOne({"connectionsid":Meteor.userId()});
    console.log(connectionsDataAfter);
  },
})
