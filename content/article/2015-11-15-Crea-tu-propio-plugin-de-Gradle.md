---
title: Crea tu propio plugin de Gradle
author: markitox
date: 2015-11-15
url: /2015/11/15/crea-tu-propio-plugin-de-gradle/
featured_image: /2015/11/15/AzadiSquare-Tehran-124306.jpg
featured_text: Construye tu camino
featured_image_origin: http://alpha.wallhaven.cc/wallpaper/124306
categories:
  - Guide
tags:
  - Comunidad
  - Gradle
  - Plugins
  - Groovy
  - Build Tools
---

## Motivación
Últimamente he estado trabajando con _SpringBoot_, _Gradle_ y _Java_ básicamente con la arquitectura de microservicios, por lo tanto tenemos varios proyectos (inclusive en .NET) y cada uno de ellos con la misma (o casi) configuración en nuestros **build.gradle**; Entonces me di a la tarea de crear un plugin gradle para nuestros proyectos con el fin de abstraer y limpiar estos archivos **build.gradle**.

---
### Primeros pasos
Empecemos este microproyecto (ahora que esta de moda lo micro =P), aquí encontraras mas documentación acerca de como crear tu [plugin en _Gradle_][1].

Lo primero crea tu directorio, para este ejercicio lo llamaremos _myPlugin_:

```shell
mkdir -p myPlugin/src/main/{groovy,resources/META-INF/gradle-plugins} myPlugin/gradle
```

Revisemos la estructura generada con el siguiente comando ([tree][2] es una herramienta para mostrar el árbol de directorios):
```
tree myPlugin

myPlugin
├── gradle
└── src
    └── main
        ├── groovy
        └── resources
            └── META-INF
                └── gradle-plugins

7 directories, 0 files
```

---
### Archivos necesarios para nuestro plugin

Los siguientes archivos son requeridos por nuestro plugin, por favor crearlos en el directorio como se especifica tomando como base la raíz de nuestro proyecto:

**build.gradle**: Por supuesto necesitamos un archivo build para nuestro plugin, al final incluimos un script el cual tiene la configuración para simular el upload de nuestro plugin ha algún repositorio.
```groovy
apply plugin: 'groovy'

dependencies {
    compile gradleApi()
    compile localGroovy()
}

apply plugin: 'maven'

repositories {
    mavenCentral()
}

group = myGroup
version = myVersion

apply from: "$rootDir/gradle/publish-config.gradle"
```

---
**gradle/publish-config.gradle**: Aqui solo tenemos configuración para subir nuestro plugin al repositorio de la empresa o alguno publico, para este ejercicio sera en un folder de nuestra computadora, esto es solo para abstraer un poco mas de configuración.
```groovy
uploadArchives {
  repositories {
    mavenDeployer {
      repository(url: uri('../repo'))
    }
  }
}
```
---
**gradle.properties**: Aquí mantenemos configuración centralizada para nuestros _Groovy_ scripts
```properties
myGroup=org.groovy.ando
myVersion=0.1-SNAPSHOT
```

---
**settings.gradle**: Configuración acerca de nuestro proyecto, con lo siguiente determinamos el nombre de nuestro _JAR_ y por lo tanto el nombre de la dependencia para los proyectos que quieran usar nuestro plugin.
```groovy
rootProject.name='myPlugin'
```

---
**src/main/groovy/org/groovy/ando/plugin/MyPlugin.groovy**: Esta es nuestra clase principal donde aplicaremos varias cosas a los **build.gradle** de cada proyecto que use nuestro plugin, por ahora no agregamos algo mas que algunos println para mostrar en consola _group_, _name_ y _version_ del proyecto que use nuestro plugin.
```groovy
package org.groovy.ando.plugin

import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.publish.maven.MavenPublication
import org.gradle.api.tasks.Copy

class MyPlugin implements Plugin<Project> {

  @Override
  public void apply(Project project) {
    println '==================================='
    println "Group: ${project.group}"
    println "ArtifactId: ${project.name}"
    println "Version: ${project.version}"
  }

}
```

---
**src/main/resources/META-INF/gradle-plugins/org.groovy.ando.properties**: Este archivo es muy importante, ya que el nombre del archivo define el Id de nuestro plugin y su contenido la clase principal de nuestro plugin.
```
implementation-class=org.groovy.ando.plugin.MyPlugin
```

---
Para 'desplegar' nuestro plugin a nuestro repositorio (en este caso es una carpeta llamada _repo_ en la carpeta padre de nuestro proyecto) ejecutamos la siguiente _task_ de _Gradle_
```shell
gradle uploadArchives
```

