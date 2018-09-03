const validateMD = require('../index')

test('Validar que sea un archivo markdown', () => {
    expect(validateMD('README.md')).toBe('.md');
});