---
title: 'Revisión: Groovy 2 Cookbook (2a. Parte)'
author: neodevelop
layout: post
date: 2014-02-04
url: /2014/02/04/revision-groovy-2-cookbook-2a-parte/
categories:
  - Groovy
---
Nuevamente y continuando con la revisión de este libro, he de sostener la especialización que tiene acerca del lenguaje, el uso de Java dentro de cada una de las recetas simplifica de forma elegante, expresiva y muy bien explicada.

### Capítulo 4

El uso de Reader, Stream y File requiere de un buen conocimiento de los mismos para comprender que es lo que está explicando el autor. Hace uso muy aventajado de las API’s disponibles en el GDK a través del manejo de archivos y flujos de datos. Durante el desarrollo de este capítulo podremos ver la solución a la automatización de algunas tareas comunes que se pueden presentar en proyectos de software. Una de las partes que podría llamar la atención a los lectores podría ser el manejo simplificado que hacen con ayuda de API’s de terceros para la manipulación de documentos Excel y PDF, e inclusive, el uso de recursividad para explorar archivos y directorios.

Para el conocedor de Groovy, tal vez le pueda interesar la forma en que profundizan la API de File.

### Capítulo 5

El siempre difícil XML, tratado en este capítulo con ayuda de XmlSlurper y XmlParser, el manejo de namespaces, y muchos de los problemas que se puede enfrentar para su manejo, solucionados con la ayuda de varias recetas. Groovy hace trivial el manejo del XML, sin embargo, un tema de mi interés y que me agrado mucho fue la modificación de XML, así también, el ordenamiento. Adicionalmente, durante el transcurso de este episodio se muestran algunas bondades más del manejo de colecciones con Groovy.

Adicionalmente, es interesante ver como se usan los conocimientos adquiridos en capítulos anteriores.

### Capítulo 6

Desde la versión de Groovy 1.8 se tiene un soporte para el manejo de JSON que viene incluido dentro de la estructura del lenguaje. Y aunque el manejo de JsonSlurper y JsonBuilder pueden resultar en extremo simple, los autores explican de una forma muy detallada la forma en que funcionan, lo cual, ayuda a sacarle más provecho a cada componente.

Un tema que el desarrollador Groovy podría encontrar interesante sería la modificación de documentos JSON, además de la validación.

Me causa curiosidad la necesidad que tuvo el autor de convertir JSON a XML, sin embargo, lo resuelve de forma muy elegante.

Y la propuesta de almacenar configuración externa en un archivo JSON sin lugar a duda es una excelente propuesta para cualquier proyecto que use Java o Groovy.

### Capítulo 7

En esta ocasión, recomiendo que la lectura de este capítulo sea mayormente lineal, o por lo menos, leer las primeras recetas pues la mayor parte de ella se basa en estas o hace referencia a su código.

Me da la impresión de que los autores conocen muy bien la API de JDBC y la han sufrido, al mostrar como se puede simplificar la vida usando Groovy. Creo que una de las mejores partes de las recetas hasta este momento son el detallar las explicaciones de como funciona el código Groovy, lo que le daría confianza al conocedor del lenguaje Java. En mi opinión una de las cosas más atractivas del lenguaje Groovy es el GDK, y entre ellos la abstracción que hace al uso de la API de JDBC; me gusta que incluso se tratan temas como el uso de LOB’s, procedimientos almacenados, transacciones y operaciones en batch.

Y sin lugar a dudas, tocar los temas de NoSQL con Groovy pueden introducir a un nuevo paradigma de acceso a datos a los desarrolladores, y dulcificarlos con la sintaxis de Groovy es gentil para quienes no los conocen; y aunque los autores asumen conocimiento en dichos manejadores de acceso a datos, no dejan de lado tener una referencia y una breve introducción a ellos.

### Conclusión parcial

Llegado a este punto, considero que el programador Java encontrará fascinante la forma en como Groovy simplifica el uso del lenguaje, y el programador Groovy encontrará útil la forma en que los autores describen el funcionamiento de las soluciones. También, considero que el profundizar en el funcionamiento del lenguaje le dará confianza en el uso del lenguaje a todos los desarrolladores pues resuelve el misterio de la magia de Groovy.