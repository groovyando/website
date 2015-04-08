---
title: Dudas de Grails
author: neodevelop
layout: post
date: 2013-03-14
url: /2013/03/14/dudas-de-grails/
categories:
  - Grails
  - Testing
---
Hola!

Hace poco tuve la oportunidad de impartir un curso de Grails, en donde vimos como uno de los últimos temas la integración con algunos beans de Spring que no vienen en el Application Context. Y uno de los asistentes tuvo una buena duda al respecto de integrar algunos beans adicionales, realmente la pregunta fue:

> Buen día JJ
> 
> Primero que nada agradecer el obsequio del curso, el cual por cierto me pareció excelente. En segundo lugar me gustaría hacerte una consulta, en el caso de no desear utilizar Hibernate para la persistencia y en cambio utilizar JDBCTemplate de Spring me quedó claro que es posible sin ningún problema, pero en el ejemplo que nos mostraste la inyección del jdbcTemplate se realizó directo en el Controller, mi pregunta es si se puede estructurar de una manera diferente, es decir, crear un paquete diferente en el que se encuentren las clases de Acceso a Datos (DAO&#8217;s) y ahi inyectar el jdbcTemplate y realizar la persistencia. Si es así en que parte de la estructura del proyecto se crearía dicho paquete, en grails-app al nivel del paquete de services??? o en la carpeta de src/groovy??? así mismo quisiera saber si la inyección de la clase DAO en el service se realiza de la misma forma que se inyecta un Servicie en el Controller???
> 
> Muchas gracias por tu ayuda de antemano.
> 
> Saludos
> 
> OVP

Si bien, pude escribir un correo contestando exclusivamente, decidí hacerlo públic a través de un Hangout y aquí les dejo la grabación, dura alrededor de 20 minutos y puede que les sirva.



Saludos