/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

//Creamos el controlador de datos, con los tipos de objetos que vamos a manejar.
const dataController = (function(){

    // ==========================================================================
    //       CONSTRUCCIÓN ESTRUCTURAS DE DATOS
    // ==========================================================================

    //Definimos la SUPERCLASE "TownElement" con las propiedades comunes a todos los elementos de la población.
    class TownElement {
        constructor(nombre, fechaFundacional){
            this.nombre = nombre;
            this.fechaFundacional = fechaFundacional;
    
        }
    }

    //Definimos la subclase "Park", extensión de "TownElement"
    class Parque extends TownElement {
        constructor(nombre, fechaFundacional, area, numeroArboles){
            super(nombre, fechaFundacional);
            this.area = area;
            this.numeroArboles = numeroArboles;
            this.densidadArborea = this.numeroArboles/this.area;
        }
    }
    
    //Definimos la subclase "Street", extensión de "TownElement"
    class Via extends TownElement {
        constructor(nombre, fechaFundacional, largo, tamanio = "normal"){
            super(nombre, fechaFundacional);
            this.largo = largo;
            this.tamanio = tamanio;
        }
    }

    //ALMACÉN
    const almacenDeDatos = {
        parques: {
            edadPromedio: 0,
            masArbolado: {},
            listado: []},
        vias: {
            largoTotal: 0,
            largoPromedio: 0,
            listado: []
        }
    };


    // ==========================================================================
    //       CREACION DE DATOS
    // ==========================================================================

    const parque_ParqueVerde = new Parque("Parque Verde", 1837, 50, 134);
    const parque_ParqueNacional = new Parque("Parque Nacional", 1917, 136, 1847);
    const parque_Robledo = new Parque("Robledo", 1541, 74, 57);

    const via_AvenidaOceano = new Via("Avenida Oceano", 1541, 0.45, "grande");
    const via_Semperde = new Via("Semperde", 1803, 0.20, "pequeña");
    const via_Traviesa = new Via("Traviesa", 1830, 0.10);
    const via_AvenidaOcaso = new Via("Avenida Ocaso", 1920, 0.54, "enorme");

    // ==========================================================================
    //       POBLAMIENTO DE LAS ESTRUCTURAS DE DATOS
    // ==========================================================================

    almacenDeDatos.parques.listado.push(parque_ParqueVerde);
    almacenDeDatos.parques.listado.push(parque_ParqueNacional);
    almacenDeDatos.parques.listado.push(parque_Robledo);

    const parques_calcularEdadPromedio = () => {
        // CÁLCULO EDAD PROMEDIO DE LOS PARQUES
        const fechaActual = new Date().getFullYear();
        let sumEdades = 0;
        almacenDeDatos.parques.listado.forEach(element => sumEdades += (fechaActual - element.fechaFundacional));
        almacenDeDatos.parques.edadPromedio = sumEdades/almacenDeDatos.parques.listado.length;
    };

    const parques_hallarMasGrande = () => {
        let conMasArboles = almacenDeDatos.parques.listado[0];

        almacenDeDatos.parques.listado.forEach(element => {
            if (element.numeroArboles > conMasArboles.numeroArboles) {conMasArboles = element;}
        });

        almacenDeDatos.parques.masArbolado = conMasArboles;
    };

    almacenDeDatos.vias.listado.push(via_AvenidaOceano);
    almacenDeDatos.vias.listado.push(via_Semperde);
    almacenDeDatos.vias.listado.push(via_Traviesa);
    almacenDeDatos.vias.listado.push(via_AvenidaOcaso);

    const vias_calcularLargoTotalyPromedio = () => {
        let largoTotal = 0;

        almacenDeDatos.vias.listado.forEach((element) => {
            largoTotal += element.largo;
        });

        almacenDeDatos.vias.largoTotal = largoTotal;
        almacenDeDatos.vias.largoPromedio = largoTotal / almacenDeDatos.vias.listado.length;
    };

    return {

        parques_calcularEdadPromedio,

        parques_hallarMasGrande,

        vias_calcularLargoTotalyPromedio,

        extraerDatos: viasOparques => viasOparques === "parques" ? almacenDeDatos.parques : almacenDeDatos.vias,
    };

})();

//Creamos el controlador universal, con los eventos que detonarán los cambios y las órdenes que modificarán los datos o la interfaz.
const director = (function(data){

    const mostrarInformeAnual = () => {
        data.parques_calcularEdadPromedio();
        data.parques_hallarMasGrande();
        data.vias_calcularLargoTotalyPromedio();

        const vias = data.extraerDatos("vias");
        const parques = data.extraerDatos("parques");

        let infoParqIndivid = ``;
        parques.listado.forEach( (element) => {
            infoParqIndivid += `
            ${element.nombre} tiene una densidad de ${element.densidadArborea} árboles por m2.`;
        });

        let infoViaIndivid = ``;
        vias.listado.forEach( element => {
            infoViaIndivid += `
            ${element.nombre}, construida en ${element.fechaFundacional}, es una calle ${element.tamanio}.`;
        });

        const informeParques = `----------PARK REPORT----------
        Nuestros ${parques.listado.length} parques tienen una edad promedio de ${parques.edadPromedio} años.
        ${infoParqIndivid}

        ${parques.masArbolado.nombre} es el parque más grande, con ${parques.masArbolado.numeroArboles} árboles.`;

        const informeVias = `----------STREET REPORT----------
        Nuestras ${vias.listado.length} vias tienen un largo total de ${vias.largoTotal} km, con un promedio de ${vias.largoPromedio} km.
        ${infoViaIndivid}

        `;

        console.log(informeParques);
        console.log(informeVias);
        
    };

    // =========================================================================
    //      PRUEBAS
    // =========================================================================

    const fechaActual = new Date().getFullYear();

    return {
        inicializacion: function(){
            console.log("¡Inicializando!");
            console.log(`El año actual es ${fechaActual}`);
            mostrarInformeAnual();
        },

        mostrarInformeAnual
    };

})(dataController);

//Inicializamos la app
director.inicializacion();