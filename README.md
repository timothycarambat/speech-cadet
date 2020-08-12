# Speech Cadet

This application was a short project that was completed in approximately 10 hours that was prompted by a [Reddit User Request](https://www.reddit.com/r/SomebodyMakeThis/comments/i4y3ck/smt_app_to_measure_a_persons_rate_of_speech_in/g0r1i6q/?context=3). The scope of the application was an application that could record the following while speaking:

- Words per minute
- Syllables per minute
- Total Estimated Syllables
- Set WPM target range to stay between

The target device was not know while building so I decided to target Android + iOS. The application is only discoverable on the [Google Play Store](https://play.google.com/store/apps/details?id=com.speechcadet) currently.

# Development
This application was built using
- React-Native v0.63.1
- [React-starter-template](https://github.com/flatlogic/react-native-starter)

There is no backend or datastore for this application. Simply run the following commands to get going
- git clone `this repo` && cd `this_repo`
- yarn install
- cd ios && pod install
- yarn run:ios

You should be then launching an iOS emulator on your machine and have the app installed!

---------------------------

### Internal Notes
To debug Android device (physical):
- ~/Library/Android/.../platform-tools
- ./adb reverse tcp:8081 tcp:8081

Be sure to shake device and disabled JS DEV mode for performance gains.
#### To eject APKs
#### DEBUG
cd android && ./gradlew clean && ./gradlew assembleDebug

#### Release
https://s-pace.github.io/react-native/docs/signed-apk-android.html
cd android && ./gradlew clean && ./gradlew assembleRelease -x bundleReleaseJsAndAssets
