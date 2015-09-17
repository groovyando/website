---
title: Agregando Constraints con Database Migration Plugin
author: sohjiro
date: 2012-10-16
url: /2012/10/16/agregando-constraints-con-database-migration-plugin/
categories:
  - Groovy
  - Plugins
---
<p style="text-align: left;">
  Cuántas veces nos hemos encontrado con la necesidad de hacer un cambio en una base de datos en producción o en QA pero es requerido mantener los datos que ya estaban ahí y dependiendo el caso es posible hacerlo desde la misma BD pero esto involucraría a algún DBA si es que tienen a alguno.
</p>

<p style="text-align: left;">
  Otra opción, y es a la que se refiere el post, es utilizando el plugin que ya trae Grails por defecto Database Migration Plugin.
</p>

<p style="text-align: left;">
  Bueno este plugin nos permite hacer varias cosas desde ver las diferencias entre un ambiente y otro por medio de un archivo groovy o un XML (o el de su preferencia)
</p>

<p style="text-align: left;">
  En este post vamos a ver un caso muy particular que es el de agregar un constraints.
</p>

<p style="text-align: left;">
  Primero crearemos una clase dominio:
</p>

[sourcecode language=&#8221;groovy&#8221;]  
class Usuario {  
String nombre  
String apellidoPaterno  
String apellidoMaterno  
static constraints = {}  
}  
[/sourcecode]

<p style="text-align: left;">
  Después crearemos un archivo que es el que contendrá una versión de la base de datos que estamos ocupando y a la que posteriormente modificaremos para esto nos basaremos en el GORM de Grails y haremos uso de la siguiente instrucción escrita en la consola:
</p>

[sourcecode language=&#8221;groovy&#8221;]  
dbm-generate-gorm-changelog changelog.groovy  
[/sourcecode]

<p style="text-align: left;">
  Esta instrucción nos creará un arhivo dentro de la carpeta migrations que se verá más o menos así:
</p>

[sourcecode language=&#8221;groovy&#8221;]  
databaseChangeLog = {  
changeSet(author: "SynergyJ (generated)", id: "1350262369082-1") {  
createTable(tableName: "usuario") {  
column(autoIncrement: "true", name: "id", type: "bigint") {  
constraints(nullable: "false", primaryKey: "true", primaryKeyName: "usuarioPK")  
}  
column(name: "version", type: "bigint") {  
constraints(nullable: "false")  
}  
column(name: "apellido_materno", type: "varchar(255)") {  
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
}  
[/sourcecode]

<p style="text-align: left;">
  Una vez que tenemos esto usaremos la siguiente instrucción para almacenar una versión en la base de datos dentro de las tablas de databasechangelog y databasechangeloglock
</p>

[sourcecode language=&#8221;groovy&#8221;]  
dbm-changelog-sync  
[/sourcecode]

<p style="text-align: left;">
  Para realizar un cambio debemos eliminar o comentar la siguiente línea que se encuentra en el DataSource.groovy:
</p>

[sourcecode language=&#8221;groovy&#8221;]  
dbCreate = "create-drop" // one of &#8216;create&#8217;, &#8216;create-drop&#8217;, &#8216;update&#8217;, &#8216;validate&#8217;, &#8221;  
[/sourcecode]

Una vez teniendo vamos primero a agregar un constraints a la clase desde la clase dominio:

[sourcecode language=&#8221;groovy&#8221;]  
class Usuario {  
String nombre  
String apellidoPaterno  
String apellidoMaterno

static constraints = {  
apellidoMaterno nullable:true  
}  
}  
[/sourcecode]

Una vez teniendo esto generamos la diferencia mediante la siguiente instrucción y lo agregamos al primer changelog.groovy

dbm-gorm-diff agregando-constraints-apmaterno.groovy –add

Lo siguiente nos generará un archivo que contendrá más o menos esto:

[sourcecode language=&#8221;groovy&#8221;]  
databaseChangeLog = {  
changeSet(author: "SynergyJ (generated)", id: "1350263501815-1") {  
dropNotNullConstraint(columnDataType: "varchar(255)", columnName: "apellido_materno", tableName: "usuario")  
}  
}  
[/sourcecode]

Y ahora hacemos que el changelog.groovy se ejecute al inicio de la aplicación para que cada vez que exista un cambio en la BD se ejecuten los cambios. Esto lo hacemos agregando las siguientes dos líneas en el archivo Config.groovy:

[sourcecode language=&#8221;groovy&#8221;]  
grails.plugin.databasemigration.updateOnStart = true  
grails.plugin.databasemigration.updateOnStartFileNames = [&#8216;changelog.groovy&#8217;]  
[/sourcecode]

<p style="text-align: left;">
  Y de esta manera cada vez que se ejecute la aplicación primero revisará si hay cambios y si hay los aplicará de manera transparente.
</p>