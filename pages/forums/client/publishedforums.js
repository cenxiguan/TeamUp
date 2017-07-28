Template.connections.onCreated( function(){
    this.forumDict = new ReactiveDict();
});

Template.publishedforums.helpers({
  searchlist: function() {
     return Template.instance().forumDict.get('searchList');
    // Must put objects into array to display properly!
  },
});

Template.forumsrow.helpers({
  showingForums() {
    var forums=Forums.find().fetch();
    return forums;
  },

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
    const regex = new RegExp(query, "i");
    console.log(regex);
    // undefined
    Template.instance().userDict.set('searchList', User.find({fullname:regex}, {sort: {lastname: 1}}).fetch());
    // Returns documents matching. How so?
    console.log(Template.instance().userDict.get('searchList'));
  },
})
