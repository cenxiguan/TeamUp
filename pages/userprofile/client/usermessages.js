Template.usermessages.events({

})


Template.messagerow.helpers({
  "user": function(userid){
    return User.findOne({owner:userid});
  },
})

Template.sendmessage.events({
  'click button#send'(elt,instance) {
    const time = new Date();
    const text = instance.$('.text').val();

    var message = { time:time,
                    text:text,
                    author:Meteor.userId()};

    Meteor.call('usermessages.insert',message, function(err, result){
          if(err){
              alert(err.message);
              return;
          }
    });
  }
})
