---
title: Edición de código para Groovy y Grails
author: MIguel-1.mx
date: 2009-07-09
url: /2009/07/09/edicion-de-codigo-para-groovy-y-grails/
categories:
  - Groovy
---
<p align='justify'>
  Como continuaci&oacute;n a la entrada anterior, revisaremos algunos editores de c&oacute;digo y texto con caracter&iacute;sticas adicionales, prestas a ayudar a los programadores en su &aacute;gil desarrollo. Se extiende la invitaci&oacute;n para incluir el editor de c&oacute;digo que Usted utilice y que no est&eacute; incluido aqu&iacute;, para seguir conociendo opciones. La caracter&iacute;stica considerada &#8216;necesaria&#8217; por muchos es el resaltado de texto. Las caracter&iacute;sticas adicionales a &eacute;sta se enunciar&aacute;n independientemente.
</p>

<p align='justify'>
  Encabezando la lista est&aacute; gedit, el editor de texto altamente personalizable para el escritorio de GNOME. Para la distribuci&oacute;n de GNU/Linux de su elecci&oacute;n, muy probablemente est&aacute; disponible entre los repositorios predeterminados (en muchos GNOME es el entorno de escritorio predeterminado) o bien, con soporte de parte de sus comunidades. Lo mismo ocurre para el *BSD de su preferencia. &iquest;Tambi&eacute;n MacOS? &iexcl;S&iacute;! Tambi&eacute;n para MacOS X. <a href='http://gedit.darwinports.com/'>El proyecto de Darwinports</a> en <a href='http://darwinports.com/'>http://darwinports.com/</a> incluye a gedit. &iquest;Y para Windows? GNOME Live! proporciona tutoriales, paso a paso, para compilar gedit en Windows, disponible en <a href='http://live.gnome.org/Gedit/Windows'>http://live.gnome.org/Gedit/Windows</a>.
</p>

