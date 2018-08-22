const checkPath = require('../index')

test('Validar que sea un archivo markdown', () => {
    expect(checkPath('/Users/README.md')).toBe('.md');
});