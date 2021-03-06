# Orinoco

Le projet Orinoco est le MVP d'une API qui propose des ours en peluche faits main à la vente que j'ai réalisé dans le cadre de la formation de développeur web d'Open Classrooms en septembre/octobre 2020.


## Technologies utilisées

HTML, CSS, Sass, Bootstrap, Javascript, Webpack, Babel, Eslint.


## Prérequis avant de démarrer le projet

Cloner le dépôt GitHub suivant : https://github.com/OpenClassrooms-Student-Center/JWDP5.git

Puis suivre les indications du dépôt JWDP5.

Après avoir effectué ces étapes vous pouvez cloner le projet ou le voir sur cette page : https://flora-pvt.github.io/p5-orinoco/


## Détails sur Orinoco

Sur la page index les produits sont affichés grâce aux données fournies par le serveur :

![page index](https://raw.githubusercontent.com/Flora-Pvt/p5-orinoco/master/src/static/images/index.png)

Sur la page produit, le produit sélectionné par l'utilisateur est affiché. Le produit peut être personnalisé et ajouté au panier : 

![page produit](https://raw.githubusercontent.com/Flora-Pvt/p5-orinoco/master/src/static/images/produit.png)

Sur la page panier, les produits ajoutés au panier par l'utilisateur sont affichés. Celui-ci peut en modifier la quantité. 
Il peut commander en utilisant le formulaire. La validation de ce formulaire enverra les données recueillies et les produits selectionnés au serveur (ces données doivent être au bon format pour être acceptées par le serveur).

![page panier](https://raw.githubusercontent.com/Flora-Pvt/p5-orinoco/master/src/static/images/panier.png)

Sur la page commande est affiché le numéro de commande récupéré du serveur suite à la soumission des précédentes données :

![page commande](https://raw.githubusercontent.com/Flora-Pvt/p5-orinoco/master/src/static/images/commande.png)
