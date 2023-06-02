import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Splash } from '@src/screens/Splash/Splash';
import { EnterEmail } from '@src/screens/Registration/EnterEmail';

AppRegistry.registerComponent(appName, () => EnterEmail);
