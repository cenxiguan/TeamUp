Meteor.publish('post', function(){
  return Post.find();
})

Meteor.publish('todo', function(){
  return ToDo.find();
})

Meteor.publish('todoTeam', function(){
  return ToDo.find();
})

Meteor.publish('calendars', function(id){
  return Calendars.find({teamid:id});
})

Meteor.publish('groups', function(){
  return Groups.find();
})

Meteor.publish('forums', function(forumId){
  return Forums.find({creator: forumId});
})

Meteor.publish('forums_search', function(keyword){
  const search_regex = new RegExp(keyword.replace(/[^a-z0-9]/gi, "\\$&"), "gi");
  return Forums.find({title: {$regex: search_regex}}, {$sort: {title: 1}});
})

Meteor.publish('user', function(){
  return User.find();
})

Meteor.publish('users_search', function(keyword){
  const search_regex = new RegExp(keyword.replace(/[^a-z0-9]/gi, "\\$&"), "gi");
  return User.find({fullname: {$regex: search_regex}}, {$sort: {lastname: 1}});
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
