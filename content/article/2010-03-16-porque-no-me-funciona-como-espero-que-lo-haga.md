---
title: ¿porque no me funciona como espero que lo haga?
author: itubal
layout: post
date: 2010-03-16
url: /2010/03/16/porque-no-me-funciona-como-espero-que-lo-haga/
categories:
  - Groovy
---
def loginBarra= {

&nbsp;&nbsp;&nbsp; Personas usuario = Personas.findByUsuario(params.nombre)

&nbsp;&nbsp;&nbsp; if (!usuario) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; flash.message =&#8217;Usuario incorrecto&#8217;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; redirect(action:login)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; else {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; is (usuario.password==params.password) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; session.user= usuario.nombre

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; def milogbook = new Logbook()

//// Aqui empieza la tela que no funciona&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp; milogbook.persona = usuario

///// A partir de aqui vuelva a funcionar

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; milogbook.entrada= new Date()

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; milogbook.save()

/// aqui hay mas cosas pero que funcionan bien

&nbsp;

La cuesti&oacute;n es que cuando muestro el listado de registros de logbook el campo que hace referencia a persona es NULL por lo que deduzco que usuario (que cuando entra en el IF no es nulo) es nulo, pero &iquest;como? si me hace bien lo del session.user

&nbsp;

GRACIAS

<!-- google_ad_section_end -->