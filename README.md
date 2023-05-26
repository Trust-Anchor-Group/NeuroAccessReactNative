# NeuroAccessReactNative

React-Native Environment Setup :- (Document Link: https://reactnative.dev/docs/environment-setup?guide=native )

1. Install Node.js and npm: React Native requires Node.js and npm (Node Package Manager) to be installed on your machine. You can download the latest version of Node.js from the official website: https://nodejs.org
2. Install React Native CLI: Open a terminal or command prompt and run the following command to install the React Native command-line interface (CLI):‘npm install -g react-native-cli’
3. Setup Android Environment (Android development): React Native uses the Android SDK to build Android apps. Download and install Android Studio from the official website: https://developer.android.com/studioDuring the installation process, make sure to select the appropriate SDK components required for Android development.
4. Configure Android SDK: After installing Android Studio, open it and go to the "SDK Manager." Make sure the required SDK platforms and build tools are installed. You'll also need to set the ANDROID_HOME environment variable to point to the location of your Android SDK installation.
5. Setup iOS Environment: Install Xcode from App Store.
6. Command Line Tools: You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

React-Native Application Clone from Github :-

1. Clone the GitHub repository using given url. (https://github.com/Trust-Anchor-Group/NeuroAccessReactNative.git)

Setup React-Native Applications :-

1. Open Terminal.
2. Go to the local repository folder.
3. Run command ‘npm install’.
4. Pod install for iOS : ‘cd ios’  And run command ‘pod install’
5. Go back to the application root folder (cd ..) and then Run command ‘npm start’.
6. Run iOS using ‘npx react-native run-ios’.
7. Run Android using ‘npx react-native run-android’