Veamos que genero:
```
tree repo

repo
└── org
    └── groovy
        └── ando
            └── myPlugin
                ├── 0.1-SNAPSHOT
                │   ├── maven-metadata.xml
                │   ├── maven-metadata.xml.md5
                │   ├── maven-metadata.xml.sha1
                │   ├── myPlugin-0.1-20151115.131137-1.jar
                │   ├── myPlugin-0.1-20151115.131137-1.jar.md5
                │   ├── myPlugin-0.1-20151115.131137-1.jar.sha1
                │   ├── myPlugin-0.1-20151115.131137-1.pom
                │   ├── myPlugin-0.1-20151115.131137-1.pom.md5
                │   └── myPlugin-0.1-20151115.131137-1.pom.sha1
                ├── maven-metadata.xml
                ├── maven-metadata.xml.md5
                └── maven-metadata.xml.sha1

5 directories, 12 files
```

---
### Probemos nuestro plugin
Pues bien ya tenemos nuestro plugin que mostrara cosas basicas en consola, ahora veamos si es real todo esto.
Para creamos un proyecto con un simple archivo _build.gradle_ que haga uso de nuestro impresionante plugin.

```
tree testMyPlugin

testMyPlugin
└── build.gradle
```

En nuestro _build.gradle_ agregamos esto:
```groovy
buildscript {
  repositories {
    maven {
      url uri('../repo') // nuestro repositorio local
    }
  }
  dependencies {
    classpath 'org.groovy.ando:myPlugin:0.1-SNAPSHOT' // nuestra dependencia al JAR que contiene nuestro plugin
  }
}

group = 'org.teste.ando'  // configuración de nuestro proyecto
version = 0.1

apply plugin: 'org.groovy.ando' // Recuerdan el ID de nuestro plugin??
```

Y eso es todo, para ver en acción nuestro flamante plugin ejecutemos simplemente _gradle_ y veremos en consola algo similar a esto:
```
gradle
===================================
Group: org.teste.ando
ArtifactId: testMyPlugin
Version: 0.1
:help

Welcome to Gradle 2.8.

To run a build, run gradle <task> ...

To see a list of available tasks, run gradle tasks

To see a list of command-line options, run gradle --help

To see more detail about a task, run gradle help --task <task>

BUILD SUCCESSFUL

Total time: 1.841 secs
```

---
### Agregamos cosas mas divertidas
Hasta ahora hemos logrado ejecutar cosas basicas en nuestro proyecto usando nuestro plugin ahora necesitamos algo mas avanzado, entonces vamos agregar mas cosas a nuestro plugin, regregamos al archivo **MyPlugin.groovy** dentro nuestro plugin y agregamos como se nuestra abajo:
```groovy
package org.groovy.ando.plugin

import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.publish.maven.MavenPublication
import org.gradle.api.tasks.Copy

class MyPlugin implements Plugin<Project> {

  @Override
	public void apply(Project project) {
    println '==================================='
    println "Group: ${project.group}"
    println "ArtifactId: ${project.name}"
    println "Version: ${project.version}"

    project.allprojects extraConfig << checkRequiredPlugins << addCustomRepositories

	}

  /*
    Disponemos repositorios a los proyectos de esta forma:
      javaNet()
      nexus()
  */
  Closure addCustomRepositories = {
    def javaNetUrl = 'https://maven.java.net/content/repositories/public/'
    def nexusRepositoryUrl = "${project.nexusURL}/nexus/content/groups/public"

    // javaNetUrl
    repositories.ext.javaNet = {
      repositories.maven { url javaNetUrl }
    }

    // Nexus
    repositories.ext.nexus = {
      repositories.maven { url nexusRepositoryUrl }
    }

  }

  Closure checkRequiredPlugins = {
    def checkPlugin = checkPluginName.curry(plugins)
    println '\n==> checking required plugins'
    checkPlugin('java')
    checkPlugin('groovy')
    checkPlugin('eclipse')
    checkPlugin('idea')
    checkPlugin('jacoco')
  }

  Closure checkPluginName = {plugins, pluginName ->
    if (!plugins.hasPlugin(pluginName)) {
      println "Adding plugin: $pluginName"
      plugins.apply(pluginName)
    }
  }

  /*
    Aplicamos algunas configuraciones extras, agregamos tareas
    y configuramos que depedencias entre tareas
  */
  Closure extraConfig = {
    configurations.all {
      exclude module: 'slf4j-log4j12'
    }

    task(type: Copy, "copyDeploy", copyDeployTaks)

    build.dependsOn(copyDeploy, jacocoTestReport)

    loadCredentialsFile(project)
  }

  /*
    Cargamos configuración extra al properties del proyecto que use nuestro
    plugin, en este caso cargamos las credenciales de nuestro usuario de Nexus
  */
	void loadCredentialsFile(Project project) {
		def homeDir = System.properties['user.home']
		Properties props = new Properties()
		props.load(new FileInputStream("$homeDir/credentials.properties"))
		props.each { project.ext[it.key] = it.value }
	}

  /*
    Definimos una tarea para inyectarla a los build.gradle de los proyectos
    que usen nuestro plugin.
  */
	Closure copyDeployTaks = {
		into 'deployment'
		from ("${project.buildDir}/libs") {
			include '*.jar'
		}
	}

}
```

