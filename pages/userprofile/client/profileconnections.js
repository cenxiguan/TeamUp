Template.profileconnections.helpers({
  // Must return array of friends list of specified user.
  madeconnectionslist(){
    console.log(Connections)
    return Connections.findOne({"connectionsid":Meteor.userId()}).connectionsArray
  },
})

Template.connectionslist.helpers({
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
