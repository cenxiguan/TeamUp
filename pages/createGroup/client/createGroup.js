Template.groupInfo.events({
  'click button'(elt,instance) {
    console.log('test');
    const groupname = instance.$('#js-groupname').val();
    const groupdesc = instance.$('#js-groupdescription').val();
    const grouploc = instance.$('#js-grouplocation').val();

    elt.preventDefault();

    console.log('this: '+this);
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
      };

    //first need to check if groupname is free, if not return error
    Meteor.call('groups.insert', groupinfo);

  }
})
