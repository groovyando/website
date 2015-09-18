# Groovyando

Este es el código fuente del sitio de [Groovyando][4]. Antes usábamos Wordpress pero se convirtió en un problema cuando recibimos muchos ataques y mantener un CMS fue un problema que no queríamos tener.

Ahora el sitio de construye con [Hugo][1] que realmente necesita archivos [Markdown][3] y la definición de plantillas para generar un sitio estático.

También empezamos a usar [Disqus][6] para los comentarios.

__Si deseas participar, has _fork_, agrega tu entrada y manda un _Pull Request_.__

## Como correr el sitio en tu computadora

1. Descarga los fuentes del proyecto
2. Instala [Hugo][1]
  - Asegurate que la versión de Hugo sea por lo menos la _0.14_
3. En la raiz del proyecto en una terminal ejecuta:

    ```bash
    rm -rf public && hugo server --watch --verbose 
    ```
    
    Tambien puedes ejecutar el siguiente _shell script_:
    
    ```bash
    ./run.sh
    ```
4. Navega [aquí][2]
5. ¡Disfruta!


## Como crear una nueva entrada
 
 1. Tener instalado [Hugo][1]
 2. En la raiz del proyecto en una terminal ejecuta:
 
 
    ```bash
    hugo new article/el-nombre-de-tu-nueva-entrada.md
    ```
    
    > Es importante que el archivo termine con la extensión __.md__
    
 3. El archivo de tu entrada se localizara en:

   ```
   ./content/article/el-nombre-de-tu-nueva-entrada.md
   ```    
   
   Ahora  puedes editarlo usando [Markdown][3]

 4. Ejecutar el sitio, revisa la sección anterior. Ya debería estar disponible tu nueva entrada.

## Reglas para crear nuevas entradas

- Las entradas deben crearse dentro del directorio  _./content/article/_
- El nombre del archivo debe seguir la siguiente estructura:

   ```
   {año}-{mes}-{dia}-{nombre}.md
   ```    
   
   Ejemplos:

   ```
   2015-04-11-mi-nueva-entrada.md
   ```   
   
   > el nombre del archivo se sugiere que sea breve, pero que indique claramente sobre que se trata.

- Se recomienda que el nombre del archivo no incluya caracteres que no sean _URL encoded_
- Cualquier entrada sobre Groovy y su ecosistema es bienvenida, anímate y mándanos tu pull request !!!

### Front matter

Un _feature_ muy interesante de Hugo es el [_Front Matter_][5], Hugo agrega al inicio del archivo del _post_ algo parecido a lo siguiente:


  ```yaml
  ---
  categories:
    - category
  date: 2015-04-12T14:02:40-05:00
  tags:
    - tag
  title: mi-post
  ---
  ```
  
Se debe agregar la información sobre el _post_ lo más detallada posible. Un ejemplo de ello:

  ```yaml
  ---
  title: 1er BarCamp de Testing en la Ciudad de México
  author: cggg88
  date: 2013-11-14
  url: /2013/11/14/1er-barcamp-de-testing-en-la-ciudad-de-mexico/
  categories:
    - Evento
  tags:
    - barcamp
    - testing
  ---
  ```

#### Autoría

Es muy importante saber quien es el autor del _post_, es por ello es importante que se agregue la información en el campo _author_ del _front matter_. Tenemos pendiente #5 una página mejor para la información del autor.


#### URL

En el _front matter_ se debe poner la información de la URL usando el siguiente patrón:

  ```
  url: {año}/{mes}/{día}/{slug}
  ```

  Ejemplo

  ```
  url: /2013/11/14/1er-barcamp-de-testing-en-la-ciudad-de-mexico/
  ```
  
 [1]: http://gohugo.io
 [2]: http://localhost:1313/
 [3]: http://daringfireball.net/projects/markdown/
 [4]: http://groovyando.org
 [5]: http://gohugo.io/content/front-matter/
 [6]: https://disqus.com/
 
