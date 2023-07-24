alert("Bienvenido a FastFlight, su buscador de vuelos aereos.");

//Variable que se usa como condicion.
let typedData = 0;
let myName, mySurName, defaultCountry, myCountry;

//Datos del cliente.
do {
    myName = prompt("Ingrese su nombre");
    mySurName = prompt("Ingrese su apellido"); 
    defaultCountry = "Argentina";
    myCountry = prompt("Ingrese su nacionalidad", defaultCountry);
    if (myName && mySurName && myCountry){
        typedData = 1;
    }else{
        typedData = 0;
    }
} while(typedData == 0);

//Variable vacía para selección de idioma.
let lang;

//Compara la selección.
if (myCountry == defaultCountry){
    lang = "Spanish";
}else{
    lang = "English";
}

//Arrays de Origen y Destino.
const flightFrom = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Perú", "Suriname", "Uruguay", "Venezuela"];
const flightTo = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Perú", "Suriname", "Uruguay", "Venezuela"];

//Para comparar lowercase use HOF.
const newFlightFrom = flightFrom.map(flight => flight.toLowerCase());
const newFlightTo = flightTo.map(flight => flight.toLowerCase());

//Selecciona Idioma dependiendo de la variable.
if (lang == "Spanish") {
    alert("Bienvenido " + myName + " " + mySurName);
    let selectSource = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightFrom.join("\n"));
    
    //Se fija si existe lo seleccionado con Includes, si da true sigue, si da false vuelve.
    if (flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource)) {
        source = selectSource;
        console.log(selectSource);
    } else {
        while (!(flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource))) {
            selectSource = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightFrom.join("\n"));
            console.log(selectSource);
        }
        source = selectSource;
    }

    console.log(selectSource);

    let selectDestination = prompt("Seleccione un destino, las opciones disponibles son \n\n" + flightTo.join("\n"));

    //Lo mismo que lo anterior pero con el destino.
    if (flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination)) {
        destination = selectDestination;
    }else{
        while(!(flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination))) {
            selectDestination = prompt("Seleccione un destino, las opciones disponibles son \n\n" + flightTo.join("\n"));
        }
        destination = selectDestination;
    }

    //Saco la fecha actual.
    let currentDate = new Date(); 
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    let myDate = prompt("Seleccione fecha de vuelo:", day + "-" + month + "-" + year);

    let newDate = myDate.split("-");

    //Tuve que crear nuevas fechas para seleccionar ya que si lo saco del currentDate va a fallar debido a que son valores fijos.
    let newDay = newDate[0];
    let newMonth = newDate[1];
    let newYear = newDate[2];

    //Chequeo que esten bien las fechas desde este momento.
    while(newDay < 0 || newDay > 31 || newMonth < 0 || newMonth > 12 || newYear < 2023) {
        myDate = prompt("Seleccione fecha de vuelo:", day + "-" + month + "-" + year);
        newDate = myDate.split("-");
        newDay = newDate[0];
        newMonth = newDate[1];
        newYear = newDate[2];
    }

    let passengersAmount;

    //Selecciono cantidad de pasajeros y repito si no es un numero.
    do{
        passengersAmount = +prompt("Seleccione la cantidad de pasajeros");
    }while(isNaN(passengersAmount) || passengersAmount <= 0);
    let passengerName = [];
    let identifier = [];

    //Genero entradas dependiendo del numero de pasajeros.
    for(let i=1; i<= passengersAmount; i++){
        passengerName[i - 1] = prompt("Ingrese nombre de pasajero:");
        identifier[i - 1] = +prompt("Ingrese número de documento/pasaporte:");
        while(isNaN(identifier[i - 1])){
            identifier[i - 1] = +prompt("Ingrese número de documento/pasaporte:");
        }
    }

    //Creo una clase constructora ES2016, VSC me lo corrigio solo.
    class Airline {
        constructor(name, code) {
            this.name = name;
            this.code = code;
        }
    }

    //Creo objetos a partir de la class.
    const american = new Airline("American Airlines", "AA");
    const aerolineas = new Airline("Aerolineas Argentinas", "AR");
    const delta = new Airline("Delta Airlines", "DL");
    const virgin = new Airline("Virgin Atlantic", "VS");
    const flybondi = new Airline("FlyBondi", "FO");

    //Selecciono aerolinea, si no es ninguna, flybondi sera la opcion por defecto.
    const selectAirline = () => {
        let airline = prompt("Seleccione una aerolínea, las opciones disponibles son: \n\n" + american.name + "\n" + aerolineas.name + "\n" + delta.name + "\n" + virgin.name + "\n" + flybondi.name);
        let selectedAirline;
        if(!(airline == american.name || airline == aerolineas.name || airline == delta.name || airline == virgin.name || american.name.toLowerCase() || airline == aerolineas.name.toLowerCase() || airline == delta.name.toLowerCase() || airline == virgin.toLowerCase())) {
            selectedAirline = flybondi.name;
            alert("Su aerolinea designada es: " + selectedAirline);
        }else{
            selectedAirline = airline;
            alert("Su aerolinea designada es: " + selectedAirline);
        }
        return selectedAirline;
    }

    //Asigno el valor retornado a la constante.
    const airline = selectAirline();

    //Busco el codigo dentro de la propiedad code.
    let aeroCode;
    switch (airline){
        case american.name, american.name.toLowerCase():
            aeroCode = american.code;
            break;
        case aerolineas.name, aerolineas.name.toLowerCase():
            aeroCode = aerolineas.code;
            break;
        case delta.name, delta.name.toLowerCase():
            aeroCode = delta.code;
            break;
        case virgin.name, virgin.name.toLowerCase():
            aeroCode = virgin.code;
            break;
        default:
            aeroCode = flybondi.code;
            break;
    }       

    //Asigno numero de vuelo
    let flightNumber = (Math.floor(Math.random() * 100) + 100);
    let myFlightCode = "2" + flightNumber;

    //Converti la fecha a string con reduce para usar una HOF.
    const fullDate = newDate.reduce((myAcc, myCurVal) => myAcc + '-' + myCurVal);

    //Genero un array para testear en consola que funcione.
    const userData = [source, destination, fullDate, passengerName, identifier, aeroCode + myFlightCode];
    console.log(userData);
    

    //Imprimo en el lugar de seleccion de vuelos.
    const main = document.getElementsByClassName("SearchControls_grid")[0];
    const myFlightCoupon = "Sus datos son: " + "<br>" + "Origen: " + userData[0] + "<br>" + "Destino: " + userData[1]  + "<br>" + "Fecha: " + userData[2] +  "<br>" + "Pasajero/s: " + userData[3] + "<br>" + "Documento/s: " + userData[4] + "<br>" + "Número de vuelo: " + userData[5] + "<br>" + "Que tenga un excelente viaje :)";
    main.innerHTML = myFlightCoupon;
}else{
    alert("Welcome " + myName + " " + mySurName);
    let selectSource = prompt("Select a source, the avaliable options are \n\n" + flightFrom.join("\n"));
    
    if (flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource)) {
        source = selectSource;
    }else{
        while(!(flightFrom.includes(selectSource) || newFlightFrom.includes(selectSource))) {
            selectSource = prompt("Select a source, the avaliable options are \n\n" + flightFrom.join("\n"));
        }
        source = selectSource;
    }

    let selectDestination = prompt("Select a destination, the avaliable options are \n\n" + flightTo.join("\n"));
    
    if (flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination)) {
        destination = selectDestination;
    }else{
        while(!(flightTo.includes(selectDestination) || newFlightTo.includes(selectDestination))) {
            selectDestination = prompt("Select a destination, the avaliable options are \n\n" + flightTo.join("\n"));
        }
        destination = selectDestination;
    }

    let currentDate = new Date(); 
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    let myDate = prompt("Select Flight Date:", day + "-" + month + "-" + year);

    let newDate = myDate.split("-");

    let newDay = newDate[0];
    let newMonth = newDate[1];
    let newYear = newDate[2];

    while(newDay < 0 || newDay > 31 || newMonth < 0 || newMonth > 12 || newYear < 2023) {
        myDate = prompt("Select Flight Date:", day + "-" + month + "-" + year);
        newDate = myDate.split("-");
        newDay = newDate[0];
        newMonth = newDate[1];
        newYear = newDate[2];
    }

    let passengersAmount;

    do{
        passengersAmount = +prompt("Select ammount of passengers");
    }while(isNaN(passengersAmount) || passengersAmount <= 0);
    let passengerName = [];
    let identifier = [];

    for(let i=1; i<= passengersAmount; i++){
        passengerName[i - 1] = prompt("Passenger name:");
        identifier[i - 1] = +prompt("Passenger identifier:");
        while(isNaN(identifier[i - 1])){
            identifier[i - 1] = +prompt("Passenger identifier:");
        }
    }

    class Airline {
        constructor(name, code) {
            this.name = name;
            this.code = code;
        }
    }

    const american = new Airline("American Airlines", "AA");
    const aerolineas = new Airline("Aerolineas Argentinas", "AR");
    const delta = new Airline("Delta Airlines", "DL");
    const virgin = new Airline("Virgin Atlantic", "VS");
    const flybondi = new Airline("FlyBondi", "FO");

    const selectAirline = () => {
        let airline = prompt("Select an airline, the available options are: \n\n" + american.name + "\n" + aerolineas.name + "\n" + delta.name + "\n" + virgin.name + "\n" + flybondi.name);
        let selectedAirline;
        if(!(airline == american.name || airline == aerolineas.name || airline == delta.name || airline == virgin.name || american.name.toLowerCase() || airline == aerolineas.name.toLowerCase() || airline == delta.name.toLowerCase() || airline == virgin.toLowerCase())) {
            selectedAirline = flybondi.name;
            alert("Your selected airline is: " + selectedAirline);
        }else{
            selectedAirline = airline;
            alert("Your selected airline is: " + selectedAirline);
        }
        return selectedAirline;
    }

    const airline = selectAirline();

    let aeroCode;
    switch (airline){
        case american.name, american.name.toLowerCase():
            aeroCode = american.code;
            break;
        case aerolineas.name, aerolineas.name.toLowerCase():
            aeroCode = aerolineas.code;
            break;
        case delta.name, delta.name.toLowerCase():
            aeroCode = delta.code;
            break;
        case virgin.name, virgin.name.toLowerCase():
            aeroCode = virgin.code;
            break;
        default:
            aeroCode = flybondi.code;
            break;
    }       

    let flightNumber = (Math.floor(Math.random() * 100) + 100);
    let myFlightCode = "2" + flightNumber;

    const fullDate = newDate.reduce((myAcc, myCurVal) => myAcc + '-' + myCurVal);

    const userData = [source, destination, fullDate, passengerName, identifier, aeroCode + myFlightCode];
    console.log(userData);
    
    const main = document.getElementsByClassName("SearchControls_grid")[0];
    const myFlightCoupon = "Your information is: " + "<br>" + "Source: " + userData[0] + "<br>" + "Destination: " + userData[1] + "<br>" + "Date: " + userData[2] + "<br>" + "Passenger/s: " + userData[3] + "<br>" + "Passport/s: " + userData[4] + "<br>" + "Flight number: " + userData[5] + "<br>" + "Have a good flight :)";
    main.innerHTML = myFlightCoupon;
}