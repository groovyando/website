---
title: Grails y el SessionFactory
author: neodevelop
date: 2012-11-08
url: /2012/11/08/grails-y-el-sessionfactory/
categories:
  - Grails
  - Groovy
---
En esta ocasión escribiré de algunas cosas que he necesitado mientras estoy trabajando en construir una aplicación y usar el `sessionFactory`.

Algunas de ellas las he rescatado de mi timeline de twitter y otras las he visto examinando un poco la documentación y el código fuente.

A veces sólo deseamos habilitar el `sql` generado por `Hibernate` en ciertas partes de la aplicación y lo que hacemos es activar el atributo logSql desde `DataSource.groovy` o donde quiera que se tenga configurado. Pues bueno, podemos hacerlo de forma programática en `controllers`, servicios y/o `taglibs` con ayuda del `sessionFactory`.

```groovy
def sessionFactory // Inyección de dependencias  
//..
def method(){  
  //..
  sessionFactory.settings.sqlStatementLogger.logToStdout = true  
  //..
}  
```

En otras ocasiones he necesitado acceder al `sessionFactory` desde la `Grails console`, y ahí no hay como tal una inyección de dependencias, y si ponemos sólo la definición como en el fragmento pasado obtendremos `NullPointerException`.

Sin embargo, dentro de la consola contamos con la variable `ctx`, una referencia al `Application Context` de la aplicación. Por lo tanto, podemos hacer lo siguiente:

```groovy
// En la grails console  
def sessionFactory = ctx.sessionFactory  
//Haz lo que quieras con el sessionFactory  
```

Más cosas con los internals de `Grails` en otros post.