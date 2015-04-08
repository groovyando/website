---
title: La liberación de Grails 1.2-M2
author: neodevelop
layout: post
date: 2009-08-11
url: /2009/08/11/la-liberacion-de-grails-12-m2/
categories:
  - Groovy
---
No cabe duda que los chicos de SpringSource se est&aacute;n aplicando al mejorar de manera tan r&aacute;pida y efectiva este framework, ya considerado plataforma, apenas a principios de a&ntilde;o teniamos la versi&oacute;n 1.1 esperandola con ansias y en el libro de The Definitive Guide to Grails mencionaba en un peque&ntilde;o apartado que para dicha publicaci&oacute;n ya iba a estar en puerta la versi&oacute;n 1.1.1; estamos a mediados de a&ntilde;o y ya estamos en el M2 de este framework basado en Groovy, Spring, Hibernate y otros de los mejores productos open source para desarrollo Java. Y precisamente hablando de esto quiero mencionar las mejoras que vienen con esta nueva versi&oacute;n, basado en la publicaci&oacute;n de las notas de liberaci&oacute;n: <http://www.grails.org/1.2-M2+Release+Notes>

De las mejoras y caracter&iacute;sticas m&aacute;s sobresalientes en mi opini&oacute;n es que ahora esta versi&oacute;n ya viene basada en Spring 3, el cual, viene tambi&eacute;n con nuevas caracter&iacute;sticas que no podemos pasar desapercibidas, para el caso muy especifico de esta version de Grails rescatamos la posibilidad de usar las anotaciones de Spring como son: @Service, @Component, etc. Cualquier clase puede ser anotada como @Component y ser inyectada en cualquier otra&#8230;

Incluso podemos anotar con **@Controller** y mapear a nivel de m&eacute;todo con **@RequestMapping** como si lon hicieramos en Spring directo.

Ahora podemos reescribir cualquier URI en cualquier otra usando el archivo de UrlMappings de Grails por ejemplo:** <span class='java-quote'>&#8216;/hello&#8217;</span>(uri:<span class='java-quote'>&#8216;/hello.dispatch&#8217;</span>)** , muy &uacute;til para recursos estaticos o simplemente tener una URI adornada&#8230;

Transacciones por m&eacute;todo a trav&eacute;s de **@Transactional**, construido de la misma forma en el escaneo de componentes, ahora podemos usarlo a nivel de m&eacute;todo.

Mejoras en los finders din&aacute;micos prove&iacute;dos por el GORM en donde ya podemos incluir valores booleanos en las firmas de los m&eacute;todos para buscar a trav&eacute;s de ellos.

Adem&aacute;s de soporte de query&#8217;s nombrados a trav&eacute;s de la declaraci&oacute;n de un closure en la clase de dominio y la invocaci&oacute;n de m&eacute;todos est&aacute;ticos en donde se requiera usarlos.

Soporte para la relaci&oacute;n ***hasOne*** donde la llave foranea se encuentra en el hijo y no en el padre de la asociaci&oacute;n

Errores de validaci&oacute;n estrictos, hay un argumento nuevo en el m&eacute;todo save de los objetos de dominio que permite arroja una excepcion si un error ocurre.

Precompilaci&oacute;n de las GSP en el deployment de la WAR lo que permite usar menos espacio en memoria al momento de hacer deploys

Multiples contenedores embedidos soportados, ahora ya podemos escoger entre **Jetty** y **Tomcat**&#8230;Coolness no?

Mapeos de URL Nombradas y la asociaci&oacute;n de tags din&aacute;micos basados en dicha configuraci&oacute;n hecha dentro del archivo UrlMappings en donde podremos usar tags generadas en base a la escritura de la relaci&oacute;n existente entre las peticiones que escribamos y los controllers y action&#8217;s que las atiendan&#8230;

Estas son algunas de las nuevas funcionalidades que encontraremos en esta nueva versi&oacute;n de Grails(faltan un par), les recomendamos que la prueben&#8230;