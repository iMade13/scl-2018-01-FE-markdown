#!/usr/bin/env node

const program = require('commander');
const mdLinks = require('./index');

'use strict';

//Command Line de la Libreria
program
    .version('0.1.0')
    .command('<path-to-file> [option]')
    .description('Read all the links of a readme.md file')
    .option('-v, --validate', 'Validate that the links are ok or fail')
    //.option('-s, --stats', 'Stats about all links searching')
    .action()
program.parse(process.argv);


// Para realizar una nueva declaración.