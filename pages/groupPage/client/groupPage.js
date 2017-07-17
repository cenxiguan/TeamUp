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
     'click button#js-sendGroupMessage'(elt,instance) {
        elt.preventDefault();
        const messageString = instance.$('#js-messageString').val();
        //const groupIdRef = this._id;

        var messageData = {
          groupid:this._id,
          messagesArray: [
            {
              "message": messageString,
              "messageOwner": Meteor.userId()
            }
          ]
        }

        //if Groupmessages collection exists for the group add message
        if (Groupmessages.findOne({groupid:this._id})) {
          console.log('updating message');
          Meteor.call('groupmessages.addmessage', this._id, messageData.messagesArray);
        } else { //else, add init message
          Meteor.call('groupmessages.addinitmessage', messageData);
          console.log('adding init message');
        }

        console.log('Groupmessages findOne: ');
        console.dir(Groupmessages.findOne({groupid:this._id}));
    }
})

// Template.groupPage.onCreated(function() {
//    Meteor.subscribe('groups');
// })
