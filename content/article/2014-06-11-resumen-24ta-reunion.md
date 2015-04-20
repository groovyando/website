---
title: Resumen 24ta. Reunión de Grails.org.mx y SpringHispano.org
author: MIguel-1.mx
layout: post
date: 2014-06-11
url: /2014/06/11/resumen-24ta-reunion/
categories:
  - Gradle
  - Griffon
  - Groovy
  - Podcast Grails
tags:
  - reunion
---
Comenzaba el mes de abril. Un día medio soleado despuntaba para revivir un tiempo que marcó época, el tiempo en que al menos cada mes nos reuníamos y compartíamos sobre la tecnología que nos apasionaba. Y ese sábado, como el primero de ellos, como algunos otros, como parecía que tenía uno o dos meses sin vernos, aquél sábado 5, [Andrés Almiray][2] ([@aalmiray][1]), el padrino de las reuniones, nos habló de [Gradle][3] y [Spock][5].

Así fue que caímos en cuenta cuánto tiempo había pasado, que nuestro espíritu quedó ligeramente aletargado, y las comunidades, inactivas. El expositor inició recordando la primera reunión que se dio, los orígenes de las charlas y la actividad que se tuvo durante todo el tiempo, y después, la pasividad. Si bien, hubo algunas reuniones entre semana el año pasado, dejaron también de suceder, y con esta charla, exhortó a seguir, a continuar con este espacio de colaboración, de la manera como sabemos: compartiendo tecnología.

En pocas palabras, los temas fueron [Gradle][3], para construcción de proyectos, y [Spock][5], para pruebas. Sometió a votación con cuál iniciar, y los asistentes decantamos en favor de [Gradle][3]. Inició con una breve historia de los programas para la construcción de proyectos en Java. [Apache Maven][6] se usa ampliamente, sin vérsele mucho problema. Si comparamos [Maven][6] contra [Ant][7], tiene ciertas ventajas. Empero, en el día a día, sus problemas son tan cotidianos que los dejamos pasar. En la JVM ningún constructor de proyectos existía. Con la llegada de [Apache Ant][7] se pudo hacer mucho, pero su enorme flexibilidad era su problema, porque debía declararse extensivamente cada tarea que se habría de ejecutar.

Una mejora para Maven 1 fue la programación declarativa con _XML_ mediante [Jelly][8]. Con Maven 2 llegaron los _MOJO_, versión de _POJO_ «a la Maven» conduciendo plugins que hicieron más rígido el procedimientlo y agregaron otro problema sobre conflictos de versiones. Por el lado positivo, [Maven][6] dio un estándar para manejar relaciones en dependencias. [Ivy][9], en estado zombie, descarga dependencias para [Ant][7]. [Maven][6] parece ser el estándar, pues se usa en muchos lados. El problema en que si se deja de declarar la versión exacta de dependencias, [Maven][6] actualiza los paquetes. Deben definirse versiones transitivas y contra qué versión de la _JDK_ se trabaja.

Un ejemplo típico es al utilizar [Jetty][10], [Maven][6] lo actualizaba automáticamente a la versión estable. Eso rompía la posibilidad de tener builds reproducibles. Por supuesto que [Maven][6] funciona, tan funciona que de cierta manera se ha vuelto «de facto», el repositorio central de Maven, nada más por mencionar algo, pero tiene muchos problemas que se repiten enormemente.

En las primeras versiones de [Tomcat][11], se generó [Ant][7] con _XML_, a finales del milenio pasado, cada vez que se debía externalizar un concepto, se usaba _XML_, el autor del futuro. El autor de [Ant][7] pidió disculpas por haber usado _XML_. El segundo problema, se compilan fuentes, se procesan recursos, y se ejecutan pruebas en cada fase. El árbol de definición de metas es muy rígida, solo se pueden eliminar metas, dejando poco flexible para comportamiento pre o post para una meta. Y muy probablemente se le ocurrirán más ejemplos similares.

## Gradle

