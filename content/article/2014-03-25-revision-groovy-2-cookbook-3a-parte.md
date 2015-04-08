---
title: 'Revisión: Groovy 2 Cookbook (3a. Parte)'
author: neodevelop
layout: post
date: 2014-03-25
url: /2014/03/25/revision-groovy-2-cookbook-3a-parte/
categories:
  - Groovy
---
En esta última parte comento la parte en mi consideración “épica” del libro, pues llegados a este punto los lectores encontraran concentrado y totalmente explotado el conocimiento de Groovy que se pudo adquirir en los capítulos anteriores.

### Capítulo 8

Actualmente, el trabajo con WebServices es arduo y está lleno de API’s que en Java pueden facilitarnos la labor, sin embargo, con Groovy podemos hacer uso de las mismas clases que vienen dentro del lenguaje, que son realmente las clases de Java con algunos elementos adicionales, o bien, utilizar algo como HttpBuilder o WSLite, las cuales son librerías Groovy que nos ahorran mucha codificación y que son altamente expresivas. En mi opinión, una receta muy interesante de probar sería el uso de OAuth con Twitter.

### Capítulo 9

Metaprogramación con Groovy, un tema que me gusta mucho, y me llamó la atención que viniera un tema de este tipo para los desarrollados Java que pudieran leer este texto, si bien al principio el autor muestra las características de Groovy, sirve también para que los lectores puedan comprender la forma en como funciona internamente Groovy.

Si en su momento pudimos ver cosas muy interesantes con el AOP, veremos cosas aún más interesantes y poderosas con el MOP. La receta llamada “Adding a caching functionality around methods” es definitiva un explotador de cerebros, hay que leerla detenidamente.

La creación de dos DSL’s muestran como Groovy puede simplificar la forma en la que se puede desarrollar una API en Groovy para desarroladores Groovy, aunque recomiendo mucho conocimiento de Java para comprenderla a la perfección.

### Capítulo 10

Programación concurrente en Groovy, es el último capítulo de este libro, llegando a tocar uno de los temas que pueden llegar a representar un reto para muchos desarrolladores. Sin embargo, el autor nos lleva de un ejemplo basado en fork/join, reforzando con un ejemplo de múltiples tareas y la forma de partir una gran tarea en otras más pequeñas que se pueden ejecutar de forma independiente.

Me gusto mucho que hicieran uso de Ratpack, para después tratar otro tema: ejecuciones asíncronas. Y sin dejar de lado el modelo de concurrencia más comentado, se describe el famoso esquema basado en Actores, para dar paso a una receta que usa Software Transactional Memory y DataFlows, de los cuales me hubiera gustado que profundizará un poco más pues hay muy poca difusión de estos últimos, sin embargo, los ejemplos que demuestran a cada uno hacen justicia al libro.

### Conclusión

En definitiva es un libro muy intenso, requiere de un buen conocimiento del lenguaje Java para poder aprovecharlo, y refuerza muchos conceptos del mismo lenguaje. Es un libro para que el desarrollado Java use a Groovy como una opción a elementos muy particulares que llegue a necesitar y que pueda implementar, me imagino que existió algo de inspiración en la parte empresarial, y por eso se tocaron algunas recetas como se hizo.

Indudablemente, los autores tienen un conocimiento profundo del lenguaje, lo demuestran plasmándolo en cada receta, y la mejor parte parte es la explicación puntual de cada una, sin dejar escapar ningún detalle.

> Si eres un programador Java que quiere mejorar su código de forma sustancial, entonces este libro es para ti.

Aprovechando que ando haciendo esta revisión y estoy terminando precisamente en estas fechas los chicos de [PacktPub][1] tienen una promo en donde compras un ebook y te dan otro gratis. Lo hacen por la publicación del libro número 2000, lo cual hace que [PacktPub][1] tenga una gran variedad de temas plasmados en textos.

[<img class="alignnone size-medium wp-image-4280" alt="2000th-Book-Home-Page-Banner" src="http://grails.org.mx/wp-content/uploads/2014/03/2000th-Book-Home-Page-Banner-300x125.png" width="300" height="125" />][2]

 [1]: http://bit.ly/1j26nPN
 [2]: http://www.packtpub.com/?utm_source=referral&utm_medium=marketingPR&utm_campaign=2000thTitle