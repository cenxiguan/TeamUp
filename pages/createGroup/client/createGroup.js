Template.groupInfo.events({
  'click button'(elt,instance) {
    const groupname = instance.$('#js-groupname').val();
    const groupdesc = instance.$('#js-groupdescription').val();
    const grouploc = instance.$('#js-grouplocation').val();

    elt.preventDefault();

    console.log('this: '+this);
    console.log('this._id: '+this._id);
    console.log('this.id: '+this.id);
    console.log
    console.dir('this');
    console.log('adding group: '+groupname);

    instance.$('#js-groupname').val("");
    instance.$('#js-groupdescription').val("");
    instance.$('#js-grouplocation').val("");

    var groupinfo =
      { groupname:groupname,
        groupdesc:groupdesc,
        grouploc:grouploc,
        owner:Meteor.userId()
        // Need to implement groupid somehow which makes
        // individual pages and unique groups
      };

    //first need to check if groupname is free, if not return error
    Meteor.call('groups.insert', groupinfo);
    //Router.go('');
    //Router.go('templatename',{},{query: {group:groupId}});
    console.log(Groups.find({}));
    console.dir(Groups.find({}).fetch());
  }
})

Template.groupInfo.onCreated(function() {
  Meteor.subscribe('groups');
})

Template.createTeam.onCreated(function() {
  Meteor.subscribe('groups');
})

//onCreated() function blahblah on the group page
//Router.current().params.query.var;
