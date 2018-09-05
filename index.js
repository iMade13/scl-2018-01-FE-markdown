const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const Marked = require('marked');
const colors = require('colors')
const program = require('commander');

const route = process.argv[2]
const validar = process.argv[3]
let links = [];
let newPath;

//Chequeo si es un directorio ó un archivo y retorno la ruta absoluta en ambos casos
//Guardo el resultado en una variable 'newPath'
const checkPath = (route) => {
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

//Función para leer el directorio o los archivos
function run() {
    newPath = checkPath(route)
    let statsN = fs.statSync(newPath)
    if (statsN.isDirectory() === true) {
        readDirectory(newPath)
    } else {
        validateMD(newPath)
        readFile(newPath)
    }
}
run()

//function para ejecutar los comandos 
// const mdLinks = () => {
//     return new Promise((reject, resolve) => {
//         if (program.option === validar) {
//             run()
//             validateLink(links)
//         } else {
//             run()
//             return resolve(response)
//         }
//         return reject()
//     })
// }
// mdLinks()
//     .then((a) => {

//     })
//     .catch((error) => {
//         console.error("Error 0> " + error);
//     });

//Validar que sea un archivo '.md' cuado la ruta dada sea un archivo
function validateMD(newPath) {
    const extension = path.extname(newPath)
    if (extension != '.md') {
        console.log('No es un archivo .md')
    } else {
        return true
    }
};

//Leer el directorio y comprobar si tiene un archivo .md
function readDirectory(newPath) {
    fs.readdir(newPath, (err, list) => {
        if (err) throw err;
        list.forEach((file) => {
            if (path.extname(file) != '.md') {
                console.log('Archivo no encontrado')
            } else {
                validateMD(newPath)
                readFile(newPath)
            }
        });
    });
}


//Función para leer la data del archivo readme.md 
function readFile(newPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(newPath, 'utf-8', (err, data) => {
            if (err) reject(err)
                //console.log(data)
            return resolve(data);
        });
    });
}
readFile(newPath)
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
        console.error("Error 1> " + error);
    });

// //Extraer los links del archivo readme.md 
function markdownLinkExtractor(markdown, infoLine) {

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

    //return links

    entregarLinks(links)
    validateLink(links)
}

//Entregar los links impresos 
function entregarLinks(links) {
    links.forEach(element => {
        href = element.href
        text = element.text
        line = element.line
        let result = (`
    Link: ${href} 
    Text: ${text.blue}
    Line: ${line}`)
        return console.log(result)
    });
}

//Validar los links
function validateLink(links) {
    return new Promise((resolve, reject) => {
        let res = [];
        //let linksTotal = links.length;
        links.forEach(e => {
            let url = e.href;
            res.push(
                fetch(url)
                .then(data => {
                    e.status = data.status;
                    e.statusText = data.statusText;
                    return e;
                })
                .catch(error => {
                    console.error('ERROR > ' + error);
                    return e;
                }));
        });
        Promise.all(res)
            .then((values) => {
                values.forEach(e => {
                    href = e.href
                    text = e.text
                    line = e.line
                    status = e.status
                    statusText = e.statusText
                    let result2 =
                        (` 
    Link: ${href.blue}
    Texto: ${text.blue}
    Estado: ${status}
    Texto de estado: ${statusText.blue} 
`)
                    return console.log(result2)
                });
                resolve(values)
            })
            .catch(error => {
                console.error('ERROR > ' + error);
            });
    })
}


module.exports = {
    validateMD
};