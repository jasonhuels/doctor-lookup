import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Search} from './search.js';

$(function() {

  $('#search').submit(function(event) {
    event.preventDefault();
    const symptoms = $("#symptoms").val();
    const name = $("#doctor-name").val();
    const specialty = $("#specialty").val();
    if(symptoms || name || specialty) {
      const search = new Search();
      const promise = search.findDoctor(symptoms, name, specialty);
      promise.then(function(response) {
        const body = JSON.parse(response);
        // first name, last name, address, phone number, website and whether or not the doctor is accepting new patients
        let firstName = body.data[0].profile.first_name;
        let lastName = body.data[0].profile.last_name;
        let address = body.data[0].practices[0].visit_address.street;
        let city = body.data[0].practices[0].visit_address.city;
        let state = body.data[0].practices[0].visit_address.state;
        let zip = body.data[0].practices[0].visit_address.zip;
        let phone = body.data[0].practices[0].phones[0].number;
        let website = body.data[0].practices[0].website;
        let newPatients = body.data[0].practices[0].accepts_new_patients;


        console.log(body);
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });

    } else {
      // NO search
      console.log("No doctors meet the criteria.");
    }

  });

});
