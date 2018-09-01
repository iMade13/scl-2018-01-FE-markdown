const validateMD = require('../md-links')

test('Validar que sea un archivo markdown', () => {
    expect(validateMD('/Users/README.md')).toBe('.md');
});