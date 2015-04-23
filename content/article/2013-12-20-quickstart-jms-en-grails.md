---
title: 'Quickstart: JMS en Grails'
author: neodevelop
layout: post
date: 2013-12-20
url: /2013/12/20/quickstart-jms-en-grails/
categories:
  - Grails
  - Groovy
  - Plugins
---
El uso de JMS dentro de las aplicaciones Java es una de las piedras angulares dentro del desarrollo JEE; permite que las aplicaciones se comuniquen de forma fiable por medio de mensajes asíncronos enviados a través de un broker e mensajería. JMS es bueno para sistemas distribuidos o procesamiento de tareas, lo cual puede ayudar a la escalabilidad.

## Elementos esenciales para el uso de JMS

Existen dos elementos esenciales en JMS, un productor de mensajes y un consumidor de mensajes. Así también, existen dos estilos principales para el envió de mensajes y para su consumo: Queues(Colas) y Topics(Tópicos).

Un Queue es un mecanismo punto-a-punto que usa el estilo de de almacén y reenvío para entregar un mensaje de un productor a un consumidor.

Un tópico es un mecanismo del tipo pub-sub donde una aplicación envía un mensaje  y todos los puntos que se han suscrito al tópico reciben el mensaje para procesarlo mientras estén activas.

### Spring y el JMSTemplate

&#8220;La clase JmsTemplate es central en el paquete básico de JMS. Simplifica el uso de JMS ya que se encarga de la creación y liberación de recursos al enviar o recibir mensajes de forma sincrónica.&#8221;

El [JmsTemplate][1] requiere una referencia a un ConnectionFactory, y este a su vez se referencia hacia el broker.

El envío de mensajes como lo resume Spring se puede ensamblar de la siguiente manera:

ConnectionFactory->Connection->Session->MessageProducer->send

La aplicación puede recibir mensajes si implementa un message listener. Y Spring a través del soporte de JMS permite implementarlo de forma muy sencilla con lo que denomina Message Driven POJO, por lo tanto no necesitamos codificar la interface [MessageListener][2].

Sin embargo, aunque podríamos implementarlo de forma conveniente, Spring nos provee del MessageListenerAdapter que es una forma de registrar un listener para recibir un mensaje sin ser invasivo con elementos de Spring.

La referencia que se hace aquí considera un poco de profundidad en temas como:

  * Queue
  * Topic
  * Listener
  * Service Activator
  * Spring JMS 
      * ConnectionFactory
      * Connection
      * Message Listener Containers

Que muy bien están detallados en [la documentación de Spring JMS.][3]

## El plugin de JMS para Grails

Muchos de los componentes mencionados anteriormente están ensamblados con el plugin de JMS, sin embargo, tenemos que indicar algunos de ellos como el broker y el ConnectionFactory.

Los elementos que describo durante la redacción de este artículo se ejecutaron con la versión de Grails 2.3.4, la cual, al parecer no resuelve algunas dependencias esenciales para su uso con JMS, por lo tanto una serie de elementos en el BuildConfig es necesaria.

Para comenzar con el uso del plugin tenemos que declararlo en la sección de plugins **BuildConfig.groovy**:

```gradle

plugins {  
  //...
  compile ":jms:1.2"  
  //...
}  
```

Una característica de ActiveMQ es que con sólo agregar la JAR a nuestro CLASSPATH, podemos contar con un broker de mensajería listo para usarse, el cual esta embebido en la JVM que nos ayuda a levantar la aplicación. Por lo tanto podemos agregarlo a nuestra sección de dependencias. Adicionalmente con la versión de Grails y la versión del plugin en cuestión surgen algunos problemas al no poder resolver algunas clases de SpringJMS por lo que agregarla también es necesario.

```gradle
  dependencies {
    compile(‘org.apache.activemq:activemq-core:5.3.0′,
            ‘org.apache.activemq:activeio-core:3.1.2′,
            ‘org.apache.xbean:xbean-spring:3.7′) {
              excludes ‘activemq-openwire-generator’
              excludes ‘commons-logging’
              excludes ‘xalan’
              excludes ‘xml-apis’
              excludes ‘spring-context’
              exported = false
            }
    compile ‘org.springframework:spring-context:3.2.5.RELEASE’
    compile ‘org.springframework:spring-jms:3.2.5.RELEASE’
}
```

