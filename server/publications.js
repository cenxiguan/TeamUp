Meteor.publish('messages', function(){
  return Messages.find();
})
Meteor.publish('groups', function(){
  return Groups.find();
})
Meteor.publish('user', function(){
  return User.find();
})
