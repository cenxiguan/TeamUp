Template.layout.events({
  'click #yourForums'(elt,instance) {
    Router.go('yourForums', {}, {query: 'yourForums=' + Meteor.userId()});
  }
})

Template.layout.helpers({
  getId: function() {
    return Meteor.userId();
  },
})
