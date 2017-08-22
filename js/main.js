var mortgageAmount;
var interestRate;
var payment;

var months = 0;

var array = [];
var restArray = [];
var interestArray = [];
var paymentArray = [];
var monthsArray = [];

function handleButton() {

  myApp.showPreloader();

  //read input values
  mortgageAmount = document.getElementById("mortgageInput").value;
  interestRate = document.getElementById("interestInput").value;
  payment = document.getElementById("paymentInput").value;

  if (((parseFloat(mortgageAmount) * parseFloat(interestRate)/100)/12) >= parseFloat(payment)) {
    myApp.alert("Monthly interest is higher than monthly payment, increase payment.", "Oops!");
  } else if(parseFloat(mortgageAmount) <= 0 || parseFloat(interestRate) <= 0 || parseFloat(payment) <= 0){
    myApp.alert("Some values are zero or negative.", 'Oops!');
  } else if(mortgageAmount == null || mortgageAmount == "" || interestRate == null || interestRate == "" || payment == null || payment == ""){
    myApp.alert('Some of the fields are empty, please fill out missing fields.', 'Oops!');
  } else {
    calculateCredit();
  }
}

function calculateCredit() {

  var myApp = new Framework7();
  var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
  });

  //clear array every time before calculating credit to avoid stacking
  array = [];
  restArray = [];
  interestArray = [];
  paymentArray = [];
  monthsArray = [];

  while (parseFloat(mortgageAmount) > parseFloat(payment)) {
    var tilgung = payment - (mortgageAmount*(interestRate/100))/12;
    mortgageAmount = mortgageAmount - tilgung;
    months++;
    array.push(months + ". Rest: " + mortgageAmount.toFixed(2) + "€ Tilgung: " + tilgung.toFixed(2) + "€ Zinsen: " + (payment - tilgung).toFixed(2) + "€");
    restArray.push(mortgageAmount.toFixed(2));
    interestArray.push(tilgung.toFixed(2));
    paymentArray.push((payment-tilgung).toFixed(2));
    monthsArray.push(months + ".");
  }

  var kreditdauerM = months+1;
  var kreditdauerJ = kreditdauerM/12;
  array.push(kreditdauerM + ". Last month repaid with the rest of " + mortgageAmount.toFixed(2) + " €");

  months = 0;

  //load second page
  mainView.router.loadPage('breakdown.html');

  //this event fires multiple times if open the second page multiple times in one session, no solution yet
  /*$$(document).on('page:init', function (e) {

    var page = e.detail.page;

    if(page.name === 'breakdown') {
      createList(array,kreditdauerM,kreditdauerJ, restArray, interestArray, paymentArray, monthsArray);
    }

})*/

  //shitty workaround to a problem above, delays the execution by 20ms to give page time to load before adding content to it
  //causes visible stutter
  setTimeout(function() {createList(array,kreditdauerM,kreditdauerJ, restArray, interestArray, paymentArray, monthsArray)}, 50);

  myApp.hidePreloader();
}

function createList(array, kreditdauerM, kreditdauerJ, restArray, interestArray, paymentArray, monthsArray) {

  document.getElementById("listheader").innerHTML = "Duration: " + kreditdauerM + " months or " + kreditdauerJ.toFixed(1) + " years";

    //for each element in the first array
    for (var i = 0; i < restArray.length; i++) {

      //create tbody element
      var tbody = document.createElement('tbody');
      //create tr element
      var tr = document.createElement("tr");
      //create first td element
      var td0 = document.createElement("td");
      //add class "label-cell" to first td
      td0.className += " label-cell";
      //add inner HTML to td element
      td0.innerHTML = monthsArray[i];
      //create first td element
      var td1 = document.createElement("td");
      //add class "label-cell" to first td
      td1.className += " numeric-cell";
      //add inner HTML to td element
      td1.innerHTML = restArray[i];
      //create second td element
      var td2 = document.createElement("td");
      //add class "numeric-cell" to second td
      td2.className += " numeric-cell";
      //add inner HTML to td element
      td2.innerHTML = interestArray[i];
      //create third td element
      var td3 = document.createElement("td");
      //add class "numeric-cell" to third td
      td3.className += " numeric-cell";
      //add inner HTML to td element
      td3.innerHTML = paymentArray[i];
      //append zero td to tr
      tr.appendChild(td0);
      //append first td to tr
      tr.appendChild(td1);
      //append second td to tr
      tr.appendChild(td2);
      //append third td to tr
      tr.appendChild(td3);
      //append tr to tbody
      tbody.appendChild(tr);
      //append tbody to table
      document.getElementById("table").appendChild(tbody);

    }




  //}

}
