Template.bioforum.onCreated(function() {
  Meteor.subscribe('post');
  Meteor.subscribe('user');
})

Template.showbiopost.helpers({
  biopostlist() {
    return Post.find({field: "bio"})
  },
})

Template.addbiopost.events({
  'click button'(elt,instance) {
    const biopostbox = instance.$('#biopostbox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log(biopostbox);

    instance.$('#biopostbox').val("");
    var posttext =
      { postbox:biopostbox,
        name:name,
        field: "bio"
      };
    Meteor.call('post.insert', posttext);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})

Template.biopostrow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.post._id
    console.log(id);
    Meteor.call('post.remove', id);
  }
})
