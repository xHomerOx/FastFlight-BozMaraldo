/* Functions */
let main = document.getElementsByClassName('SearchControls_grid')[0];

let resultsDiv = document.createElement('div');
resultsDiv.classList.add('results-found');
resultsDiv.style.display = "block";
resultsDiv.style.textAlign = "center";

let matchCount = 0;

main.insertAdjacentElement('afterend', resultsDiv);

let ul = document.createElement('ul');
resultsDiv.appendChild(ul);

let li = document.createElement('li');
ul.appendChild(li);

function compareFlights(sourceFound, destinationFound) {
    let matchFound = [];

    let sourceIndex = selectSource.selectedIndex;
    let destinationIndex = selectDestination.selectedIndex;
    if (selectSource.options[sourceIndex].value === sourceFound && selectDestination.options[destinationIndex].value === destinationFound) {
        matchCount++;

        matchFound.push({sourceFound, destinationFound});

        resultsDiv.innerText = "Vuelos encontrados:";
        let ul = document.createElement('ul');
        resultsDiv.appendChild(ul);

        if(matchFound.length > 0) {
            for(i=0; i<= matchCount; i++) {
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML = `Origen: ${sourceFound}${'<br>'}Destino: ${destinationFound}`;
                console.log(sourceFound, destinationFound);
            }
        }else{
            li.innerHTML = `No se han encontrado vuelos que coincidan con su busqueda.`;
        }

    }else{
        li.innerHTML = `No se han encontrado vuelos que coincidan con su busqueda.`;
    }
};

/* Events */
let srcContainer = document.querySelector('.AutoSuggest_inputWrapper');
let srcInput = document.querySelector('.AutoSuggest_inputWrapper input');
let selectSource = document.createElement('select');

srcInput.addEventListener("click", function(event) {
    event.preventDefault();
    srcContainer.appendChild(selectSource);
    srcInput.remove();
});

let destContainer = document.querySelectorAll('.AutoSuggest_inputWrapper')[1];
let destInput = document.querySelectorAll('.AutoSuggest_inputWrapper input')[1];
let selectDestination = document.createElement('select');

destInput.addEventListener("click", function(event) {
    event.preventDefault();
    destContainer.appendChild(selectDestination);
    destInput.remove();
});

let cabinNumber = document.querySelector('.Cabin_inputWrapper input');

cabinNumber.addEventListener('blur', function numberLimit(event) {
    event.preventDefault();
    if (cabinNumber.value < 1) {
        cabinNumber.value = 1;
    }
    if (cabinNumber.value > 20) {
        cabinNumber.value = 20;
    }
    cabinNumber.text = cabinNumber.value;
});

let optionCheck1;
selectSource.addEventListener('change', function(event){
    optionCheck1 = event.target.value;
    for (let i = 0; i < selectDestination.options.length; i++) {
        if(selectDestination.options[i].value === optionCheck1) {
            selectSource.options[i].setAttribute('selected', 'selected');
            selectDestination.options[i].style.display = "none";
        }else{
            selectSource.options[i].removeAttribute('selected', 'selected');
            selectDestination.options[i].style.display = "block";
        }
    }
});

let optionCheck2;
selectDestination.addEventListener('change', function(event){
    optionCheck2 = event.target.value;
    for (let i = 0; i < selectSource.options.length; i++) {
        if(selectSource.options[i].value === optionCheck2) {
            selectDestination.options[i].setAttribute('selected', 'selected');
            selectSource.options[i].style.display = "none";
        }else{
            selectDestination.options[i].removeAttribute('selected', 'selected');
            selectSource.options[i].style.display = "block";
        }
    }
});


/* Arrays */
const flightFrom = ["Buenos Aires (EZE)", "La Paz (LPB)", "Brasilia (BSB)", "Santiago (AMB)", "Bogotá (BOG)", "Quito (UIO)", "Georgetown (GEO)", "Asunción (ASU)", "Lima (LIM)", "Zanderij (PBM)", "Montevideo (MVD)", "Caracas (CCS)"];
const flightTo = ["Buenos Aires (EZE)", "La Paz (LPB)", "Brasilia (BSB)", "Santiago (AMB)", "Bogotá (BOG)", "Quito (UIO)", "Georgetown (GEO)", "Asunción (ASU)", "Lima (LIM)", "Zanderij (PBM)", "Montevideo (MVD)", "Caracas (CCS)"];

