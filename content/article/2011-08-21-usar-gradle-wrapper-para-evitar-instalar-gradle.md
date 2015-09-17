---
title: Usar Gradle Wrapper para evitar instalar Gradle
author: domix
date: 2011-08-21
url: /2011/08/21/usar-gradle-wrapper-para-evitar-instalar-gradle/
categories:
  - Gradle
  - Groovy
tags:
  - build
  - gradle
---
&nbsp;

Gradle es una excelente herramienta de construcci&oacute;n. Podr&iacute;a ser en conjunto son SBT las mas avanzadas en Java. Durante los a&ntilde;os se ha aprendido mucho de la experiencia de herramientas similares como Ant y Maven. Gradle y SBT han sabido aprovechar muy bien esta experiencia para beneficio de nosotros los desarrolladores.

Gradle es relativamente nuevo, muy poca gente lo conoce y puede ser que en algunas situaciones sea impedimento su uso, por que algo tan simple como tenerlo instalado, no ocurre. La gente que desarrollo Gradle pens&oacute; en casos en los cuales puedes compartir tu proyecto, pero sin necesidad de instalarlo cuando compartes tu proyecto (en tu maquina si debes tenerlo instalado primero). Esto es fant&aacute;stico porque por un lado, evitas que la gente que usa tu proyecto, instale Gradle; tambi&eacute;n es posible que tu proyecto use o requiera cierta versi&oacute;n especifica de Gradle, usando el fabuloso Gradle Wrapper, no tienes porque preocuparte.

Para que esto funcione solo tienes que crear un archivo de configuraci&oacute;n de Gradle, generalmente se llama build.gradle. El contenido de este archivo debe tener solo una tarea, como a continuaci&oacute;n se muestra:

&nbsp;

<pre class='brush: groovy; ruler: true;'>task createWrapper(type: Wrapper) {
     gradleVersion = '1.0-milestone-4'
 }
 </pre>

&nbsp;

Lo que vemos arriba es la definici&oacute;n de una tarea que se llama createWrapper (se puede llamar como tu quieras), que es de tipo Wrapper. Esta tarea lo &uacute;nico que define es la versi&oacute;n de Gradle, que vas a necesitar en tu proyecto. Aqu&iacute; puede ser cualquier versi&oacute;n valida de Gradle.

A continuaci&oacute;n en una terminal de tu sistema ejecutas a Gradle con el siguiente comando en el directorio donde esta tu archivo build.gradle:

&nbsp;

<pre class='brush: groovy; ruler: true;'>gradle createWrapper
 </pre>

&nbsp;

Este comando invoca a la versi&oacute;n de Gradle que tengas en tu maquina instalado, que bien puede ser diferente de la versi&oacute;n que especificaste en tu proyecto. Ya hab&iacute;a mencionado que cuando creas el proyecto es requisito tener instalado Gradle, el Gradle Wrapper evita que al compartir tu proyecto debas previamente instalar Gradle. Al terminar de ejecutarse Gradle te habr&aacute; dejado en el directorio donde esta tu proyecto los siguientes archivos y carpetas:

&nbsp;

  * **gradle**. Carpeta que contiene un jar con las clases necesarias para ejecutar el Gradle Wrapper
  * **gradlew**. Shell script para sistemas que usen una variante de UN*X
  * **gradlew.bat.** Archivo por lotes para Windows

&nbsp;

Cuando compartas tu proyecto solo sera necesario que en lugar de usar el comando gradle, usen gradlew, si no tienen la versi&oacute;n de Gradle, el Wrapper lo descargara de internet y lo instalara (solo descomprime un ZIP en tu directorio home) para que sea usado en tu proyecto.

As&iacute; puedes seguir a&ntilde;adiendo mas tareas o plugins a tu build de Gradle o actualizar la versi&oacute;n de Gradle y no forzar a las dem&aacute;s personas que instalen antes de usar tu proyecto. Gradle Wrapper hara ese trabajo.

&nbsp;