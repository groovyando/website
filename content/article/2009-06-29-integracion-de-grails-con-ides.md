---
title: Integración de Grails con IDEs
author: MIguel-1.mx
date: 2009-07-01
url: /2009/06/29/integracion-de-grails-con-ides/
categories:
  - Groovy
---
<p align='justify'>
  El desarrollo en Grails no necesita m&aacute;s que un editor de texto, pero hay herramientas m&aacute;s sofisticadas para incrementar la productividad. Caracter&iacute;sticas como el resaltado de sintaxis, la ejecuci&oacute;n de comandos propios, entre otros, los hacen buenas alternativas. Y como en gustos se rompen g&eacute;neros, hay para todos. Hablaremos de algunos IDEs que soportan integraci&oacute;n con Grails, en mayor o menor medida. Si el que Usted utiliza no est&aacute; en esta lista, s&iacute;rvase comentarlo para incluirlo.
</p>

&nbsp;

* * *

&nbsp;

<p align='justify'>
  Comienza esta lista el preferido por muchos, el comercial y robusto IntelliJ IDEA IDE. <a href='../showContent/6'>Tras instalar Groovy y Grails</a>, descargue e instale IntelliJ IDEA desde <a href='http://www.jetbrains.com/idea/download/'>http://www.jetbrains.com/idea/download/</a>. Estando instalado, en el cuadro de di&aacute;logo Settings en IntelliJ IDEA, descargue e instale el plug-in JetGroovy y config&uacute;relo seleccionando las rutas a Groovy y a Grails. Opcionalmente puede descargar e instalar <a href='http://plugins.intellij.net/plugin/?id=1802'>InspectorGroovy</a>, un plug-in con inspecciones de c&oacute;digo espec&iacute;fico de Groovy.
</p>

<p align='justify'>
  Una vez realizado esto, en el cuadro de di&aacute;logo &#8216;New Project&#8217; (nuevo proyecto) aparece el tipo &#8216;Grails Application&#8217; (aplicaci&oacute;n Grails). Con ello se comienza un projecto Grails como cualquier otro en IntelliJ IDEA. Especificando el nombre y lugar, se genera la estructura. Y si acaso se necesitara, tiene resaltado de sintaxis para afinar cualquier detalle, y con la asistencia de c&oacute;digo para objetos Grails, la vida es m&aacute;s sencilla. En la vista de projecto (Project View) se pueden generar clases y editar archivos gsp generados, pudi&eacute;ndose usar clases y bibliotecas definidas en un plugin de Grails.
</p>

&nbsp;

* * *

&nbsp;

<p align='justify'>
  El siguiente en la lista, <a href='http://www.netbeans.org'>NetBeans IDE</a>. Desde la versi&oacute;n 6.5, tiene soporte nativo para Groovy y Grails. S&oacute;lo hay que descargar e instalarlo. Una vez instalado, en la ventana Options (opciones), bajo Miscellaneous (diversos) seleccione la ruta de Grails en el panel &#8216;Groovy&#8217;. Si se usa MacOS X, Miscellaneous se encuentra bajo &#8216;NetBeans Preferences&#8217;.
</p>

<p align='justify'>
  Para crear la aplicaci&oacute;n:
</p>

<p align='justify'>
  1. Seleccione el proyecto con el Asistente de Nuevo Proyecto, dele nombre y localizaci&oacute;n. Se generar&aacute;n los archivos necesarios y se completar&aacute;n valores predeterminados.
</p>

<p align='justify'>
  2. Cree la clase de dominio, dando clic derecho al nodo &#8216;Domain classes&#8217;. Nombre la clase de dominio &#8216;Book&#8217; (Book.groovy) y llene dos stings, &#8216;title&#8217; y &#8216;author&#8217;.
</p>

<pre class='brush:groovy'>class Book {
 	String title
 	String author
 }
 </pre>

<p align='justify'>
  y cree valores iniciales en la clase Bootstrap.groovy:
</p>

<pre class='brush:groovy'>class BootStrap {
 	def init = { servletContext -&gt;
 		//Aquí se crea la información de prueba
 		new Book(author:'Domingo Suárez',title:'SpringHispano in Action').save()
 		new Book(author:'José Juan Reyes',title:'Grails.org.mx in Action').save()
 		}
 		def destroy = {
 		}
 	}
 </pre>

<p align='justify'>
  3. Cree el controller. D&eacute; clic derecho al nodo Controllers. Escriba &#8216;Book&#8217; y vea que se generar&aacute; la clase &#8216;BookControler&#8217;. Comente con diagonales la l&iacute;nea autogenerada y agregue &#8216;def scaffold = Book&#8217;, para que luzca aqu&eacute;l BookController.groovy algo as&iacute;:
</p>

