
Template.messagerow.helpers({
  "user": function(userid){
    return User.findOne({owner:userid});
  },
})

Template.messagehistory.helpers({
  usermessageslist() {return Usermessages.find()},
})

Template.sendmessage.events({
  'click button#send'(elt,instance) {
    const time = new Date();
    const text = instance.$('.text').val();
    const ids = Router.current().params.query;
    var usermessages = {ids:ids,
                        time:time,
                        text:text,
                        author:Meteor.userId()}

    Meteor.call('usermessages.insert',usermessages, function(err, result){
          if(err){
              alert(err.message);
              return;
          }
    });
    console.log(Usermessages.find());
  }
})
