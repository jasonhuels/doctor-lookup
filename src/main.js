import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Search} from './search.js';
import {Practice} from './practice.js';

$(function() {

  $('#search').submit(function(event) {
    event.preventDefault();
    $("results").html("");
    const symptoms = $("#symptoms").val();
    const name = $("#doctor-name").val();
    const special = $("#specialty").val();
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
            if(body.data[i].specialties[0]) {
              specialty = body.data[i].specialties[0].name;
            }
            let address = body.data[i].practices[0].visit_address.street;
            let city = body.data[i].practices[0].visit_address.city;
            let state = body.data[i].practices[0].visit_address.state;
            let zip = body.data[i].practices[0].visit_address.zip;
            let phone = body.data[i].practices[0].phones[0].number;
            let website = body.data[i].practices[0].website || "(no website available)";
            let newPatients = "";
            if(body.data[i].practices[0].accepts_new_patients) {
              newPatients = "Currently accepting new patients.";
            } else {
              newPatients = "Sorry, not currently accepting new patients.";
            }
            // let practices = [];
            // let practiceHTML = "";
            // for(let j=0; j<body.data[i].practices.length; j++) {
              //   let address = body.data[i].practices[j].visit_address.street;
              //   let city = body.data[i].practices[j].visit_address.city;
              //   let state = body.data[i].practices[j].visit_address.state;
              //   let zip = body.data[i].practices[j].visit_address.zip;
              //   let phone = body.data[i].practices[j].phones[0].number;
              //   let website = body.data[i].practices[j].website || "(no website available)";
              //   let newPatients = body.data[i].practices[j].accepts_new_patients;
              //   let practice = new Practice(address, city, state, zip, phone, website, newPatients);
              //   practices.push(practice);
              // }
              // for(let j=0; j<practices.length; j++) {
                //   practiceHTML += `<option value=${j}>Practice ${j}</option>`;
                // }
                // console.log(firstName, lastName, address, city, state, zip, phone, website);
                // <div class="col-md-5 professional">
                //   <p>${address}<br>${city}, ${state} ${zip}
                //   <br>${phone}
                //   <br>${website}
                //   <br>${newPatients}
                //   </p>
                // </div>

                // $("#results").append(`
                  //   <div class="card doctor row">
                  //     <div class="row">
                  //       <div class="col-md-5 personal">
                  //         <img src='${img}' alt="doctor">
                  //         <p>${firstName} ${lastName}<br>${specialty}</p>
                  //       </div>
                  //
                  //       <div class="col-md-5 professional">
                  //         <p>${address}<br>${city}, ${state} ${zip}
                  //         <br>${phone}
                  //         <br>${website}
                  //         <br>${newPatients}
                  //         </p>
                  //       </div>
                  //
                  //     </div>
                  //   </div>
                  //   `);


                  resultsHTML += `
                  <div class="card doctor row">
                  <div class="row">
                  <div class="col-md-5 personal">
                  <img src='${img}' alt="doctor">
                  <p>${firstName} ${lastName}<br>${specialty}</p>
                  </div>

                  <div class="col-md-5 professional">
                  <p>${address}<br>${city}, ${state} ${zip}
                  <br>${phone}
                  <br>${website}
                  <br>${newPatients}
                  </p>
                  </div>

                  </div>
                  </div>
                  `;
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
