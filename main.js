/* --------------------------------------------- DOM Creation ------------------------------------------- */

let main = document.getElementsByClassName('SearchControls_grid')[0];

let resultsDiv = document.createElement('div');
resultsDiv.classList.add('results-found');
resultsDiv.style.display = "block";
resultsDiv.style.textAlign = "center";

main.insertAdjacentElement('afterend', resultsDiv);

let ul = document.createElement('ul');
resultsDiv.appendChild(ul);

let li = document.createElement('li');
ul.appendChild(li);

let aTag;

/* --------------------------------------------- API Call ------------------------------------------- */

/* Llamo a la API de Flight Radar */
async function flightCall(url, options) {
    url = 'https://flight-radar1.p.rapidapi.com/airports/list',
    options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7358e78926mshdfd3d3ac3c89ca6p13b0adjsn2d3557e441b7',
            'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
        }
    };
    try {

        let airSpinner = document.querySelector(".loader");
        let mainContent = document.querySelector(".mainContent");
        let searchControl = document.querySelector(".SearchControls_grid");
        searchControl.classList.add("blueBackground");
        airSpinner.style.display = 'block';
        mainContent.style.display = 'none';

        const response = await fetch(url, options);
        const result = await response.json();

        searchControl.classList.remove("blueBackground");
        searchControl.classList.add("whiteBackground");
        airSpinner.style.display = 'none';
        mainContent.style.display = 'block';

        return result;
    } catch (error) {
        console.error(error);
    }
}


/* Llamo a la funcion asincronica y retorno los resultados */
const myAirports = flightCall();

myAirports.then(airports => {
    return airports;
}).then(function(data){
    filteredAirports(data);
}).catch(error => {
    console.error(error);
});   

/* Creo una funcion con los valores obtenidos y filtro por algunos paises sudamericanos*/
let optionSource;
let optionDestination;

function filteredAirports(airports) {

    const fullAirports = airports.rows;

    const americanAirports = fullAirports.filter(airport => 
        airport.country.includes("Argentina") || 
        airport.country.includes("Bolivia") ||
        airport.country.includes("Brazil") || 
        airport.country.includes("Chile") || 
        airport.country.includes("Peru") || 
        airport.country.includes("Paraguay"));
        console.log(americanAirports);

    americanAirports.sort((a, b) => (a.country > b.country) ? 1 : (a.country === b.country) ? ((a.name > b.name) ? 1 : -1) : -1 );

    for(let i = 0; i < americanAirports.length; i++){
        let source = americanAirports[i].name + ' - ' + americanAirports[i].country;
        optionSource = document.createElement('option');
        optionSource.value = americanAirports[i].iata;
        optionSource.text = source;
        selectSource.appendChild(optionSource);[0].iata
    }

    for(let i = 0; i < americanAirports.length; i++){
        let destination = americanAirports[i].name + ' - ' + americanAirports[i].country;
        optionDestination = document.createElement('option');
        optionDestination.value = americanAirports[i].iata;
        optionDestination.text = destination;
        selectDestination.appendChild(optionDestination);
    }
}


/* Funcion que llama a otra API Paga para obtener los datos de la busqueda */
let sourceSelected, destinationSelected, selectedDate, passengersAmm;

async function flightScan(sourceSelected, destinationSelected, selectedDate) {
    url = `https://flight-fare-search.p.rapidapi.com/v2/flights/?from=${sourceSelected}&to=${destinationSelected}&date=${selectedDate}&adult=${passengersAmm}`,
    options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7358e78926mshdfd3d3ac3c89ca6p13b0adjsn2d3557e441b7',
            'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.error(error);
    }
}

/* Itero para que cuando un valor aparezca en un select, no aparezca en el otro */
let selectSource = document.querySelector('#originInput-input');
let selectDestination = document.querySelector('#destinationInput-input');

let optionCheck1;
selectSource.addEventListener('change', function(event){
    optionCheck1 = event.target.value;
    let sourceIndex = selectSource.selectedIndex;
    for (let i = 0; i < selectDestination.options.length; i++) {
        if(selectDestination.options[i].value === optionCheck1) {
            selectSource.options[i].setAttribute('selected', 'selected');
            selectDestination.options[i].style.display = "none";
        }else{
            selectSource.options[i].removeAttribute('selected', 'selected');
            selectDestination.options[i].style.display = "block";
        }
    }
    sourceSelected = selectDestination.options[sourceIndex].value;
});

let optionCheck2;
selectDestination.addEventListener('change', function(event){
    optionCheck2 = event.target.value;
    let destinationIndex = selectDestination.selectedIndex;
    for (let i = 0; i < selectSource.options.length; i++) {
        if(selectSource.options[i].value === optionCheck2) {
            selectDestination.options[i].setAttribute('selected', 'selected');
            selectSource.options[i].style.display = "none";
        }else{
            selectDestination.options[i].removeAttribute('selected', 'selected');
            selectSource.options[i].style.display = "block";
        }
    }
    destinationSelected = selectDestination.options[destinationIndex].value;
});




/* --------------------------------------------- Functions ------------------------------------------- */

