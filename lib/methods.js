Meteor.methods({
  //Messages
  'messages.insert'(messageinfo) {
    Messages.insert(messageinfo);
  },

  'messages.remove'(id) {
    Messages.remove(id);
  },

  'connections.insert': function(connection, owner) {
    Connections.insert({connection:connection,owner:owner})
  },

  'connections.remove'(id) {
    Connections.remove(id);
  },

  'userprofile.insert': function(userprofile) {
    User.insert(userprofile);
  },

  'userprofile.update': function(id, edituserprofile) {
    console.log(edituserprofile);
    User.update({owner:id}, edituserprofile);
  },

  'groups.insert'(groupinfo) {
    Groups.insert(groupinfo);
  },
   'groups.addmember'(groupid, personalid){ //personalid = Meteor.userId()
     Groups.update({_id:groupid}, {$addToSet: {members: personalid}});
  }
})
// 'groups.yours'(){
//   Groups.findOne({owner:Meteor.userId()});
// }
// 'groups.addmember'(Meteor.userId()){
//   Groups.update()
// }
