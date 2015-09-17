---
title: Agregando metodos a java.io.File
author: neodevelop
date: 2012-05-24
url: /2012/05/24/agregando-metodos-a-java-io-file/
categories:
  - Groovy
---
Hola!

En esta ocasión y causante de una breve demostración que hice hace poco, estuve explicando un poco de inyección de métodos y de las ventajas que tienen sobre clases que comúnmente usamos en casos práctivos

En ese momento sugerí: ¿por qué no inyectamos un método a las clases java.io.File que permitan comprimir el archivo al cual están conteniendo?

Es un ejercicio simple para practicar la metaprogramación y las bondades del GDK en el manejo de archivos, y potencialmente es una forma en la cual se pueden agregar funcionalidades a clases propias o ajenas, elemento base para la creación de algunos plugins.

Aquí el ejemplo:

<pre class="brush:groovy;">import java.util.zip.ZipOutputStream
import java.util.zip.ZipEntry

//Uso de metaClass para inyectar el método
File.metaClass.zipMe = { ->

  // Obtenemos solo el nombre del archivo
  def onlyName = delegate.name.tokenize('.')[0]
  // Creamos nuestra clase que lo comprime
  ZipOutputStream zipFile = new ZipOutputStream(new FileOutputStream(onlyName+".zip"))
  // Creamos una entrada con el nombre del archivo
  zipFile.putNextEntry(new ZipEntry(delegate.name))
  // Definimos un buffer
  def buffer = new byte[1024]
  // Operamos con el stream del archivo
  delegate.withInputStream { inputStream ->
    // Leemos y almacenamos en el buffer
    def sizeBytes = inputStream.read(buffer)
    // Escribimos en el archivo zip el buffer, desde cero y hasta el tamaño de bytes
    zipFile.write(buffer,0,sizeBytes)
  }
  // Terminamos la entrada del archivo
  zipFile.closeEntry()
  // Cerramos el archivo zip
  zipFile.close()
}

// Nombre del archivo
String fileName = "README.txt"
// Leemos el archivo
def file = new File(fileName)
// Comprimimos con el nombre del archivo
file.zipMe()
</pre>

Ahora bien, hacemos lo mismo de forma análoga pero con un directorio entero al cual estemos apuntando dentro del objeto File:

<pre class="brush:groovy;">import java.util.zip.ZipOutputStream
import java.util.zip.ZipEntry

String inputDir = "graceworks"  

File.metaClass.zip = {  ->
  def onlyName = delegate.name.tokenize('.')[0]
  def result = new ZipOutputStream(new FileOutputStream(onlyName+".zip"))
  result.withStream { zipOutStream->
    delegate.eachFileRecurse { f ->
      if(!f.isDirectory()) {
        zipOutStream.putNextEntry(new ZipEntry(f.getPath()))
        new FileInputStream(f).withStream { inStream ->
          def buffer = new byte[1024]
          def count
          while((count = inStream.read(buffer, 0, 1024)) != -1) {
            zipOutStream.write(buffer)
          }
        }
        zipOutStream.closeEntry()
      }
    }
  }
}

def file = new File(inputDir)
file.zip()
</pre>

y estoy seguro, de que este código aún se puede mejorar o personalizar&#8230;