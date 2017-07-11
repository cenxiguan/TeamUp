Meteor.methods({
  //Messages
  'messages.insert'(messageinfo) {
    Messages.insert(messageinfo);
  },

  'messages.remove'(id) {
    Messages.remove(id);
  },
  //Groups
  'groups.insert'(groupinfo) {
    Groups.insert(groupinfo);
  }
})
