---
title: Respaldos de MySql con Groovy, Amazon S3 y Grape
author: domix
layout: post
date: 2010-01-23
url: /2010/01/23/respaldos-de-mysql-con-groovy-amazon-s3-y-grape/
categories:
  - Groovy
---
&nbsp;

<p style='text-align: justify;'>
  En <a href='http://synergyj.com'>SynergyJ</a> estamos migrando poco a poco nuestra infraestructura a <a href='http://aws.amazon.com/ec2/'>Amazon EC2</a> para los servidores, por otro lado ya llevamos casi 3 a&ntilde;os usando <a href='http://aws.amazon.com/s3/'>Amazon S3</a> y es un servicio que vale mucho la pena. <a href='http://aws.amazon.com/s3/'>Amazon S3</a> es un servicio muy simple y barato para almacenar informaci&oacute;n publica y privada.
</p>

<p style='text-align: justify;'>
  La informaci&oacute;n de nuestras bases de datos es vital y por lo tanto es bien necesario que tengamos que hacer respaldo de nuestras bases de bases para evitar perdida de informaci&oacute;n. Yo considero que un buen plan de respaldos debe contener lo siguiente
</p>

&nbsp;

  * 100% Automatizado
  * El respaldo debe estar seguro, tanto a nivel privacidad como de disponibilidad

&nbsp;

<p style='text-align: justify;'>
  Seguramente habr&aacute; mas caracter&iacute;sticas, pero por el momento es lo que mas me importa y es en lo que me puse a trabajar para solucionar este problema en nuestra infraestructura. Como mencione antes, <a href='http://aws.amazon.com/s3/'>Amazon S3</a> es un servicio de almacenaje de archivos que es muy confiable, casi al 100 %, por lo tanto pens&eacute; en generar el respaldo y guardarlo en <a href='http://aws.amazon.com/s3/'>Amazon S3</a> de tal manera que lo tengamos disponible en cuanto se necesite.
</p>

<p style='text-align: justify;'>
  Existen muchas soluciones muy simples que permiten respaldar una base de datos de mySql y guardarlo en <a href='http://aws.amazon.com/s3/'>Amazon S3</a>, pero quise ponerme a trabajar un poco en hacer una propia herramienta de respaldo, y pues pens&eacute; hacerlo en Groovy ya que no encontr&eacute; algo similar.
</p>

<p style='text-align: justify;'>
  Bien, con Groovy fue muy sencillo hacer el dump de mySql, la clase que hace el respaldo en Groovy es la siguiente:
</p>

