Meteor.methods({
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
  }
})
