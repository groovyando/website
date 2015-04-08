---
title: Testing con GroovyTestCase
author: neodevelop
layout: post
date: 2012-06-25
url: /2012/06/25/testing-con-groovytestcase/
categories:
  - Groovy
tags:
  - stack
  - test
  - testing
---
Hace poco tuve la oportunidad de dar una conferencia muy breve en un congreso, el cual contemplaba temáticas muy variadas en lo que a desarrollo de software corresponde. Y si bien de mi parte aunque sentí que pude abarcar los temas que deseaba pues no lo considere suficiente, por lo que decidi escribir algunos artículos que describan las tecnologías que expuse, y de a poco irlas integrando.

Entremos en materia al respecto de esto; lo que propuse inicialmente fue una clase PilaSimple, la cual, no tenía implementaciones muy profundas, solo me base en una lista e hice que se comportara como Pila con la definición de los métodos push, pop y peek, y un par de métodos más para determinar si la pila esta llena o vacía: isEmpty & isFull, aquí la implementación:

<pre class="brush:groovy;">// Definición de la clase pila
class PilaSimple {
  static MAXSIZE = 10 // Número máximo de elementos para la pila
  private items = [] // Almacenamietno de la pila

  // Método que coloca un elemento en la pila
  def push(object) {
    // Si superamos el tamaño de la pila entonces arrojamos error
    if (items.size() == MAXSIZE) throw new RuntimeException("Pila llena")
    // En caso contrario solo agregamos el elemento
    items &lt;&lt; object
  }

  // Método que saca el elemento de la pila
  def pop() {
    // Si no hay objetos en la pila entonces arrojamos error
    if (!items) throw new RuntimeException("La pila está vacía")
    // Quitamos el ultimo elemento de la pila
    items.pop()
  }

  // Observamos cual es el ultimo elemento insertado sin quitarlo
  def peek() {
    if (!items) throw new RuntimeException("La pila está vacía")
    // Uso de azúcar sintáctica de Groovy
    items[-1]
  }

  // Método que determina si la pila esta vacía
  boolean isEmpty() {
    items.isEmpty()
  }

  // Método que determina si la pila esta llena
  boolean isFull() {
    items.size() == MAXSIZE
  }
}</pre>

Hecho esto, me dispuse a hacer los casos de prueba pertinentes, y como tal me he ayudado de la clase **GroovyTestCase**, la cual simplifica las pruebas con **JUnit** en varias maneras, incluyendo:

  * JUnit esta dentro del runtime de Groovy, por lo  que no necesitamos agregarlo al classpath y podemos probar directamente Groovy y/o Java
  * Groovy provee sentencias de aserciones adicionales a las de JUnit
  * Podemos agregar estas pruebas a nuestro sistema de construcción Ant o Maven, o bien Gradle
  * Groovy provee de Mocks, llamados Groovy Mocks

Una clase muy simple con el uso de **GroovyTestCase** sería:

<pre class="brush:groovy;">class MyTest extends GroovyTestCase {
    void testSomething() {
        assert 1 == 1
        assert 2 + 2 == 4 : "We're in trouble, arithmetic is broken"
    }
}</pre>

Pero regresando a la clase de la Pila que previamente habíamos hecho pues vamos a probarla:

<pre class="brush:groovy;">// Clase groovy que hereda de GTC
class NonEmptyPilaSimpleTest extends GroovyTestCase {
  // Definiciuón de nuestro elemento a probar
  private stack

  // Al igual que en JUnit podemos contar con este método
  void setUp() {
    // Inicializació del elemento
    stack = new PilaSimple()
    // Agregamos 3 elementos a la pila
    [ "a", "b", "c" ].each{ x -&gt; stack.push x }
  }

  // Los métodos de prueba inician con la palabra 'test'
  void testPreCondiciones() {
    // La pila no esta vacia
    assert !stack.isEmpty()
  }

  void testPushAndPeek() {
    // Agregamos un elemeneto
    stack.push "d"
    // Observamos el último elemento agregado
    assert stack.peek() == "d"
  }

  void testPushPopAndPeek() {
    // Introducimos un elemento
    stack.push "anything"
    // Sacamos el elemento
    stack.pop()
    // Observamos el elemento en el tope de la pila
    assert stack.peek() == "c"
  }

}</pre>

Finalmente, para no extender el post, uno de los métodos que agrega Groovy en las pruebas es **shouldFail**, que acepta un closure como último argumento y un Class como primer argumento opcional(bueno esta sobrecargado), el cual indica que para que la prueba tenga éxito deberá arrojar una excepción y podemos decirle inclusive el tipo de excepción, para nuestro ejemplo de PilaSimple hemos arrojado excepciones en los casos donde la pila este vacía o esta llena, entonces probemos:

<pre class="brush:groovy;">class EmptyPilaSimpleTest extends GroovyTestCase {
  // Definición de la pila
  private stack = new PilaSimple()

  // La pila esta vacía
  void testPreConditions() {
    assert stack.isEmpty()
  }

  // Como la pila esta vacía esto arroja excepcion
  void testPeekWithEmptyStack() {
    // Uso de shouldFail, para que tega exito debe arrojar excepción
    shouldFail(RuntimeException) {
      stack.peek()
    }
  }

  void testPopWithEmptyStack() {
    shouldFail(RuntimeException) {
      stack.pop()
    }
  }
}</pre>

En realidad es muy simple hacer casos de prueba unitarios con Groovy, a mi me ha servido inclusive para hacer algunas katas en donde primero tengo que realizar los tests. Espero también le sirva a ustedes.

Saludos