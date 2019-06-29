# Frogger Arcade Game
###### Planet Cute art by Daniel Cook [Lostgarden.com](http://Lostgarden.com)

## Table of Contents

* [Description](#description)
* [Getting started](#getting-started)
* [Little Roadmap](#little-roadmap)
* [Additional information](#additional-information)

## Description

This game is a quick and simple arcade game besed on **HTML**, **CSS** and **Javascript**.
The game is inspired by 1981 [Frogger Arcade Game](https://en.wikipedia.org/wiki/Frogger).

#### Main features are:

 * Coins counter: collect coins
 	* Star = 10 coins
 	* Blue Diamond = 25 coins

 * Switch between player avatars
 	* LITTLE BOY
 	* CAT GIRL

 * Reset button

### Avatars

![LITTLE BOY](https://raw.githubusercontent.com/cintogia/frontend-nanodegree-arcade-game/master/images/char-boy.png)
![CAT GIRL](https://raw.githubusercontent.com/cintogia/frontend-nanodegree-arcade-game/master/images/char-cat-girl.png)

###### License

[2htdp/planetcute library](https://docs.racket-lang.org/teachpack/2htdpPlanet_Cute_Images.html)

## Getting started

Make sure to insert the scripts right before ```<body>``` ends.
The ```js/engine.js``` needs a ```<div class="content">``` within the ```<body>``` by default.
If you want to change that you can do so by changing it in the ```js/engine.js``` file on line 25 ```content = document.querySelector(".content")```.
Additional images (e.g. avatars or coins) must be added to the ressource array in the ```js/engine.js``` file on line 180 ```Resources.load([])```.
In order to render new objects create them in the ```js/app.js``` file, create a render method and add them to the ```renderEntities()``` function in the ```js/eninge.js``` file.
Also, if you need the objects to update/interact within the game you need to create a update method and add them to the ```updateEntities()``` function in the ```js/eninge.js``` file.

```
<!-- CSS -->
<link rel="stylesheet" href="css/style.css">
<link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
<!-- script before body tag ends-->
<script src="js/resources.js"></script>
<script src="js/app.js"></script>
<script src="js/engine.js"></script>
```

## Little Roadmap

 * Make more Avatars available
 * Get to the next level after winning

## Additional information

This project is part of my @udacity Front-End Web Developer Nanodegree.