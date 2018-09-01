const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const Marked = require('marked');

let route = './src'
let fileRoute;
let filePath = './src/prueba/readme.md'


//Validar que sea un archivo .md
function validateMD(route) {
    let extension = path.extname(route)
    if (extension != '.md') {
        return console.log('No es un archivo .md')
    } else {
        readFile(filePath)
    }
};

//Leer el directorio y convertirla en una ruta absoluta
const readDirectory = (route) => {
    return new Promise((resolve, reject) => {
        fs.readdir(route, (err, files) => {
            if (err) {
                return reject(err)
            }
            return resolve(files)
        })
    })

}
readDirectory(route)
    .then((dirFiles) => {
        const filePromises = dirFiles.forEach((file) => {
            fileRoute = path.resolve(route, file);
            console.log(fileRoute)
        });
        //return Promise.all(filePromises).then((filesData) => { console.log(filesData) })
    })
    .catch((err) => {
        console.error("Error > " + err);
    })

//Función para leer la data del archivo readme.md 
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                return reject(error);
            }
            return resolve(data);
        });
    });
};
readFile(filePath)
    .then((data) => {
        markdownLinkExtractor(data)
    })
    .catch((error) => {
        console.error("Error > " + error);
    });


//Extraer los links del archivo readme.md 
function markdownLinkExtractor(markdown) {
    const links = [];
    const renderer = new Marked.Renderer();

    renderer.link = function(href, title, text) {
        links.push({
            href: href,
            text: text,
            title: title,
        });
    };

    Marked(markdown, { renderer: renderer });
}