const yargs = require("yargs"), geocode = require("./modulos/geocode"), darksky = require("./modulos/darksky");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Adress to fetch weather for",
            string: true
        }
    })
    .help()
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(results, undefined, 4));
        console.log(results.address);
        darksky.darksky(results.latitud, results.longitude, (respuesta) => {
            if (respuesta === "Imposible determinar el tiempo."){
                console.log(respuesta);
            } else {
                const temperatura = respuesta.respuestaCorta;
                const sensacionTermC = respuesta.sensacionTermicaC;
                console.log(`La sensación térmica es de ${respuesta.sensacionTermicaC}`);    
            }
        });

    }

});