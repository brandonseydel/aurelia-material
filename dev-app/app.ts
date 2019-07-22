import { customElement } from '@aurelia/runtime';
import template from './app.html';
import './app.scss';

@customElement({ name: 'app', template })
export class App {
  message = 'Hello World!';
}
