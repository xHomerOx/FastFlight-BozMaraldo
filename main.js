alert("Bienvenido a FastFlight, su buscador de vuelos aereos.");

//Datos del cliente.
let myName = prompt("Ingrese su nombre");
let mySurName = prompt("Ingrese su apellido"); 
let defaultCountry = "Argentina";
let myCountry = prompt("Ingrese su nacionalidad", defaultCountry);

//Variable vacía para selección de idioma.
let lang;

//Compara la selección
if (myCountry == defaultCountry){
    lang = "Spanish";
}else{
    lang = "English";
}

//Imprime dependiendo la selección ingresada.
let aero, abbr;

if (lang == "Spanish") {
    alert("Bienvenido " + myName + " " + mySurName);
    alert("Seleccione una aerolínea, las opciones disponibles son American Airlines, Aerolíneas Argentinas, Delta Airlines y Virgin Atlantic");
    //Convierte en minúsculas dependiendo por si la persona lo ingresó en mayuscula.
    aero = prompt("Linea aerea:").toLowerCase();
}else{
    alert("Welcome " + myName + " " + mySurName);
    alert("Select an Airline, the available options are American Airlines, Aerolíneas Argentinas, Delta Airlines and Virgin Atlantic");
    //Convierte en minúsculas dependiendo por si la persona lo ingresó en mayuscula.
    aero = prompt("Airline:").toLowerCase();
}

//Función que hacer que la primera letra de cada palabra sea Mayúscula para después buscar en el switch y no tener que poner múltiples cases.
function myFirstCapital(aero){
    //Convierte la primera letra en Mayúscula.
    let upperAero = aero.charAt(0).toUpperCase();

    //Inicializo vacía accAero ya que de no ser así me da Undefined.
    let lowerCaseAero, accAero = '';

    //Iteración letra por letra.
    for(let i=1; i <= aero.length; i++){

        //Si hay un espacio que la próxima letra sea en mayúscula.
        if(aero.charAt(i) == ' ') {
            lowerCaseAero = ' ' + aero.charAt(i + 1).toUpperCase();
            i++;
        }else{
            lowerCaseAero = aero.charAt(i);
        }
        accAero = accAero + lowerCaseAero;
    }

    //Aerolinea completa retornada de la función.
    let myAirline = upperAero + accAero;

    return myAirline;
}

//Llamo a la función con una variable en Scope Global.
let myAirline = myFirstCapital(aero);

//Busco la aerolinea.
switch (myAirline){
    case "American Airlines":
        abbr = "AA";
        break;
    case "Aerolineas Argentinas":
        abbr = "AR";
        break;
    case "Delta Airlines":
        abbr = "DL";
        break;
    case "Virgin Atlantic":
        abbr = "VS";
        break;
    default:
        abbr = "FlyBondi :(";
        break;
}


//Número de vuelo aleatorio y redondeo hacia abajo. Podría haber usado ceil().
let flightNumber = (Math.floor(Math.random() * 100) + 100);

//Agrego el 2 adelante para que tenga 4 dígitos empezando por ese número.
alert("Su vuelo es: " + abbr + 2 + flightNumber);

//Imprimo ticket en pantalla.
document.write('<h3>' + "Ticket de vuelo / Flight coupon" + '</h3>' + '<br>' + abbr + 2 + flightNumber);