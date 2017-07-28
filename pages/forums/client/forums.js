Template.forums.onCreated(function() {
  Meteor.subscribe('forums');
})

Template.forums.events({

  'click button#submit'(elt,instance) {

    $("#submit").attr("class", "ui right floated blue loading disabled button");
    const title = instance.$('#title').val();


      const description = instance.$('#description').val();
      const agree = $("#agree").is(":checked");

      var forum = {title:title,
               description:description,
               createdAt:new Date(),
               creator:Meteor.userId()};

      if (agree) {
          Meteor.call('forums.insert', forum, function(err, result){
            if(err){
                alert(err.message);
                $("#submit").attr("class", "ui right floated blue botton");
                return;
            }

            Router.go('individualforum', {}, {query: 'forumId=' + result});
          });
       }else{
          alert('You must check the box to insert your profile');
       }
      },

})
