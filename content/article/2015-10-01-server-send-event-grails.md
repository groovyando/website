---
title: Server Send Events (SSE's) con Grails
author: rodrigo_salado
date: 2015-10-01
url: /2015/10/01/server-send-event-grails/
featured_image: /2015/10/01/monkeys.jpg
featured_text: Comunicación
categories:
  - article  
tags:
  - protocolos
  - http-streaming
  - sse
  - server-send-event
  - grails
---

## Motivación

La principal motivación para mostrar como usar este protocolo con `Grails` es simplemente dar al lector otra opción para comunicarse entre el **servidor** y el **cliente**. No pretendo explicar detalles sobre el protocolo en sí, para ese propósito vea [Stream Updates with Server-Send Events][1].

---
Espero que el código por si solo se explique, pero si no conoces el protocolo debes leer [Stream Updates with Server-Send Events][1] antes de continuar.

El resultado final es un tipo reloj que muestra la fecha y hora cada segundo, lo padre es que el `stream` no se detiene *"nunca"* y si esta idea la aplicas a cosas más complejas puedes crear cosas muy padres, por ejemplo no tener que pintar un reporte de un solo golpe.

---
## Controlador

```groovy
package sse

import test.Utils

class TestController {
  def index() {}

  def cartero() {
    response.contentType = 'text/event-stream;charset=UTF-8'
    response.setHeader("Cache-Control", "no-cache")

    render Utils.format_event('titulo_event')
    render Utils.format_data('Fecha y hora:')

    while (true) {
      render Utils.format_event('fecha_hora_event')
      render Utils.format_data("""
        {
          "fecha": "${new Date().format('yyyy-MM-dd HH:mm:sss')}"
        }
        """)
      sleep(1000)
    }
  }
}
```
---
## Utils.groovy
```groovy
package test

class Utils {

  static String format_event(str) {
    "event: ${str.trim()}\n"
  }

  static String format_data(str) {
    def ln = '\n'
    def p = str.split(ln)*.trim()
      .findAll {
        it != '' }
      .collect {
        "data: ${it}"
      } << ln
    
    p.join('\n')
  }
}
```

---
## Vista
```javascript
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
</head>

<body>

    <strong id="titulo"></strong> <small id="tiempo"></small>

</body>
<script>
    var source = new EventSource("${createLink(controller: "Test", action: "cartero")}")

    source.addEventListener('titulo_event', function (e) {
        document.getElementById("titulo").innerHTML = e.data;
    }, false);

    source.addEventListener('fecha_hora_event', function (e) {
        var data = JSON.parse(e.data);
        document.getElementById("tiempo").innerHTML = data.fecha;
    }, false);

    source.onopen = function (e) {
        //...
    };
    source.onerror = function (e) {
        source.close();
        //Ver: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
        //console.log(event.target.readyState);
    };
</script>
</html>
```

---
## Resultado final

![Resultado](/2015/10/01/fecha_hora.png)

[1]: http://www.html5rocks.com/en/tutorials/eventsource/basics/