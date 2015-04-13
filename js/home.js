/**
 * Created by Shaun on 4/12/2015.
 */
import { requestGet } from './kjax.js';
import $ from 'jquery';

export default function() {
  console.log('Home!');
  requestGet('templates/home.html').then(function(response) {
    $('div').html(response.data);
  });
}