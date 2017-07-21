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

  'connections.insert': function(connection, owner) {
    Connections.insert({connection:connection,owner:owner});
  },
  'connections.update': function(connectionsData, connection) {
    Connections.update({"connectionsid":this.userId}, {$push: { "connectionsArray": connection }});
  },

  'connections.remove': function(connectionsData, connection) {
    Connections.update({"connectionsid":this.userId}, {$pull: { "connectionsArray": connection }});
  },


  'todo.insert'(event, owner) {
    ToDo.insert(event, owner);
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
    //console.log(Groupmessages.findOne({groupid:groupid}).messagesArray);
  }
})
// 'groups.yours'(){
//   Groups.findOne({owner:Meteor.userId()});
// }
// 'groups.addmember'(Meteor.userId()){
//   Groups.update()
// }
