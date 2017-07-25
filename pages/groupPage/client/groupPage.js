Template.showMessages.onRendered(function() {
  var element = document.getElementById("messageTextId");
  //var element = instance.$('.messageText');
  element.scrollTop = element.scrollHeight;
});

Template.groupPage.helpers({
  isMember(){
    return Groups.findOne({"_id":this._id}).members.includes(Meteor.userId())},
})

Template.groupMain.events({
     'click button#js-requestjoingroup'(elt,instance) {
        elt.preventDefault();
        Meteor.call('groups.addmember', this._id, Meteor.userId());
        console.dir(this);
    },
    'click button#js-editGroup'(elt,instance) {
      elt.preventDefault();
      instance.$(".groupMainDiv").css("display", "none");
      instance.$(".groupEditDiv").css("display", "block");
    },
    'click button#js-saveGroup' (elt,instance) {
      console.log('testing this');
      console.dir(this);
      elt.preventDefault();

      const editgrpname = instance.$('.editgroupname').val();
      const editgrpdesc = instance.$('.editgroupdesc').val();
      const editgrploc = instance.$('.editgrouploc').val();
      instance.$('.editgroupname').val("");
      instance.$('.editgroupdesc').val("");
      instance.$('.editgrouploc').val("");

      instance.$(".groupMainDiv").css("display", "block");
      instance.$(".groupEditDiv").css("display", "none");

      Meteor.call('groups.edit', this._id, editgrpname, editgrpdesc, editgrploc)

      console.log('testing this');
      console.dir(this);

      // var groupinfo =
      //   { groupname:editgrpname,
      //     groupdesc:editgrpdesc,
      //     grouploc:editgrploc,
      //   }
    }
})

Template.groupMessage.events({
     'keypress #js-messageString': function (e, instance){
        if (e.which == 13) {
          console.log('enter key pressed')
          //elt.preventDefault();
          const messageStringKey = instance.$('#js-messageString').val();

          function updateScrollKey(){
            var element = document.getElementById("messageTextId");
            element.scrollTop = element.scrollHeight;
          }

          var messageDataKey = {
            groupid:this._id,
            messagesArray: [
              {
                "message": messageStringKey,
                "messageOwner": Meteor.userId()
              }
            ]
          }

          instance.$('#js-messageString').val("");

          if (Groupmessages.findOne({groupid:this._id})) {
            console.log('updating message');
            Meteor.call('groupmessages.addmessage', this._id, messageDataKey.messagesArray,
            function(error, result){
              updateScrollKey();
            });
          } else { //else, add init message
            Meteor.call('groupmessages.addinitmessage', messageDataKey,
            function(error, result){
              updateScrollKey();
            });
            console.log('adding init message');
          }
        }
        //console.log('enter key pressed');
      },
     'click button#js-sendGroupMessage'(elt,instance) {
        elt.preventDefault();
        const messageString = instance.$('#js-messageString').val();
        //const groupIdRef = this._id;

        function updateScroll(){
          var element = document.getElementById("messageTextId");
          element.scrollTop = element.scrollHeight;
        }

        var messageData = {
          groupid:this._id,
          messagesArray: [
            {
              "message": messageString,
              "messageOwner": Meteor.userId()
            }
          ]
        }

        instance.$('#js-messageString').val("");

        //if Groupmessages collection exists for the group add message
        if (Groupmessages.findOne({groupid:this._id})) {
          console.log('updating message');
          Meteor.call('groupmessages.addmessage', this._id, messageData.messagesArray,
          function(error, result){
            updateScroll();
          });
        } else { //else, add init message
          Meteor.call('groupmessages.addinitmessage', messageData,
          function(error, result){
            updateScroll();
          });
          console.log('adding init message');
        }
        console.log('Groupmessages findOne: ');
        console.dir(Groupmessages.findOne({groupid:this._id}));
    }
})

Template.showMessages.helpers({
  showingMessages() {
    return Groupmessages.find();
  },
})

Template.individualMessage.helpers({
  getUsername(thisid) {
    var profile = User.findOne({owner: thisid});
    var fname = profile.firstname;
    var lname = profile.lastname;
    var personname = fname+' '+lname;
    return personname;
  },
})

// User.findOne({owner: object.messagesArray.messageOwner})

// Template.groupPage.onCreated(function() {
//    Meteor.subscribe('groups');
// })