/* Rest of Code */
selectSource.style.padding = '0.3em 0.5em';
let optionSource;
for(let i = 0; i < flightFrom.length; i++){
    let source = flightFrom[i];
    optionSource = document.createElement('option');
    optionSource.value = source;
    optionSource.text = source;
    selectSource.appendChild(optionSource);
}

selectDestination.style.padding = '0.3em 0.5em';
let optionDestination;
for(let i = 0; i < flightTo.length; i++){
    let destination = flightTo[i];
    optionDestination = document.createElement('option');
    optionDestination.value = destination;
    optionDestination.text = destination;
    selectDestination.appendChild(optionDestination);
}

const dateContainer = document.querySelector('.Date_inputWrapper input');
const datepicker = new Datepicker(dateContainer, {
    format: 'dd-mm-yyyy',
    language: 'es'
}); 

let myFlights = flightsData;
const selectedFlights = (key, value) => {localStorage.setItem(key, JSON.stringify(value))};

let mySrc;
let myDest;

let mySubmit = document.querySelector(".BpkButtonBase_bpk-button");

for (let i = 0; i < myFlights.length; i++) {
    let flight = myFlights[i];
    mySrc = flight.source;
    myDest = flight.destination;

    selectedFlights("source " + i, mySrc);
    selectedFlights("destination " + i, myDest);

    let sourceFound = JSON.parse(localStorage.getItem("source " + i));
    let destinationFound = JSON.parse(localStorage.getItem("destination " + i));
    
    console.log(sourceFound, destinationFound);

    mySubmit.addEventListener('click', function(event){
        event.preventDefault();
        compareFlights(sourceFound, destinationFound);
    });
}

//Para comparar lowercase use HOF.
// const newFlightFrom = flightFrom.map(flight => flight.toLowerCase());
// const newFlightTo = flightTo.map(flight => flight.toLowerCase());

// //Selecciona Idioma dependiendo de la variable.
// if (lang == "Spanish") {
//     const myAirlines = [
//         american = {
//             name: "American Airlines",
//             code: "AA"
//         },
//         aerolineas = {
//             name: "Aerolineas Argentinas", 
//             code: "AR"
//         },
//         delta = {
//             name: "Delta Airlines",
//             code: "DL"
//         },
//         virgin = {
//             name: "Virgin Atlantic", 
//             code: "VS"
//         },
//         flybondi = {
//             name: "FlyBondi", 
//             code: "FO"
//         }
//     ]

//     //Selecciono aerolinea, si no es ninguna, flybondi sera la opcion por defecto.
//     const selectAirline = () => {
//         let airName = '';
//         let airCode = '';
//         myAirlines.forEach(airline => { 
//             airName += airline.name + "\n", airCode += airline.code;
//         });

//         // let selectedAirline = prompt("Seleccione una aerolínea, las opciones disponibles son: \n\n" + airName);
    
//         let myAirline = myAirlines.find(airline => airline.name === selectedAirline);

//         // if (myAirline){
//         //     alert("Su aerolinea designada es: " + myAirline.name);
//         // }else{
//         //     myAirline = flybondi;
//         //     alert("Su aerolinea designada es: " + myAirline.name);
//         // }

//         return myAirline.code;
//     }

