Meteor.methods({
  'messages.insert'(messageinfo) {
    Messages.insert(messageinfo);
  },

  'messages.remove'(id) {
    Messages.remove(id);
  },
})
