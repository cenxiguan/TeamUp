Meteor.publish('messages', function(){
  return Messages.find();
})
Meteor.publish('groups', function(){
  return Groups.find();
})

Meteor.publish('user', function(){
  return User.find();
})

Meteor.publish('connections', function(){
  return Connections.find();
})

Meteor.publish('calendar', function(){
  return Calendar.find();
})
Meteor.publish('groupmessages', function(_id){
  return Groupmessages.find({groupid:_id});
})
