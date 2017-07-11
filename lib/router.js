Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'home'});
Router.route('about');
Router.route('profile');
Router.route('joinus');
Router.route('forums');
Router.route('createGroup');
Router.route('groupPage/:_id', {
	path: 'groupPage/:_id',
	template: 'groupPage',
	waitOn: function(){
		return Meteor.subscribe('groups');
	},
	data: function(){
		//return Groups.findOne({_id: this.params._id});
		const z = Groups.findOne({_id: this.params._id});
		return z;
	}
});
Router.route('itforum');
Router.route('petforum');
Router.route('CSforum');
