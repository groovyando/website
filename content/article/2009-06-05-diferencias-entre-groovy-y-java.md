---
title: Diferencias entre Groovy y Java
author: MIguel-1.mx
layout: post
date: 2009-06-19
url: /2009/06/05/diferencias-entre-groovy-y-java/
categories:
  - Groovy
---
<p align='justify'>
  Groovy persigue ser tan natural como sea posible para desarrolladores de Java, apunta la descripci&oacute;n del lenguaje Groovy en su sitio Web (http://groovy.codehaus.org/). Mencionan que pr&aacute;cticamente cualquier c&oacute;digo escrito en Java podr&iacute;a definirse como c&oacute;digo Groovy sin mayores sorpresas. Para quien aprende Groovy cuando no se tiene experiencia en Java este es s&oacute;lo un art&iacute;culo ex&oacute;tico, pero para quien comienza con Groovy y tiene experiencia con Java, las particularidades en dise&ntilde;o resaltar&aacute;n m&aacute;s temprano que tarde. &iquest;Pero cu&aacute;les son las diferencias? Este art&iacute;culo intenta listar las mayores diferencias entre Groovy y Java. Si los apreciables lectores conocen alguna otra que merezca atenci&oacute;n y no se incluya, s&iacute;rvase resaltarlo y seguir haciendo comunidad.
</p>

&nbsp;

<p align='justify'>
  <strong>1.</strong> ==
</p>

<p align='justify'>
  En Java == con tipos primitivos significa usar igualdad, mientras que para tipos object significa comprobar identidad. Empero, en Groovy == siempre significa igual, es decir, el uso que la mayor&iacute;a de los desarrolladores utiliza. En Groovy == aplica igualdad tanto para tipos primitivos como para tipos object y a lo largo de tipado est&aacute;tico y din&aacute;mico para simplificar las cosas.
</p>

<p align='justify'>
  Como ejemplo, si al trabajar con Java se quisiera mantener la sem&aacute;ntica de igualdad para objetos, por ejemplo, haciendo tipado din&aacute;mico de la siguiente manera:
</p>

<pre class='brush:java'>def x = 2 x 2 if (x == 4) { ... } </pre>

<p align='justify'>
  Se obtendr&iacute;an resultados inesperados, pues aunque se quisiera resolver una igualdad basada en el valor, Java lo resolver&iacute;a por identidad. Es cierto, rara vez se usan comparaciones de identidad.
</p>

<p align='justify'>
  Si en Groovy se quisiera comparar identidades de los objetos, el m&eacute;todo is() se proporciona para cada objeto:
</p>

<pre class='brush:java'>if (x.is(4)) { ... // nunca true } </pre>

<p align='justify'>
  La condici&oacute;n de arriba nunca es true, ya que el objeto Integer en x (el cual es el resultado del c&oacute;mputo de arriba), no es id&eacute;ntico al objeto Integer con el valor 4 que se ha creado para la comparaci&oacute;n.
</p>

<p align='justify'>
  <strong>2.</strong> Para declarar un arreglo no se puede escribir
</p>

<pre class='brush:groovy'>int[] a = {1,2,3}; </pre>

<p align='justify'>
  sino
</p>

<pre class='brush:groovy'>int[] a = [1,2,3] </pre>

<p align='justify'>
  <strong>3.</strong> Si en Java sol&iacute;a escribir un loop similar a este:
</p>

<pre class='brush:java'>for (int i=0; i &lt; len; i++) {...} </pre>

en Groovy tambi&eacute;n puede usarlo, pero s&oacute;lo se podr&aacute; usar una variable contadora. Alternativas a esto pueden ser:

<pre class='brush:groovy'>for (i in 0..len-1) {...} </pre>

,

<pre class='brush:groovy'>for (i in 0..</pre>

o

<pre class='brush:groovy'>len.times {...} </pre>

<p align='justify'>
  <strong>4.</strong> in es una palabra reservada. No la use como nombre de variable.
</p>

&nbsp;

<p align='justify'>
  <strong>Tenga en cuenta que:</strong>
</p>

  1. Los punto y coma son opcionales. &Uacute;selos si le agrada (aunque debe usarlos para poner varias sentencias en una l&iacute;nea). 
  2. La palabra clave return es opcional. 
  3. Puede usar la palabra clave this dentro de m&eacute;todos est&aacute;ticos (lo cual refiere a esta clase). 
  4. Protected en Groovy tiene el mismo significado de protegido que en Java, p. ej., puede tener amigos en el mismo paquete y las clases derivadas pueden ver tambi&eacute;n a los miembros protegidos. 
  5. Las clases interiroes no se soportan hasta ahora. En la mayor&iacute;a de los casos puede usar clausuras (closures) en su lugar. 
  6. La cl&aacute;usula throws en una firma de m&eacute;todo no se comprueba por el compilador de Groovy, pues no hay diferencia entre excepciones comprobadas y no comprobadas. 
  7. No se obtendr&aacute;n errores de compilaci&oacute;n como se obtendr&iacute;an en Java al usar miembros indefinidos o pasar argumentos de tipo incorrecto. De existir errores en el c&oacute;digo se lanzar&aacute;n excepciones en tiempo de ejecuci&oacute;n, debido a la naturaleza din&aacute;mica de Groovy. 

&nbsp;

<p align='justify'>
  <strong>Caracter&iacute;sticas contra-intuitivas no tan comunes</strong>
</p>

<p align='justify'>
  Los programadores de Java est&aacute;n acostumbrados a usar punto y coma para terminar sentencias y a no tener clausuras (closures). Tambi&eacute;n hay inicializadores de instancia en definiciones de clase. As&iacute; que podr&iacute;a ver algo como esto:
</p>

<pre class='brush:java'>class Prueba {   private final Algo algo = new Algo ( ) ;   { algo.hazAlgunaCosa ( ) ; } } </pre>

<p align='justify'>
  Muchos programadores de Groovy evitan el uso del punto y coma pues es distractor y redundante (aunque otros lo utilizan todo el tiempo &#8211; es cuesti&oacute;n de estilo de c&oacute;digo). Una situaci&oacute;n que puede acarrear dificultades es escribir lo de arriba en Groovy as&iacute;:
</p>

<pre class='brush:groovy'>class Prueba {   private final Algo algo = new Algo ( )   { algo.hazAlgunaCosa ( ) } } </pre>

<p align='justify'>
  &iexcl;Esto lanzar&aacute; un MissingMethodException!
</p>

<p align='justify'>
  El problema aqu&iacute; es que en este ejemplo la nueva l&iacute;nea no es un terminador de sentencia, as&iacute; que el siguiente bloque se trata como una clausura, la cual se pasa como un argumento al constructor Algo. Extra&ntilde;&iacute;simo para muchos, pero cierto. Si desea usar inicializadores de instancia de esta manera, es preciso tener un punto y coma:
</p>

<pre class='brush:groovy'>class Prueba {   private final Algo algo = new Algo ( ) ;   { algo.hazAlgunaCosa ( ) } } </pre>

<p align='justify'>
  De esta manera el siguiente bloque a la definici&oacute;n inicializada es claramente un inicializador de instancia.
</p>