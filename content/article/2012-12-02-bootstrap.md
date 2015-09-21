---
title: Bootstrap
author: sohjiro
date: 2012-12-02
url: /2012/12/02/bootstrap/
categories:
  - Groovy
---
Cuando creamos una aplicación con Grails ésta nos crea varios archivos y entre ellos nos crea uno en específico llamado `BootStrap.groovy`. Este archivo en particular nos sirve para ejecutar acciones al inicio de nuestra aplicación o antes de terminar.

Supongamos que al iniciar nuestra aplicación queremos que cargue a un determinado grupo de usuarios de prueba para usarlos con Spring Security o que queremos cargar un catálogo de categoría de libros. Para realizar eso ubicamos en el archivo el `closure` de `init` y ahí procedemos a hacer lo siguiente :

```groovy
class BootStrap {
  def init = { servletContext
    new Categoria( categoria : "Programación" ).save()
    new Categoria( categoria : "Historia" ).save()
  }

  def destroy = {

  }
}
```

Incluso en esta parte podemos hacer uso de los `environments` por ejemplo si queremos que unos usuarios se carguen al inicio de la aplicación pero sólo para el ambiente de desarrollo podemos hacer lo siguiente :

```groovy
class BootStrap {
  def init = { servletContext ->
    switch(Environment.current) {
      case Environment.DEVELOPMENT :
        new Usuario( username : "usuario", password : "12345678" ).save()
        new Usuario( username : "usuario2", password : "12345678" ).save()
        break
      case Environment.TEST :
        break
      case Environment.PRODUCTION :
        break
    }
  }

  def destroy = {

  }
}
```

Bueno con esto terminaremos esto nos vemos en el siguiente post.