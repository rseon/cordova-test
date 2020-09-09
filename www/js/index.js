/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        let self = this

        // Test events : https://cordova.apache.org/docs/en/latest/cordova/events/events.html
        document.addEventListener('backbutton', function(event) {
            console.log('Cordova event "backbutton" fired:', event)
        }, false)
        document.addEventListener("pause", function(event) {
            console.log('Cordova event "pause" fired:', event)
        }, false);
        document.addEventListener("resume", function(event) {
            // https://cordova.apache.org/docs/en/latest/cordova/events/events.html#resume
            setTimeout(function() {
                console.log('Cordova event "resume fired":', event)
            }, 0);
        }, false);
        document.addEventListener("menubutton", function(event) {
            console.log('Cordova event "menubutton" fired:', event)
        }, false);
        document.addEventListener("searchbutton", function(event) {
            console.log('Cordova event "searchbutton" fired:', event)
        }, false);
        document.addEventListener("volumedownbutton", function(event) {
            console.log('Cordova event "volumedownbutton" fired:', event)
        }, false);
        document.addEventListener("volumeupbutton", function(event) {
            console.log('Cordova event "volumeupbutton" fired:', event)
        }, false);

        // Test cordova-plugin-network-information
        document.addEventListener('offline', this.onOffline.bind(this), false)
        document.addEventListener('online', this.onOnline.bind(this), false)
        this.initNetwork()

        // Test cordova-plugin-sim
        document.getElementById('link-request-sim').addEventListener('click', this.initSim.bind(this), false)

        // Test cordova-plugin-geolocation
        document.getElementById('link-request-geolocation').addEventListener('click', this.initGeolocation.bind(this, 1), false)

        // Test cordova-plugin-screen-orientation
        this.initScreenOrientation()

        // Test cordova-plugin-dialogs
        this.initAlerts()

        // Test cordova-plugin-customurlscheme + cordova-plugin-inappbrowser
        this.initScheme()

        // Test cordova-plugin-device
        console.log('cordova-plugin-device info:', device);

        // Test cordova-plugin-contacts
        this.initContacts()

        // Test cordova-plugin-camera
        this.initCamera()

        // Test cordova-plugin-actionsheet
        this.initActionsheet()

        // Test cordova-plugin-spinner-dialog
        this.initSpinner()

        // Test cordova-plugin-local-notification
        this.initNotifications()
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // Event when device offline
    onOffline: function(event) {
        console.log('cordova-plugin-network-information "offline" event fired:', event)
        let el = document.getElementById('offline')
        el.querySelector('.listening').setAttribute('style', 'display:block;')
        el.querySelector('.received').setAttribute('style', 'display:none;')
    },

    // Event when device online
    onOnline: function(event) {
        console.log('cordova-plugin-network-information "online" event fired:', event)
        let el = document.getElementById('offline')
        el.querySelector('.listening').setAttribute('style', 'display:none;')
        el.querySelector('.received').setAttribute('style', 'display:block;')
    },

    // Check network
    initNetwork: function() {
        console.log('cordova-plugin-network-information "navigator.connection":', navigator.connection)
        if (typeof Connection !== 'undefined') {
            switch (navigator.connection.type) {
                // case Connection.UNKNOWN:
                case Connection.NONE:
                    this.onOffline()
                    break
                default:
                    this.onOnline()
                    break
            }
        }

        return false
    },

    // Screen info
    initScreenOrientation: function() {
        screen.orientation.lock('portrait')
        console.log('cordova-plugin-screen-orientation "window.screen.orientation":', window.screen.orientation);
    },

    // SIM informations
    initSim: function(event) {
        this.getSimInfo()
        event.preventDefault()
    },

    // Retrieve SIM informations
    getSimInfo: function(attempt = 1) {
        let self = this

        if(device.platform !== 'browser') {
            window.plugins.sim.hasReadPermission(function(results) {
                console.log('cordova-plugin-sim "hasReadPermission":', results)
                if(results === false) {
                    window.plugins.sim.requestReadPermission(function(results) {
                        console.log('cordova-plugin-sim "requestReadPermission":', results)
                        if(results !== false) {
                            window.plugins.sim.getSimInfo(function(results) {
                                console.log('cordova-plugin-sim "getSimInfo":', results)
                            }, function(error) {
                                console.warn('cordova-plugin-sim "getSimInfo" error:', error)
                            });
                        }
                        else {
                            navigator.notification.alert('You must accept permissions', function() {
                                self.getSimInfo()
                            })
                        }
                    }, function(error) {
                        if(attempt === 1) {
                            navigator.notification.alert('You must accept permissions', function() {
                                self.getSimInfo(++attempt)
                            })
                        }
                    });
                }
                else {
                    window.plugins.sim.getSimInfo(function(results) {
                        console.log('cordova-plugin-sim "getSimInfo":', results)
                    }, function(error) {
                        console.warn('cordova-plugin-sim "getSimInfo" error:', error)
                    });
                }
            }, function(error) {
                console.warn('cordova-plugin-sim "hasReadPermission" error:', error)
            });
        }
    },

    // Retrieve geolocation
    initGeolocation: function(attempt = 1) {
        this.getGeolocation(attempt = 1)
    },

    // Retrieve geolocation
    getGeolocation: function(attempt = 1) {
        console.log('cordova-plugin-geolocation get geolocation attempt:', attempt)

        const cbSuccess = (position) => {
            if(position.coords) {
                console.log('cordova-plugin-geolocation data:', {
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    altitudeAccuracy: position.coords.altitudeAccuracy,
                    heading: position.coords.heading,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    speed: position.coords.speed,
                    timestamp: position.coords.timestamp,
                });
            }

            navigator.geolocation.clearWatch(watcher);
        };

        const cbError = (error) => {
            if(error.code === 1) {
                if(attempt === 1) {
                    navigator.notification.alert('Please enable geolocation')
                }
            }
            else {
                if(attempt < 3) {
                    setTimeout(this.getGeolocation.bind(this, ++attempt), 500)
                }
                else {
                    console.warn('cordova-plugin-geolocation error:', error);
                }
            }
        };

        let watcher = navigator.geolocation.watchPosition(cbSuccess, cbError, {
            enableHighAccuracy: true,
            maximumAge: 300000,
            timeout: 5000,
        });
    },

    // Init some alerts
    initAlerts: function() {
        document.getElementById('link-alert').addEventListener('click', function(event) {
            navigator.notification.alert('Dialog message.', function() {
                console.log('cordova-plugin-dialogs "alert" closed')
            }, 'Alert', 'OK')

            event.preventDefault()
        }, false)

        document.getElementById('link-confirm').addEventListener('click', function(event) {
            navigator.notification.confirm('Dialog message.', function(btnindex) {
                console.log('cordova-plugin-dialogs "confirm" closed with button:', btnindex)
            }, 'Confirm', ['OK', 'Cancel'])

            event.preventDefault()
        }, false)

        document.getElementById('link-prompt').addEventListener('click', function(event) {
            navigator.notification.prompt('Dialog message.', function(results) {
                console.log('cordova-plugin-dialogs "prompt" closed with button:', results)
            }, 'Prompt', ['OK', 'Cancel'], 'Default textbox input value')

            event.preventDefault()
        }, false)

        document.getElementById('link-beep').addEventListener('click', function(event) {
            navigator.notification.beep(1)
            event.preventDefault()
        }, false)
    },

    // Init links
    initScheme: function() {
        window.handleOpenURL = function (url) {
            console.log('cordova-plugin-customurlscheme handle open url:', url)
        }

        document.getElementById('link-test-scheme').addEventListener('click', function(event) {
            console.log('cordova-plugin-customurlscheme open url:', event.target.href)
            window.open(event.target.href, '_system')
            event.preventDefault()
        }, false)

        document.getElementById('link-test-scheme-inapp').addEventListener('click', function(event) {
            console.log('cordova-plugin-inappbrowser open url:', event.target.href)
            var ref = cordova.InAppBrowser.open(event.target.href, '_blank', 'hardwareback=no,hidenavigationbuttons=yes,hideurlbar=yes')

            // https://stackoverflow.com/a/50047473 OR https://stackoverflow.com/a/15981972
            ref.addEventListener( "loadstop", function(event){
                console.log('cordova-plugin-inappbrowser "loadstop" event fired:', event)
                var loop = window.setInterval(function(){
                    ref.executeScript({
                            code: "window.shouldClose"
                        },
                        function(values){
                            if(values[0]){
                                ref.close();
                                window.clearInterval(loop);
                            }
                        }
                    );
                },100);
            });
            ref.addEventListener('exit', function(event) {
                console.log('cordova-plugin-inappbrowser "exit" event fired:', event)
            });
            event.preventDefault()
        }, false)
    },

    // Init contacts
    initContacts: function() {
        document.getElementById('link-test-contact').addEventListener('click', function(event) {
            navigator.contacts.find(['*'], function(contacts) {
                console.log('cordova-plugin-contacts find:', contacts)
            }, function(error) {
                console.warn('cordova-plugin-contacts find error:', error)
            })

            event.preventDefault()
        }, false)

        document.getElementById('link-test-pick-contact').addEventListener('click', function(event) {
            navigator.contacts.pickContact(function(contact) {
                console.log('cordova-plugin-contacts pickContact:', contact)
            }, function(error) {
                console.warn('cordova-plugin-contacts pickContact error:', error)
            })

            event.preventDefault()
        }, false)
    },

    // Init camera
    initCamera: function() {
        var setOptions = function(srcType) {
            return {
                quality: 80,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: srcType,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true,
                targetWidth: 200,
                targetHeight: 200,
            }
        };

        var displayImage = function(imgUri) {
            var elem = document.getElementById('imageFile');
            elem.src = imgUri;
        }

        document.getElementById('link-camera-getpicture').addEventListener('click', function(event) {
            var options = setOptions(Camera.PictureSourceType.CAMERA);

            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                console.log('cordova-plugin-camera getPicture:', imageUri);
                displayImage(imageUri);
            }, function cameraError(error) {
                console.log('cordova-plugin-camera getPicture error:', error);
            }, options);
            event.preventDefault()
        }, false)
        document.getElementById('link-camera-getpicture-device').addEventListener('click', function(event) {
            var options = setOptions(Camera.PictureSourceType.SAVEDPHOTOALBUM);

            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                console.log('cordova-plugin-camera getPicture:', imageUri);
                displayImage(imageUri);
            }, function cameraError(error) {
                console.log('cordova-plugin-camera getPicture error:', error);
            }, options);
            event.preventDefault()
        }, false)
    },

    // Init action sheet
    initActionsheet: function() {
        var callback = function(buttonIndex) {
            setTimeout(function() {
                // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
                console.log('cordova-plugin-actionsheet callback button:', buttonIndex)
            });
        };

        function testShareSheet() {
            var options = {
                androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
                title: 'What do you want with this image?',
                subtitle: 'Choose wisely, my friend', // supported on iOS only
                buttonLabels: ['Share via Facebook', 'Share via Twitter'],
                androidEnableCancelButton : true, // default false
                winphoneEnableCancelButton : true, // default false
                addCancelButtonWithLabel: 'Cancel',
                addDestructiveButtonWithLabel : 'Delete it',
                position: [20, 40], // for iPad pass in the [x, y] position of the popover
                destructiveButtonLast: true // you can choose where the destructive button is shown
            };
            // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
            // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
            window.plugins.actionsheet.show(options, callback);
        };

        function testDeleteSheet() {
            var options = {
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete note'
            };
            window.plugins.actionsheet.show(options, callback);
        };

        function testLogoutSheet() {
            var options = {
                'buttonLabels': ['Log out'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel'
            };
            window.plugins.actionsheet.show(options, callback);
        };

        document.getElementById('link-actionsheet-share').addEventListener('click', function(event) {
            testShareSheet()
            event.preventDefault()
        }, false)
        document.getElementById('link-actionsheet-delete').addEventListener('click', function(event) {
            testDeleteSheet()
            event.preventDefault()
        }, false)
        document.getElementById('link-actionsheet-logout').addEventListener('click', function(event) {
            testLogoutSheet()
            event.preventDefault()
        }, false)
    },

    // Init spinner
    initSpinner: function() {
        document.getElementById('link-spinner').addEventListener('click', function(event) {
            window.plugins.spinnerDialog.show(null, 'This is a message')
            event.preventDefault()
        }, false)
        document.getElementById('link-spinner-blank').addEventListener('click', function(event) {
            window.plugins.spinnerDialog.show()
            event.preventDefault()
        }, false)
    },

    // Init local notification
    initNotifications: function() {
        document.getElementById('link-notification').addEventListener('click', function(event) {
            cordova.plugins.notification.local.schedule({
                id: 10,
                title: "Nouveau message !",
                text: "Vous avez un nouveau message :)",
                data: { meetingId:"#123FG8" }
            });

            // Join BBM Meeting when user has clicked on the notification
            cordova.plugins.notification.local.on("click", function (notification) {
                if (notification.id == 10) {
                    console.log('cordova-plugin-local-notification "click" event fired:', notification);
                }
            });

            event.preventDefault()
        }, false)

    }
};

app.initialize();