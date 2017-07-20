Messages = new Meteor.Collection('messages');
Biomessages = new Meteor.Collection('biomessages');
User = new Meteor.Collection('user');
Groups = new Meteor.Collection('groups');
Groupmessages = new Meteor.Collection('groupmessages');
Connections = new Meteor.Collection('connections');
Calendar = new Meteor.Collection('calendar');

//For easy search
TeamIndex = EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function() {
      return {createdAt: -1};
    },
    selector: function(searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = options.search.props.categoryFilter;

      if(._isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }

      return selector;
    }
  }),
  collection: Groups,
  // fields: []
})
