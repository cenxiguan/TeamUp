Template.connections.onCreated(
  function(){
  Meteor.subscribe('connections');
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
  console.log(connectionsData);
});

Template.connections.helpers({
  connectionslist(){return User.find()},
  // Must return array of friends list of specified user.
  madeconnectionslist(){return Connections.find({"connectionsData.connectionid":Meteor.userId()})},
})

Template.person.helpers({
  // Must check by using MID to find matching Connection object, then by checking if their friends array contains this.u.owner.
  isConnection(){
    return Connections.findOne({"connectionsData.connectionid":Meteor.userId()}).connectionsArray.includes(this.u.owner)},
})

Template.person.events({
  "click #connect"(event, instance){
    const connectionsData = Connections.findOne({"connectionsData.connectionid":Meteor.userId()});
    console.log(connectionsData);
    Meteor.call('connections.update', connectionsData, this.u.owner, Meteor.userId());
  },
  "click #unconnect"(event,instance){
    var r = Connections.findOne({connection:this.u.owner,owner:Meteor.userId()});
    console.log('removing');
    console.log(r)
    Meteor.call('connections.remove',r._id);
  },
})
