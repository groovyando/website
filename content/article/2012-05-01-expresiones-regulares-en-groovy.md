---
title: Expresiones regulares en Groovy
author: neodevelop
date: 2012-05-01
url: /2012/05/01/expresiones-regulares-en-groovy/
categories:
  - Groovy
tags:
  - regex
---
Las expresiones regulares son un elemento muy poderoso para cualquier lenguaje, sin embargo, también pueden causar un dolor de cabeza al momento de formularlas, especialmente si lo hacemos en `Java`.

`Groovy` viene a alivianar esta carga con un par de operadores  y patrones más sencillos de escribir.

  * El operador `regex =~`
  * El operador `match ==~`
  * El operador patrón `~String`
  * `Slashy /String/`

Las expresiones regulares son definidas por patrones. Un patrón puede ser cualquier cosa desde un simple carácter, una cadena, o algo con un formato específico.

Para esto les pongo un ejemplo:

```groovy
def usoDePatternDespuesMatcher(pattern, texto) {
  def matcher = texto =~ pattern // Creación del matcher
  
  println "Ha coincidido ${matcher.size()} veces"
  println "Con los elementos:"
  
  matcher.each {
    println "\t * ${it}"
  }
}

def texto = """\
  Bienvenido a GrailsMx, el lugar donde 
  hablamos del lenguaje dinámico 
  Groovy y el framework Grails, 
  esta comunidad nació el 16-09-2008
  con @domix y @neodevelop"""

  def pattern = ~"Groovy" // Coincidencia con una palabra exacta
  usoDePatternDespuesMatcher(pattern,texto)

  // Cambiemos el patrón
  pattern = /Groovy|Grails/ // Creamos un nuevo matcher con Slashy
  usoDePatternDespuesMatcher(pattern,texto)

  pattern = /\d\d-\d\d-\d\d\d\d/ // Un patrón de fechas simples
  usoDePatternDespuesMatcher(pattern,texto)

  pattern = /\w\S*/ // Todas las palabras
  usoDePatternDespuesMatcher(pattern,texto)
```

Aquí una lista con los símbolos que más he usado en expresiones regulares:

  * . Cualquier carácter
  * ^ Comienzo de línea
  * $ Fin de línea
  * \d Dígito
  * \D Cualquier caracter excepto dígitos
  * \s Espacios en blanco
  * \S Cualquiera menos espacios en blanco
  * \w Palabra
  * \W Cualquiera menos palabras
  * () Agrupamiento
  * (x | y) x o y
  * x* Cero o más ocurrencias de x
  * x+ Una o más ocurrencias de x
  * x? cero o una ocurrencia de x
  * x {m,n} Por lo menos &#8216;m&#8217; y cuanto más &#8216;n&#8217; ocurrencias de x
  * x{m} Exactamente &#8216;m&#8217; ocurrencias de x
  * [a-f] Clase caracter conteniendo a,b,cd,e,f
  * [^a] Contiene cualquier caracter excepto a

Cuando conjugamos un patrón y un String podemos hacer las siguientes tareas:

  * Indicar que el patrón coincida exactamente con el texto
  * Indicar cuando hay por lo menos una ocurrencia del patrón
  * Contar las ocurrencias
  * Hacer algo con cada ocurrencia
  * Reemplazar las ocurrencias con un texto
  * Dividir el String en multiples Strings cortando cada ocurrencia

Una de las cosas que me gustan mucho con expresiones regulares en Groovy son situaciones como esta:

```groovy
def jvmLanguages = ['scala','groovy','jruby','clojure','jython']
def frameworks = ['springframework','akka','play','gpars','jquery']

def pattern1 = ~/.*j.*/

assert (jvmLanguages &lt;&lt; frameworks).flatten().grep(pattern1) == ["jruby", "clojure", "jython", "jquery"]
```

O bien, el clásico del correo electrónico:

```groovy
def email = 'cursos@synergyj.com'
def pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}/
assert email ==~ pattern
```