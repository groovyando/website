---
title: 'Podcast grails.org.mx: Episodio 0 de la Temporada 1'
author: neodevelop
layout: post
date: 2009-09-21
url: /2009/09/21/podcast-grailsorg-mx-episodio-0-de-la-temporada-1/
enclosure:
  - |
    |
        http://s3.amazonaws.com/media.grails.org.mx/podcast/temporada01/01x00.mp3
        30962143
        audio/mpeg
        
categories:
  - Groovy
  - Podcast Grails
---
Jos&eacute; Juan Reyes (@[neodevelop][1]) y Domingo Su&aacute;rez Torres (@[domix][2]) una vez mas entregan otra edici&oacute;n del podcast de grails.org.mx

Este episodio es el podcast de amniversario, cumplimos un a&ntilde;o hablando sobre Groovy & Grails, adovo&iexcl;.

En este episodio hablamos sobre metaprogramaci&oacute;n, el elemento clavey fundamental para hacer de Groovy un lenguaje dinamico para poder crear DSLs (Domain Specific Languages). Les dejamos un ejmplo de como hacer metaprogramaci&oacute;n muy sencillo:

<pre class='brush:groovy'>def s = 'hola mundo' s.metaClass.metodoInexistente = {-&gt;     println 'hola' } println s.class.name s.metodoInexistente()  </pre>

Los temas a detalle son:



  1. [Agregado soporte de compresi&oacute;n y descomprensi&oacute;n con metaprogramaci&oacute;n][3]
  2. [Agentes concurrentes con Groovy][4]
  3. [Nuevo DSL para administrar dependencias con Grails][5]
  4. [Foros nuevos][6]



Duraci&oacute;n: 65 minutos

Tama&ntilde;o: 30.9 MB

Lo pueden descargar directo desde [aqui][7] o suscribiendose al [feed][8].

[![][9]][10] [![][11]][8]

<p class='rtecenter' style='text-align: center;'>
  <img src='http://s3.amazonaws.com/media.grails.org.mx/podcast/podcast.jpg' alt='' />
</p>

&nbsp;

<!--break-->

 [1]: http://twitter.com/neodevelop
 [2]: http://twitter.com/domix
 [3]: http://grooveek.blogspot.com/2009/09/adding-zipping-and-unzipping.html
 [4]: http:// http//www.jroller.com/vaclav/entry/secret_agents_helping_your_code
 [5]: http://graemerocher.blogspot.com/2009/09/grails-dependency-resolution-done-right.html
 [6]: http://gr8forums.org/
 [7]: http://s3.amazonaws.com/media.grails.org.mx/podcast/temporada01/01x00.mp3
 [8]: http://podcast.springhispano.org/grails.xml
 [9]: ../../images/itunesicon.png
 [10]: http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=291350367
 [11]: ../../images/rssicon.png