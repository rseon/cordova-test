# Test some Cordova plugins

This project tests some Cordova plugins on Android (only). Some actions are visible in the inspector console.

## Install
- Clone this repository
- Install Cordova : `npm install -g cordova`
- Install project : `npm install`
- Install platforms : `cordova platform add browser` and `cordova platform add android`

## Run
- Run on browser : `cordova run browser`

### Android
- Build for Android : `cordova build android`
- Run `cordova run android`
- With Chrome, open `chrome://inspect`


## Installed plugins
```
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-screen-orientation
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-sim
cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=cordovatest
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-actionsheet
cordova plugin add cordova-plugin-spinner-dialog
cordova plugin add cordova-plugin-local-notification
cordova plugin add cordova-plugin-inappbrowser
```

### Officials
- [ ] https://github.com/apache/cordova-plugin-battery-status
- [x] https://github.com/apache/cordova-plugin-camera
- [x] https://github.com/apache/cordova-plugin-contacts
- [x] https://github.com/apache/cordova-plugin-device
- [x] https://github.com/apache/cordova-plugin-dialogs
- [ ] https://github.com/apache/cordova-plugin-file
- [x] https://github.com/apache/cordova-plugin-geolocation
- [x] https://github.com/apache/cordova-plugin-inappbrowser
- [ ] https://github.com/apache/cordova-plugin-media
- [ ] https://github.com/apache/cordova-plugin-media-capture
- [x] https://github.com/apache/cordova-plugin-network-information
- [x] https://github.com/apache/cordova-plugin-screen-orientation
- [ ] https://github.com/apache/cordova-plugin-splashscreen
- [ ] https://github.com/apache/cordova-plugin-statusbar
- [ ] https://github.com/apache/cordova-plugin-vibration


### Other top plugins
- [ ] https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin
- [x] https://github.com/EddyVerbruggen/cordova-plugin-actionsheet
- [ ] https://github.com/EddyVerbruggen/cordova-plugin-geofence
- [ ] https://github.com/EddyVerbruggen/cordova-plugin-googleplus
- [ ] https://github.com/EddyVerbruggen/cordova-plugin-local-notifications
- [x] https://github.com/EddyVerbruggen/Custom-URL-scheme
- [ ] https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin
- [ ] https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
- [x] https://github.com/pbakondy/cordova-plugin-sim

From this [awesome list](https://github.com/rdn87/awesome-cordova-plugins) :
- [ ] https://github.com/apache/cordova-plugin-file-transfer
- [ ] https://github.com/bitpay/cordova-plugin-qrscanner
- [ ] https://github.com/cordova-sms/cordova-sms-plugin
- [ ] https://github.com/danwilson/google-analytics-plugin
- [x] https://github.com/greybax/cordova-plugin-native-spinner
- [x] https://github.com/phonegap/phonegap-plugin-local-notification
- [ ] https://github.com/VersoSolutions/CordovaClipboard

[List of 47 plugins](https://awesomeopensource.com/projects/cordova-plugin)
