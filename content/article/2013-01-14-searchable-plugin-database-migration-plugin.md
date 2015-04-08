---
title: Searchable plugin + DataBase Migration plugin
author: sohjiro
layout: post
date: 2013-01-14
url: /2013/01/14/searchable-plugin-database-migration-plugin/
categories:
  - Groovy
---
Bueno retomando un poco lo que hemos venido ocupando en post anteriores con el plugin de Searchable y de Database migration por separado funcionan perfectamente bien pero ¿que es lo que pasa cuando uno quiere incorporar los dos plugins en el mismo proyecto (algo que es relativamente común)  Y después agregar un campo a una tabla existente?

Por ejemplo supongamos que tenemos la siguiente estructura de clases de dominio:

[sourcecode language=&#8221;groovy&#8221;]  
class Autor {  
String nombre  
String apellidoPaterno

static hasMany = [libros : Libro]

static constraints = {}  
}

class Libro {  
String nombre  
String editorial

static belongsTo = [autor : Autor]

static constraints = {}  
}  
[/sourcecode]

Ahora añadimos un par de datos, por ejemplo :

Stephen King, Doubleday The Shinning  
Paolini Christopher, Alfred A. Knopf Eragon

Una vez realizada esta acción procedemos a añadir el plugin de searchable y le añadimos a nuestros dominios lo siguiente para que el plugin haga su trabajo :

[sourcecode language=&#8221;groovy&#8221;]  
class Autor {  
static searchable = true  
// Más Código  
}

class Libro {  
static searchable = true  
// Más Código  
}  
[/sourcecode]

Ahora levantamos la aplicación y accedemos a la siguiente URL

[sourcecode language=&#8221;html&#8221;]

http://localhost:8080/EL-NOMBRE-DE-TU-APP/searchable

[/sourcecode]

Una vez en ese link buscamos alguna palabra y todo lo relacionado a ello nos aparecerá ahí.

Hasta este momento todo va &#8220;viento en popa&#8221; pero de momento nos damos cuenta que al Autor le hace falta la nacionalidad y procedemos a añadirla:

[sourcecode language=&#8221;html&#8221;]  
class Autor {  
// Código  
String nacionalidad  
//Más código  
}  
[/sourcecode]

Procedemos a reinicar la app para que tome los cambios y esperamos a que la aplicación levante&#8230;  
Después de unos momentos de correr la app de nuevo nos aparece un mensaje de error

[sourcecode language=&#8221;java&#8221;]  
ERROR org.hibernate.util.JDBCExceptionReporter:234 Unknown column &#8216;this_.nacionalidad&#8217; in &#8216;field list&#8217;  
ERROR org.compass.gps.device.hibernate.indexer.ScrollableHibernateIndexEntitiesIndexer:213 {hibernate}: Failed to index the database  
[/sourcecode]

Hasta este punto la BD tiene razón ya que no hemos realizado un dbm-update de los cambios realizados en BD así que procedemos a realizarlo. Para esto primero generamos la diferencia y después el update

[sourcecode language=&#8221;groovy&#8221;]  
dbm-gorm-diff anadiendo-columna-nacionalidad.groovy &#8211;add  
[/sourcecode]

Pero para nuestra mala suerte sigue saliendo el mismo error de que no conoce la columna &#8220;nacionalidad&#8221;.

Bueno el problema de este error surge de que primero se ejecuta el &#8220;indexado&#8221; del plugin de searchable antes de ejecutar el dbm-update o el dbm-gorm-diff  
Para corregir este pequeño problema tenemos de dos :

1.- Añadir el dbCreate en el dataSource para que ejecute el update (cosa que no es recomendable ya que de ello se encarga el plugin de database migration)

2.- Habilitar el indexado de datos bajo demanda (Elegiremos esta opción)

Bueno para ello primero debemos añadir la siguiente configuración en nuestro Config.groovy para deshabilitar el indexado al inicio

[sourcecode language=&#8221;groovy&#8221;]  
searchable {  
bulkIndexOnStartup = false  
}  
[/sourcecode]

Hasta este punto ya podemos ejecutar la aplicación y hacer lo que veniamos haciendo vamos a realizar el gorm-diff que nos resultó fallido en un paso anterior pero primero realizamos un ** grails clean **

[sourcecode language=&#8221;groovy&#8221;]  
dbm-gorm-diff anadiendo-columna-nacionalidad.groovy &#8211;add  
[/sourcecode]

Como veremos ya se puede ejecutar y si lanzamos el dbm-update o levantamos la aplicación veremos el campo nacionalidad en el scaffold del Autor.

Ahora por no dejar vamos a eliminar la carpeta **searchable-index** que se encuentra en **~/.grails/projects/NOMBRE-DE-TU-APP/** para comprobar que en realidad esté haciendo lo que debería hacer. Una vez que reinicio la app vamos al apartado de searchable y buscamos por alguno de los datos que tengamos en nuestra BD.

Al realizar esto veremos que no nos regresa nada, se preguntarán ¿porque si ya funcionaba? Esto se debe a que el indexado que antes se ejecutaba al inicio ya ahora no se ejecuta y hay que lanzarlo manualmente y para realizar esto hacemos uso del Bootstrap para ello le inyectamos el servicio de searchable y ejecutamos el método index de la siguiente manera:

[sourcecode language=&#8221;groovy&#8221;]  
class BootStrap {  
def searchableService

def init = { servletContext ->  
searchableService.index()  
}

def destroy = {}  
}  
[/sourcecode]

<del datetime="2012-12-23T02:37:25+00:00">Bueno si han seguido hasta este punto los Post escritos en este lugar se deben de acordar del viejo amigo Bootstrap y que es lo que hace, sino les recomiendo que les den una leida a la mayor parte de ellos :P.</del>

Una vez hecho esto si regresamos al apartado de búsqueda y realizamos alguna veremos resultados en nuestra app.

De esta manera hacemos la integración de dos plugins bastante interesantes y que nos pueden ayudar en nuestras aplicaciones. Espero este post les evite algunos dolores de cabeza.

Felices fiestas y nos veremos en otro post.  
Saludos