Template.publishedforums.onCreated( function(){
    this.forumDict = new ReactiveDict();
});

Template.publishedforums.helpers({
  searchlist: function() {
    return Forums.find().fetch();
  },
})

Template.forumsrow.helpers({
  getForumCreator(creator){
    var creator = User.findOne({owner:creator});
    var fname = creator.firstname;
    var lname = creator.lastname;
    var name = fname + " " + lname;
    return name;
  }
})

Template.publishedforums.events({
  "click #submit"(event, instance){
    const query = instance.$('#search_id').val();

    if(instance.subscription){
      instance.subscription.stop();
    }

    const subscription = Meteor.subscribe("forums_search", query);
    instance.subscription = subscription;
  },
})