Como ven hemos agregado varias cosas como:

- Repositorios
- Plugins
- Excluimos algunas dependencias transitorias
- Tasks, configuramos Tasks para depender de otras
- Cargamos properties al proyecto

Listo creo que por ahora es suficiente, solo nos resta 'desplegar' nuestro plugin, recuerdan como hacerlo?? ```gradle uploadArchives```

---
## Veamos los resultados
El ultimo paso es agregar la configuración necesaria que requiere nuestro plugin (entre ellas la URL del repositorio Nexus, la version del plugin de Jococo) desde nuestro proyecto de prueba, crea el siguiente archivo _gradle.properties_ y agregamos la siguiente línea
```
nexusURL=http://100.200.300.400:9876
```

---
Y modifica el archivo _build.gradle_ como se muestra:
```groovy
buildscript {
  repositories {
    maven {
      url uri('../repo')
    }
    jcenter()
  }
  dependencies {
    classpath 'org.groovy.ando:myPlugin:0.1-SNAPSHOT'
  }
}

group = 'org.teste.ando'
version = 0.1

apply plugin: 'org.groovy.ando'

// Jacoco es injectado desde nuestro plugin
jacoco {
  toolVersion = '0.7.1.201405082137'
}

repositories {
  javaNet() // Este metodo agrega este repositorio: maven.java.net
  nexus()   // Este es nuetro repositorio privado
}
```

---
Para ver el resultado de esto ejecuten `gradle tasks` y veran algo similiar a esto:
```shell
gradle tasks
===================================
Group: org.teste.ando
ArtifactId: testMyPlugin
Version: 0.1

==> checking required plugins
Adding plugin: java
Adding plugin: groovy
Adding plugin: eclipse
Adding plugin: idea
Adding plugin: jacoco
:tasks

------------------------------------------------------------
All tasks runnable from root project
------------------------------------------------------------

Build tasks
-----------
assemble - Assembles the outputs of this project.
build - Assembles and tests this project.
buildDependents - Assembles and tests this project and all projects that depend on it.
buildNeeded - Assembles and tests this project and all projects it depends on.
classes - Assembles main classes.
clean - Deletes the build directory.
jar - Assembles a jar archive containing the main classes.
testClasses - Assembles test classes.

Build Setup tasks
-----------------
init - Initializes a new Gradle build. [incubating]
wrapper - Generates Gradle wrapper files. [incubating]

Documentation tasks
-------------------
groovydoc - Generates Groovydoc API documentation for the main source code.
javadoc - Generates Javadoc API documentation for the main source code.

Help tasks
----------
components - Displays the components produced by root project 'testMyPlugin'. [incubating]
dependencies - Displays all dependencies declared in root project 'testMyPlugin'.
dependencyInsight - Displays the insight into a specific dependency in root project 'testMyPlugin'.
help - Displays a help message.
model - Displays the configuration model of root project 'testMyPlugin'. [incubating]
projects - Displays the sub-projects of root project 'testMyPlugin'.
properties - Displays the properties of root project 'testMyPlugin'.
tasks - Displays the tasks runnable from root project 'testMyPlugin'.

IDE tasks
---------
cleanEclipse - Cleans all Eclipse files.
cleanIdea - Cleans IDEA project files (IML, IPR)
eclipse - Generates all Eclipse files.
idea - Generates IDEA project files (IML, IPR, IWS)

Verification tasks
------------------
check - Runs all checks.
test - Runs the unit tests.

Other tasks
-----------
cleanIdeaWorkspace
```

---
Ahí veran los tasks de los plugins que agregamos desde nuestro plugin (suena como a Inception) y al inicio la validación de estos si es que ya fueron agregados desde el proyecto.

Bueno eso ha sido todo, espero les sea de utilidad y sea entendible totalmente.


[1]: https://docs.gradle.org/current/userguide/custom_plugins.html
[2]: http://mama.indstate.edu/users/ice/tree/
