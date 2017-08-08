TeamUp is a voice incorporated social networking application aimed toward students and
professionals. Our app adds three kinds of voice functions to make things more convenient.

1) Our app can read long paragraphs for you in "about" page.

2) When you want to input a long post, you don’t need to type it. Instead, you can say
it and our app dictates it in forum pages.

3) We create a dialogue function at our to-do list. You can tell our app to add events to
your to-do list and ask for your to-do list on a particular date.

TeamUp is created by Joshua Alvarado, Beckett Browning, Rong Guan and Yaxin Guo.

To run our app in your computer, you need to install the following packages and account:

1. Install all the required NPM packages:
	Meteor npm install --save

2. Set up Google Speech API - https://cloud.google.com/speech/

3 . Install Google Cloud SDK - https://cloud.google.com/sdk/docs/

4. Open the SDK and execute the following command:
	gcloud auth application-default login

5. Then run:
	Meteor --settings settings.json
