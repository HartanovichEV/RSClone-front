import App from './components/app/app';
import carousel from './components/utils/carousel';
import './global.css';

const app = new App();

await app.init('main');

carousel();