//     class UserData {
//         constructor(source, destination, fullDate, passengerName, identifier, myFlightCode) {
//           this.source = source;
//           this.destination = destination;
//           this.fullDate = fullDate;
//           this.passengerName = passengerName;
//           this.identifier = identifier;
//           this.myFlightCode = myFlightCode;
//         }
//     }

    // alert("Bienvenido " + myName + " " + mySurName);
    // let selectSource = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightFrom.join("\n"));
    
    //Se fija si existe lo seleccionado con Includes, si da true sigue, si da false vuelve.
    // if (flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource)) {
    //     source = selectSource;
    // } else {
    //     while (!(flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource))) {
    //         selectSource = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightFrom.join("\n"));
    //     }
    //     source = selectSource;
    // }

    // let selectDestination = prompt("Seleccione un destino, las opciones disponibles son \n\n" + flightTo.join("\n"));

    //Lo mismo que lo anterior pero con el destino.
    // if (flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination)) {
    //     destination = selectDestination;
    // }else{
    //     while(!(flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination))) {
    //         selectDestination = prompt("Seleccione un destino, las opciones disponibles son \n\n" + flightTo.join("\n"));
    //     }
    //     destination = selectDestination;
    // }

    //Saco la fecha actual.
    // let currentDate = new Date(); 
    // let year = currentDate.getFullYear();
    // let month = currentDate.getMonth() + 1;
    // let day = currentDate.getDate();

    // let myDate = prompt("Seleccione fecha de vuelo:", day + "-" + month + "-" + year);

    // let newDate = myDate.split("-");

    //Tuve que crear nuevas fechas para seleccionar ya que si lo saco del currentDate va a fallar debido a que son valores fijos.
    // let newDay = newDate[0];
    // let newMonth = newDate[1];
    // let newYear = newDate[2];

    // //Chequeo que esten bien las fechas desde este momento.
    // while(newDay < 0 || newDay > 31 || newMonth < 0 || newMonth > 12 || newYear < 2023) {
    //     // myDate = prompt("Seleccione fecha de vuelo:", day + "-" + month + "-" + year);
    //     // newDate = myDate.split("-");
    //     newDay = newDate[0];
    //     newMonth = newDate[1];
    //     newYear = newDate[2];
    // }

    // let passengersAmount;

    //Selecciono cantidad de pasajeros y repito si no es un numero.
    // do{
    //     // passengersAmount = +prompt("Seleccione la cantidad de pasajeros");
    // }while(isNaN(passengersAmount) || passengersAmount <= 0);
    // let passengerName = [];
    // let identifier = [];

    // //Genero entradas dependiendo del numero de pasajeros.
    // for(let i=1; i<= passengersAmount; i++){
    //     passengerName[i - 1] = prompt("Ingrese nombre de pasajero:");
    //     identifier[i - 1] = +prompt("Ingrese número de documento/pasaporte:");
    //     while(isNaN(identifier[i - 1])){
    //         identifier[i - 1] = +prompt("Ingrese número de documento/pasaporte:");
    //     }
    // }

//     let aeroCode = selectAirline();

//     let myFlightCode;
//     //Asigno numero de vuelo
//     let flightNumber = (Math.floor(Math.random() * 100) + 100);
//     myFlightCode = "2" + flightNumber;

//     //Converti la fecha a string con reduce para usar una HOF.
//     let fullDate;
//     fullDate = newDate.reduce((myAcc, myCurVal) => myAcc + '-' + myCurVal);

//     let userData = new UserData(source, destination, fullDate, passengerName, identifier, myFlightCode);

