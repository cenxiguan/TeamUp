Template.forumsCreated.helpers({
  createdlist: function() {
    var allForums = Forums.find({creator: Meteor.userId()}).fetch();
    console.log(Forums.find({creator:Meteor.userId()}).fetch())
    console.log(Forums.find({}).fetch())
    return allForums;
  },
  getCreatorName(creator){
    var creator = User.findOne({owner:creator});
    var fname = creator.firstname;
    var lname = creator.lastname;
    var name = fname + " " + lname;
    return name;
  },
})

Template.forumsCommented.helpers({
  commentedlist: function() {
    var allForums = Forums.find({"commentsArray.author": Meteor.userId()}).fetch();
    console.log(Forums.find({author:Meteor.userId()}).fetch())
    console.log(Forums.find({}).fetch())
    return allForums;
  },
  getCreatorName(creator){
    var creator = User.findOne({owner:creator});
    var fname = creator.firstname;
    var lname = creator.lastname;
    var name = fname + " " + lname;
    return name;
  },
})

//Template.yourForumsrow.helpers({
    //getForumCreator(creator){
      //var creator = User.findOne({owner:creator});
      //var fname = creator.firstname;
      //var lname = creator.lastname;
      //var name = fname + " " + lname;
      //return name;
    //}
//})
