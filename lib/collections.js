Post = new Meteor.Collection('post');
User = new Meteor.Collection('user');
Groups = new Meteor.Collection('groups');
Groupmessages = new Meteor.Collection('groupmessages');
Connections = new Meteor.Collection('connections');
Calendars = new Meteor.Collection('calendars');
Usermessages=new Meteor.Collection('usermessages');
ToDo = new Meteor.Collection('todo');
Forums = new Meteor.Collection('forums');

//For easy search
GroupsIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function() {
      return {createdAt: -1};
    },
    selector: function(searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = options.search.props.categoryFilter;

      if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }

      return selector;
    }
  }),
  collection: Groups,
  fields: ['groupname','groupdesc'], //fields to search through, add groupdesc
  defaultSearchOptions: {
      limit: 8 //display 8 results
  },
  permission: () => { //new way to write function
    return true;
  }
});
