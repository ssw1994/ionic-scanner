# ionic-scanner
Ionic Scanner Application

Push Notification Setup for Ionic v1 using FCA & OneSignal

	Setup FCM using below link
https://docs.kii.com/en/samples/push-notifications/push-notifications-android-fcm/create-project/

	Create One Signal Account
https://onesignal.com/

	Setup One Signal Project using below link
https://documentation.onesignal.com/docs/web-push-quickstart


	Add push-notification.js file in your project and add below code in it

document.addEventListener('deviceready', function () {
// Enable to debug issues.
// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

var notificationOpenedCallback = function(jsonData) {
console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
};

window.plugins.OneSignal
.startInit("385f5f63-1650-438f-bb71-422520dc58ec")
.handleNotificationOpened(notificationOpenedCallback)
.endInit();
}, false);


Note :- 385f5f63-1650-438f-bb71-422520dc58ec is one signal app Id

