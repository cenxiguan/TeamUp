Meteor.methods({
  //Messages
  'messages.insert'(messageinfo) {
    Messages.insert(messageinfo);
  },

  'messages.remove'(id) {
    Messages.remove(id);
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
  }
})
// 'groups.yours'(){
//   Groups.findOne({owner:Meteor.userId()});
// }
// 'groups.addmember'(Meteor.userId()){
//   Groups.update()
// }
