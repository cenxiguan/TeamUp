Meteor.publish('post', function(){
  return Post.find();
})

Meteor.publish('todo', function(){
  return ToDo.find();
})

Meteor.publish('groups', function(){
  return Groups.find();
})

Meteor.publish('user', function(){
  return User.find();
})

Meteor.publish('users', function(userId){
  return User.find({owner: userId});
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
