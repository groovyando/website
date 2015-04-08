---
title: JMS configuración rápida en Grails
author: sohjiro
layout: post
date: 2012-10-03
url: /2012/10/03/jms-configuracion-rapida-en-grails/
categories:
  - Grails
  - Groovy
---
JMS es una API creada por Sun Microsystems para el uso de colas de mensajes. Es una librería estándar de mensajería que permite crear, enviar, recibir y leer mensajes de manera síncrona y asíncrona.<sup>1</sup>

Esta API se puede implementar en muchas aplicaciones Java pero ¿como la podemos integrar en una aplicación creada con Grails?

Bueno este artículo está dedicado para implementarla ocupando el plugin de JMS 1.2 y activemq 5.3.0. Para empezar asumiremos que ya se tiene un proyecto creado en grails y agregaremos la siguiente dependencia dentro del archivo ***BuildConfig.groovy*** en el apartado correspondiente:

[sourcecode language=&#8221;groovy&#8221;]  
compile &#8216;org.apache.activemq:activemq-core:5.3.0&#8242;  
[/sourcecode]

Después, dentro del mismo archivo agregaremos el plugin de JMS:

[sourcecode language=&#8221;groovy&#8221;]  
compile ":jms:1.2"  
[/sourcecode]

<p style="text-align: left;">
  <strong></strong> Una vez que grails descargue las dependencias necesarias y los plugins necesarios vamos a proceder a configurar el jmsConnectionFactory dentro del <strong><em>resources.groovy</em></strong>
</p>

[sourcecode language=&#8221;groovy&#8221;]

beans = {  
jmsConnectionFactory(org.apache.activemq.ActiveMQConnectionFactory) {  
brokerURL = &#8216;vm://localhost&#8217;  
}  
}

[/sourcecode]

Una vez que tenemos esto solamente debemos hacer referencia en el lugar de nuestra elección de la siguiente manera:

[sourcecode language=&#8221;groovy&#8221;]  
def jmsService  
[/sourcecode]

Y para enviar el mensaje hacemos lo siguiente:

[sourcecode language=&#8221;groovy&#8221;]  
jmsService.send(queue:&#8217;queueName&#8217;, params)  
[/sourcecode]

Y el método que queremos que responda a la petición lo anotamos con @Queue

[sourcecode language=&#8221;groovy&#8221;]  
@Queue(name=&#8217;queueName&#8217;)  
def doSomething(params){  
// Procesar los datos  
}  
[/sourcecode]

Si bien esta es una manera sencilla de hacerlo no es la mejor para ambientes de producción ya que falta algo de tunning sin embargo el propósito de este artículo es que el desarrollador vea que de una manera sencilla se pueden hacer grandes cosas.

Saludos y gracias por leer mi primer post.

<sup>1</sup> [http://es.wikipedia.org/wiki/Java\_Message\_Service][1]

<http://gpc.github.com/grails-jms/docs/manual/index.html>

<http://leanjavaengineering.wordpress.com/2011/10/12/using-jms-in-grails/>

 [1]: http://es.wikipedia.org/wiki/Java_Message_Service