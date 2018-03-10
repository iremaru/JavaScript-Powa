console.log("Iniciando app.js");
const fs = require("fs"), _ = require("lodash"), notes = require("./notes.js"), yargs = require("yargs");

//==============================================================
// DEFINIENDO LAS SEÑAS (FLAGS) DE LOS COMANDOS
//==============================================================

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: "t"
};

const bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: "b"
};

//==============================================================
// DEFINIENDO COMANDOS DE ENTRADA
//==============================================================

const argv = yargs
    .command("add", "Add new note", {
        title: titleOptions,
        body: bodyOptions
    }, (argv) => {
        const nuevaNota = notes.addNote(argv.title, argv.body);
        console.log(nuevaNota === undefined ? "Ese título ya existe. Por favor, introduce otro." : `Nota "${nuevaNota.title}" guardada.`);
    })
    .command("list", "List all notes", {}, argv => {
        const list = notes.getAll();
    })
    .command("remove", "Remove a note by his title", {
        title: titleOptions
    }, argv => {
        const borradaNota = notes.fireNote(argv.title);
        console.log(borradaNota ? "Nota borrada con éxito." : `ERROR: No existe la nota "${argv.title}".`);
    })
    .command("read", "Read a new note", {
        title: titleOptions
    }, argv => {
        console.log(notes.readNote(argv.title));
    })
    .command(['removeAll', 'RA'], "Remove al notes", {}, argv => {
        notes.removeAll();
    })
    .help()
    .argv;