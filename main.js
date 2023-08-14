/* DOM Creation */
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

/* Functions */
function compareFlights(matchedFlights) {

    if(matchedFlights.length > 0) {
        resultsDiv.innerHTML = "<strong>Vuelos encontrados:</strong>";
        let ul = document.createElement('ul');
        resultsDiv.appendChild(ul);
        let flight;
        let airline;
        for (flight of matchedFlights) {
            
            airline = Math.floor(Math.random() * myAirlines.length);

            if (!localStorage.getItem("Airline")) {      
                localStorage.setItem("Airline", airline);
            }

            let airlineStorage = localStorage.getItem("Airline");

            let li = document.createElement('li');
            ul.appendChild(li);

            aTag = document.createElement('a');
            aTag.href = '#';
            aTag.innerHTML = `Origen: ${flight.source}${'<br>'}Destino: ${flight.destination}${'<br>'}Operado por: ${myAirlines[airlineStorage].name}${'<br>'}Fecha: ${dateContainer.value}${'<br>'}`;
            li.appendChild(aTag);
            let br = document.createElement('br');
            ul.appendChild(br);

            aTag.addEventListener('click', function(event){
                event.preventDefault();
                userData(flight.source, flight.destination, myAirlines[airline].name, dateContainer.value);
            });
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

function userData(src, dest, airline, date) {
    
    const passengersWrapper = document.querySelector('.Cabin_inputWrapper input');
    const passengersAmmount = passengersWrapper.value;

    const form = document.createElement('form');
    form.classList.add("passenger-data");

    for (let i = 1; i <= passengersAmmount; i++) {

        const nameLabel = document.createElement('label');
        nameLabel.textContent = `Nombre del pasajero ${i}: `;
        const nameInput = document.createElement('input');
        nameLabel.appendChild(nameInput);
        nameInput.setAttribute("type", "text");
        nameInput.required = true;

        const idLabel = document.createElement('label');
        idLabel.textContent = `Documento del pasajero ${i}: `;
        const idInput = document.createElement('input');
        idLabel.appendChild(idInput);
        idInput.setAttribute("type", "number");
        idInput.required = true;

        form.appendChild(nameLabel);
        form.appendChild(document.createElement('br'));
        form.appendChild(idLabel);
        form.appendChild(document.createElement('br'));
    }

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Enviar';
    form.appendChild(submitButton);
    submitButton.classList.add("end-reservation");

    let removeOrigin = document.querySelector('.OriginDesktopSearchControlGroup_autoSuggestContainer');
    let removeDest = document.querySelector('.DestinationSearchControlsGroup_autoSuggestContainer');
    let removeDate = document.querySelector('.DateSearchControlsGroup_datesContaine');
    let removePass = document.querySelector('.CabinClassTravellerSearchControlGroup_travellerContainer');

    let oldSubmit = document.querySelector('.BpkButtonBase_bpk-button');

    removeOrigin.remove();
    removeDest.remove();
    removeDate.remove();
    removePass.remove();

    oldSubmit.remove();

    resultsDiv.remove();

    main.insertAdjacentElement('afterend', form);

    let disableSubmit = false;

    submitButton.addEventListener("click", function(event) {
        if(document.querySelector('.passenger-data').checkValidity()){
            event.preventDefault();

            if (disableSubmit) {
                event.preventDefault();
                return;
            }

            const user = document.createElement('div');
            user.innerHTML = `${'<strong>'}Reserva confirmada: ${'</strong>'} ${'<br>'}Origen: ${src}${'<br>'}Destino: ${dest}${'<br>'}Empresa: ${airline}${'<br>'}Fecha: ${date}${'<br>'}Pasajeros: ${passengersAmmount}${'<br>'}Que tenga un excelente vuelo.`;

            form.appendChild(user);
            disableSubmit = true;
        }
    });

}

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
let sourceSelected;
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
let destinationSelected;
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

let mySubmit = document.querySelector(".BpkButtonBase_bpk-button");
mySubmit.addEventListener('click', function(event) {
    if(document.querySelector('#search-form').checkValidity()){
        event.preventDefault();
        const matchedFlights = flightsFound.filter(flight => flight.source === sourceSelected && flight.destination === destinationSelected);
        compareFlights(matchedFlights);
    }
});

/* Arrays */
const flightFrom = ["Buenos Aires (EZE)", "La Paz (LPB)", "Brasilia (BSB)", "Santiago (AMB)", "Bogotá (BOG)", "Quito (UIO)", "Georgetown (GEO)", "Asunción (ASU)", "Lima (LIM)", "Zanderij (PBM)", "Montevideo (MVD)", "Caracas (CCS)"];
const flightTo = ["Buenos Aires (EZE)", "La Paz (LPB)", "Brasilia (BSB)", "Santiago (AMB)", "Bogotá (BOG)", "Quito (UIO)", "Georgetown (GEO)", "Asunción (ASU)", "Lima (LIM)", "Zanderij (PBM)", "Montevideo (MVD)", "Caracas (CCS)"];

const myAirlines = [
    american = {
        name: "American Airlines",
        code: "AA"
    },
    aerolineas = {
        name: "Aerolineas Argentinas", 
        code: "AR"
    },
    delta = {
        name: "Delta Airlines",
        code: "DL"
    },
    virgin = {
        name: "Virgin Atlantic", 
        code: "VS"
    },
    flybondi = {
        name: "FlyBondi", 
        code: "FO"
    }        
]

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
let sourceFound;
let destinationFound;
let flightsFound = new Array();
let flightsSet = new Array();

for (let i = 0; i < myFlights.length; i++) {
    let flight = myFlights[i];
    mySrc = flight.source;
    myDest = flight.destination;

    selectedFlights("source " + i, mySrc);
    selectedFlights("destination " + i, myDest);

    sourceFound = JSON.parse(localStorage.getItem("source " + i));
    destinationFound = JSON.parse(localStorage.getItem("destination " + i));

    flightsFound.push({'source': sourceFound, 'destination': destinationFound});
}