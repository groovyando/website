---
title: Funcionalidad de actionSubmit
author: dracof
date: 2009-08-19
url: /2009/08/19/funcionalidad-de-actionsubmit/
categories:
  - Groovy
---
Que tal,

Realizando un ejercicio basico de un formularion

<g:form controller=&#8217;nameController&#8217; action=&#8217;nameAction&#8217;>  
&nbsp;&nbsp;&nbsp; Nombre:<g:textField name=&#8217;nameTextField&#8217; /> <br/>  
&nbsp;&nbsp;&nbsp; <g:actionSubmit value=&#8217;Enviar&#8217; action=&#8217;nameAction&#8217;/>  
</g:form>

Al presionar el boton Enviar si va a nameController.nameAction, pero si le quito el action de actionSubmit ya no lo realiza, me manda un HTTP Status 404, leyendo la documentacion dice que el action de actionSubmit es opcional desde la version 0.5.

Algo se me pasa?

Por cierto, no sabia que con Ctrl-S daba submit a la forma&#8230;.

Saludos.