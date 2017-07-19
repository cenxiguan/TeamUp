Template.itforum.onCreated(function() {
  Meteor.subscribe('post');
  Meteor.subscribe('user');
})

Template.showitpost.helpers({
  itpostlist() {
    return Post.find({field: "it"})
  },
})

Template.additpost.events({
  'click button'(elt,instance) {
    const itpostbox = instance.$('#itpostbox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log(itpostbox);

    instance.$('#itpostbox').val("");
    var posttext =
      { postbox:itpostbox,
        name:name,
        field: "it"
      };
    Meteor.call('post.insert', posttext);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})

Template.itpostrow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.post._id
    console.log(id);
    Meteor.call('post.remove', id);
  }
})
