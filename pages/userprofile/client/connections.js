Template.connections.onCreated(function(){
  Meteor.subscribe('connections');
});

Template.usermessages.onCreated(function(){
  Meteor.subscribe('usermessages');
});

Template.connections.helpers({
  connectionslist(){return User.find()},
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
  "click #messagebutton" (elt,instance) {
    var owner = Connections.findOne({connection:this.u.owner,owner:Meteor.userId()});
  //  var friend = Connections.findOne({connection:this.u, owner:Meteor.userId()});

    console.log(this.u.owner);
    console.log(this.u);
    var connectionvar = this.u.owner;
    var selfvar = Meteor.userId();
    Router.go('/usermessages/', {}, {query: 'userid='+ connectionvar + '&userid2='+ selfvar});

  },
})
