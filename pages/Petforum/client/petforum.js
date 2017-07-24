Template.petforum.onCreated(function() {
  Meteor.subscribe('post');
  Meteor.subscribe('user');
})

Template.showpetpost.helpers({
  petpostlist() {
    return Post.find({field: "pet"})
  },
})

Template.addpetpost.events({
  'click button'(elt,instance) {
    const petpostbox = instance.$('#petpostbox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log(petpostbox);

    instance.$('#petpostbox').val("");
    var posttext =
      { postbox:petpostbox,
        name:name,
        owner:Meteor.userId(),
        createAt:new Date(),
        field: "pet"
      };
    Meteor.call('post.insert', posttext);

    // var msg = new SpeechSynthesisUtterance('message is sent!');
    // window.speechSynthesis.speak(msg);
  }
})

Template.petpostrow.helpers({
  isOwner() {return this.post.owner == Meteor.userId()}
})

Template.petpostrow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.post._id
    console.log(id);
    Meteor.call('post.remove', id);
  }
})
