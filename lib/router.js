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
Router.route('itforum');
Router.route('petforum');
Router.route('CSforum');
Router.route('bioforum');
Router.route('userprofile');
