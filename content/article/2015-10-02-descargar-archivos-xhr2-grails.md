---
title: Descargar archivos usando XMLHttpRequest2 (XHR2) con Grails
author: rodrigo_salado
date: 2015-10-02
url: /2015/10/02/descargar-archivos-xhr2-grails/
featured_image: http://img354.imageshack.us/img354/676/apems2604ud8.jpg
featured_text: Comunicación
categories:
  - article  
tags:
  - protocolos
  - http-streaming
  - xhr2
  - xml-http-request-2
  - grails
---

## Motivación
Mostrar como descargar una archivo con `Grails` usando [XHR2][1] y una implementación del `saveAs()` [FileSaver.js][2] de HTML5.

---
## Antes de continuar
Conviene mucho que leas [Recuperación de archivos - Nuevos trucos para XMLHttpRequest2][3] que ya no es tan nuevo pero si muy útil. Por favor lee las ligas que comento ya que espero que el código lo puedas copiar, pegar y jugar. No daré explicaciones, excepto vía comentarios, hay si pregunten todo lo que quieran, yo u otro miembro de la comunidad contestara.

Descarga la ultima versión estable de [FileSaver.js][2].

---
## Controlador
```groovy
package app

class IndexController {

    def index() {}

    def descarga() {
        def zipFile = new File('/tmp/file   .zip')
        header("X-File-Name", zipFile.name)
        response.contentType = 'application/octet-stream'
        zipFile.withInputStream { response.outputStream << it }
        //zipFile.delete()
    }
}
```

---
## Vista
```javascript
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
</head>

<body>
	<button>Descagar</button>
</body>

<script src="${resource(dir: 'js', file: 'FileSaver.js')}"></script>
<script>
    var btn = document.querySelector('button');
    btn.addEventListener('click', function () {
        var descarga_url = "${createLink(controller: 'Index', action: 'descarga')}";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', descarga_url, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status == 200) {
                var blob = this.response;
                var file_name = xhr.getResponseHeader('X-File-Name');
                var file_saver = new saveAs(blob, file_name);
                console.log(file_saver);
            }
        };
        xhr.send();
    });
</script>
</html>
```

[1]: https://developer.mozilla.org/es/docs/XMLHttpRequest/Using_XMLHttpRequest
[2]: https://github.com/eligrey/FileSaver.js/
[3]: http://www.html5rocks.com/es/tutorials/file/xhr2/#toc-bin-data