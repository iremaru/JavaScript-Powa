const $ = id => document.getElementById(id);

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
    let almacenDeDatos = {
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

    //Creamos el objeto "medidas" con las medidas de tamaño posibles.
    const medidas = {
        tamanioCalle: {
            tini: "tini",
            small: "small",
            normal: "normal",
            big: "big",
            huge: "huge"
            }
    };

    // ==========================================================================
    //       INTERACTUAR CON EL ALMACENAJE LOCAL
    // ==========================================================================

    const almacenarDatos = () => {
        localStorage.setItem("datos", JSON.stringify(almacenDeDatos));
        console.log("Jasón está en el nido.");
    };

    const recogerYactualizarDatosAlmacenados = () => {
        almacenDeDatos = JSON.parse(localStorage.getItem("datos"));
        return almacenDeDatos;
    };

    return {

        nuevoParque: (nombre, fechaFundacional, area, numeroArboles) => {new Parque(nombre, fechaFundacional, area, numeroArboles);},

        nuevaVia: function(){

        },

        parques_calcularEdadPromedio,

        parques_hallarMasGrande,

        vias_calcularLargoTotalyPromedio,

        extraerDatos: viasOparques => viasOparques === "parques" ? almacenDeDatos.parques : almacenDeDatos.vias,

        almacenarDatos,
        recogerYactualizarDatosAlmacenados
    };

})();

//Creamos el controlador de la interfaz, con los accesos a la misma y las vistas que se van a efectuar.
const UIController = (function(){
    const ids = {
        subelemento: "form_subelemento",
        elementoNombre: "elemento_nombre",
        elementoTipo: "elemento_tipo",
        elementoFundacion: "elemento_fundacion",
        parqueArboles: "parque_arboles",
        parqueArea: "parque_area",
        calleLargo: "calle_largo",
        calleTamanio: "calle_tamanio",
        btn_actualizar: "btn_actualizar"
    };

    //Mostrar la segunda parte del formulario según se elija el tipo calle o el tipo parque.
    function mostrarPorTipo(tipo){
        if (tipo === "parque") {
            $(ids.subelemento).innerHTML = '<div id="elemento_parque"><label for="parque_arboles">Cantidad de árboles</label><input type="number" name="parque_arboles" id="parque_arboles" min="1" required><br><label for="parque_area">Área</label><input type="number" id="parque_area" min="1" required>m3<br></div><br><input type="submit" value="Actualizar" id="btn_actualizar">';

        } else if (tipo === "calle") {
            $(ids.subelemento).innerHTML = '<div id="elemento_calle"><label for="calle_largo">Largo en metros:</label><input type="number" name="calle_largo" id="calle_largo" min="20" required>m.<br><label for="cale_tamanio">Tamaño de la calle</label><select name="calle_tamanio" id="calle_tamanio"><option value="tiny">Minuscula</option><option value="small">Pequeña</option><option value="normal" selected>Normal</option><option value="big">Grande</option><option value="huge">Enorme</option></select><br><input type="submit" value="Actualizar" id="btn_actualizar"></div>';
        }
    }

    return {
        getIds: () => ids,

        mostrarSubelemento: mostrarPorTipo
    };
})();

//Creamos el controlador universal, con los eventos que detonarán los cambios y las órdenes que modificarán los datos o la interfaz.
const director = (function(data, UI){
    /*Las capacidades de la app serán:
    Almacenar los datos que ingrese el usuario.
    Mostrar un informe con en la interfaz.
    */

    function storageDisponible(type){

        try {
            const storage = window[type],
                x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            console.log("Campo libre, chicos. ¡Podemos poblar este almacén!");
            return true;

        } catch (error) {
            console.log("¡Oh, no! No hay almacenamiento por aquí.");
            return error instanceof DOMException && (
                error.code === 22 ||
                error.code === 1014 ||
                error.name === "QuotaExceededError" ||
                error.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                storage.length !== 0;
        }

        /*
        if (storageAvailable('localStorage')) {
            console.log("Campo libre, chicos. ¡Podemos poblar este almacén!");
        } else {
            console.log("¡Oh, no! No hay almacenamiento por aquí.");
        }*/
    }

    function escuchasDeEventos(){
        const id = UI.getIds();

        //EVENTO --> Al seleccionar un tipo de elemento:
        $(id.elementoTipo).addEventListener("change", ev => {
            UI.mostrarSubelemento(ev.target.value);

            console.log("Escucha para comprobar si se cambia el tipo de elemento OPERATIVA");
        });

        console.log("Se han colocado las escuchas para los eventos");
    }

    //crear un nuevo elemento, del tipo parque o del tipo via, y actualizar el dataController y la interfaz.
    function crearElemento(){
    }
    
    //acceder a un elemento ya creado y cambiar sus propiedades, actualizando la Interfaz y el data.
    function modificarElemento(){}

    //acceder a un elemento ya creado y eliminarlo de la Interfaz y del dataController.
    function eliminarElemento(){}

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
            const pruebaAlmacenamiento = storageDisponible("localStorage");
            
            console.log(pruebaAlmacenamiento);
            console.log(`El año actual es ${fechaActual}`);
            escuchasDeEventos();
            mostrarInformeAnual();

            if (storageDisponible("localStorage")) {
                data.almacenarDatos();
                console.log(data.recogerYactualizarDatosAlmacenados());
            }
        },

        mostrarInformeAnual
    };

})(dataController, UIController);

//Inicializamos la app
director.inicializacion();