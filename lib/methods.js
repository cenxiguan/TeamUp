Meteor.methods({
  //Messages
  'messages.insert'(messageinfo) {
    Messages.insert(messageinfo);
  },

  'messages.remove'(id) {
    Messages.remove(id);
  },

  'userprofile.insert': function(userprofile) {
    User.insert(userprofile);
  },

  'userprofile.update': function(id, edituserprofile) {
    console.log(edituserprofile);
    User.update({owner:id}, edituserprofile);
  },
  'groups.insert'(groupinfo) {
    Groups.insert(groupinfo);
  },
   'groups.addmember'(groupid, personalid){ //personalid = Meteor.userId()
     Groups.update({_id:groupid}, {$addToSet: {members: personalid}});
  },
  'groups.edit' (groupid, editgrpname, editgrpdesc, editgrploc){
    Groups.update({_id:groupid}, {$set: {groupname: editgrpname, groupdesc: editgrpdesc, grouploc: editgrploc}});
  },
  'groupmessages.addinitmessage' (messageData) { //should be groupid and thismessage
    //will have to set groupid field, and put thismessage into messagesArray
    Groupmessages.insert(messageData);
  },
  'groupmessages.addmessage' (groupid, thismessage) { //this will work if thismessage is set up as messagesArray in txt file
    Groupmessages.update({groupid:groupid}, {$addToSet: {messagesArray: thismessage}});
  }
})
// 'groups.yours'(){
//   Groups.findOne({owner:Meteor.userId()});
// }
// 'groups.addmember'(Meteor.userId()){
//   Groups.update()
// }