<pre class='brush:groovy'>class MySqlBackuper { 	def host = 'localhost' 	def user = 'root' 	def password = '' 	def database = ''  	def doBackup() { 		def filename = '$database-${System.currentTimeMillis()}' 		def sqlfilename = '${filename}.sql' 		def zipfilename = '${filename}.gz'  		println 'Trying Backup, database='$database' with '$user' in file $zipfilename' 		//This is the command to perform the dump via mySql tools 		def command = 'mysqldump --opt --user=${user} --password=${password} ${database}'  		def dump = command.execute() 		dump.waitFor()  		new File(sqlfilename).write(dump.text)  		//AntBuilder is awesome, cool to have it in runtime, not only in develoment time 		def ant = new AntBuilder() 		//Create the Gzip file 		ant.gzip zipfile:zipfilename, src:sqlfilename 		ant.delete file:sqlfilename 		 		//return the GZip filename 		zipfilename 	} } </pre>

<p style='text-align: justify;'>
  &nbsp;
</p>

<p style='text-align: justify;'>
  Para subir el archivo del dump de mySql a <a href='http://aws.amazon.com/s3/'>Amazon S3</a>, necesit&aacute;bamos usar el API de <a href='http://aws.amazon.com/s3/'>Amazon S3</a> para realizarlo, en Java existen varias librer&iacute;as, a mi juicio la mas adecuada es <a href='https://jets3t.dev.java.net/'>JetS3T</a>, es muy sencilla de usar, solo es necesario ponerla en el classpath y listo. El poner un jar en el classpath puede parecer algo sencillo, pero hay varias cosas a considerar, entre ellas, pues bajarla de alg&uacute;n lugar y dejarla disponible en el classpath.
</p>

<p style='text-align: justify;'>
  Los chicos de Groovy pensamos en alguna manera sencilla de que las clases mismas definan que librer&iacute;as necesiten, &iexcl;en el mismo c&oacute;digo!, de tal manera que el c&oacute;digo mismo se encargue de obtener (descargar) la librer&iacute;a si es necesario y cargarla en el classpath, sin necesidad de escribir archivos de build o scripts que se encarguen de ello. En Groovy existe algo llamado <a href='http://groovy.codehaus.org/Compile-time+Metaprogramming+-+AST+Transformations'>transformaciones AST</a>, que permiten que en tiempo de compilaci&oacute;n el c&oacute;digo de byte vaya con algunas modificaciones, solo con usar anotaciones. Revisen este tema de Groovy que esta super interesante.
</p>

<p style='text-align: justify;'>
  La anotaci&oacute;n que hace la magia en Groovy es <a href='http://groovy.codehaus.org/Grape'>@Grab</a>, que hace maravillas, como ir al repositorio de jars de Maven y descargarse la librer&iacute;a que le indiques y ponerla en el classpath sin esfuerzo, es bien importante mencionar que no siempre va a descargarla a internet, solo la descarga la primera vez.
</p>

<p style='text-align: justify;'>
  La clase que programe en Groovy para guardar archivos en Amazon S3 es la siguiente, chequen el uso de la anotaci&oacute;n @Grab
</p>

<pre class='brush:groovy'>@Grab(group='net.java.dev.jets3t', module='jets3t', version='0.7.2') class S3Storer { 	def awsAccessKey 	def awsSecretKey 	private def awsCredentials = null 	private def s3Service = null 	 	/** 	 *  	 */ 	def storeFile(file, bucketName) { 		 		def object = new org.jets3t.service.model.S3Object(new File(file)) 		def bucket = getS3Service().getBucket(bucketName) 		 		if(bucket) { 			println 'Storing $file on $bucketName wait a moment please...' 			def storedFile = s3Service.putObject(bucket, object); 			println 'Successfully upload $file' 			storedFile 		} else { 			println 'the bucket $bucketName cant be found.' 			null 		} 		 	} 	 	private def getCredentials() { 		if(!awsCredentials)  { 			awsCredentials = new org.jets3t.service.security.AWSCredentials(awsAccessKey, awsSecretKey); 		} 		awsCredentials 	} 	 	private def getS3Service() { 		if(!s3Service)  { 			s3Service = new org.jets3t.service.impl.rest.httpclient.RestS3Service(getCredentials()) 		} 		s3Service 	} } </pre>

<p style='text-align: justify;'>
  &nbsp;
</p>

<p style='text-align: justify;'>
  El paso final es juntar la clase que hace respaldos de mySql y la clase que sube archivos a Amazon S3 para que unas cuantas lineas podamos programar el respaldo y almacenaje de la base de datos. Todo en unas cuantas lineas&iexcl;&iexcl;&iexcl;&iexcl;
</p>

<pre class='brush:groovy'>//Here you can provide the database, password, even the username to perform the backup in gzip def sqlDatabasefile = new MySqlBackuper(database:'databaseName', username:'user', password:'yourPassword').doBackup()  println 'Performing MySql Backup to Amazon S3'  def storer = new S3Storer(awsAccessKey:'', awsSecretKey:'') // The filename and the bucket name def f = storer.storeFile(sqlDatabasefile, 'yourBucketName') </pre>

<p style='text-align: justify;'>
  &nbsp;
</p>

<p style='text-align: justify;'>
  Espero les haya gustado el c&oacute;digo esta disponible en mi cuenta de GitHub por si le voy agregando mejoras, como diversos tipos de respaldos y mas flexibilidad para Amazon S3
</p>

&nbsp;