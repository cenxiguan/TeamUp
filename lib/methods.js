Meteor.methods({
  //Messages

  'messages.insert'(messageinfo) {
    Messages.insert(messageinfo);
  },

  'messages.remove'(id) {
    Messages.remove(id);
  },

  'biomessages.insert'(messageinfo) {
    Biomessages.insert(messageinfo);
  },

  'biomessages.remove'(id) {
    Biomessages.remove(id);
  },
  
  'connections.insert': function(connection, owner) {
    Connections.insert({connection:connection,owner:owner})
  },

  'connections.remove'(id) {
    Connections.remove(id);
  },

  'calendar.insert': function(calendar, owner) {
    Calendar.insert({calendar:calendar,owner:owner})
  },

  'calendar.remove'(id) {
    Calendar.remove(id);
  },

  'userprofile.insert': function(userprofile) {
      User.insert(userprofile);
  },

  'userprofile.update': function(id, edituserprofile) {
      console.log(edituserprofile);
      User.update({owner:id}, edituserprofile);
  },

  //groups

  'groups.insert'(groupinfo) {
    Groups.insert(groupinfo);
  },
   'groups.addmember'(groupid, personalid){ //personalid = Meteor.userId()
     Groups.update({_id:groupid}, {$addToSet: {members: personalid}});
  },
  'groups.edit' (groupid, editgrpname, editgrpdesc, editgrploc){
    Groups.update({_id:groupid}, {$set: {groupname: editgrpname, groupdesc: editgrpdesc, grouploc: editgrploc}});
  },

  //groupinfo

  'groupsowned' (personalid){
    var allGroups = Groups.find({owner : personalid }).fetch();
    console.log('method allGroups: ');
    //console.dir(allGroups);
  },

  'groupsmemberof' (personalid){

  },

  //groupmessages

  'groupmessages.addinitmessage' (messageData) { //should be groupid and thismessage
    //will have to set groupid field, and put thismessage into messagesArray
    messageData.messagesArray[0].timeCreated = new Date();
    Groupmessages.insert(messageData);
    Groupmessages.find({}, {sort: {timeCreated: 1}});

  },
  'groupmessages.addmessage' (groupid, thismessage) { //this will work if thismessage is set up as messagesArray in txt file
    thismessage[0].timeCreated = new Date();
    console.log(thismessage[0])
    Groupmessages.update({groupid:groupid}, {$push: {messagesArray: {$each: thismessage}}});
    Groupmessages.find({}, {sort: {timeCreated: 1}});
  }
})
// 'groups.yours'(){
//   Groups.findOne({owner:Meteor.userId()});
// }
// 'groups.addmember'(Meteor.userId()){
//   Groups.update()
// }