Adicionalmente, tenemos que configurar  un par de beans adicionales con ayuda de **resources.groovy**, para definir nuestro ConnectionFactory.

```groovy
  import org.apache.activemq.ActiveMQConnectionFactory
  import org.springframework.jms.connection.SingleConnectionFactory

  beans = {
    jmsConnectionFactory(SingleConnectionFactory) {
      targetConnectionFactory = { ActiveMQConnectionFactory cf ->
        brokerURL = ‘vm://localhost’
      }
    }
  }
```

*Para demostrar la funcionalidad del envío de mensajes, supongamos que tenemos una clase de dominio y su scaffold, haremos uso de ello para sobreescribir algunos métodos y mandar el procesamiento hacia el broker de mensajería.*

### El productor de mensajes en el controller

El plugin de JMS nos provee de un servicio que ayuda al envío de mensajes, tiene un método &#8216;send&#8217; que provee varias implementaciones para su uso, [te recomiendo que veas la documentación del servicio.][4]

Nuestro controller quedaría:

[sourcecode language=&#8221;groovy&#8221;]  
package com.makingdevs

class ProjectController {

static scaffold = Project  
def jmsService

def save() {  
jmsService.send(queue:"project.new",params,"standard",null)  
flash.message = "Project creation queued"  
redirect(action:"index")  
}

def update(){  
jmsService.send(topic:"project.update",params,"standard",null)  
flash.message = "Project updating queued"  
redirect(action:"index")  
}  
}  
[/sourcecode]

### El consumidor de mensajes

Una vez implementado el controller, procedemos con la creación del consumidor, el cual delegamos a una clase de Servicio de Grails, el Service Listener, como se denomina ahora esta clase debe de tener un atributo estático que defina la exposición de JMS para el plugin y contar con un método &#8216;onMessage&#8217;, como la interfaz MessageListener.

[sourcecode language=&#8221;groovy&#8221;]  
class ProjectService {

static exposes = ["jms"]

def onMessage(msg) {  
// handle message  
}  
}  
[/sourcecode]

Sin embargo, el plugin provee de anotaciones para indicarle a un método que se expone como un listener de JMS que sea quien reciba el mensaje y actúe. Dicho método puede ser un Queue o un Topic, las anotaciones @Queue y @Subscriber nos ayudan a definir y direccionar el envío de mensajes, nuestro servicio quedaría:

[sourcecode language=&#8221;groovy&#8221;]  
package com.makingdevs

import grails.plugin.jms.*

class ProjectService {

static exposes = ["jms"]

@Queue(name="project.new")  
def createInQueue(msg) {  
println msg  
def p = new Project(msg)  
p.save()  
null  
}

@Subscriber(topic = "project.update")  
def updateInQueue(msg){  
println "updateInQueue : ${msg}"  
null  
}

@Subscriber(topic = "project.update")  
def updateBackupInQueue(msg){  
println "updateBackupInQueue : ${msg}"  
null  
}  
}  
[/sourcecode]

Al correr nuestra aplicación y navegar el scaffold, podremos ver claramente en la consola los deplegados respectivos en pantalla, notando que la llamada al Queue se ve reflejada al persistir una entidad, y la llamada a dos métodos servicio que son el Topic se ejecutan de forma simultánea al ejecutar un update. Para más información de como consumir un mensaje te recomiendo [eches un vistazo a la documentación del plugin.][5]

### Conclusión

La implementación de JMS ayuda mucho a crear aplicaciones que inician a demandar escalabilidad o delegar el procesamiento de un componente que requiere de tiempo para ejecutarse. Java nos provee una implementación robusta de JMS, y Grails nos facilita mucho incorporarlo a nuestra aplicación; embeber el broker con ActiveMQ y la abstracción del servicio que provee el plugin acelera la implementación pues con un servicio convencional de Grails se puede exponer un consumidor.

 [1]: http://docs.spring.io/spring/docs/3.1.4.RELEASE/javadoc-api/org/springframework/jms/core/JmsTemplate.html
 [2]: http://docs.oracle.com/javaee/6/api/javax/jms/MessageListener.html
 [3]: http://docs.spring.io/spring/docs/3.2.6.RELEASE/spring-framework-reference/htmlsingle/#jms
 [4]: http://gpc.github.io/grails-jms/docs/manual/guide/4.%20Sending%20Messages.html
 [5]: http://gpc.github.io/grails-jms/docs/manual/guide/5.%20Receiving%20Messages.html