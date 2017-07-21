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

Template.usermessages.onCreated(function(){
  Meteor.subscribe('usermessages');
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
  },
  "click #messagebutton" (elt,instance) {
    var owner = Connections.findOne({connection:this.u.owner,owner:Meteor.userId()});
  //  var friend = Connections.findOne({connection:this.u, owner:Meteor.userId()});

    console.log(this.u.owner);
    console.log(this.u);
    var connectionvar = this.u.owner;
    var selfvar = Meteor.userId();
    Router.go('/usermessages/', {}, {query: 'userid='+ connectionvar + '&userid2='+ selfvar});

  },
  getSubject: function(id){
    var user = User.findOne({owner: id});
    return user.academicfield;
  },
})
