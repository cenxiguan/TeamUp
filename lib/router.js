Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'home'});
Router.route('about');
Router.route('joinus');
Router.route('forums', {
	waitOn: function(){
		return [Meteor.subscribe('forums'), Meteor.subscribe('user')];
	}
});
Router.route('connections', {
	waitOn: function(){
		return [Meteor.subscribe('user'), Meteor.subscribe('connections')];
	}
});
Router.route('profileconnections', {
	template:"profileconnections",
	waitOn: function(){
		return [Meteor.subscribe('user'), Meteor.subscribe('connections')];
	}
});
Router.route('createTeam');
Router.route('calendar');
Router.route('yourTeams', {
	waitOn: function(){
		return Meteor.subscribe('groups');
	}
});
Router.route('teamPage/:_id', {
	path: 'teamPage/:_id',
	template: 'groupPage',
	waitOn: function(){
		return [Meteor.subscribe('groups'), Meteor.subscribe('user'), Meteor.subscribe('groupmessages', this.params._id)];
	},
	data: function(){
		//return Groups.findOne({_id: this.params._id});
		const z = Groups.findOne({_id: this.params._id});
		return z;
	}
});
Router.route('userprofile');
Router.route('userprofile/:_id', {
	path: 'userprofile/:_id',
	name: 'profile.show',
	template: 'userprofile',
	waitOn: function(){
		if(this.params._id === "me"){
			return Meteor.subscribe('users');
		} else {
			return Meteor.subscribe('users', this.params._id);
		}
	},
	data: function(){
		return User.findOne();
	}
});

Router.route('usermessages', {
	path: 'usermessages',
	template:"usermessages",
	waitOn: function(){
		return [Meteor.subscribe('user'), Meteor.subscribe('usermessages', this.params.query.userid, this.params.query.userid2)];
	},
	data: function(){
		return User.findOne();
	}
});
Router.route('individualforum', {
	path:'individualforum',
	template:"individualforum",
	waitOn: function(){
		return [Meteor.subscribe('user'),Meteor.subscribe('forums', this.params.title)];
	},
	data: function(){
		return Forums.findOne();
	}
});

Router.route('publishedforums', {
	path:'publishedforums',
	template:"publishedforums",
	waitOn: function(){
		return [Meteor.subscribe('user'),Meteor.subscribe('forums')];
	},
	data: function(){
		return Forums.find();
	}
});

Router.route('teamsearch');
