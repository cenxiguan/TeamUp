Template.sendmessage.events({
  'keypress #input': function (e, instance){
     if (e.which == 13) {
       console.log('enter key pressed')
       //elt.preventDefault();
       const messageStringKey = instance.$('#input').val();

       function updateScrollKey(){
         var element =instance.$("#input");
         element.scrollTop = element.scrollHeight;
       }
       const id1 = Router.current().params.query.userid,
             id2 = Router.current().params.query.userid2

       var messageDataKey = {
         ids:[id1, id2],
         messagesArray: [
           {
             "message": messageStringKey,
             "author": Meteor.userId()
           }
         ]
       };


       instance.$('#input').val("");

      if (Usermessages.findOne({ids:{$all:messageDataKey.ids}})) {
         console.log('updating message');

         Meteor.call('usermessages.addmessage', messageDataKey.ids, messageDataKey.messagesArray,
         function(error, result){
           updateScrollKey();
         });
       } else { //else, add init message
         Meteor.call('usermessages.addinitmessage', messageDataKey,
         function(error, result){
           updateScrollKey();
         });
         console.log('adding init message');
       }
     }
     //console.log('enter key pressed');
   },

   'click button#send'(elt,instance) {
      elt.preventDefault();
      const input = instance.$('#input').val();
      //const groupIdRef = this._id;

      function updateScroll(){
        var element = instance.$("#input");
        element.scrollTop = element.scrollHeight;
      }

      var messageData = {
        ids:[Router.current().params.query.userid,Router.current().params.query.userid2],
        messagesArray: [
          {
            "message": input,
            "author": Meteor.userId()
          }
        ]
      };

      instance.$('#input').val("");

        //if Usermessages collection exists for the group add message

        if (Usermessages.findOne({ids:{$all:[Router.current().params.query.userid,Router.current().params.query.userid2]}})) {
          console.log('updating message');
          Meteor.call('usermessages.addmessage', [Router.current().params.query.userid,Router.current().params.query.userid2], messageData.messagesArray);
        } else { //else, add init message
          Meteor.call('usermessages.addinitmessage', messageData);
          console.log('adding init message');
        }
        console.log('Usermessages findOne: ');
        console.dir(Usermessages.findOne({ids:{$all:[Router.current().params.query.userid,Router.current().params.query.userid2]}}));
    }
})


Template.messagehistory.onRendered(function() {
  var element = $("#input");
  //var element = instance.$('.messageText');
  element.scrollTop = element.scrollHeight;
});



Template.messagehistory.helpers({
  showingMessages() {return Usermessages.find()},
})




Template.messagerow.helpers({
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
