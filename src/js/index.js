const path = require('path');

function checkPath(ext) {
    return path.extname(ext);
}

module.exports = checkPath;


// const filename = path.extname('/Users/Refsnes/readme.md'); //	Returns the file extension of a path
// console.log(filename);

// const ext = path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'); // Returns the relative path from one specified path to another specified path
// console.log(ext);s