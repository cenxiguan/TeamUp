Meteor.publish('messages', function(){
  return Messages.find();
})

Meteor.publish('groups', function(){
  return Groups.find();
})