/* Busco los vuelos */
function compareFlights(matchedFlights) {

    if(matchedFlights.length > 0) {
        resultsDiv.innerHTML = "<strong>Vuelos encontrados:</strong>";
        let ul = document.createElement('ul');
        resultsDiv.appendChild(ul);
        let flight;
        let airline;
        for (flight of matchedFlights) {

            let li = document.createElement('li');
            ul.appendChild(li);

        }

        return flight.source + flight.destination + myAirlines[airline].name + dateContainer.value;

    }else{
        let liArray = document.querySelectorAll('li');
        for (let i = 0; i < liArray.length; i++) {
            let newLi = liArray[i];

            resultsDiv.innerHTML = "";
            aTag = newLi.querySelector("a");

            if (aTag) {
                newLi.removeChild(aTag);
            }
        }

        ul = document.createElement('ul');
        resultsDiv.appendChild(ul);
        li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML = `No se han encontrado vuelos que coincidan con su busqueda.`;
    }
};

let mySubmit = document.querySelector(".BpkButtonBase_bpk-button");
mySubmit.addEventListener('click', function(event) {
    if(document.querySelector('#search-form').checkValidity()){
        event.preventDefault();
        flightScan(sourceSelected, destinationSelected, selectedDate).then(flight => {
            console.log(flight);
        }).catch(error => {
            console.error(error);
        });  
        
    }
});

// function userData(src, dest, airline, date) {
    
//     const passengersWrapper = document.querySelector('.Cabin_inputWrapper input');
//     const passengersAmmount = passengersWrapper.value;

//     const form = document.createElement('form');
//     form.classList.add("passenger-data");

//     for (let i = 1; i <= passengersAmmount; i++) {

//         const nameLabel = document.createElement('label');
//         nameLabel.textContent = `Nombre del pasajero ${i}: `;
//         const nameInput = document.createElement('input');
//         nameLabel.appendChild(nameInput);
//         nameInput.setAttribute("type", "text");
//         nameInput.required = true;

//         const idLabel = document.createElement('label');
//         idLabel.textContent = `Documento del pasajero ${i}: `;
//         const idInput = document.createElement('input');
//         idLabel.appendChild(idInput);
//         idInput.setAttribute("type", "number");
//         idInput.required = true;

//         form.appendChild(nameLabel);
//         form.appendChild(document.createElement('br'));
//         form.appendChild(idLabel);
//         form.appendChild(document.createElement('br'));
//     }

//     const submitButton = document.createElement('button');
//     submitButton.type = 'submit';
//     submitButton.textContent = 'Enviar';
//     form.appendChild(submitButton);
//     submitButton.classList.add("end-reservation");

//     let removeOrigin = document.querySelector('.OriginDesktopSearchControlGroup_autoSuggestContainer');
//     let removeDest = document.querySelector('.DestinationSearchControlsGroup_autoSuggestContainer');
//     let removeDate = document.querySelector('.DateSearchControlsGroup_datesContaine');
//     let removePass = document.querySelector('.CabinClassTravellerSearchControlGroup_travellerContainer');

//     let oldSubmit = document.querySelector('.BpkButtonBase_bpk-button');

//     removeOrigin.remove();
//     removeDest.remove();
//     removeDate.remove();
//     removePass.remove();

//     oldSubmit.remove();

//     resultsDiv.remove();

//     main.insertAdjacentElement('afterend', form);

//     let disableSubmit = false;

//     submitButton.addEventListener("click", function(event) {
//         if(document.querySelector('.passenger-data').checkValidity()){
//             event.preventDefault();

//             if (disableSubmit) {
//                 event.preventDefault();
//                 return;
//             }

//             const user = document.createElement('div');
//             user.innerHTML = `${'<strong>'}Reserva confirmada: ${'</strong>'} ${'<br>'}Origen: ${src}${'<br>'}Destino: ${dest}${'<br>'}Empresa: ${airline}${'<br>'}Fecha: ${date}${'<br>'}Pasajeros: ${passengersAmmount}${'<br>'}Que tenga un excelente vuelo.`;

//             form.appendChild(user);
//             disableSubmit = true;
//         }
//     });

// }

/* Events */


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
    
    passengersAmm = cabinNumber.value;
});


/* Rest of Code */

const dateContainer = document.querySelector('.Date_inputWrapper input');
const datepicker = new Datepicker(dateContainer, {
    format: 'dd-mm-yyyy',
    language: 'es'
}); 

let date = dateContainer.addEventListener('changeDate', function() {
    selectedDate = datepicker.getDate('yyyy-mm-dd');
    return selectedDate;
});

// let mySrc;
// let myDest;
// let sourceFound;
// let destinationFound;
// let flightsFound = new Array();
// let flightsSet = new Array();

// for (let i = 0; i < myFlights.length; i++) {
//     let flight = myFlights[i];
//     mySrc = flight.source;
//     myDest = flight.destination;

//     selectedFlights("source " + i, mySrc);
//     selectedFlights("destination " + i, myDest);

//     sourceFound = JSON.parse(localStorage.getItem("source " + i));
//     destinationFound = JSON.parse(localStorage.getItem("destination " + i));

//     flightsFound.push({'source': sourceFound, 'destination': destinationFound});
// }