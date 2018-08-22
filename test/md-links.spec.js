const checkPath = require('../src/js/index')

test('Validar que sea un archivo markdown', () => {
    expect(checkPath('/Users/README.md')).toBe('.md');
});