<p align='justify'>
  Entre los paquetes para personalizar gedit para Groovy/Grails/Griffon se encuentran: gedit-grails-bundle (<a href='http://github.com/aeischeid/gedit-grails-bundle/tree/master'>http://github.com/aeischeid/gedit-grails-bundle/tree/master</a>), con archivos para el resaltado y de inserci&oacute;n de tags r&aacute;pidos junto con un script para instalarlo; gmate (<a href='http://github.com/lexrupy/gmate/tree/master'>http://github.com/lexrupy/gmate/tree/master</a>), con un muy &uacute;til paquete de agregados para permitir a gedit comportarse como textmate en geenral (y ahora incluye la mayor&iacute;a de las caracter&iacute;sticas de gedit-grails-bundle); Word Completion (<a href='http://users.tkk.fi/~otsaloma/gedit/'>http://users.tkk.fi/~otsaloma/gedit/</a>), con ventanas emergentes de completado, actualizaci&oacute;n mientras se escribe, con sugerencias de todas las palabras en todos los documentos en todas las ventanas. Seleccione con teclas de flecha y completarlos con la tecla tabulador (sin interferir con snippets).
</p>

<p align='justify'>
  S&oacute;lo hay que desempacar los archivos en ~/.gnome2/gedit/plugins y, en el caso de archivos XML, los archivos .lang se ubican en /usr/share/gtksourceview-2.0/language-specs/ y los archivos -mime.xml en /usr/share/mime/packages/ debiendo, adem&aacute;s, actualizar en este segundo caso al sistema mediante el comando &#8216;update-mime-database /usr/share/mime&#8217; (sin comillas). Por cierto, al ser achivos xml, el resaltado de de sintaxis puede aplicar a otros editores de texto, por ejemplo, Gobby para GNU/Linux (<a href='http://gobby.0x539.de/trac/'>http://gobby.0x539.de/trac/</a>), entre otros.
</p>

<p align='justify'>
  Una vez actualizados, s&oacute;lo hay que habilitarlos en Edici&oacute;n > Preferencias y en Edici&oacute;n > Preferencias > Plugins. En GNOME Live! existen muchos agregados disponibles. En su p&aacute;gina <a href='http://live.gnome.org/Gedit/Plugins'>http://live.gnome.org/Gedit/Plugins</a> hay muchos otros agregados, y en gedit-themes (<a href='http://github.com/felipemesquita/gedit-themes/tree/master'>http://github.com/felipemesquita/gedit-themes/tree/master</a>) esquemas de color adicionales. &iexcl;Esto es personalizaci&oacute;n!
</p>

* * *

<p align='justify'>
  &iquest;Y qu&eacute; hay para KDE? Ah, el Editor de Texto Avanzado para KDE (Kate por sus siglas en ingl&eacute;s), tiene un plugin desarrollado por g2one y disponible en su p&aacute;gina (<a href='http://docs.codehaus.org/download/attachments/2747/groovy.xml'>http://docs.codehaus.org/download/attachments/2747/groovy.xml</a>) y completamente compatible para Kedit en KDE4. Para inslatarlo para el sistema, basta con colocarlo en /usr/share/apps/katepart/syntax o, de requerirlo s&oacute;lo para su usuario, en ~/.kde4/share/apps/katepart/syntax. Fue elaborado en Arch Linux. Deber&iacute;a correr en CRUX, pero para otras distros deber&iacute;a verificar sobre las rutas de archivo.
</p>

* * *

<p align='justify'>
  jEdit (<a href='http://www.jedit.org/'>http://www.jedit.org/</a>), es un editor de texto y c&oacute;digo maduro con cientos de agregados de desarrollo. Est&aacute; escrito en Java. Para instalarlo, tan r&aacute;pido como instalar un runtime de Java, descargar de <a href='http://www.jedit.org/index.php?page=download'>http://www.jedit.org/index.php?page=download</a> y los plugins que desee de la central de agregados de jEdit en <a href='http://plugins.jedit.org/'>http://plugins.jedit.org/</a> (no se coloca enlace directo abra que aprecien cu&aacute;ntos agregados posee); desempaquetar o instalar el paquete seleccionado y listo. &iexcl;Maravillas de las aplicaciones Java!.
</p>

* * *

<p align='justify'>
  Para MacOS existe el comercial textmate. Los agregados o bundles se ofrecen por separado. El bundle para Groovy est&aacute; en <a href='http://macromates.com/svn/Bundles/trunk/Bundles/Groovy.tmbundle/'>http://macromates.com/svn/Bundles/trunk/Bundles/Groovy.tmbundle/</a> y el de Grails est&aacute; en <a href='http://macromates.com/svn/Bundles/trunk/Bundles/Groovy%20Grails.tmbundle/'>http://macromates.com/svn/Bundles/trunk/Bundles/Groovy%20Grails.tmbundle/</a>. Para instalarlos, deben copiarse en /ruta/a/TextMate.app/Contents/SharedSupport/Bundles o mediante el men&uacute; Window, bajo el bundle editor. Para activarlos, seleccione Bundles > Bundle editor > Show bundle editor. En esta ventana puede habilitar atajos de teclado, editar y ajustar a sus necesidades.
</p>

* * *

<p align='justify'>
  Vim tiene soporte para Groovy. Desde la versi&oacute;n 6 est&aacute; disponible predeterminadamente el soporte para Groovy y Grails. En el sitio Web de vim est&aacute; el desarrollo del script, para el caso que no pueda actualizar su versi&oacute;n de vim (por dependencias) en <a href='http://www.vim.org/scripts/script.php?script_id=945'>http://www.vim.org/scripts/script.php?script_id=945</a> para aquellos que se sienten reales programadores, con programas reales.
</p>

<p align='justify'>
  Contin&uacute;a en comentarios&#8230;
</p>

* * *

<p align='justify'>
  Para (X)Emacs (no discutamos) existen dos alternativas de plugin para groovy. A partir del modo-ruby (<a href='http://groovy.codehaus.org/Emacs+Plugin'>http://groovy.codehaus.org/Emacs+Plugin</a> o basado en el modo-CC (<a href='http://groovy.codehaus.org/Emacs+Plugin'>http://groovy.codehaus.org/Emacs+Plugin</a>), recordando que son mutuamente excluyentes. Asimismo, puede habilitar un modo-Groovy descargando el archivo <a href='http://svn.groovy.codehaus.org/browse/~raw,r=HEAD/groovy/trunk/groovy/ide/emacs/inf-groovy.el'>http://svn.groovy.codehaus.org/browse/~raw,r=HEAD/groovy/trunk/groovy/ide/emacs/inf-groovy.el</a> y coloc&aacute;ndola en la ruta de carga predeterminada de Emacs. Enseguida, agregue las siguientes l&iacute;neas a su archivo ~/.emacs:
</p>

<pre class='brush:text'>;;; turn on syntax hilighting
 (global-font-lock-mode 1)
 
 ;;; use groovy-mode when file ends in .groovy or has #!/bin/groovy at start
 (autoload 'groovy-mode 'groovy-mode' 'Groovy editing mode.' t)
 (add-to-list 'auto-mode-alist '('.groovy$' . groovy-mode))
 (add-to-list 'interpreter-mode-alist '('groovy' . groovy-mode))
 </pre>

* * *

<p align='justify'>
  Para MacOS X, XCode de Apple dispone soporte incluido para groovy disponible en <a href='http://www.vengefulcow.com/groovy/groovy-xcode.zip'>http://www.vengefulcow.com/groovy/groovy-xcode.zip</a>. En el sitio <a href='http://www.vengefulcow.com/groovy/'>http://www.vengefulcow.com/groovy/</a> se incluye informaci&oacute;n para SubEthaEdit (tanto 1.x en <a href='http://kasparov.skife.org/groovy.plist'>http://kasparov.skife.org/groovy.plist</a> como para la 2.x en <a href='http://www.vengefulcow.com/groovy/'>http://www.vengefulcow.com/groovy/</a>.
</p>

* * *

<p align='justify'>
  Crimson Editor (<a href='http://www.crimsoneditor.com/'>http://www.crimsoneditor.com/</a>), el freeware opensource padre del editor Emerald proporciona, adem&aacute;s de sus huellitas de can, agilidad y ligereza, tiene un agregado desarrollado por G2one para groovy en <a href='http://docs.codehaus.org/download/attachments/2747/crimson_groovy.zip'>http://docs.codehaus.org/download/attachments/2747/crimson_groovy.zip</a>. &iquest;Por qu&eacute; vale la pena? Porque es liger&iacute;simo, y requiere Windows 95 o NT 4 para correr. Su fiel descendiente, Emerald Editor contin&uacute;a su batuta, extendi&eacute;ndose para usarse en Windows-GNU/Linux-*BSD-MacOSX (lo pongo aparte porque hay software *BSD no tan compatible con MacOS X). El sitio del sucesor es <a href='http://www.emeraldeditor.com/'>http://www.emeraldeditor.com/</a>.
</p>

* * *

<p align='justify'>
  Enseguida, el GNU enscript (<a href='http://www.codento.com/people/mtr/genscript/'>http://www.codento.com/people/mtr/genscript/</a>) posee un archivo de estado desarrollado por G2one en http://docs.codehaus.org/download/attachments/2747/groovy.st?version=1. Necesita instalarse junto a los dem&aacute;s archivos state, por ejemplo, SUSE Linux los coloca en /usr/share/enscript/hl (verifique con su gestor de paquetes la ruta que su distribuci&oacute;n asigna para este programa).
</p>

* * *

<p align='justify'>
  Finalmente, para los fans de wxWidgets, Editra (<a href='http://editra.org/'>http://editra.org/</a>), realizado utilizando Python 2.5 y wxPython 2.8.3, tiene soporte para groovy desde la versi&oacute;n 0.4.83. Es multiplataforma (no est&aacute; de m&aacute;s recalcarlo).
</p>

* * *

Contin&uacute;a en los comentarios&#8230;