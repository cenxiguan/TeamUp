Template.groupInfo.events({
  'click button'(elt,instance) {
    const groupname = instance.$('#js-groupname').val();
    const groupdesc = instance.$('#js-groupdescription').val();
    const grouploc = instance.$('#js-grouplocation').val();
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
  }
})