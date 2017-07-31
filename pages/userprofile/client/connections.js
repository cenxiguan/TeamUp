Template.connections.onDestroyed( function(){
  if(this.subscription){
    this.subscription.stop();
  }
});

Template.connections.onCreated( function(){
    this.userDict = new ReactiveDict();
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
  searchlist: function() {
    return User.find().fetch();
  },
});

Template.connections.events({
  "click #submit"(event, instance){
    const query = instance.$('#search_id').val();

    if(instance.subscription){
      instance.subscription.stop();
    }

    const subscription = Meteor.subscribe("users_search", query);
    instance.subscription = subscription;
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
    console.log(connectionsData);
    Meteor.call('connections.update', connectionsData, this.u.owner);
  },
  "click #unconnect"(event,instance){
    const connectionsData = Connections.findOne({"connectionsid":Meteor.userId()});
    console.log('removing');
    Meteor.call('connections.remove', connectionsData, this.u.owner);
    const connectionsDataAfter = Connections.findOne({"connectionsid":Meteor.userId()});
    console.log(connectionsDataAfter);
  },
  "click #messagebutton" (elt,instance) {
    var owner = Connections.findOne({connection:this.u.owner,owner:Meteor.userId()});
    console.log(this.u.owner);
    console.log(this.u);
    var connectionvar = this.u.owner;
    var selfvar = Meteor.userId();
    Router.go('usermessages', {}, {query: 'userid='+ connectionvar + '&userid2='+ selfvar});
  },
})
