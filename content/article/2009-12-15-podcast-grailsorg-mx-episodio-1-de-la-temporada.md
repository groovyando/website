---
title: 'Podcast grails.org.mx: Episodio 1 de la Temporada'
author: neodevelop
date: 2009-12-15
url: /2009/12/15/podcast-grailsorg-mx-episodio-1-de-la-temporada/
enclosure:
  - |
    |
        http://s3.amazonaws.com/media.grails.org.mx/podcast/temporada01/01x01.mp3
        32061453
        audio/mpeg
        
categories:
  - Groovy
  - Podcast Grails
---
Jos&eacute; Juan Reyes (@[neodevelop][1]) y Domingo Su&aacute;rez Torres (@[domix][2]) una vez mas entregan otra edici&oacute;n del podcast de grails.org.mx

En este episodio hablamos sobre uno de los usos de la metaprogramaci&oacute;n que Groovy hace en las clases de las librerias estandar de Java, nos referimos al GDK, especificamente hablamos en esta ocasi&oacute;n del GSQL, les dejamos un ejemplo listo para ser ejecutado:

&nbsp;

<pre class='brush:groovy'>//Esta anotacion nos sirve para indicarle a Groovy
 //que use la libreria de Hsqldb
 @Grab(group='org.hsqldb', module='hsqldb', version='1.8.0.10')
 class Conexion {
 	def sql
 	public Conexion() {
 		/* Esto es un truco para que jale la anotacion @Grab en Groovy 1.6.x, 
 		   en Groovy 1.7 deberia funcionar sin este truco */
 		this.getClass().getClassLoader().getURLs().each {
 			ClassLoader.getSystemClassLoader().addURL(it)
 		}
 		
 		/* Creamos nuestra conexion a la base de datos, los parametros enviados son:
 		   url, username, password, y driverClassName */
 		sql = groovy.sql.Sql.newInstance('jdbc:hsqldb:file:ejemploDB', 'sa', '', 'org.hsqldb.jdbcDriver')
 	}
 	
 
 	def creaEstructura() {
 		// delete table if previously created
 		try {
 		   sql.execute('drop table PERSON')
 		} catch(Exception e){}
 		
 		// create table
 		sql.execute('''create table PERSON (
 		    id integer not null primary key,
 		    firstname varchar(20),
 		    lastname varchar(20),
 		    location_id integer,
 		    location_name varchar(30)
 		)''')
 		sql.commit()
 	}
 	
 	def agregaRegistros() {
 		// now let's populate the table
 		def people = sql.dataSet('PERSON')
 		people.add( firstname:'James', lastname:'Strachan', id:1, location_id:10, location_name:'London' )
 		people.add( firstname:'Bob', lastname:'Mcwhirter', id:2, location_id:20, location_name:'Atlanta' )
 		people.add( firstname:'Sam', lastname:'Pullara', id:3, location_id:30, location_name:'California' )
 		sql.commit()
 		def results = sql.firstRow('select firstname, lastname from PERSON where id=1').firstname
 		def expected = 'James'
 		assert results == expected
 		
 		// do a query to confirm that our change actually worked
 		results = sql.firstRow('select firstname, lastname from PERSON where id=1').firstname
 		expected = 'James'
 		assert results == expected
 	}
 	
 	def cierraConexion() {
 		sql.close()
 	}
 }
 
 def c = new Conexion()
 c.creaEstructura()
 c.agregaRegistros()
 c.cierraConexion()
 </pre>

Los temas a detalle son:

**Video de la charla de JJ sobre Grails en Campus Party**

**GDK**

<span style='white-space: pre;'> </span>I*magen del flujo de ejecuci&oacute;n de m&eacute;todos de Groovy*

**GSQL**

<span style='white-space: pre;'> </span>*Critica de JDBC*

<span style='white-space: pre;'><em> </em></span>*Hablamos un poco de ORM*

<span style='white-space: pre;'><em> </em></span>*Soporte de JDBC con Groovy usando groovy.sql.Sql*

<span style='white-space: pre;'><em> </em></span>*C&oacute;digo en Groovy usando GSQL*

<div>
</div>

Duraci&oacute;n: 65 minutos

Tama&ntilde;o: 33 MB

Lo pueden descargar directo desde [aqui][3] o suscribiendose al [feed][4].

<p class='rtecenter'>
  &nbsp;<img src='http://s3.amazonaws.com/media.grails.org.mx/podcast/podcast.jpg' alt='' />
</p>

[![][5]][6] [![][7]][4]

<!--break-->

 [1]: http://twitter.com/neodevelop
 [2]: http://twitter.com/domix
 [3]: http://s3.amazonaws.com/media.grails.org.mx/podcast/temporada01/01x01.mp3
 [4]: http://podcast.springhispano.org/grails.xml
 [5]: http://www.springhispano.org/images/itunesicon.png
 [6]: http://phobos.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=291350367
 [7]: http://www.springhispano.org/images/rssicon.png