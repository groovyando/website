---
title: Simple benchmark y memoize
author: neodevelop
layout: post
date: 2012-11-04
url: /2012/11/04/simple-benchmark-y-memoize/
categories:
  - Groovy
---
Hace poco quise mostrar la utilidad de los closures como parámetros, y también charlaba con un compañero acerca del método memoize de los closures para probar la ejecución que almacena Groovy para entregarla de manera inmediata en la siguiente ejecución de igual manera parametrizada.

Primero hablemos de la parte del benchmark. Aquí un closure que vi alguna vez en http://groovy-almanac.org/:

[sourcecode language=&#8221;groovy&#8221;]  
def benchmark = { closure ->  
def start = System.currentTimeMillis()  
closure()  
def end = System.currentTimeMillis()  
end &#8211; start  
}  
[/sourcecode]

Ahora hagamos definamos una función que nos de la secuencia de Fibonacci en la ene-sima iteración:

[sourcecode language=&#8221;groovy&#8221;]  
def fibonacci = { n ->  
Thread.sleep(100) // Ojo con este delay  
def f0 = 0  
def f1 = 1  
def temp = 0  
(n + 1).times {  
temp = f0  
f0 = f0 + f1  
f1 = temp  
}  
f1  
}  
[/sourcecode]

Hecha la función de benchmark y el closure de fibonacci, vamos a usarlas un par de veces y veamos que tiempo nos entrega:

[sourcecode language=&#8221;groovy&#8221;]  
def time = benchmark {  
assert fibonacci(7) == 13  
assert fibonacci(8) == 21  
assert fibonacci(9) == 34  
assert fibonacci(7) == 13  
assert fibonacci(8) == 21  
assert fibonacci(9) == 34  
}  
println time // Deberá desplegar un poco más de 600 ms.  
[/sourcecode]

**Memoize**

Agreguemos al closure de memoize el método memoize()

[sourcecode language=&#8221;groovy&#8221;]  
def fibonacci = { n ->  
//&#8230;  
}.memoize()  
[/sourcecode]

Y al ejecutar nuestro closure de que mide el benchmark deberíamos de ver un tiempo de un poco más de 300 ms.

Esto último significa que para las llamadas que tienen el mismo argumento el método memoize() entra en acción a partir de la segunda vez que se invoca.

Hay un par de variaciones más del método memoize que ayudan a límitar su uso o ponerlo en un intervalo de ejecuciones.