<pre class='brush:groovy'>class BookController {
 	//def index = { }
 	def scaffold = Book
 </pre>

<p align='justify'>
  4. Por &uacute;ltimo, d&eacute; clic derecho a la aplicaci&oacute;n y seleccione &#8216;Run&#8217;. La aplicaci&oacute;n se despliega a jetty, como se puede apreciar en la ventana Services. De all&iacute;, hasta el infinito.
</p>

&nbsp;

* * *

&nbsp;

<p align='justify'>
  La integraci&oacute;n de Eclipse IDE con Grails est&aacute; en proceso. Se puede, hasta cierto punto, trabajar con un grado mediano de comodidad en &eacute;l. Empero, no deber&iacute;a ser la elecci&oacute;n en un ambiente de producci&oacute;n. Si tiene paciencia para los peque&ntilde;os (pero en momentos engorrosos) detalles (o bugs) del proyecto, puede ir observando su progreso, que poco a poco est&aacute; completando su desarrollo. Las siguientes observaciones son precisamente por este car&aacute;cter de &#8216;en desarrollo':
</p>

<p align='justify'>
  La primera consideraci&oacute;n con Eclipse es que se sabe que no correr&aacute; apropiadamente si se intenta usar el directorio ra&iacute;z de su unidad de almacenamiento para su proyecto, o rutas con espacios.
</p>

<p align='justify'>
  Se necesita enunciar la variable GRAILS_HOME, adem&aacute;s de en el ambiente est&aacute;ndar, en Eclipse. Dentro de Windows > Preferences&#8230; > Java > Build path > Classpath Variables > New introduzca dicha variable.
</p>

<p align='justify'>
  Al crear un nuevo proyecto, Eclipse crear&aacute; los archivos necesarios. Si el proyecto Grails que est&eacute; trabajando tiene plugins instalados, necesita agregarlos a los directorios directamente dentro del folder plugins/src/ de su ruta de fuentes de Eclipse. Esto se realiza dando clic derecho al folder &#8216;Groovy&#8217; o &#8216;Java&#8217; y seleccionando build path > source. De lo contrario, se objetndr&aacute;n errores en los enunciados de importaci&oacute;n.
</p>

<p align='justify'>
  Si se est&aacute;n usando JSPs necesiar&aacute; agregar la biblioteca tools.jar de su JDK al classpath del proyecto o jetty desplegar&aacute; errores de compilaci&oacute;n.
</p>

<p align='justify'>
  Si se est&aacute; usando el plugin Groovy de Eclipse aseg&uacute;rese de habilitar la preferencia &#8216;Disable Groovy Compiler Generating Class Files&#8217; (en Project > Preferences > Groovy Project Preferences, o si usa una versi&oacute;n muy anterior, en Windows > Preferences > Groovy Preferences). Predeterminadamente esta opci&oacute;n est&aacute; deshabilitada y genera archivos de clase para sus archivos groovy, almacen&aacute;ndolos en el basedir del proyecto Grails. Cuando se generan estos archivos, hay comportameinto inesperado como no poder generar controladores y vistas para sus clases de dominio. Empero, si va a usar el Step Debugging de Eclipse, aseg&uacute;rese de desabilitar esta preferencia.
</p>

<p align='justify'>
  Si presenta todav&iacute;a problemas, muy probablemente est&eacute; faltando una biblioteca. Aseg&uacute;rese que todas se agreguen al build path del proyecto.
</p>

&nbsp;

* * *

&nbsp;

<p align='justify'>
  Y ya encarrerados con IDEs que tienen soporte parcial para Groovy y Grails, Geany (<a href='http://www.geany.org/'>http://www.geany.org/</a>) tiene soporte para Groovy desde la versi&oacute;n 0.17 y no requiere mayor configuraci&oacute;n. No obstante, por ahora s&oacute;lo soporta completar c&oacute;digo para las clases locales, lo cual no es muy &uacute;til. Esto se est&aacute; actualizando, pero yo no esperar&iacute;a la soluci&oacute;n muy pronto.
</p>

&nbsp;

* * *

&nbsp;

<p align='justify'>
  En la siguiente entrada se mencionar&aacute;n los editores de texto con caracter&iacute;sticas adicionales.
</p>

<p align='justify'>
  A manera de comentario. Tengo entendido que tanto KDevelop como Anjuta est&aacute;n desarrollando soporte para Groovy y Grails, pero en ning&uacute;n lado encuentro en qu&eacute; estado se encuentran. &iquest;Alguien sabe algo al respecto?
</p>

<p align='justify'>
  <span style='color: red;'>Actualizaci&oacute;n</span> 2 julio &#8217;09. Me hab&iacute;an se&ntilde;alado, y se me olvid&oacute; mencionar, para quienes trabajan &#8216;en la nube&#8217; a <a href='http://www.aptana.com/cloud'>Aptana Cloud</a>. Tiene soporte para Java, Groovy y Rails, adem&aacute;s de PHP, Rails, Jaxer y pr&oacute;ximamente Python. Bastante amigable, y con posibilidades de cuentas sin tener que pagar mensualidad alguna. Conozco gente quien piensa que la nube es lo de hoy. S&oacute;lo menciono la alternativa.
</p>