/**
 * Created by Shaun on 4/12/2015.
 */
import kjax from './kjax.js';
import $ from 'jquery';

export default function() {
  console.log('Home!');
  kjax.get('http://localhost:3000/templates/home.html').then(function(response) {
    $('div').html(response.data);
  });
}