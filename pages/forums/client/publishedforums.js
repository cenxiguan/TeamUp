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
