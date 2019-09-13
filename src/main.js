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
        for(let i=0; i<body.data.length; i++) {
          let firstName = body.data[i].profile.first_name;
          let lastName = body.data[i].profile.last_name;
          let address = body.data[i].practices[0].visit_address.street;
          let city = body.data[i].practices[0].visit_address.city;
          let state = body.data[i].practices[0].visit_address.state;
          let zip = body.data[i].practices[0].visit_address.zip;
          let phone = body.data[i].practices[0].phones[0].number;
          let website = body.data[i].practices[0].website || "(no website available)";
          let img = body.data[i].profile.image_url;
          let newPatients = body.data[i].practices[0].accepts_new_patients;
          console.log(firstName, lastName, address, city, state, zip, phone, website);

          $("#results").append(`
            <div class="card doctor row">
              <div class="row">
                <div class="col-md-5 personal">
                  <img src='${img}' alt="doctor">
                  <p>${firstName} ${lastName}<br>${website}</p>
                </div>

                <div class="col-md-5 professional">
                  <p>${address}<br>${city}, ${state} ${zip}
                  <p>${phone}</p>
                  <p>${newPatients}</p>
                </div>
              </div>
            </div>
            `);

        }

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
