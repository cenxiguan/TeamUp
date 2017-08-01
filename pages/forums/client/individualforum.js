Template.individualforum.helpers({
  showingComments() {
    var forum=Forums.findOne({_id:Router.current().params.query.forumId});
    console.log(Forums.find().fetch());
    console.log(forum);
    return forum.commentsArray;
  },
})

Template.forumtop.helpers({
  'forumtitle': function(){
    var forum=Forums.findOne({_id:Router.current().params.query.forumId});
    console.log(forum);

    var title=forum.title;
    console.log(title)
    return title;
  },

  'getUsername': function(){
    var forum=Forums.findOne({_id:Router.current().params.query.forumId});
    var user=User.findOne({owner:forum.creator});
    var fname = user.firstname;
    var lname = user.lastname;
    var personname = fname+' '+lname;
    return personname;
  },

  'getCreatedtime': function(){
    var forum=Forums.findOne({_id:Router.current().params.query.forumId});
    var createdtime=forum.createdAt;
    console.log(createdtime);
    return createdtime;
  },

  'foruminfo': function(){
    var forum=Forums.findOne({_id:Router.current().params.query.forumId});
    var description = forum.description;
    console.log(description)
    return description;
  },



})



Template.comment.events({
  'keypress #commentinput': function (e, instance){
     if (e.which == 13) {
       console.log('enter key pressed')
       //elt.preventDefault();
       const messageStringKey = instance.$('#commentinput').val();

       function updateScrollKey(){
         var element =instance.$("#input");
         element.scrollTop = element.scrollHeight;
       }
       const forumId = Router.current().params.query.forumId

       var messageDataKey = {forumId,
         commentsArray: [
           {
             "comment": messageStringKey,
             "author": Meteor.userId(),
             "createdAt":new Date()
           }
         ]
       };


       instance.$('#commentinput').val("");

         Meteor.call('forums.addcomment', messageDataKey.forumId, messageDataKey.commentsArray,
         function(error, result){
           updateScrollKey();
         });
         console.log('adding comment1');
      }
    },
     //console.log('enter key pressed');

   'click #commentsubmit'(elt, instance) {
      elt.preventDefault();
      const input = instance.$('#commentinput').val();
      const forumId = Router.current().params.query.forumId;

        //const groupIdRef = this._id;
        function updateScroll(){
          var element = instance.$("#commentinput");
          element.scrollTop = element.scrollHeight;
        }

        const comment = {
          "comment": input,
          "author": Meteor.userId()
        }

        const forumId = Router.current().params.query.forumId;
        Meteor.call('forums.addcomment', forumId, comment, function(err, result){
          if(err){
            window.alert(err);
            return;
          }

          instance.$('#commentinput').val("");
        });
      },
});


Template.commentrow.onRendered(function() {
  var element = $("#commentinput");
  //var element = instance.$('.messageText');
  element.scrollTop = element.scrollHeight;
});

Template.commentrow.helpers({
  getUsername(thisid) {
    var profile = User.findOne({owner: thisid});
    var fname = profile.firstname;
    var lname = profile.lastname;
    var personname = fname+' '+lname;
    return personname;
  },
  getUserpic(thisid){
    var profile = User.findOne({owner: thisid});
    var pic = profile.pic;
    return pic;
  },
})

Template.commentrow.events({

  'click #commentremove'(elt, instance) {
    const forumId = Router.current().params.query.forumId;
    Meteor.call("forums.deletecomment", forumId, this.comment, function(err, result){
      if(err){
        window.alert(err);
        return;
      }
    })
  },
})
