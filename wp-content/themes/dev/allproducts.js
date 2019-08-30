var hoverProduits, produits = [], valeur = 0, loaderP;

function animation_products(){

    hoverProduits = document.querySelectorAll('.c-products__link');
    hoverProduits.forEach(x => {
        x.addEventListener("mouseenter", onHoverProduit);
    });

    produits = [];

    document.querySelectorAll('.c-products-patterns__item').forEach(x => {
        produits.push(x);
    });

    loaderP = new PIXI.loaders.Loader();


    loaderP.add("image1","/wp-content/themes/img/random-01.png");
    loaderP.add("image2","/wp-content/themes/img/random-02.png");
    loaderP.add("image3","/wp-content/themes/img/random-03.png");
    loaderP.add("image4","/wp-content/themes/img/random-04.png");
    loaderP.add("image5","/wp-content/themes/img/random-05.png");
    loaderP.add("image6","/wp-content/themes/img/random-06.png");
    loaderP.add("image7","/wp-content/themes/img/random-07.png");
    loaderP.add("image8","/wp-content/themes/img/random-08.png");

    loaderP.load((loader, resources) => {
        
        if(!premier_appel){
            introProducts();
        }
    });

}


function introProducts(){
    
    document.querySelectorAll('.c-nav-main ul li')[0].querySelector('a').classList.add('is-active');

    TweenMax.to('.c-products-volet', 1, {scaleY: 0, ease:Power4.easeInOut});
    
    TweenMax.to('.c-products-header__title', 0.5, {y: '0px', opacity:1, delay:0.3, ease:Power1.easeOut});
    TweenMax.to('.c-scroll', 0.5, {y: '0px', opacity:1, delay:0.5, ease:Power1.easeOut});

    TweenMax.to('.c-products__list', 0.8, {y: '0px', opacity:1, delay:0.7, ease:Power4.easeOut});

    TweenMax.staggerFromTo('.c-products-patterns__list > div', 0.8, {y:"-160%"}, {y:"0%", ease:Power2.easeOut}, 0.07);

    document.body.classList.remove('bloque');
    
}


function onHoverProduit(event){

    shuffle(produits);


    if(event.target.classList.contains('-red')){
        valeur = -20;
    }else if(event.target.classList.contains('-green')){
        valeur = -40;
    }else if(event.target.classList.contains('-yellow')){
        valeur = -60;
    }else if(event.target.classList.contains('-purple')){
        valeur = -80;
    }

    TweenMax.to(produits[0], 1, {x:valeur + "%", ease:Power4.easeInOut});
    TweenMax.to(produits[1], 1.1, {x:valeur + "%", ease:Power4.easeInOut});
    TweenMax.to(produits[2], 1.2, {x:valeur + "%", ease:Power4.easeInOut});
    TweenMax.to(produits[3], 1.3, {x:valeur + "%", ease:Power4.easeInOut});
}