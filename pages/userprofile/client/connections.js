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
  connectionslist(){return User.find()},
  // Must return array of friends list of specified user.
  madeconnectionslist(){
    return Connections.findOne({"connectionsid":Meteor.userId()}).connectionsArray
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

Template.madeconnections.helpers({
  getFirstName: function(id){
    var user = User.findOne({owner: id});
    return user.firstname;
  },
  getLastName: function(id){
    var user = User.findOne({owner: id});
    return user.lastname;
  }
})
