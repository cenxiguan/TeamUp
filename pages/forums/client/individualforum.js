Template.individualforum.helpers({
  'forumtitle': function(){
    var title=Router.current().params.query.title;
    console.log(title)
    return title;
  },
})

Template.forumtop.helpers({

  'getUsername': function(){
    var forum=Forums.findOne({title:Router.current().params.query.title});
    var user=User.findOne({owner:forum.creator});
    var fname = user.firstname;
    var lname = user.lastname;
    var personname = fname+' '+lname;
    return personname;
  },

  'getCreatedtime': function(){
    var forum=Forums.findOne({title:Router.current().params.query.title});
    var createdtime=forum.createdAt;
    console.log(createdtime);
    return createdtime;
  },

  'foruminfo': function(){
    var forum=Forums.findOne({title:Router.current().params.query.title});
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
       const title = Router.current().params.query.title

       var messageDataKey = {title,
         commentsArray: [
           {
             "comment": messageStringKey,
             "author": Meteor.userId(),
             "createdAt":new Date()
           }
         ]
       };


       instance.$('#commentinput').val("");

         Meteor.call('forums.addcomment', messageDataKey.title, messageDataKey.commentsArray,
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

        //const groupIdRef = this._id;
        function updateScroll(){
          var element = instance.$("#commentinput");
          element.scrollTop = element.scrollHeight;
        }

        const title = Router.current().params.query.title


        var messageDataKey = {title,
          commentsArray: [
            {
              "comment": input,
              "author": Meteor.userId(),
              "createdAt":new Date()
            }
          ]
        };

        instance.$('#commentinput').val("");
        Meteor.call('forums.addcomment', messageDataKey.title, messageDataKey.commentsArray);
        console.log('adding comment2');
      },
});


Template.commentrow.onRendered(function() {
  var element = $("#commentinput");
  //var element = instance.$('.messageText');
  element.scrollTop = element.scrollHeight;
});

Template.commentrow.helpers({
  showingComments() {
    var forum=Forums.findOne({title:Router.current().params.query.title});
    console.log(Forums.find().fetch());
    console.log(forum);
    return forum.commentsArray;
  },
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