<iframe src="https://player.vimeo.com/video/93213844" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[Gradle][3], con base en la experiencia de los sistemas anteriores, permite una flexibilidad para una meta. [Gradle][3] permite tips para brincar. _Build helper_ permitía juntar proyectos de distintas naturalezas para construir, pero deja de ser agradable por _plugins_ que requieren acceso a múltiples fuentes. Proyectos similares que conduzcan a distintas versiones de _JDK_ todavía requerirán proyectos separados. La mayoría de [Gradle][3] está construido en _Java_, solo tiene una capa de [Groovy][12] encima, para tener una definición declarativa. Pueden escribirse sus _plugins_ en [Groovy][12] o _Java_.

El expositor creó un directorio. [Gradle][3] puede seguir las convenciones de [Maven][6] u omitirlas.

`src/main/java/sample` y allí crea una nueva clase.

`Foo.java` – En un principio no había [IDEs][13], para mucha gente el [IDE][13] estorba. Para muchos, ni siquiera el `public void static main` puede verse claro, o es más, cómo se ejecuta.


```java
Package sample;
public class Foo {
public stati8c void main (String[] args)
```

> Una clase simple.

En [www.gradle.org][3] tienen soporte profesional, pero generalmente se trata de desde descargar un zip y se agrega una variable de entorno. Recomienda usar [GVM][14] y lo puso con ejemplo:

```bash
$ gvm u gradle 1.11

Using gradle version 1.11 in this shell

$ gvm list candidate
```

Se describieron los conceptos de gaiden, gradle, grails, griffon, glide, groovy, groovyserv, lazybones, springboot, vertx.

Con Gradle instalado se puede dar mucha información. Gradle ha causado tanto furor que incluso Maven ha copiado ideas.

Si se ejecuta gradle sin argumentos, termina sin argumentos. Puede listar tareas.

Comencemos construyendo el build.gradle. Para construir un proyecto Java siguiendo las convenciones de Maven basta con aplicar un plugin.

<pre>apply plugin: 'java'</pre>

En Java las comillas dobles y el signo de pesos la vuelve variable mutable. Eso es lo único que debe hacerse por el momento.

Una vez guardado el archivo se disponen de muchas más tareas. Por ejemplo, check o test para verificaar.

<pre>&gt; gradle build</pre>

Mustra el orden en que se ejecutan las tareas. Comprueba si las entradas o las salidas han cambiado y salta las que detecta sin cambios. Se guarda el caché en ~/.gradle por referencia, reduciendo tiempos. Ni siquiera Maven 4 lo tiene. En multiproyectos, Maven realiza las pruebas 2 veces.

La primera vez que se ejecuta gradle se levanta un daemon que se va al fondo.

<pre>&gt; gradle wrapper

Build successful</pre>

Crea un directorio gradle para ejecutarse en entornos sin gradle. Con gradlew el build es 100% reproducible y si la otra persona no tiene tal herramienta. Maven y Tesla han dado de ellos.

<pre>&gt; gradle clean</pre>

Limpia el asunto.

<pre>&gt; gradle build</pre>

En build.gradle

<pre>apply plugin: 'java'

version = '1.0.0.SNAPSHOT'

-- El scope provided de Maven aún no está en Gradle

&gt; gradle clean build

&gt; tree</pre>

Se muestra el contenido

En build.gradle

<pre>apply plugin: 'java'

version = '1.0.0.SNAPSHOT'

jar {
   manifest {
      attributes(
         'LLAVE': 'VALOR'
      )
   }
}</pre>

En el manifest se puede agregar quién construyó el proyecto, variables y cualquier info que se quiera agregar.

En gradle-plugins (aalmiray.github.io/gradle-plugins/) se encuentra una lista extraoficial.

El repositorio utiliza las convenciones de Maven. Si no se conffigura nada, el repositorio predeterminado es inexistente.

En build.gradle

<pre>apply plugin: 'java'

version = '1.0.0.SNAPSHOT'

dependencies {
   testCompile 'junit:junit:4.11'
}

jar {
   manifest {
      attributes(
         'LLAVE': 'VALOR'
      )
   }
}</pre>

Cuando se hace un proyecto Maven, no debe especificarse que se trata de un proyecto. Gradle no asume de qué repositorio va a jalar las dependencias.

En build.gradle

<pre>apply plugin: 'java'

