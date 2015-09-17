---
title: save() en un filtro ¿es posible?
author: itubal
date: 2010-04-05
url: /2010/04/05/save-en-un-filtro-es-posible/
categories:
  - Groovy
---
Holas:

estoy intentando que en cada acci&oacute;n que el usuario haga me modifique un achivo de log. He escrito este c&oacute;digo, pero.. me da un error. Seguramente tendr&eacute; que importar algo &iquest;?&iquest;? Estoy perdido a&uacute;n.

class LogbookFilters {

&nbsp;&nbsp; def filters = {  
&nbsp;&nbsp;   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; saveLogbookFilter (controller:&#8217;\*&#8217;, action:&#8217;\*&#8217;) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; before = {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if(session.log) {  
//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; miLogbook = new Logbook()  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; miLogbook = Logbook.get(session.log.id)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; miLogbook.salida= new Date()  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; miLogbook.save(flush:true)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; println miLogbook  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; else  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; print &#8216;session.logbook es null&#8217;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }  
&nbsp;&nbsp; }  
}

&nbsp;

El error que me da es:

**Error 500:**   
**Servlet:** default  
**URI:** /educativo/  
**Exception Message:** No such property: Logbook for class: LogbookFilters   
**Caused by:** Error mapping onto view [/index]: No such property: Logbook for class: LogbookFilters   
**Class:** LogbookFilters   
**At Line:** [11]&nbsp;

Gracias