Template.teamsearch.onCreated(function() {
 Meteor.subscribe('groups');
});

Template.teamsearch.helpers({

  //all functions etc described starting around 15:30 or 15:40
  inputAttributes: function() {
    return {'class' : 'easy-search-input', 'placeholder': 'Search keywords here'};
  },
  players: function() {
    return Groups.find({}, {sort: {lastname: -1}}); //sorted -1 so newest @ top
  },
  selectedName: function() {
    var group = GroupsIndex.config.mongoCollection.findOne({__originalId: Session.get("selectedGroup")}); //will need to define this session, in video it is called selectedJoke
    return group && group.groupname;
  },
  index: function() {
    return GroupsIndex;
  },
  resultsCount: function() {
    return GroupsIndex.getComponentDict().get('count');
  },
  showMore: function() {
    return false;
  },
  renderTempl: () => Template.renderTemplate //different way to write a function
});

Template.UserTemplate.helpers({
  selected: function() {
    if(!Template.instance().session) return false;
    return Template.instance().session.equals("selectedGroup", this.__originalId) ? "selected" : ''; //explained @ 14:50
  },
  // test: function(o){
  //   console.log(o)
  // }
});

Template.UserTemplate.events({
  'click': function(e, instance) {
    if(!Template.instance().session){
        //do nothing
    }else{
      Template.instance().session = new Session();
      Template.instance().session.set("selectedGroup", this.__originalId); //explained around 15:40
    }
  },
});