//     //Imprimo en el lugar de seleccion de vuelos.
//     const main = document.getElementsByClassName("SearchControls_grid")[0];
//     const myFlightCoupon = "Sus datos son: " + "<br>" + "Origen: " + userData.source + "<br>" + "Destino: " + userData.destination  + "<br>" + "Fecha: " + userData.fullDate +  "<br>" + "Pasajero/s: " + userData.passengerName + "<br>" + "Documento/s: " + userData.identifier + "<br>" + "Número de vuelo: " + aeroCode + userData.myFlightCode + "<br>" + "Que tenga un excelente viaje :)";
//     main.innerHTML = myFlightCoupon;
// }else{
//     const myAirlines = [
//         american = {
//             name: "American Airlines",
//             code: "AA"
//         },
//         aerolineas = {
//             name: "Aerolineas Argentinas", 
//             code: "AR"
//         },
//         delta = {
//             name: "Delta Airlines",
//             code: "DL"
//         },
//         virgin = {
//             name: "Virgin Atlantic", 
//             code: "VS"
//         },
//         flybondi = {
//             name: "FlyBondi", 
//             code: "FO"
//         }
//     ]

    // const selectAirline = () => {
    //     let airName = '';
    //     let airCode = '';
    //     myAirlines.forEach(airline => { 
    //         airName += airline.name + "\n", airCode += airline.code;
    //     });

    //     // let selectedAirline = prompt("Select an airline, the available options are: \n\n" + airName);
    
    //     let myAirline = myAirlines.find(airline => airline.name === selectedAirline);

    //     // if (myAirline){
    //     //     alert("Your selected airline is: " + myAirline.name);
    //     // }else{
    //     //     myAirline = flybondi;
    //     //     alert("Your selected airline is: " + myAirline.name);
    //     // }

    //     return myAirline.code;
    // }

    // class UserData {
    //     constructor(source, destination, fullDate, passengerName, identifier, myFlightCode) {
    //       this.source = source;
    //       this.destination = destination;
    //       this.fullDate = fullDate;
    //       this.passengerName = passengerName;
    //       this.identifier = identifier;
    //       this.myFlightCode = myFlightCode;
    //     }
    // }

    // alert("Welcome " + myName + " " + mySurName);
    // let selectSource = prompt("Select a source, the avaliable options are \n\n" + flightFrom.join("\n"));
    
    // if (flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource)) {
    //     source = selectSource;
    // }else{
    //     while(!(flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource))) {
    //         selectSource = prompt("Select a source, the avaliable options are \n\n" + flightFrom.join("\n"));
    //     }
    //     source = selectSource;
    // }

    // let selectDestination = prompt("Select a destination, the avaliable options are \n\n" + flightTo.join("\n"));
    
    // if (flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination)) {
    //     destination = selectDestination;
    // }else{
    //     while(!(flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination))) {
    //         selectDestination = prompt("Select a destination, the avaliable options are \n\n" + flightTo.join("\n"));
    //     }
    //     destination = selectDestination;
    // }

    // let currentDate = new Date(); 
    // let year = currentDate.getFullYear();
    // let month = currentDate.getMonth() + 1;
    // let day = currentDate.getDate();

    // let myDate = prompt("Select Flight Date:", day + "-" + month + "-" + year);

    // let newDate = myDate.split("-");

    // let newDay = newDate[0];
    // let newMonth = newDate[1];
    // let newYear = newDate[2];

    // while(newDay < 0 || newDay > 31 || newMonth < 0 || newMonth > 12 || newYear < 2023) {
    //     // myDate = prompt("Select Flight Date:", day + "-" + month + "-" + year);
    //     // newDate = myDate.split("-");
    //     newDay = newDate[0];
    //     newMonth = newDate[1];
    //     newYear = newDate[2];
    // }

    // let passengersAmount;

    // do{
    //     passengersAmount = +prompt("Select ammount of passengers");
    // }while(isNaN(passengersAmount) || passengersAmount <= 0);
    // let passengerName = [];
    // let identifier = [];

    // for(let i=1; i<= passengersAmount; i++){
    //     passengerName[i - 1] = prompt("Passenger name:");
    //     identifier[i - 1] = +prompt("Passenger identifier:");
    //     while(isNaN(identifier[i - 1])){
    //         identifier[i - 1] = +prompt("Passenger identifier:");
    //     }
    // }

    // let aeroCode = selectAirline();

    // let myFlightCode;
    // let flightNumber = (Math.floor(Math.random() * 100) + 100);
    // myFlightCode = "2" + flightNumber;

    // let fullDate;
    // fullDate = newDate.reduce((myAcc, myCurVal) => myAcc + '-' + myCurVal);

    // let userData = new UserData(source, destination, fullDate, passengerName, identifier, myFlightCode);

    // const main = document.getElementsByClassName("SearchControls_grid")[0];
    // const myFlightCoupon = "Your information is: " + "<br>" + "Source: " + userData.source + "<br>" + "Destination: " + userData.destination + "<br>" + "Date: " + userData.fullDate + "<br>" + "Passenger/s: " + userData.passengerName + "<br>" + "Passport/s: " + userData.identifier + "<br>" + "Flight number: " + aeroCode + userData.myFlightCode + "<br>" + "Have a good flight :)";
//     // main.innerHTML = myFlightCoupon;
// }