---
title: ¿Buscando el caliz sagrado para el desarrollo de aplicaciones Web?
author: MIguel-1.mx
date: 2009-06-19
url: /2009/05/25/buscando-el-caliz-sagrado-para-el-desarrollo-de-aplicaciones-web/
categories:
  - Groovy
---
<p align="justify">
  La respuesta al desarrollo milenario que se logra en unas líneas aguarda para aquellos oídos que están dispuestos a tan aventuradas alternativas. Para conocer de este reino, opta por esta barca y sigue este camino. Este camino es todo, menos tortuoso. Y andarlo puede tomarle muy poco tiempo, sin necesidad de ya ser iniciado&#8230; el llamado está a unos clics de distancia.
</p>

<p align="justify">
  1. Descargar
</p>

  1. Groovy: <http://groovy.codehaus.org/Download> (se disponen binarios, código fuente e instalador para Windows, así como documentación en JavaDoc y en zip, en inglés)
  2. Grails: <http://www.grails.org/Download> (hay binarios en zip, en tar.gz, código fuente y documentación)
  3. Griffon: <http://griffon.codehaus.org/Download> (están binarios en zip, en tar.gz e instaladores IzPack (para varias plataformas) y .deb

<p align="justify">
  Alternativamente, revise al administrador de paquetes de la distribución de su sistema operativo. En la mayoría de ellos se incluye a Groovy en los repositorios predeterminados.
</p>

<p align="justify">
  2. Instalar
</p>

<p align="justify">
  Estos pasos suponen que el sistema tenga funcionando una instalación del SDK (Software Development Kit) de Java, versión 1.4 o superior, o 1.5 si desea instalar Griffon, aunque se recomienda enormemente la versión 1.6 (nunca está de más cerciorarse, <a href="http://blog.cr0.org/2009/05/write-once-own-everyone.html">Apple</a>; debajo encontrará cómo instalarlo, según su sistema operativo).
</p>

<p align="justify">
  En pocas palabras, debe desempaquetar las distribuciones descargadas en donde convenga en su sistema de archivos local, y agregar las variables de entorno de sistema GROOVY_HOME , GRAILS_HOME y GRIFFON_HOME apuntando a las rutas elegidas respectivamente; cerciorarse que la variable de entorno JAVA_HOME apunte al directorio donde instaló el SDK y agregar GROOVY_HOME/bin , GRAILS_HOME/bin y GRIFFON_HOME/bin a su variable de entorno PATH.
</p>

<p align="justify">
  Si lo prefiere en bastantes más palabras, el resto de la sección describe cómo agregar dichas variables de entorno, según su sistema operativo.
</p>

  1. Seleccione su variable de entorno JAVA\_HOME para que apunte a su JDK. En GNU/Linux y sistemas UNIX, *BSD y sistemas que cumplan con POSIX, el JDK deja un enlace simbólico en /usr/bin/java (revise hacia dónde apunta); en OS X bajo /Library/Java/Home la ruta se encuentra. En sistemas Windows el instalador de Java escribió la ruta debajo de la variable CLASSPATH, cuestión es de copiarla con el nombre JAVA\_HOME.
  2. GROOVY_HOME al directorio donde desempacó la distribución de Groovy.
  3. GRAILS_HOME que apunte a la ruta donde extrajo Grails.
  4. GRIFFON_HOME apuntando a la ruta elegida para Griffon.
  5. Agregue GROOVY\_HOME/bin , GRAILS\_HOME/bin y GRIFFON_HOME/bin a la variable de entorno PATH.

* * *

<p align="justify">
  Agregar variables de entorno por sistema operativo:
</p>

* * *

<p align="justify">
  En sistemas GNU/Linux, *BSD y sistemas que cumplan con POSIX, las variables globales de entorno se definen en dos archivos: /etc/environment y /etc/profile para cargar al inicio las mencionadas variables. Por ejemplo, para agregar la variable JAVA_HOME y ponerla en la variable PATH, se edita cualquiera de los archivos mencionados (pruebe primero con /etc/environment)
</p>

<p align="justify">
  Para /etc/environment, se agregará esta línea:
</p>

<pre class="brush:text">JAVA_HOME='/usr/lib/j2sdk1.5-sun'</pre>

<p align="justify">
  Suponiendo que su SDK está en /usr/lib/j2sdk1.5-sun ; verifique la ruta previamente, por ejemplo, mediante el comando &#8216;ls -la /usr/bin/java&#8217; el cual le mostrará la ruta hacia donde apunta el ejecutable de java.
</p>

<p align="justify">
  Para agregar a la variable de entorno PATH, agregue &#8216;:$JAVA_HOME:&#8217; (sin comillas) a la cadena de rutas. Los dos puntos sin incluir nada después de un directorio es tratado como el directorio de trabajo actual. Quedaría más o menos así:
</p>

<pre class="brush:text">PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/bin/X11:/usr/games:$JAVA_HOME:'</pre>

<p align="justify">
  Para /etc/profile se agregan usando la palabra export al final del archivo:
</p>

<pre class="brush:text">export JAVA_HOME='/usr/lib/j2sdk1.5-sun'
 export PATH='$PATH:$JAVA_HOME:'</pre>

* * *

