Meteor.methods({
  //Messages

  'post.insert'(posttext) {
    Post.insert(posttext);
  },

  'post.remove'(id) {
    Post.remove(id);
  },

  'connections.insert': function(connectionsData) {
    if (!Connections.findOne({"connectionsid":this.userId})) {
      Connections.insert(connectionsData);
    }
  },

  'connections.update': function(connectionsData, connection) {
    Connections.update({"connectionsid":this.userId}, {$push: { "connectionsArray": connection }});
  },

  'connections.remove': function(connectionsData, connection) {
    Connections.update({"connectionsid":this.userId}, {$pull: { "connectionsArray": connection }});
  },

  'usermessages.insert': function(usermessages) {
    Usermessages.insert(usermessages);
  },

  'userprofile.update': function(id, edituserprofile) {
      console.log(edituserprofile);
      User.update({owner:id}, edituserprofile);
  },

  'todo.insert'(event) {
    ToDo.insert(event);
  },

  'todo.remove'(id) {
    ToDo.remove(id);
  },

  'userprofile.insert': function(userprofile) {
      User.insert(userprofile);
  },

  'userprofile.update': function(id, edituserprofile) {
      console.log(edituserprofile);
      User.update({owner:id}, edituserprofile);
  },

  'forums.insert': function(forum) {
    Forums.insert(forum);
  },

  'forums.addcomment' (title, thismessage) { //this will work if thismessage is set up as messagesArray in txt file
    Forums.update({title:title}, {$push: {commentsArray: {$each: thismessage}}});
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
    messageData.messagesArray[0].timeCreated = new Date();
    Groupmessages.insert(messageData);
    Groupmessages.find({}, {sort: {timeCreated: 1}});
  },

  'groupmessages.addmessage' (groupid, thismessage) { //this will work if thismessage is set up as messagesArray in txt file
    thismessage[0].timeCreated = new Date();
    console.log(thismessage[0])
    Groupmessages.update({groupid:groupid}, {$push: {messagesArray: {$each: thismessage}}});
    Groupmessages.find({}, {sort: {timeCreated: 1}});
    //console.log(Groupmessages.findOne({groupid:groupid}).messagesArray.reverse());
    //var reverse = Groupmessages.findOne({groupid:groupid}).messagesArray.reverse();
    // Groupmessages.update({groupd:groupid}, {$set: {messagesArray: reverse}});
    console.log(Groupmessages.findOne({groupid:groupid}).messagesArray);
  },
  'usermessages.addinitmessage' (messageData) { //should be groupid and thismessage
   //will have to set userid field, and put thismessage into messagesArray
   messageData.messagesArray[0].timeCreated = new Date();
   Usermessages.insert(messageData);
   Usermessages.find({}, {sort: {timeCreated: -1}});


 },
 'usermessages.addmessage' (ids, thismessage) { //this will work if thismessage is set up as messagesArray in txt file
   thismessage[0].timeCreated = new Date();
   console.log(thismessage[0])
   Usermessages.update({ids:{$all: ids}}, {$push: {messagesArray: {$each: thismessage}}});
   Usermessages.find({}, {sort: {timeCreated: -1}});
   //console.log(Groupmessages.findOne({groupid:groupid}).messagesArray.reverse());
   //var reverse = Groupmessages.findOne({groupid:groupid}).messagesArray.reverse();
   // Groupmessages.update({groupd:groupid}, {$set: {messagesArray: reverse}});
   //console.log(Groupmessages.findOne({groupid:groupid}).messagesArray);
 }
})
// 'groups.yours'(){
//   Groups.findOne({owner:Meteor.userId()});
// }
// 'groups.addmember'(Meteor.userId()){
//   Groups.update()
// }
