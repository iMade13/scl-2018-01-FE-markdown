#!/usr/bin/env node

const program = require('commander');
const path = require('path');

'use strict';

//Command Line de la Libreria
program
    .version('0.1.0')
    .command('command md-links <path-to-file> [optional]')
    .description('Read all the links of a readme.md file')
    .option('--validate', '-v', '--stats')
    .action()

program.parse(process.argv); // Para realizar una nueva declaración.

//Función para retornar la extensión del archivo
function checkPath(ext) {
    return path.extname(ext);
}

module.exports = checkPath;


// const filename = path.extname('/Users/Refsnes/readme.md'); //	Returns the file extension of a path
// console.log(filename);

// const ext = path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'); // Returns the relative path from one specified path to another specified path
// console.log(ext);s