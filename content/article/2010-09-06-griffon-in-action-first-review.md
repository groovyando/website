---
title: Griffon in action – first review
author: neodevelop
date: 2010-09-06
url: /2010/09/06/griffon-in-action-first-review/
categories:
  - Groovy
---
hi!!!

<p id='_mcePaste'>
  This time, I wanna write about one book that I&#8217;m reading, this is &#8216;Griffon in action&#8217; wrote by Andres Almiray and Danno Ferrin. This review describes chapters 1 and 2 &#8230;
</p>

It&#8217;s surprising how the book begins. The authors introduce us to the code immediately with the creation and running of a Griffon application: the trip of 1000 miles in one step begins&#8230;

<p id='_mcePaste'>
  BTW, it was awesome how the Griffon App take the natural look and feel in MacOSX, yeah!!! this mean the menu in the top of the screen and the body in the rest of the app with the aqua style&#8230;
</p>

The authors&#8217; singular style is something important to highlight &#8217;cause it&#8217;s funny, entertained and friendly. In addition to this, they explain of a very detailed way and step to step the development of the application.

<p id='_mcePaste'>
  I looked at the Griffon&#8217;s MVC very similar to Grails in structure (they&#8217;re cousins :P), however, how they communicate between them(in the MVC way) is different because they go in group. This means that the relation MVC in Griffon is &nbsp;one view per controller and one domain in each group. In the other hand, Grails can use more than one domain class in controllers or views, In my opinion Grails have many very familiar concepts with Griffon
</p>

<p id='_mcePaste'>
  Also, the book covers the convention over configuration paradigm in a few and is applied in many parts of a Griffon App with specific folders and patterns in names of the components that we&#8217;re developing&#8230;
</p>

<p id='_mcePaste'>
  The authors spent working with the @Bindable annotation, this is a point essential in this chapter because it&#8217;s a very powerful tool that we allow to control the behavior of one component. This annotation is part of the AST transformations (I&#8217;ve worked with some ones like @Grab and without a doubt they&#8217;re incredible)
</p>

<p id='_mcePaste'>
  This chapter explains some Groovy stuff with detail to the newbies, that&#8217;s cool, Java developers can easily understand it and introduce themselves in the Groovy World :P(yeah! more groovy developers now in desktop)
</p>

<p id='_mcePaste'>
  It&#8217;s important to mention that all of this finally is Java, so we have the support in the JVM and all the API&#8217;s that nowadays we know and we can add them without problems, Java is a nice place to make desktop apps, but I remember when introduce myself in this kind of apps, well!!! It was a challenge to do some of them and add some behavior, paint the layout, and run it, oh my threads!!! &#8216;Somebody gives me another thread in my mind to think the UI and behavior at the same time&#8217; I thought&#8230;
</p>

<p id='_mcePaste'>
  The bad: In Java we have to deal with some issues like ceremony in the language, UI definition &nbsp;complexity, app structure, life cycle, build management(a lot, if we&#8217;re building desktop, applet&#8217;s or to webstart)
</p>

<p id='_mcePaste'>
  The good: Griffon avoids those traps and my knowledge in Grails helps me a lot to understand in one look how it&#8217;s structured all the Griffon App&#8217;s
</p>

<p id='_mcePaste'>
  After, in the second chapter I learned about the ABC of Griffon, this is:
</p>

<p id='_mcePaste'>
  Application.groovy, Builder.groovy, BuildConfig.groovy and Config.groovy
</p>

<p id='_mcePaste'>
  Each one is very important because it defines how the app is showed, assembled and runned, with all of this, I saw in detail the Griffon&#8217;s directory structure. &nbsp;Also, in this chapter I can see where to put my source files, how to configure my app, how to add some external libraries and a lil&#8217; of testing, with all of this, I explored some of the commands that we have available to work.
</p>

<p id='_mcePaste'>
  Something that we have to deal (also) in Java is about to be careful with the life cycle of desktop app&#8217;s (when init resources, when to release it, when it&#8217;s ready to use them), well, with Griffon all of that is solved, in some section of this chapter explain in a better way how to organize and manage an app, since the creation until I stopped it.
</p>

<p id='_mcePaste'>
  I`ll continue reading the book `cause my next review will be about the next 4 chapters, dealing with MVC in depth and the MVC groups..
</p>