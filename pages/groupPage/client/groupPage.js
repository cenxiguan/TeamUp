Template.joinTemplate.events({
     'click button'(elt,instance) {
        elt.preventDefault();
        Meteor.call('groups.addmember', this._id, Meteor.userId());
        console.dir(this);
    }
})

// Template.groupPage.onCreated(function() {
//    Meteor.subscribe('groups');
// })
