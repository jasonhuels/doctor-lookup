import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Memory} from './memory-game.js';

$(function() {

  $('#button').click(function() {
    let memory = new Memory();
    let promise = memory.getGifs();
    promise.then(function(response) {
      const body = JSON.parse(response);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

});
