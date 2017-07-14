Template.userprofile.onCreated(function(){
  Meteor.subscribe('user');
});

Template.userprofile.helpers({
  "hasProfile": function(){
    return User.findOne({owner: Meteor.userId()});
  },
})

Template.showprofile.helpers({
  "user": function(){
    return User.findOne({owner:Meteor.userId()});
  },

})

Template.showprofile.events({
  'click button#edit'(elt,instance) {
    instance.$(".showprofilediv").css("display", "none");
    instance.$(".editinfo").css("display", "block");
  },

  'click button#save'(elt,instance) {
    console.log("clicked");
    const editfirstname = instance.$('.editfirstname').val();
    const editlastname = instance.$('.editlastname').val();
    const editemail = instance.$('.editemail').val();
    const editphone = instance.$('.editphone').val();
    const editdateofbirth = instance.$('.editdateofbirth').val();
  //  var editgender = var conceptName = $('#gender').find(":selected").text();
    const editgender = instance.$('.editgender').val();
    const editoccupation = instance.$('.editoccupation').val();
    const editacademicfield = instance.$('.editacademicfield').val();
    const editinstitution = instance.$('.editinstitution').val();
    const editlocation = instance.$('.editlocation').val();
    const editbio = instance.$('.editbio').val();
    const editagree = $(".editagree").is(":checked");

  //usernameinputs = instance,$("#")
  //console.log('adding '+name);
    instance.$('.editfirstname').val("");
    instance.$('.editlastname').val("");
    instance.$('.editemail').val("");
    instance.$('.editphone').val("");
    instance.$('.editdateofbirth').val("");
    instance.$('.editgender').val("");
    instance.$('.editoccupation').val("");
    instance.$('.editacademicfield').val("");
    instance.$('.editinstitution').val("");
    instance.$('.editlocation').val("");
    instance.$('.editbio').val("");

    var userprofile = {firstname:editfirstname,
                 lastname:editlastname,
                 email:editemail,
                 phone:editphone,
                 dateofbirth:editdateofbirth,
                 gender:editgender,
                 occupation:editoccupation,
                 academicfield:editacademicfield,
                 institution:editinstitution,
                 location:editlocation,
                 bio:editbio,
                 owner:Meteor.userId()};
                 console.log(userprofile);
     if (editagree) {
       Meteor.call('userprofile.update',Meteor.userId(), userprofile);
       instance.$(".editinfo").css("display", "none");
       instance.$(".showprofilediv").css("display", "block");
     }else{
       alert('you must check the box to insert your profile');
     }

     instance.$(".showprofilediv").css("display", "block");
     instance.$(".editinfo").css("display", "none");
  },
})

Template.addprofile.events({
  'change #pic': function(event){
    if(event.currentTarget.files&&event.currentTarget.files[0] && event.currentTarget.files[0].type.match(/(jpg|jpeg|png|gif)$/)) {
      if(event.currentTarget.files[0].size>1048576) {
        alert('File size is larger than 1MB!');
      }else{
        var reader = new FileReader();
        reader.onload = function(event){
          var result = event.currentTarget.result;
          $('#pic1').attr('src', result);
          $('#pic1').css('display', 'block');
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
      }
    }else alert('This is not an image file!');
  },

  'click button#submit'(elt,instance) {
    const firstname = instance.$('#firstname').val();
    const lastname = instance.$('#lastname').val();
    const email = instance.$('#email').val();
    const phone = instance.$('#phone').val();
    const dateofbirth = instance.$('#dateofbirth').val();
    const gender = instance.$('#gender').val();
    const occupation = instance.$('#occupation').val();
    const academicfield = instance.$('#academicfield').val();
    const institution = instance.$('#institution').val();
    const location = instance.$('#location').val();
    const bio = instance.$('#bio').val();
    const pic=instance.$('#pic')[0].files[0];
    const agree = $("#agree").is(":checked");

    //usernameinputs = instance,$("#")
    //console.log('adding '+name);
    instance.$('#firstname').val("");
    instance.$('#lastname').val("");
    instance.$('#email').val("");
    instance.$('#phone').val("");
    instance.$('#dateofbirth').val("");
    instance.$('#gender').val("");
    instance.$('#occupation').val("");
    instance.$('#academicfield').val("");
    instance.$('#institution').val("");
    instance.$('#location').val("");
    instance.$('#bio').val("");
    instance.$('#pic').val("");

    users = User.find({owner:Meteor.userId()}).fetch();


    var userprofile = {firstname:firstname,
                   lastname:lastname,
                   email:email,
                   phone:phone,
                   dateofbirth:dateofbirth,
                   gender:gender,
                   occupation:occupation,
                   academicfield:academicfield,
                   institution:institution,
                   location:location,
                   bio:bio,
                   owner:Meteor.userId()};
    if (agree) {
      var reader = new FileReader();
      reader.onload = function() {
        var dataUrl = reader.result;
        var img_base64 = dataUrl.split(',')[1];
        userprofile.pic = img_base64;
        Meteor.call('userprofile.insert',userprofile);

        instance.$(".addprofilediv").css("display", "none");
        instance.$(".showprofilediv").css("display", "block");

      };
      reader.readAsDataURL(pic);
    }else{
          alert('you must check the box to insert your profile');
    }
  },
  // "change #pic": function(event){
  //   if($("#pic").val()){
  //     const file_type = event.currentTarget.files[0].type;
  //
  //     //check if there is image to load
  //     if(file_type.substring(0,5) !== "image"){
  //       alert("Please upload an image");
  //       $("#pic").val("");
  //       $("#pic1").attr("src","");
  //       return;
  //     }else{
  //       var reader = new FileReader();
  //       reader.onload = function(event) {
  //         //get loaded data and render pic1
  //         $("#pic1").attr("src",event.currentTarget.result);
  //         $("#pic1").css("display","block");
  //       };
  //
  //       //read the image as a img_base64
  //       reader.
  //
  //       } {
  //
  //       }
  //     }
  //   }
})
