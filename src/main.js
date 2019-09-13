import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Search} from './search.js';

$(function() {

  $('#submit').click(function() {
    let search = new Search();
    let promise = search.findDoctor();
    promise.then(function(response) {
      const body = JSON.parse(response);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

});
