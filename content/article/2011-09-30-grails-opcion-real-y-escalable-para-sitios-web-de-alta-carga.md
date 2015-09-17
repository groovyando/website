---
title: Grails, opción real y escalable para sitios web de alta carga.
author: domix
date: 2011-09-30
url: /2011/09/30/grails-opcion-real-y-escalable-para-sitios-web-de-alta-carga/
categories:
  - Groovy
---
&nbsp;

He estado trabajando poco mas de un a&ntilde;o en un proyecto que usa <a href='http://grails.org' target='_blank'>Grails</a>, desde que lo comenc&eacute; no pens&eacute; que se convertir&iacute;a en lo que es ahora, es decir no pens&eacute; que llegara a tener tanta carga.

B&aacute;sicamente es una tienda en linea, con diversas formas de pago. El stack de tecnolog&iacute;as se compone de varias cosas:

&nbsp;

  * Sun JVM 1.6.24
  * Grails 1.3.4, Groovy 1.7
  * mySQL
  * <a href='http://ehcache.org/documentation/terracotta/' target='_blank'>Terracotta</a>
  * <a href='http://www.rabbitmq.com/' target='_blank'>RabbitMQ</a>
  * <a href='http://aws.amazon.com/s3/' target='_blank'>AmazonS3</a>
  * Tomcat 6

&nbsp;

Usamos varios plugins de Grails entre ellos:

&nbsp;

  * <a href='http://grails.org/plugin/aws' target='_blank'>AWS</a>
  * <a href='http://grails.org/plugin/rendering' target='_blank'>Rendering</a>
  * <a href='http://grails.org/plugin/rabbitmq' target='_blank'>RabbitMQ</a>
  * <a href='http://grails.org/plugin/spring-security-core' target='_blank'>SpringSecurityCore</a>
  * <a href='http://grails.org/plugin/quartz' target='_blank'>Quartz</a>
  * <a href='http://grails.org/plugin/feeds' target='_blank'>Feeds</a>
  * <a href='http://grails.org/plugin/export' target='_blank'>Export</a>
  * <a href='http://grails.org/plugin/tiny-mce' target='_blank'>TinyMCE</a>
  * <a href='http://grails.org/plugin/recaptcha' target='_blank'>Recaptcha</a>
  * <a href='http://grails.org/plugin/grails-melody' target='_blank'>GrailsMelody</a>
  * <a href='http://grails.org/plugin/gpars' target='_blank'>GPars</a>

&nbsp;

Y algunas librer&iacute;as como:

&nbsp;

  * <a href='http://xstream.codehaus.org/' target='_blank'>XStream</a>
  * <a href='http://groovy.codehaus.org/HTTP+Builder' target='_blank'>HttpBuilder</a>
  * <a href='http://opencsv.sourceforge.net/' target='_blank'>OpenCSV</a>
  * <a href='http://www.jcraft.com/jsch/' target='_blank'>JSCH</a>
  * <a href='http://itextpdf.com/' target='_blank'>iText</a>
  * <a href='http://poi.apache.org/' target='_blank'>Apache POI</a>
  * <a href='http://barbecue.sourceforge.net/' target='_blank'>Barbecue</a>
  * <a href='https://github.com/jwagenleitner/groovy-wslite' target='_blank'>Groovy-WSLite</a>
  * <a href='http://groovy.codehaus.org/Grape' target='_blank'>Grape</a>

&nbsp;

&nbsp;

Estamos modularizando la aplicacion en mas aplicaciones y tenemos una app que usa <a href='http://www.scala-lang.org/' target='_blank'>Scala</a> con <a href='http://scalaquery.org/' target='_blank'>ScalaQuery</a> para la base de datos, en el futuro haremos muchas mas cosas con <a href='http://www.scala-lang.org/' target='_blank'>Scala</a> y <a href='http://akka.io/' target='_blank'>Akka</a>.

Para JavaScript usamos JQuery y varios plugins.

Para trabajar usamos IntelliJ IDEA 10, <a href='http://www.gradle.org/' target='_blank'>Gradle</a>, <a href='http://archiva.apache.org/' target='_blank'>Archiva</a>, <a href='http://www.atlassian.com/software/jira/' target='_blank'>Jira</a>, <a href='http://git-scm.com/' target='_blank'>Git</a>, <a href='https://github.com/' target='_blank'>GitHub</a> y mucha cerveza y caf&eacute;.

Un miembro del equipo desarrollo herramientas de monitoreo que revisan la salud de los load balancers y reportan los errores con mensajes directos de Twitter con Shell Scripts. Tambi&eacute;n usamos <a href='http://code.google.com/p/logstalgia/' target='_blank'>logstalgia</a> para monitorear casi en tiempo real la carga en los web servers.

El hardware esta compuesta de 5 cajas <a href='http://www.redhat.com/rhel/' target='_blank'>RHEL</a> 5 de 64 bits, un LoadBalancer y un Firewall f&iacute;sicos. El load balancer dirige el trafico a los Apache HTTPD de 4 cajas, en cada una de esas cajas, esta &nbsp;configurado con mod_proxy usando AJP hacia 2 Tomcats con un fail over a otra caja. En total se tienen 8 Tomcats atendiendo todo el trafico. Una de esas cajas tiene instalado RabbitMQ y otra caja Terracotta. Se usa una caja exclusivamente como servidor de mySQL.

Las cajas tienen los siguientes specs:

&nbsp;

  * Dual Quad Core Xeon 2.26 HGZ
  * 24 GB de RAM
  * 300 GB SAS X 3

&nbsp;

Estas cajas est&aacute;n en el hospedaje dedicado de RackSpace en Chicago.

Con todo lo anterior hemos podido suscribir 1.5 Millones de personas, logrado una carga tope de 80,000 usuarios concurrentes y 30,000 http request por minuto.

Unas de las claves ha sido usar procesamiento as&iacute;ncrono con RabbitMQ y usar much&iacute;simo el cache distribuido con Terracotta. Ademas de contar con un equipo de 4 desarrolladores mexicanos (yo entre ellos) y un alem&aacute;n, con mucho talento todos ellos.

Grails es una excelente opci&oacute;n para desarrollo web, nos ha permitido implementar r&aacute;pidamente los requerimientos de negocio, hemos hecho en un d&iacute;a hasta 12 despliegues de la aplicaci&oacute;n sin sufrir downtimes. Grails es una herramienta que facilita el desarrollo web sin perder poder en los frameworks en los que se basa como Spring, Hibernate y otros&#8230;

Les dejo un video del an&aacute;lisis casi en tiempo de real que hace logstalgia del log de acceso de los 4 webservers

&nbsp;