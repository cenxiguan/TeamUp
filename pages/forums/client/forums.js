Template.forums.onCreated(function() {
  Meteor.subscribe('post');
  Meteor.subscribe('user');
})

Template.showpost.helpers({
  postlist() {
    return Post.find({field: "public"})
  },
})

Template.addpost.events({
  'click button'(elt,instance) {
    const postbox = instance.$('#postbox').val();
    const name = User.findOne({owner: Meteor.userId()}).firstname + " " + User.findOne({owner: Meteor.userId()}).lastname;
    console.log('adding '+name);
    
    instance.$('#postbox').val("");
    var posttext =
      { postbox:postbox,
        name:name,
        owner:Meteor.userId(),
        createAt:new Date(),
        field: "public"
      };
    Meteor.call('post.insert', posttext);

    // var msg = new SpeechSynthesisUtterance('post is sent!');
    // window.speechSynthesis.speak(msg);
  }
})

Template.postrow.helpers({
  isOwner() {return this.post.owner == Meteor.userId()}
})

Template.postrow.events({
  'click span'(elt,instance) {
    console.dir(this);
    var id = this.post._id
    console.log(id);
    Meteor.call('post.remove', id);
  }
})
