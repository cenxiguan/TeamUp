Meteor.publish('messages', function(){
  return Messages.find();
})

Meteor.publish('user', function(){
  return User.find();
})
