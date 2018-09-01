# Markdown Links

## Descripción
Librería para extraer los links de un archivo con formato `Markdown` y verificar que los links sean válidos. Posteriormente se podrán consultar las estádisticas de los links únicos y rotos.

Se abordaron los issues y milestones para la implementtación de la librería. 

## Instalación de Librería
---
~~~
$ npm install imade13-mdlinks
~~~

## Modo de uso
El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente manera a través de la terminal:

md-links <path-to-file> [options]
---
~~~
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
~~~

### Options
*  `--version`

Te muestra la version del paquete.

~~~
$ md-links --version
1.0.0
~~~

*  `--help`

Ayuda para los comandos.
~~~

$ md-links --help
 Usage: cli [options] <path>

  Options:
    -V, --version   output the version number
    -h, --help      output usage information
    -v, --validate  HTTP request to find out if the link works or not
   
~~~

*  `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

~~~
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
~~~

* `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links.

~~~
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
~~~

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)



