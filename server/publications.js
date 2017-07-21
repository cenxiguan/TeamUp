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
  if(userId){
    return User.find({owner: userId});
  } else {
    return User.find({owner: this.userId});
  }
})

Meteor.publish('connections', function(){
  return Connections.find();
})

Meteor.publish('groupmessages', function(_id){
  return Groupmessages.find({groupid:_id});
})

Meteor.publish('usermessages', function(id1, id2){
  return Usermessages.find({ ids: { $all: [id1, id2] } });
})
