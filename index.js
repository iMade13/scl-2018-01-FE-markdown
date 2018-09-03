const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const Marked = require('marked');

//Chequeo si es un directorio ó un archivo y retorno la ruta absoluta en ambos casos
//Guardo el resultado en una variable 'newPath'
let checkPath = function(route) {
    let stats = fs.statSync(route)
    if (stats.isDirectory() === true) {
        routeAbsolute = path.resolve(route)
        return routeAbsolute
    } else {
        stats.isFile()
        routeAbsoluteFile = path.resolve(route)
        return routeAbsoluteFile;
    }
}

let newPath = checkPath('./src')
    //console.log(newPath)

//Validar que sea un archivo '.md' cuado la ruta dada sea un archivo
function validateMD() {
    const extension = path.extname(newPath)
    if (extension != '.md') {
        console.log('No es un archivo .md')
    } else {
        return true
    }
};

//Leer el directorio y comprobar si tiene un archivo .md
const readDirectory = () => {
    fs.readdir(newPath, (err, list) => {
        if (err) throw err;
        list.forEach((file) => {
            if (path.extname(file) != '.md') {
                return console.log('Archivo no encontrado')
            } else {
                return readFile()
            }
        });
    });
}


// //Función para leer la data del archivo readme.md 
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(newPath, 'utf-8', (err, data) => {
            if (err) reject(err)
            return resolve(data);
        });
    });
}
readFile()
    .then((data) => {
        let infoLine;
        let newData = data.split('\n');
        newData.forEach((text, line) => {
            const posLine = (newData.indexOf(text, line) + 1)
            infoLine = (`${line}`) //se me muestra mal las lineas
        })
        markdownLinkExtractor(data, infoLine)
    })
    .catch((error) => {
        console.error("Error > " + error);
    });

// //Extraer los links del archivo readme.md 
function markdownLinkExtractor(markdown, infoLine) {
    const links = [];

    const renderer = new Marked.Renderer();

    // Taken from https://github.com/markedjs/marked/issues/1279
    const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

    Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

    renderer.link = function(href, line, text) {
        links.push({
            href: href,
            text: text,
            line: infoLine,
        });
    };
    renderer.image = function(href, title, text) {
        // Remove image size at the end, e.g. ' =20%x50'
        href = href.replace(/ =\d*%?x\d*%?$/, '');
        links.push({
            href: href,
            text: text,
        });
    };
    Marked(markdown, { renderer: renderer });

    //return links;
    //console.log(links);
    validateLink(links)
}

//Validar los links
function validateLink(links) {
    return new Promise((resolve, reject) => {
        let res = [];
        //let linksTotal = links.length;
        links.forEach(e => {
            let url = e.href;
            res.push(
                fetch(url).then(data => {
                    e.status = data.status;
                    e.statusText = data.statusText;
                    return e;
                }).catch(error => {
                    console.error('ERROR > ' + error);
                    return e;
                }));
        });
        Promise.all(res)
            .then((values) => {
                resolve(values)
            })
            .catch((err) => { if (err) reject(err) });
    });
};

// function mdLinks(path, options) {
//     return new Promise((resolve, reject) => {
//         if (err) reject(err);
//         return resolve(info)
//     })
// }
// mdLinks(path, options)
//     .then()


module.exports = {
    validateMD
};