import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class ApplicationController extends Controller {
  @action
  addBodyClass() {
    document.body.classList.add('test');
  }
}
