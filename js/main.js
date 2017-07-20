var mortgageAmount;
var interestRate;
var payment;

var months = 0;

var array = [];

function handleButton() {

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

  while (parseFloat(mortgageAmount) > parseFloat(payment)) {
    var tilgung = payment - (mortgageAmount*(interestRate/100))/12;
    mortgageAmount = mortgageAmount - tilgung;
    months++;
    array.push(months + ". Rest: " + mortgageAmount.toFixed(2) + "€ Tilgung: " + tilgung.toFixed(2) + "€ Zinsen: " + (payment - tilgung).toFixed(2) + "€");
  }

  var kreditdauerM = months+1;
  var kreditdauerJ = kreditdauerM/12;
  array.push(kreditdauerM + ". Last month repaid with the rest of " + mortgageAmount.toFixed(2) + " €");

  months = 0;

  mainView.router.loadPage('breakdown.html');

  /*This is a shitty workaround. A list needs to be created after the breakdown page has loaded,
  otherwise the function createList() will not find any elements on breakdown page since it hasn't
  loaded yet*/
  setTimeout(function() {createList(array, kreditdauerM, kreditdauerJ)}, 20);

}

function createList(array, kreditdauerM, kreditdauerJ) {

  document.getElementById("listheader").innerHTML = "Duration: " + kreditdauerM + " months or " + kreditdauerJ.toFixed(1) + " years";

  for (var i = 0; i < array.length; i++) {

    var item = document.createElement('ul');
    item.style.padding = '5px';
    item.style.fontSize = '4vw';
    item.appendChild(document.createTextNode(array[i]));
    document.getElementById("listblock").appendChild(item);
  }

}
