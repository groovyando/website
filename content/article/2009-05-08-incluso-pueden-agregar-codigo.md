---
title: Incluso pueden agregar código
author: neodevelop
layout: post
date: 2009-05-08
url: /2009/05/08/incluso-pueden-agregar-codigo/
categories:
  - Groovy
---
Como este es un portal enfocado a ser lo m&aacute;s practico posible, tambi&eacute;n como parte del sitio, se cuenta con la inclusi&oacute;n y el formate de c&oacute;digo; lo &uacute;nico que tiene que hacer es presionar seleccionar crear un breve texto y a&ntilde;adirle el estilo preformateado, una vez hecho eso presionan el bot&oacute;n de HTML y dentro de las etiquetas **<pre></pre>** incluyen su c&oacute;digo y agregan el estilo, por ejemplo: **<pre class=&#8217;brush:groovy&#8217;><span style='text-decoration: underline;'> y aqui el c&oacute;digo groovy</span>* *</pre>,** adicionalmente soporta:

  1. JavaScript
  2. Css
  3. Groovy
  4. Java
  5. Texto plano
  6. SQL
  7. XML

Y les quedar&iacute;a algo como:

<pre class='brush:groovy'>class Greet {
   def name
   Greet(who) { name = who[0].toUpperCase() +
                       who[1..-1] }
   def salute() { println 'Hello $name!' }
 }
 
 g = new Greet('world')  // create object
 g.salute()              // Output 'Hello World!'
 </pre>

Saludos

**neodevelop**