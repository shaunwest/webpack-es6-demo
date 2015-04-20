/**
 * Created by Shaun on 4/12/2015.
 */
import {Fragment} from '../lib/fragments.js';

export default function($template) {
  console.log('home');
  var $view = Fragment('view');
  $view.replaceWith($template);
}