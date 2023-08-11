const airports = ["Buenos Aires (EZE)", "La Paz (LPB)", "Brasilia (BSB)", "Santiago (AMB)", "Bogotá (BOG)", "Quito (UIO)", "Georgetown (GEO)", "Asunción (ASU)", "Lima (LIM)", "Zanderij (PBM)", "Montevideo (MVD)", "Caracas (CCS)"];

let flightsData = [];
for(i = 1; i <= 100; i++) {
    const sourceAirport = Math.floor(Math.random() * airports.length);
    const destinationAirport = Math.floor(Math.random() * airports.length);
    myFlight = { source: airports[sourceAirport], destination: airports[destinationAirport] }
    flightsData.push(myFlight);
}