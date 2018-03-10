//The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
const fs = require("fs");
//The os module provides a number of operating system-related utility methods. It can be accessed using:
const os = require("os");

const user = os.userInfo();

//NOTA: appendFile crea un nuevo fichero si este no existe y escribe en él el segundo argumento. En caso de existir, sólo escribe el argumento sin sobreescribir.
fs.appendFile("nota.txt", `Hola, ${user.username}. ` , function (err) {
    if (err) {
        console.log("¡ERROR!: Incapaz de escribir en el archivo.");
    }
});