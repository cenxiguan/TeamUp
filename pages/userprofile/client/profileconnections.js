Template.profileconnections.helpers({
  // Must return array of friends list of specified user.
  madeconnectionslist(){
    console.log(Connections)
    return Connections.findOne({"connectionsid":Meteor.userId()}).connectionsArray
  },
})

Template.connectionslist.helpers({
  isConnection: function(id){
    return Connections.findOne({"connectionsid":Meteor.userId()}).connectionsArray.includes(id)
  },
  getFirstName: function(id){
    var user = User.findOne({owner: id});
    return user.firstname;
  },
  getLastName: function(id){
    var user = User.findOne({owner: id});
    return user.lastname;
  },
  getSubject: function(id){
    var user = User.findOne({owner: id});
    return user.academicfield;
  }
})

Template.connectionslist.events({
  // Pass u parameter.
  "click #unconnect"(event,instance){
    const connectionsData = Connections.findOne({"connectionsid":Meteor.userId()});
    console.log('removing');
    Meteor.call('connections.remove', connectionsData, this.u);
    const connectionsDataAfter = Connections.findOne({"connectionsid":Meteor.userId()});
    console.log(connectionsDataAfter);
  },
  "click #messagebutton" (elt,instance) {
    var owner = Connections.findOne({connection:this.u,owner:Meteor.userId()});
    console.log(this.u);
    var connectionvar = this.u;
    var selfvar = Meteor.userId();
    Router.go('usermessages', {}, {query: 'userid='+ connectionvar + '&userid2='+ selfvar});
  },
})
