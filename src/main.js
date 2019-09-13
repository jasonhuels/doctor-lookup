import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Search} from './search.js';
import {Specialties} from './getSpecialties.js';

$(function() {
  const specialties = new Specialties();
  const specialPromise = specialties.getSpecialties();
  specialPromise.then(function(response) {
    const body = JSON.parse(response);
    for(let i=0; i<body.data.length; i++) {
      $("#specialty").append(`<option value=${body.data[i].uid}>${body.data[i].name}</option>`);
    }
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });

  $('#search').submit(function(event) {
    event.preventDefault();
    $("results").html("");
    const symptoms = $("#symptoms").val();
    const name = $("#doctor-name").val();
    const special = $("#specialty").val();
    console.log(special);
    let resultsHTML = "";
    $("#search").trigger("reset");

    if(symptoms || name || special) {
      const search = new Search();
      const promise = search.findDoctor(symptoms, name, special);
      promise.then(function(response) {
        const body = JSON.parse(response);
        if(body.data.length > 0) {
          for(let i=0; i<body.data.length; i++) {
            let firstName = body.data[i].profile.first_name;
            let lastName = body.data[i].profile.last_name;
            let img = body.data[i].profile.image_url;
            let specialty = "";
            let index = 0;
            if(body.data[i].specialties[0]) {
              specialty = body.data[i].specialties[0].name;
            }
            for(let j=1; j<body.data[i].practices.length; j++) {
              if(body.data[i].practices[j].distance < body.data[i].practices[index].distance) {
                index = j;
              }
            }
            let address = body.data[i].practices[index].visit_address.street;
            let city = body.data[i].practices[index].visit_address.city;
            let state = body.data[i].practices[index].visit_address.state;
            let zip = body.data[i].practices[index].visit_address.zip;
            let phone = body.data[i].practices[index].phones[0].number;
            phone = `(${phone.substring(0,3)})${phone.substring(3,6)}-${phone.substring(6, 10)}`;
            let website = body.data[i].practices[index].website;
            if(website) {
              website = `<a href="${website}">${website}</a>`
            } else {
              website = "(no website available)"
            }
            let newPatients = "";
            if(body.data[i].practices[0].accepts_new_patients) {
              newPatients = "Currently accepting new patients.";
            } else {
              newPatients = "Sorry, not currently accepting new patients.";
            }

            resultsHTML += `<div class="card doctor row"><div class="row"><div class="col-md-5 personal"><img src='${img}' alt="doctor"><p>${firstName} ${lastName}<br>${specialty}</p></div><div class="col-md-5 professional"><p><a href="https://www.google.com/maps/place/${address} ${city} ${state} ${zip}">${address}<br>${city}, ${state} ${zip}</a><br>${phone}<br>${website}<br>${newPatients}</p></div></div></div>`;
          }
          $("#results").html(resultsHTML);
            console.log(body);
        } else {
          $("#results").html('<div class="card"> <h3>No doctors meet the criteria.</h3> </div>');
        }
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });

    } else {
      $("#results").html('<div class="card"> <h3>No doctors meet the criteria.</h3> </div>');
    }
  });
});
