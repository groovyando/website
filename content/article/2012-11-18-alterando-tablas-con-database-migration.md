---
title: Alterando tablas con Database Migration
author: sohjiro
layout: post
date: 2012-11-18
url: /2012/11/18/alterando-tablas-con-database-migration/
categories:
  - Grails
  - Groovy
  - Plugins
---
Hace poco vimos la forma en la que se hacía un cambio en la base de datos ocupando el plugin de database migration. Este es el primer acercamiento a lo que se puede hacer con él.

En este post veremos un caso un poco más complejo, esto es, que pasa cuando ya tengo datos en la base y quiero realizar un cambio que borre una columna pero pasar esa información a otra columna en otra tabla, i.e. Tenemos la tabla Autor y la tabla Libro, la primera está compuesta de la siguiente manera:

[sourcecode language=&#8221;groovy&#8221;]  
class Autor {  
String nombre  
String apellidoPaterno  
static hasMany = [libros : Libro]  
}  
[/sourcecode]

Y la tabla Libro :

[sourcecode language=&#8221;groovy&#8221;]  
class Libro{  
String titulo  
Integer numeroDePaginas  
static belongsTo = [autor : Autor]  
}  
[/sourcecode]

Y como de momento esto nos sirve le generamos su changelog

[sourcecode language=&#8221;groovy&#8221;]  
dbm-generate-gorm-changelog changelog.groovy  
[/sourcecode]

Que nos genera lo siguiente :

[sourcecode language=&#8221;groovy&#8221;]  
databaseChangeLog = {  
changeSet(author: "sohjiro (generated)", id: "1352952268429-1") {  
createTable(tableName: "autor") {  
column(autoIncrement: "true", name: "id", type: "bigint") {  
constraints(nullable: "false", primaryKey: "true", primaryKeyName: "autorPK")  
}  
column(name: "version", type: "bigint") {  
constraints(nullable: "false")  
}  
column(name: "apellido_paterno", type: "varchar(255)") {  
constraints(nullable: "false")  
}  
column(name: "nombre", type: "varchar(255)") {  
constraints(nullable: "false")  
}  
}  
}  
changeSet(author: "sohjiro (generated)", id: "1352952268429-2") {  
createTable(tableName: "libro") {  
column(autoIncrement: "true", name: "id", type: "bigint") {  
constraints(nullable: "false", primaryKey: "true", primaryKeyName: "libroPK")  
}  
column(name: "version", type: "bigint") {  
constraints(nullable: "false")  
}  
column(name: "autor_id", type: "bigint") {  
constraints(nullable: "false")  
}  
column(name: "numero\_de\_paginas", type: "integer") {  
constraints(nullable: "false")  
}  
column(name: "titulo", type: "varchar(255)") {  
constraints(nullable: "false")  
}  
}  
}  
changeSet(author: "sohjiro (generated)", id: "1352952268429-3") {  
addForeignKeyConstraint(baseColumnNames: "autor_id", baseTableName: "libro", constraintName: "FK62323827AD9965E", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "id", referencedTableName: "autor", referencesUniqueColumn: "false")  
}  
changeSet(author: "sohjiro (generated)", id: "1352952268429-4") {  
createIndex(indexName: "FK62323827AD9965E", tableName: "libro") {  
column(name: "autor_id")  
}  
}  
}  
[/sourcecode]

Por cierto si ven el código generado primero crea el foreignKey y después el índice eso lo deben cambiar para que primero haga el createIndex ya que causará un error en la ejecución. Recuerden eliminar el dbCreate = &#8220;create-update&#8221; y hacer que el script se ejecute al iniciar la aplicación. Si trabajan con MySQL verifiquen sus tablassean del tipo InnoDB ya que de lo contrario causará un error al crear los ForeignKeys si es así o los eliminan del script o cambian el engine a InnoDB

Regresando al tema una vez que tenemos esto e insertamos datos y conforme  avanzamos en el desarrollo nos damos cuenta de que necesitamos separar las tablas porque requieren de una relación muchos a muchos es decir que la relación entre el Autor y el Libro se guarde en una tercera tabla llamada autor_libros. Para realizar esto necesitamos cambiar la relación en las clases de modo que quede de la siguiente manera

[sourcecode language=&#8221;groovy&#8221;]  
class Autor {  
String nombre  
String apellidoPaterno  
static hasMany = [libros : Libro]  
}  
[/sourcecode]

Y la clase Libro

[sourcecode language=&#8221;groovy&#8221;]  
class Libro{  
String titulo  
Integer numeroDePaginas  
static belongsTo = Autor  
static hasMany = [autores : Autor]  
}  
[/sourcecode]

Esto creará una tabla intermedia llamada autor_libros que contendrá las llaves primarias de ambas tablas ejecutamos la sentencia que nos dará la comparación entre el GORM y la BD de la siguiente manera

[sourcecode language=&#8221;groovy&#8221;]  
dbm-gorm-diff cambiando-relacion-autor-libro.groovy  
[/sourcecode]

Y nos dará el siguiente resultado

[sourcecode language=&#8221;groovy&#8221;]  
databaseChangeLog = {  
changeSet(author: "sohjiro (generated)", id: "1352954334486-1") {  
createTable(tableName: "autor_libros") {  
column(name: "autor_id", type: "bigint") {  
constraints(nullable: "false")  
}  
column(name: "libro_id", type: "bigint") {  
constraints(nullable: "false")  
}  
}  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-2") {  
addPrimaryKey(columnNames: "autor\_id, libro\_id", tableName: "autor_libros")  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-3") {  
dropForeignKeyConstraint(baseTableName: "libro", baseTableSchemaName: "bookReviews", constraintName: "FK62323827AD9965E")  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-4") {  
addForeignKeyConstraint(baseColumnNames: "autor\_id", baseTableName: "autor\_libros", constraintName: "FK93C0044D7AD9965E", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "id", referencedTableName: "autor", referencesUniqueColumn: "false")  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-5") {  
addForeignKeyConstraint(baseColumnNames: "libro\_id", baseTableName: "autor\_libros", constraintName: "FK93C0044D58C2B5FE", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "id", referencedTableName: "libro", referencesUniqueColumn: "false")  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-6") {  
createIndex(indexName: "FK93C0044D58C2B5FE", tableName: "autor_libros") {  
column(name: "libro_id")  
}  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-7") {  
createIndex(indexName: "FK93C0044D7AD9965E", tableName: "autor_libros") {  
column(name: "autor_id")  
}  
}  
changeSet(author: "sohjiro (generated)", id: "1352954334486-8") {  
dropColumn(columnName: "autor_id", tableName: "libro")  
}  
}  
[/sourcecode]

Leyendo el script nos damos cuenta de que entre las líneas se encuentra un DROP que hace referencia a la tabla libro en específico a la columna autor\_id , esto quiere decir que al ejecutar el script la columna autor\_id será eliminada junto con todos los registros ahí guardados&#8230; ESPERA un momento esto no es lo que quería ahora ¿como hago para que los datos que tenía ahí no sean eliminados y las relaciones se mantengan?

> **No se olviden de cambiar los create index antes de hacer el addForeingKey y en este caso después del addPrimaryKey de la tabla autor_libros y de paso el dropForeingKey antes del dropColumn**

Bueno una forma es hacerla manualmente ( <img src="http://grails.org.mx/wp-includes/images/smilies/icon_razz.gif" alt=":P" class="wp-smiley" /> jajajajajaja ) en este caso tal vez se pueda hacer pero ¿y que pasa cuando hay más cambios así? ¿Todos los tenemos que hacer manualmente? Pues no, este plugin nos permite ejecutar consultas de todo tipo para hacer la migración un poco menos dolorosa.

Para realizar estos cambios ubicamos en el changelog el lugar en donde se crea la tabla intermedia y escribimos un sql tal como se muestra a continuación

[sourcecode language=&#8221;groovy&#8221;]  
changeSet(author: "sohjiro (generated)", id: "1352954334486-1") {  
createTable(tableName: "autor_libros") {  
column(name: "autor_id", type: "bigint") {  
constraints(nullable: "false")  
}  
column(name: "libro_id", type: "bigint") {  
constraints(nullable: "false")  
}  
}  
sql("insert into autor\_libros (libro\_id, autor\_id) select id, autor\_id from libro")  
}  
[/sourcecode]

Ahora sólo queda agregarlo al changelog principal hay dos formas que lo escribamos nosotros al final del archivo changlog.groovy de la siguiente manera o que al ejecutar el dbm-gorm-diff después del nombre del archivo pongamos &#8211;add

[sourcecode language=&#8221;groovy&#8221;]  
include file: &#8216;cambiando-relacion-autor-libro.groovy&#8217;  
[/sourcecode]

Ahora solamente levantamos la aplicación o sino la quieres levantar ejecuta lo siguiente desde la consola de grails

[sourcecode language=&#8221;groovy&#8221;]  
dbm-update  
[/sourcecode]

Y de esta manera todo lo que tengamos en esa tabla pasará a ser ejecutado, lo que tenga que ser eliminado será eliminado pero no sin antes hacer los movimientos pertinentes.

Espero les sirva este pequeño POST y cualquier duda o comentario acerca del mismo será bien recibida.

Hasta la próxima