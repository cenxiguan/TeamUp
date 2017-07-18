Template.showGroups.helpers({
//   Meteor.call('groupsowned', Meteor.userId())
//   // "groupsOwned": function(){
//   //   allGroups = Groups.find({owner : Meteor.userId() }).fetch();
//   //   console.dir(allGroups);
//   // },
  yourGroups(){
    var allGroups = Groups.find({owner : Meteor.userId()}).fetch();
    console.log(Groups.find({owner : Meteor.userId()}).fetch())
    //console.log(allGroups)
    //console.log(Groups.find({}).fetch());
    return allGroups;
  },
  yourGroupsIds(){
    var allGroupsIds = Groups.find({owner : Meteor.userId()}).fetch();
    console.log(Groups.find({owner : Meteor.userId()}).fetch())
    //console.log(allGroups)
    //console.log(Groups.find({}).fetch());
    return allGroupsIds;
  }
})
