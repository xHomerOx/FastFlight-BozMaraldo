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

if (lang == "Spanish") {
    alert("Bienvenido " + myName + " " + mySurName);
    let selectSource = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightFrom.join("\n"));
    
    if (flightFrom.includes(selectSource)) {
        source = selectSource;
    }else{
        while(!(flightFrom.includes(selectSource))) {
            selectSource = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightFrom.join("\n"));
        }
        source = selectSource;
    }

    let selectDestination = prompt("Seleccione un destino, las opciones disponibles son \n\n" + flightTo.join("\n"));
    
    if (flightTo.includes(selectDestination)) {
        destination = selectDestination;
    }else{
        while(!(flightTo.includes(selectDestination))) {
            selectDestination = prompt("Seleccione un origen, las opciones disponibles son \n\n" + flightTo.join("\n"));
        }
        destination = selectDestination;
    }

    let currentDate = new Date(); 
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    let myDate = prompt("Seleccione fecha de vuelo:", day + "-" + month + "-" + year);
    let dateChecker = 0;

    let newDate = myDate.split("-");

    let newDay = newDate[0];
    let newMonth = newDate[1];
    let newYear = newDate[2];

    while(newDay < 0 || newDay > 31 || newMonth < 0 || newMonth > 12 || newYear < 2023 || dateChecker == 0) {
        dateChecker = 1;
        myDate = prompt("Seleccione fecha de vuelo:", day + "-" + month + "-" + year);
        newDate = myDate.split("-");
        newDay = newDate[0];
        newMonth = newDate[1];
        newYear = newDate[2];
    }
}









//     // alert("Seleccione una aerolínea, las opciones disponibles son American Airlines, Aerolíneas Argentinas, Delta Airlines y Virgin Atlantic");
//     // //Convierte en minúsculas dependiendo por si la persona lo ingresó en mayuscula.
//     // aero = prompt("Linea aerea:").toLowerCase();
// }else{
//     alert("Welcome " + myName + " " + mySurName);
//     prompt("Select a source, the available options are" + flightFrom.join("\n"));
//     // alert("Select an Airline, the available options are American Airlines, Aerolíneas Argentinas, Delta Airlines and Virgin Atlantic");
//     // //Convierte en minúsculas dependiendo por si la persona lo ingresó en mayuscula.
//     // aero = prompt("Airline:").toLowerCase();
// }






// //Función que hacer que la primera letra de cada palabra sea Mayúscula para después buscar en el switch y no tener que poner múltiples cases.
// function myFirstCapital(aero){
//     //Convierte la primera letra en Mayúscula.
//     let upperAero = aero.charAt(0).toUpperCase();

//     //Inicializo vacía accAero ya que de no ser así me da Undefined.
//     let lowerCaseAero, accAero = '';

//     //Iteración letra por letra.
//     for(let i=1; i <= aero.length; i++){

//         //Si hay un espacio que la próxima letra sea en mayúscula.
//         if(aero.charAt(i) == ' ') {
//             lowerCaseAero = ' ' + aero.charAt(i + 1).toUpperCase();
//             i++;
//         }else{
//             lowerCaseAero = aero.charAt(i);
//         }
//         accAero = accAero + lowerCaseAero;
//     }

//     //Aerolinea completa retornada de la función.
//     let myAirline = upperAero + accAero;

//     return myAirline;
// }

// //Llamo a la función con una variable en Scope Global.
// let myAirline = myFirstCapital(aero);

// //Busco la aerolinea.
// switch (myAirline){
//     case "American Airlines":
//         abbr = "AA";
//         break;
//     case "Aerolineas Argentinas":
//         abbr = "AR";
//         break;
//     case "Delta Airlines":
//         abbr = "DL";
//         break;
//     case "Virgin Atlantic":
//         abbr = "VS";
//         break;
//     default:
//         abbr = "FlyBondi :(";
//         break;
// }


// //Número de vuelo aleatorio y redondeo hacia abajo. Podría haber usado ceil().
// let flightNumber = (Math.floor(Math.random() * 100) + 100);

// //Agrego el 2 adelante para que tenga 4 dígitos empezando por ese número.
// alert("Su vuelo es: " + abbr + 2 + flightNumber);

// //Imprimo ticket en pantalla.
// document.write('<h3>' + "Ticket de vuelo / Flight coupon" + '</h3>' + '<br>' + abbr + 2 + flightNumber);