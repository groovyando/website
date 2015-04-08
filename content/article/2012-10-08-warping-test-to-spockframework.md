---
title: Warping Test to Spockframework
author: neodevelop
layout: post
date: 2012-10-08
url: /2012/10/08/warping-test-to-spockframework/
categories:
  - Groovy
  - Testing
---
Hola!

En esta ocasión les quiero mostrar un pequeño script de ejemplo para realizar pruebas con [SpockFramework][1], una herramienta hecha en Groovy para hacer específicaciones, y que da pie a introducirse al [BDD(Behavior Driven Development)][2] de una manera sencilla.

Este ejemplo lo tomé de la documentación de Spock y en verdad es muy ilustrativo:

<pre class="brush:groovy;">package com.synergyj.ejemplo3

import spock.lang.Specification

class MiEspecificacion extends Specification {

  // Una especificación muy simple
  def "calcula el máximo de dos números"(){
    expect:
      Math.max(a,b) == c
    where:
      a &lt;&lt; [4,9,10]
      b &lt;&lt; [7,3,50]
      c &lt;&lt; [7,9,50]
      //c &lt;&lt; [0,0,0]
  }
}</pre>

Ahora bien, he hecho una especificación que denota un poco más las fases de ejecución e interpretación de un método por Spock y que es para un buen entendimiento de donde puedes poner cada cosa dentro de tu Spec:

<pre class="brush:groovy;">package com.synergyj.ejemplo3

import spock.lang.Specification

class MiEspecificacionExplicada extends Specification {

  // Especificando a Spock
  def "mostrar el ciclo de ejecución de Spock"(){
    setup: "Aqui puedes inicializar recursos que necesites para la especificacion"
      println "Inicializando recursos para\t\t${a}\t\t${b}\t\t${tamanio}"
    and: "Y algo más si lo deseas"
    //given: "O bien contextualizarlo como un feature con given-when-then, es un alias de setup"
    when: "Ejecutas acciones concretas, incluso de objetos no definidos aún"
      a.toLowerCase()
    then: "Evaluas los resultados de las acciones, por lo generla ocurrió algún efecto colateral"
      a.size() == tamanio
    expect: "Similar a when-then juntos, pero se usa para métodos pruamente funcionales"
      a.toLowerCase() == b
    cleanup: "Aqui puedes inicializar recursos que necesites para la especificacion"
      println "Limpiando recursos para\t\t\t\t${a}\t\t${b}\t\t${tamanio}"
    where: "Condiciones varias que serán evaluadas tantas veces como valores tengamos"
      a       | b       | tamanio
      "HOLA"  | "hola"  | 4
      "MUNDO" | "mundo" | 5
  }

}</pre>

Muy útil para identificar que hace cada parte en Spock!

 [1]: http://code.google.com/p/spock/
 [2]: http://en.wikipedia.org/wiki/Behavior-driven_development