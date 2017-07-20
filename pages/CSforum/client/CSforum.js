Template.CSforum.onCreated(function() {
  Meteor.subscribe('post');
  Meteor.subscribe('user');
})

Template.showCSpost.helpers({
  CSpostlist() {
    return Post.find({field: "CS"})
  },
})

Template.addCSpost.events({
  'click button'(elt,instance) {
    const CSpostbox = instance.$('#CSpostbox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log(CSpostbox);

    instance.$('#CSpostbox').val("");
    var posttext =
      { postbox:CSpostbox,
        name:name,
        field: "CS"
      };
    Meteor.call('post.insert', posttext);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})

Template.CSpostrow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.post._id
    console.log(id);
    Meteor.call('post.remove', id);
  }
})