version = '1.0.0.SNAPSHOT'

repositories {
   //mavenCentral()
   //mavenLocal()
   //maven {url: 'http://github.com/aalmiray' }
   //flatDir { dirs '' }
   jcenter()
}

dependencies {
   testCompile 'junit:junit:4.11'
}

jar {
   manifest {
      attributes(
         'LLAVE': 'VALOR'
      )
   }
}</pre>

Con paquetes como bitrade, jcenter, administración de binarios de manera social. Resuelve más rápido que Maven Central y bitrate permite incluso que tu paquete se pueda compartir a Maven Central, si tienes cuenta en Sonatype. Algo que no les gusta a Sonatype es especificar dependencias a repos locales. Es más flexible. Grails 2.4 debe tenerlo.

Hay mucha sinergia en el ecosistema Groovy.

<pre>&gt; mkdir -p src/test/java/sample</pre>

Snapshots son mucho mejor.

<pre>En FooTest.java
package sample;

import org,.junit.*;
import static.org.junit.Assert.*;

public class FooTest {
    @Test
   public void probarSaludar() {
       Foo foo = new Foo();
       String resultado = foo.saludar(“Java”);
       assertEquals(“Hola Java”, resultado);
}

En Foo.java:

public class Foo {
  public stati8c void main (String[] args)

&gt; gradle test</pre>

La primera vez, 1.6 segundos, la segunda, 0.5. En gradle se pueden paralelizar las pruebas.

Reportes: Junit no tiene un estándar ni definición de reportes.

<pre>Haciendo que falle la prueba, En FooTest.java
package sample;

import org,.junit.*;
import static.org.junit.Assert.*;

public class FooTest {
    @Test
   public void probarSaludar() {
       Foo foo = new Foo();
       String resultado = foo.saludar(“Java”);
       assertEquals(“Hola Groovy”, resultado);
}</pre>

Ahora el reporte muestra la falla.

En múltiples proyectos. Un problema con Maven es que no se nota si un hermano ha cambiado. Todo lo que cambia, se ejecuta, y luego el segundo hermano.

Creamos un directorio multi y dos subproyectos

<pre>&gt; mkdir multi
&gt; cd multi
&gt; mkdir core ext
&gt; mkdir -p core/src/main/java/foo
&gt; mkdir -p ext/src/main/java/foo</pre>

En el core generamos una clase Version.java

<pre>public class Version {
   public static int getVersion() {
      return 1;
   }
}</pre>

Luego en el de extensión:

<pre>Extension.java
package foo;

public class Extension {
   pulbic String getNombre() {
      return “Foo: “ + version”
   }
}</pre>

En build.gradle

<pre>apply plugin: 'base'

version = '0.0.0.SNAPSHOT'

allprojects {
   repositories {
      jcenter()
   }
}

subprojects {
   apply plugin: 'java'

   dependencies {
      testCompile 'junit:junit:4.11'
   }
}</pre>

Con esto se evita duplicar info para proyectos hijos.

El build.gradle del core debe estar vacío en los proyectos hijos.

En el build del proyecto hermano:

<pre>dependencies {
   compile project(':core')
}</pre>

Por último, un archivo adicional le dice cuáles son los subproyectos que dirán cuáles son los subproyectos que incluirá:

<pre>settings.gradle
include 'core'
include 'ext'</pre>

En el raíz se especifica, bajo settings.gradle, la ruta y nombre de dónde se encuentra cada proyecto.

“${fileBAseName}.gradle”, el caso de una variable.

Al ejecutar el gradle del proyecto core, primero compila el core, luego la extensión, similar a Maven Reactor.

En el directorio de extensión, al cambiar la entrada, verifica si los recursos de entrada cambia. Con esto se evita trabajar con binarios desactualizados.

Puede pedirse que se limpie y se recompile

<pre>&gt; gradle :core:clean

&gt; gradle :core:test</pre>

Esas son grandes ventajas. El  proyecto que siga, que supere esto, en sus palabras, «será la bomba».

Para agregar dependencias solo a ciertos hijos

<pre>subprojects {suproject -&gt;
   if (subproject.name == 'persistencia' {
      compile 'org.hibernate:hibernate:123'

 O bien, con persistencias de Groovy:
   if (subproject.name =~ /-persistencia/ {
      compile 'org.hibernate:hibernate:123'</pre>

Para plugin management

<pre>ext.hibernateVersion = '123'</pre>

Se pueden agregar propiedades en gradle.properties

<pre>ext.hbiernateVersion = '123'</pre>

Para integración continua, dependiendo el servidor de integración, por ejemplo travis.ml. After success pide a Gradle un generado para toda la cobertura. El ambiente de integración continua debe proporcionar la facilidad.

Con maven-publish se puede publicar a MavenLocal.

El pom se puede agregar una configuración declarativa

Algo para mencionar: estos archivos se ejecutan dos veces. La primera vez, para configuración, qué cosas son posibles, qué tareas, qué configs o repos y la fase de ejecución, cuando el grafo de tareas se construyó, y pueden agregarse o modificarse tareas. La documentación de Gradle es muy buena, superior a la de Maven. No solo basta qué tareas adicionales debo tener, sino qué tareas se ejecutan antes y después. En Maven se ejecutan alfabéticamente si usan Junit, o todo revuelto.

Puede especificarse si la tarea tiene éxito o fallo, se genere un reporte y que se hagan todas las pruebas de calidad. Al tener el control del orden, se compilan las pruebas, incluso de integración, una sola vez.

Pueden obtenerse jars locales y agregarse con flatDir o mediante MavenLocal.

MOJOs desde Gradle, el problema es el orden de búsqueda. No puede usarse el binario, pero el fuente sí.

grade.org describe DCL y sus plugins. Al menos 3 libros de O&#8217;Reilly, mrhaki.glogspot.com con nuevas monerías de features de gradle, groovy.

Es posible desde Gradle ejecutar tareas de Ant. No necesariamente de Maven, por bootstrap, debe configurarse una instancia adecuada. Pero se puede traducir la fuente del MOJO.

<hr width="35%" />

El receso fue reencontrarse con viejos amigos, conocer a nuevos y constatar que la tecnología avanza, pero es el factor humano quien le da sentido y los lazos humanos, la barrera donde nunca llegarán las computadoras. Pero en lo que sí son buenas las computadoras es en automatizar procesos, clasificar información y hacer cosas repetitivas tantas veces como se requieran. Y de eso habló el segundo tema, prubas con Spock.

<hr width="35%" />

## Spock

El autor, austriaco, es un Trekie. El DSL de pruebas es lógico, evidente para crear las cosas. Puede incluso hacer dependencias circulares.

Escribió una prueba de Junit a la Java. Deben generarse campos para la prueba, un constructor y la inicialización de los parámetros. JunitUtils permite la parametrización de pruebas mucho más sencilla. Básicamente se crean casos de pruebas, uno por cada renglón.

En Spock es mucho más sencillo.

<pre>FooSpeck.groovy
package foo

import spock.lang.*

class FooSpec extends Specification {
   def voyAProbarAlgoConEsteMetodo() {
      given:
         List names = [
            'spock', 'kirk', 'bones'
         ]
      when:
         names = names*.capitalize()
      then:
         names[0] == 'Spock'
         names[1] == 'Kirk'
         names[2] == 'Bones'
   }
}</pre>

La primera parte es probar sin demasiados asserts. Si falla uno, ignoraremos si los demás también fallaba.

FooSpeck.groovy

<pre>package foo

import spock.lang.*

class FooSpec extends Specification {
   def voyAProbarAlgoConEsteMetodo() {
      expect:
         name.capitalize() == expected
      where:
         name  | expected
        'spock' | 'Spock'
        'kirk'    | 'Kirk'
        'bones' | 'Bones'
   }
}</pre>

En el bloque de definición, se tienenn strings y un assert sin usar. La biblioteca de Spock “secuestra” el compilador y Spock mueve el código para hacerlo adecuado. Por cada renglón creará una iteración y la asignará a cada variable, mucho más sencillo.

<pre>&gt; gradle clean test</pre>

Exitosa

Al abrirla se obtiene una lista unificada. Para tener la de todas, o de cada una, puede agregarse:

FooSpeck.groovy

<pre>package foo

import spock.lang.*

@Unroll
class FooSpec extends Specification {
   def voyAProbarAlgoConEsteMetodo() {
      expect:
         name.capitalize() == expected
      where:
         name  | expected
        'spock' | 'Spock'
        'kirk'    | 'Kirk'
        'bones' | 'Bones'
   }
}</pre>

Un problema de la computación es darle nombre a las cosas.

def “Aplicar capitalize() a #name resulta en #expected”() en Spock es válido y lo utiliza.

La JVM permite utilizar muchos más carácteres, por ejemplo, una clase cualquiera:

def “”” y un multistring, sigue funcionando.

Spock define en especificación para los reportes. Permite agregar texto de manera simlar a Cucumber, etc. y reportes amigables al cliente.

Esta capacidad de expresión y pruebas dirigidas por datos son suficientes. ScalaCheck Engwise Testing. Si quisiéramos generar datos dinámicos:

FooSpeck.groovy

<pre>package foo

import spock.lang.*

@Unroll
class FooSpec extends Specification {
   def voyAProbarAlgoConEsteMetodo() {
      expect:
         name.capitalize() == expected
      where:
         name &lt;&lt; ['spock', 'kirk', 'bones']
         name &lt;&lt; ['Spock', 'Kirk', 'Bones']

   }
}</pre>

El powerAssert está desde Groovy 1.6 (en scala, Spocky es la alternativa).

Cualquier cosa que extienda iterable se puede consumir en la prueba, incluso conectarse a la base de datos.

<pre>FooSpeck.groovy
package foo

import spock.lang.*

@Unroll
class FooSpec extends Specification {
   def voyAProbarAlgoConEsteMetodo() {
      expect:
         name.capitalize() == expected
      where:
         name &lt;&lt; ['spock', 'kirk', 'bones']
         name &lt;&lt; ['Spock', 'Kirk', 'Bones']

   }
}</pre>

Las reglas @Rule de Junit 1.4 permiten ejecutar cosas antes y después. Lo importante viene debajo.

Puede usarse PowerMock, Mockito u otros.

Describió detalles para cleanupSpec. Para cada adicional, MockSpeck.

Mostró ejemplos de Asciidoctor con Mocks. Un mock es estricto en argumentos y orden. Puedo separar bloques mediante «and:» y lo revisará en el orden que se desee, al extremo de _ \*  \_.\_(\*_)

En Spock no se llaman Spocks, no interacciones.

En Spock se pueden concatenar pruebas. Con @Stepwise se ejecutan los estados, basándose en el estado final de la prueba anterior. Funciona también con @Unroll.

EasyBee escribe escenarios, con referencias a otros escenarios. Dependencias hacia arriba, no hacia abajo, puede ser una buena idea para una extensión.

GmavenPlus y la jar de Spock es todo lo que se necesita para integrarlo a un objeto Java.

Springboot – Ratpack – es otro proyecto a considerar.



[Mensaje breve del fundador de grails.org.mx para pedir ayuda de la comunidad][4] from [Grails.org.mx][2] on [Vimeo][3].

Y así de repente se fueron las horas, se quedó con ganas de seguir, y precisamente es el sentimiento que estas breves líneas desean impregnar: es momento de hacer florecer nuestras comunidades. Es tiempo de recuperar y continuar nuestra dinámica&#8230; pero esa, es otra historia, historia que invitamos a colaborar juntos, hombro con hombro.
 
 [1]: http://twitter.com/aalmiray
 [2]: http://www.jroller.com/aalmiray/
 [3]: https://gradle.org/
 [4]: http://vimeo.com/92464572
 [5]: http://spockframework.org
 [6]: https://maven.apache.org/
 [7]: http://ant.apache.org/
 [8]: http://commons.apache.org/proper/commons-jelly/
 [9]: http://ant.apache.org/ivy/
 [10]: http://eclipse.org/jetty/
 [11]: http://tomcat.apache.org/
 [12]: http://groovy-lang.org/
 [13]: http://en.wikipedia.org/wiki/Integrated_development_environment
 [14]: http://gvmtool.net/