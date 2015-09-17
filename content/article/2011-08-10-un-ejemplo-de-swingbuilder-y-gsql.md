---
title: Un ejemplo de SwingBuilder y GSQL
author: neodevelop
date: 2011-08-10
url: /2011/08/10/un-ejemplo-de-swingbuilder-y-gsql/
categories:
  - Groovy
tags:
  - grab
  - groovy
  - gsql
  - jdbc
  - swing
---
Hola a todos!

Les dejo un ejemplo de como usar SwingBuilder con un poco de GSQL, el c&oacute;digo lo dejo aqu&iacute; pero tambi&eacute;n lo pongo en [GitHub][1] por si quieren ponerle alg&uacute;n comentario en alguna l&iacute;nea&#8230;

Espero les guste&#8230;

&nbsp;

<pre class='brush: groovy; ruler: true;'>/**
 * Usa cualquier base de datos en HSQLDB o de cualquier otro tipo,
 * sólo ajusta la dependencia del conector, los parámetros de conexión
 * y la consulta con la que obtienes los nombres de tabla de una base de datos
 * según el manejador que estés usando....
 */
 
 // Usamos la anotación @Grab para cargar la dependencia de HSQLDB
 @GrabConfig(systemClassLoader=true)
 @Grapes([@Grab(group='hsqldb', module='hsqldb', version='1.8.0.10')])
 
 // Algunos imports
 import groovy.swing.*
 import javax.swing.*
 import java.awt.BorderLayout as BL // Mira, imporst estáticos
 import javax.swing.tree.DefaultMutableTreeNode as TreeNode
 
 // Conectamos a la base de datos, en reallidad puedes usar la que tu quieras
 def sql = groovy.sql.Sql.newInstance('jdbc:hsqldb:hsql://localhost/dbAsembly','sa','sa','org.hsqldb.jdbcDriver')
 // Una consulta a cualquier tabla
 def consulta = 'Select * from cliente'
 // Una consulta a las tablas de esta base de datos
 def consultaTablas = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.SYSTEM_TABLES WHERE TABLE_SCHEM='PUBLIC''
 
 def columnNames = []
 // Este closure se ejecuta la primera ve después de la consulta
 processMeta = { metaData -&gt;
   columnNames = metaData.columnMetaData.collect{ column -&gt;
     column.columnName
   }
 }
 
 def data = []
 // Ejecutamos la consulta
 sql.eachRow(consulta,processMeta){ registro -&gt; // Me gusta que tan simple es ejecutar cualquier consulta e iterarla
   def registroEnMapa = [:]
   columnNames.each{ name -&gt;
     registroEnMapa.'$name' = registro['$name'] // Dinamismo en mapas
   }
   data &lt;&lt; registroEnMapa
 }
 
 def nombresDeTabla = []
 // Ejecutamos la consulta que obteien los nombres de todas la tablas de la BD
 sql.eachRow(consultaTablas){ 
   nombresDeTabla &lt;&lt; it['TABLE_NAME']
 }
 
 // Uf! un árbol de swing
 JTree trainningTree
 // Usamos un builder, característica poderosa de Groovy
 swing = new SwingBuilder()
 // Comenzamos a construir nuestra GUI
 frame = swing.frame(
   title:'DB Poor Man',
   defaultCloseOperation: javax.swing.WindowConstants.EXIT_ON_CLOSE
 ) {
   borderLayout() // Así es! el mismo BorderLayout que ya conoces...
   scrollPane(constraints: BL.WEST, preferredSize: [160, -1]) { // scrollPane? claro JScrollPane!
       trainningTree = tree(rootVisible: true) // Adentro nuestro árbol
   }
   scrollPane(constraints:BL.CENTER) { // Este scrollPane en el centro
     table() { // Mostramos datos tabulares
       tableModel(list:data) { // Alimentamos la tabla
         columnNames.each{ columnName -&gt; // Definimos las columnas que aparecerán
           propertyColumn(header:columnName, propertyName:columnName) // Goodness!!!
         }
       } 
     }
   } 
 }
 // borramos los elementos aactuales de nuestro árbol
 trainningTree.model.root.removeAllChildren()
 // Iteramos los nombres de las tablas
 nombresDeTabla.each{
   def node = new TreeNode(it) //  para crear nodos
   trainningTree.model.root.add(node) // y agregarlos al árbol
 }
 trainningTree.model.reload(trainningTree.model.root) // Hacemos un refresh
 frame.pack() 
 frame.show() // Y mostramos....
 </pre>

 [1]: https://github.com/neodevelop/Groovy-examples/blob/master/SwingBuilderAndGSQL.groovy