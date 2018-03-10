console.log("Iniciando notes.js");
const fs = require("fs");

//Función para leer el fichero notes-data.json y traer sus datos como objeto
const fetchNotes = () => {
    //Evitamos que la app arroje errores en caso de que aún no esté creado el documento json
    try {
        //Almacenamos el string que leemos en el fichero json y lo devolvemos convertido en objeto.
        const noteString = fs.readFileSync("notes-data.json");
        return JSON.parse(noteString);
    } catch (error) {
        return [];
    }
};

const saveNotes = (notes) => {
    //Grabamos en el fichero json la versión string del array que hemos recibido.
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));

};

const existNote = (title) => {
    const existencia = fetchNotes().filter(note => note.title === title);
    //Devuelve TRUE si existe la nota.
    return existencia.length !== 0;
};

const addNote = (title, body) => {
    //Definimos un array para contener todos los objetos note y lo llenamos con los que ya están en notes-data.json
    let notes = fetchNotes();
    //Definimos el objeto note.
    const note = {
        title,
        body
    };

    //Comprobamos que la nota NO exista:
    if (!existNote(title)) {
        //Colocamos la nota actual al final del array notes.
        notes.push(note);   
        saveNotes(notes);
        console.log("Nota guardada.");
        return note;    
    }

};

const getAll = () => {
    console.log(`Obteniendo todas las notas`);
    console.log(`...`);
    const list = fetchNotes().filter(note => note.title);
    const lista = list.map(element => element.title);
    console.log(lista);
    //return list.forEach(element => element.title);
};

const fireNote = (title) => {
    console.log(`Eliminando la nota: "${title}".`);
    console.log(`...`);
    //Vamos a por las notas:
    const notes = fetchNotes();
    // filter notes, removing the one with title of argument
    /* HACIÉNDOLO DE LA FORMA TRADICIONAL (CON FOREACH)
    notes.forEach( (element, index) => {
        if (element.title === title) {
            notes.splice(index, 1);
        }
    });*/
    //HACIÉNDOLO CON FILTER:
    const final = notes.filter((note) => note.title !== title);

    //Uniéndolo:
    //const notes = fetchNotes().filter((note) => note.title !== title);

    // save new notes array.
    saveNotes(final);

    //Devuelve un verdadero si ha eliminado una nota y un falso si no había nada que eliminar.
    return notes.length !== final.length;
};

const readNote = (title) => {
    console.log(`Leyendo la nota: "${title}".`);
    console.log("...");

    //const notaBuscada = existNote(title) ? JSON.stringify(fetchNotes().filter(note => note.title === title).pop().body) : `ERROR: No existe una nota con el título "${title}`;
    return existNote(title) ? JSON.stringify(fetchNotes().filter(note => note.title === title).pop().body) : `ERROR: No existe una nota con el título "${title}"`;

};

const removeAll = () => {
    saveNotes([]);
    console.log("Todas las notas han sido borradas.");
};

module.exports = {
    addNote,
    getAll,
    fireNote,
    readNote,
    removeAll
};