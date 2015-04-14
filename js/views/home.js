/**
 * Created by Shaun on 4/12/2015.
 */
import $ from 'jquery';

export default function(template) {
  console.log('Home!');
  $('div').html(template);

  /*console.log(document.registerElement);
  var XFoo = document.registerElement('x-foo');
  document.body.appendChild(new XFoo());*/
}