<p align="justify">
  En MacOS X la definición de variables de entorno tiene alcance sólo para la sesión del usuario &#8216;actual&#8217;. Al iniciar sesión, la aplicación loginwindow busca un archivo de lista de propiedades en &#8216;~/.MacOSX/environment.plist&#8217;. Si existe, busca claves que sean &#8216;hijas&#8217; del elemento raíz. Puede utilizar la aplicación /Developer/Applications/PropertyListEditor.app y agregar &#8216;New Sibling&#8217; para cada variable que desee agregar al archivo citado, en formato XML.
</p>

<p align="justify">
  El artículo técnico de preguntas y respuestas de Apple <a href="http://developer.apple.com/qa/qa2001/qa1067.html">http://developer.apple.com/qa/qa2001/qa1067.html</a> explica a detalle este procedimiento.
</p>

* * *

<p align="justify">
  En DOS, Windows 95/98/ME, se puede agregar al archivo C:autoexec.bat variables de entorno siguiendo como sigue (ejemplo para JAVA_HOME):
</p>

<pre class="brush:text">set JAVA_HOME=C:j2sdk
 set PATH=.;C:j2sdk;%PATH%</pre>

<p align="justify">
  Suponiendo que el SDK esté en C:j2sdk y teniendo en cuenta dejar la variable %PATH% preferentemente al final del la cadena de rutas de archivo para la variable PATH. Cada ruta se separa mediante punto y coma.
</p>

* * *

<p align="justify">
  En Windows NT/2000/XP/2003/Vista/7 siga los siguientes pasos:
</p>

  1. Abra el panel de control
  2. Haga clic sobre el ícono &#8216;Sistema&#8217; y abrirá una ventana.
  3. Vaya a la ficha &#8216;Opciones avanzadas&#8217;
  4. Haga clic en el botón &#8216;Variables de entorno&#8217;, ubicado en la parte inferior.
  5. Hay dos ventanas separadas mostrando dos selecciones de variables de entorno. Seleccione el botón &#8216;Nueva&#8217; en la ventana de abajo para crear una nueva variable de entorno de sistema, o en el botón &#8216;Modificar&#8217; para editar una variable existente.

<p align="justify">
  En el ejemplo de JAVA_HOME, la ruta sería C:j2sdk si allí estuviera su SDK.
</p>

<p align="justify">
  Para la variable PATH, las rutas se separan por punto y coma y recuerde que los directorios se marcan con la diagonal invertida (), en lugar de la diagonal de los sistemas UNIX (/).
</p>

<p align="justify">
  Si el sistema operativo de su preferencia no se incluye en esta lista, sírvase mandar algún comentario al respecto; esperemos que exista &#8216;port&#8217; del SDK de Java, o de GNU Classpath.
</p>

* * *

<p align="justify">
  Con esto debería tener a Groovy, Grails y Griffon instalados. Puede comprobarlo escribiendo lo siguiente en una terminal de comandos. Para Groovy:
</p>

<pre class="brush:text">groovy -version</pre>

<p align="justify">
  Si regresa un mensaje similar a este (escribo x para no detallar una versión):
</p>

<pre class="brush:text">Groovy Version: 1.6.x JVM: 1.x</pre>

<p align="justify">
  Está listo para utilizar a Groovy. Puede probar el comando:
</p>

<pre class="brush:text">groovysh</pre>

<p align="justify">
  Lo cual creará una sesión de groovy interactiva para poder suministrar enunciados Groovy. O puede probar la consola interactiva Groovy escribiendo:
</p>

<pre class="brush:text">groovyConsole</pre>

<p align="justify">
  Y si desea correr un script específico de Groovy, escriba:
</p>

<pre class="brush:text">groovy scriptQueTenga.groovy</pre>

<p align="justify">
  donde scriptQueTenga es, como sugiere el nombre, un script que previamente haya conseguido.
</p>

<p align="justify">
  Para Grails. Escriba:
</p>

<pre class="brush:text">grails</pre>

<p align="justify">
  en la línea de comandos. Si obtiene un mensaje de ayuda similar a este:
</p>

<pre class="brush:text">Welcome to Grails 1.x - http://grails.org/

 Licensed under Apache Standard License 2.0

 Grails home is set to:</pre>

<p align="justify">
  está listo para comenzar a usar Grails.
</p>

<p align="justify">
  Para Griffon. En una consola de comandos, escriba:
</p>

<pre class="brush:text">griffon</pre>

<p align="justify">
  y espere respuesta. Si aparece un mensaje parecido a este:
</p>

<pre class="brush:text">Welcome to Griffon 0.x - http://griffon.codehaus.org/

 Licensed under Apache Standard License 2.0

 Griffon home is set to:</pre>

<p align="justify">
  está todo listo para que empiece a usar Griffon.
</p>

<p align="justify">
  * Instalar el SDK de Java de Sun
</p>

<p align="justify">
  Para instalar el Software Development Kit de Java simplemente vaya a la página de descargas de Java (http://java.sun.com/javase/downloads/index.jsp para la edición estándar) y seleccione el SDK que más le agrade. Sun ha preparado instaladores para diversos sistemas operativos. Simplemente siga las instrucciones allí enmarcadas y en unos minutos su sistema tendrá instalado el SDK. Compruebe en el administrador de paquetes de la distribución de su sistema operativo si existe el SDK de Java.
</p>