var renderer, stage, displacementSprite, displacementFilter, loader, fond1, fond2, fond3, fond4, currentSlide = 1, ratio, ratioSpe;

function animation_home(){

    ratio = window.innerWidth / window.innerHeight;
    ratioSpe = window.innerWidth / (window.innerHeight * 1.4);

    // console.log(document.body.clientHeight);
    // console.log(document.documentElement.clientHeight);
    // console.log(window.screen.height);
    // console.log(window.innerHeight);
    // console.log('ratio', ratioSpe);

    var diff = (0.9538 - 0.3434) / ratio;

    document.querySelectorAll('.c-backgroundHome__item')[0].style.left = (-0.325 + (0.9538 + 0.3434)/2 + (diff/2)*3/4) * window.innerWidth + "px";
    document.querySelectorAll('.c-backgroundHome__item')[1].style.left = (-0.325 + (0.9538 + 0.3434)/2 + (diff/2)/4) * window.innerWidth + "px";
    document.querySelectorAll('.c-backgroundHome__item')[2].style.left = (-0.325 + (0.9538 + 0.3434)/2 - (diff/2)/4) * window.innerWidth + "px";
    document.querySelectorAll('.c-backgroundHome__item')[3].style.left = (-0.325 + (0.9538 + 0.3434)/2 - (diff/2)*3/4) * window.innerWidth + "px";




    currentSlide = 1;

    // console.log('anim_home');

    if(renderer !== undefined){
        renderer.destroy();
        renderer = null;
    }
    if(window.innerWidth >= window.innerHeight){
        renderer=PIXI.autoDetectRenderer(
            window.innerWidth, window.innerWidth, {transparent:!0}
        );
    }else{
        document.getElementById('innerCanvas').classList.add('largeur');
        document.body.classList.add('mobile');

        renderer=PIXI.autoDetectRenderer(
            window.innerWidth / ratioSpe, window.innerWidth / ratioSpe, {transparent:!0}
        );

    }

    document.getElementById('innerCanvas').appendChild(renderer.view);

    if(stage !== undefined){
        stage.removeChildren();
    }
    stage = new PIXI.Container();
    loader = new PIXI.loaders.Loader();

    if(window.innerWidth >= 1000){
        loader.add("image1","/wp-content/themes/img/slide-1.png");
        loader.add("image2","/wp-content/themes/img/slide-2.png");
        loader.add("image3","/wp-content/themes/img/slide-3.png");
        loader.add("image4","/wp-content/themes/img/slide-4.png");
    }
    else{
        loader.add("image1","/wp-content/themes/img/slide-1-mobile.png");
        loader.add("image2","/wp-content/themes/img/slide-2-mobile.png");
        loader.add("image3","/wp-content/themes/img/slide-3-mobile.png");
        loader.add("image4","/wp-content/themes/img/slide-4-mobile.png");
    }

    loader.load((loader, resources) => {

        if(!premier_appel){
            introHome();
        }


        for(var i = 1; i < 5; i++){
            // +10 et - 5 valeurs pour éviter les bords blancs
            if(window.innerWidth >= window.innerHeight){
                window["fond"+i].width = window.innerWidth;
                window["fond"+i].height = window.innerWidth;
            }else{
                window["fond"+i].width = window.innerWidth / ratioSpe;
                window["fond"+i].height = window.innerWidth / ratioSpe;

            }

            renderer.render(stage);

        }

        // renderer.render(stage);

    });
    // document.querySelectorAll('#images div').forEach(setDimensions);


    //displacement 1
    displacementSprite=PIXI.Sprite.fromImage("/wp-content/themes/img/gradient6verti.png"); //gradient4_bis //gradient4
    displacementSprite.texture.baseTexture.wrapMode=PIXI.WRAP_MODES.REPEAT; //REPEAT // MIRRORED_REPEAT //CLAMP
    displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    if(window.innerWidth >= 1000){
        fond1 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-1.png"));
        fond2 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-2.png"));
        fond3 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-3.png"));
        fond4 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-4.png"));
    }else{
        fond1 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-1-mobile.png"));
        fond2 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-2-mobile.png"));
        fond3 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-3-mobile.png"));
        fond4 = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/slide-4-mobile.png"));
    }

    fond2.alpha = 0;
    fond3.alpha = 0;
    fond4.alpha = 0;

    //displacement 2
    // displacementSprite2=PIXI.Sprite.fromImage(directory_uri+"/img/gradient_large.png");
    // displacementSprite2.texture.baseTexture.wrapMode=PIXI.WRAP_MODES.REPEAT;
    // displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);


    //settings displacement1
    //intensité
    displacementFilter.scale.x = 0;
    displacementFilter.scale.y = 0; // 200
    //centre pour curseur
    // displacementSprite.pivot.x = 256;
    // displacementSprite.pivot.y = 256;
    //echelle x/y
    displacementSprite.scale.y=2;
    displacementSprite.scale.x=1;



    stage.addChild(displacementSprite);

    stage.addChild(fond1);

    stage.filters=[displacementFilter]; //, displacementFilter2

}
animation_home ()
// function pixi() {

//     raf_pixi = requestAnimationFrame(pixi);
//     //console.log('pixi home tourne');

//     // renderer.render(stage);



//     // displacementSprite.x += 10;
//     // displacementSprite.y += 5;
//     // displacementFilter.scale.y = 200;

// }



// var mousePos = {x: 0}, delta = 0, supportsWheel = false, qdScroll = 0, animEnCours = false;
// function scrollEvent (e) {

//     if (e.type == "wheel"){ supportsWheel = true; }
//     else if (supportsWheel){ return; }

//     delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

//     if( lethargy.check(e) !== false && !animEnCours && currentSlide < 4 && delta > 0){
//         animEnCours = true;
//         nextSlide();
//     }else if( lethargy.check(e) !== false && !animEnCours && currentSlide > 1 && delta < 0){
//         animEnCours = true;
//         prevSlide();
//     }

//     // TweenMax.to(mousePos, 0.4, {
//     //     x: qdScroll*2,
//     //     //y: currentMousePos.y,
//     //     onUpdate: function () {
//     //         // displacementSprite.x = mousePos.x;
//     //         // //displacementSprite.y = mousePos.y;
//     //         // displacementFilter.scale.x = mousePos.intensite;
//     //         // displacementSprite.scale.x = mousePos.largeur;
//     //         // window["image" + num_image].x = delayx + mousePos.correction;
//     //         // displacementFilter.scale.y = mousePos.x;
//     //         displacementFilter.scale.y = mousePos.x;
//     //     },
//     //     ease: Linear.easeNone
//     // });


// }
// /* Add the event listeners for each event. */


// var attributs = {};


// function nextSlide(){

//     animEnCours = true;

//     if(currentSlide === 1){
//         document.querySelector('.c-slider__prev').classList.remove('off');
//         document.querySelector('.c-slider-nav-arrow.-left').classList.remove('off');
//     }else if(currentSlide === 3){
//         document.querySelector('.c-slider__next').classList.add('off');
//         document.querySelector('.c-slider-nav-arrow.-right').classList.add('off');
//     }

//     document.querySelector('.c-slider-nav__item.is-active').classList.remove('is-active');
//     setTimeout(function(){
//         document.querySelectorAll('.c-slider-nav__item')[currentSlide - 1].classList.add('is-active');
//     }, 400);

//     attributs.scale = 0;
//     attributs.speed = 10;
//     attributs.opacite = 0;

//     TweenMax.to(attributs, 1, {
//         scale: 200,
//         speed: 40,
//         ease: Power1.easeIn,
//         onUpdate: function () {
//             displacementSprite.y += attributs.speed;
//             displacementFilter.scale.y = attributs.scale;
//         }
//     });
//     TweenMax.to(attributs, 1, {
//         scale: 0,
//         speed: 10,
//         ease: Power1.easeOut,
//         delay: 1,
//         onUpdate: function () {
//             displacementSprite.y += attributs.speed;
//             displacementFilter.scale.y = attributs.scale;
//         }
//     });

//     currentSlide++;

//     stage.addChild(window["fond"+currentSlide]);

//     TweenMax.to(attributs, 2, {
//         opacite: 1,
//         ease: Linear.easeNone,
//         onUpdate: function () {
//             window["fond"+currentSlide].alpha = attributs.opacite;
//             renderer.render(stage);
//         },
//         onComplete: function() {
//             if(currentSlide === 1){
//                 fond4.alpha = 0;
//                 stage.removeChild(fond4);
//             }else{
//                 window["fond"+(currentSlide - 1)].alpha = 0;
//                 stage.removeChild(window["fond"+(currentSlide - 1)]);
//             }

//             if(currentSlide === 4){
//                 // currentSlide = 0;
//             }
//             // console.log(currentSlide);
//             renderer.render(stage);
//         }
//     });

//     if(document.body.classList.contains('mobile')){
//         TweenMax.fromTo(document.querySelectorAll('.c-slider__item__img .o-button')[currentSlide-1], 0.4, {opacity:0, y:'-20%'}, {opacity:1, y:'0%', delay:1.2, ease:Power2.easeOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item__img .o-button')[currentSlide-2], 0.4, {opacity:0, y:'20%', ease:Power2.easeIn});
//     }

//     deplacementCan();
//     deplacementFond();
//     deplacementTexte();


// }




// function prevSlide(){

//     animEnCours = true;

//     if(currentSlide === 2){
//         document.querySelector('.c-slider__prev').classList.add('off');
//         document.querySelector('.c-slider-nav-arrow.-left').classList.add('off');
//     }else if(currentSlide === 4){
//         document.querySelector('.c-slider__next').classList.remove('off');
//         document.querySelector('.c-slider-nav-arrow.-right').classList.remove('off');
//     }

//     document.querySelector('.c-slider-nav__item.is-active').classList.remove('is-active');
//     setTimeout(function(){
//         document.querySelectorAll('.c-slider-nav__item')[currentSlide - 1].classList.add('is-active');
//     }, 400);

//     attributs.scale = 0;
//     attributs.speed = 10;
//     attributs.opacite = 0;

//     TweenMax.to(attributs, 1, {
//         scale: 200,
//         speed: 40,
//         ease: Power1.easeIn,
//         onUpdate: function () {
//             displacementSprite.y += attributs.speed;
//             displacementFilter.scale.y = attributs.scale;
//         }
//     });
//     TweenMax.to(attributs, 1, {
//         scale: 0,
//         speed: 10,
//         ease: Power1.easeOut,
//         delay: 1,
//         onUpdate: function () {
//             displacementSprite.y += attributs.speed;
//             displacementFilter.scale.y = attributs.scale;
//         }
//     });

//     currentSlide--;

//     stage.addChild(window["fond"+currentSlide]);

//     TweenMax.to(attributs, 2, {
//         opacite: 1,
//         ease: Linear.easeNone,
//         onUpdate: function () {
//             window["fond"+currentSlide].alpha = attributs.opacite;
//             renderer.render(stage);
//         },
//         onComplete: function() {
//             if(currentSlide === 4){
//                 fond1.alpha = 0;
//                 stage.removeChild(fond1);
//             }else{
//                 window["fond"+(currentSlide + 1)].alpha = 0;
//                 stage.removeChild(window["fond"+(currentSlide + 1)]);
//             }
//             renderer.render(stage);

//             //if(currentSlide === 4){
//                 // currentSlide = 0;
//             //}
//             // console.log(currentSlide);
//         }
//     });

//     if(document.body.classList.contains('mobile')){
//         TweenMax.fromTo(document.querySelectorAll('.c-slider__item__img .o-button')[currentSlide-1], 0.4, {opacity:0, y:'-20%'}, {opacity:1, y:'0%', delay:1.2, ease:Power2.easeOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item__img .o-button')[currentSlide], 0.4, {opacity:0, y:'20%', ease:Power2.easeIn});
//     }

//     deplacementCan2();
//     deplacementFond2();
//     deplacementTexte2();


// }

// var elmtCur, elmtNex, elmtNex2, elmtPre;
// function deplacementCan(){

//     if(currentSlide === 2){
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[0], 1, {x:"-52.3%", delay:0.6, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[1], 1, {x:"0%", delay:0.5, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[2], 1, {x:"52.3%", delay:0.4, ease:Power2.easeInOut});
//     }else if(currentSlide === 3){
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[0], 1, {x:"-104.6%", delay:0.7, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[1], 1, {x:"-52.3%", delay:0.6, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[2], 1, {x:"0%", delay:0.5, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[3], 1, {x:"52.3%", delay:0.4, ease:Power2.easeInOut});
//     }else if(currentSlide === 4){
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[1], 1, {x:"-104.6%", delay:0.7, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[2], 1, {x:"-52.3%", delay:0.6, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[3], 1, {x:"0%", delay:0.5, ease:Power2.easeInOut});
//     }

//     setTimeout(function(){ animEnCours = false; },2100);

// }




// function deplacementCan2(){

//     if(currentSlide === 3){
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[1], 1, {x:"-52.3%", delay:0.4, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[2], 1, {x:"0%", delay:0.5, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[3], 1, {x:"52.3%", delay:0.6, ease:Power2.easeInOut});
//     }else if(currentSlide === 2){
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[0], 1, {x:"-52.3%", delay:0.4, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[1], 1, {x:"0%", delay:0.5, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[2], 1, {x:"52.3%", delay:0.6, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[3], 1, {x:"104.6%", delay:0.7, ease:Power2.easeInOut});
//     }else if(currentSlide === 1){
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[0], 1, {x:"0%", delay:0.5, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[1], 1, {x:"52.3%", delay:0.6, ease:Power2.easeInOut});
//         TweenMax.to(document.querySelectorAll('.c-slider__item')[2], 1, {x:"104.6%", delay:0.7, ease:Power2.easeInOut});
//     }

//     setTimeout(function(){ animEnCours = false; },2100);

// }




// let demarrage = [0, 1, 2, 3], fondLigne1, fondLigne2, fondLigne3, fondLigne4;
// function deplacementFond(){

//     shuffle(demarrage);

//     fondLigne1 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[0]].querySelector('.current');
//     fondLigne2 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[1]].querySelector('.current');
//     fondLigne3 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[2]].querySelector('.current');
//     fondLigne4 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[3]].querySelector('.current');

//     TweenMax.to(fondLigne1, 1.2, {x:"-100%", delay:0.2, ease:Power2.easeInOut});
//     TweenMax.to(fondLigne2, 1.2, {x:"-100%", delay:0.3, ease:Power2.easeInOut});
//     TweenMax.to(fondLigne3, 1.2, {x:"-100%", delay:0.4, ease:Power2.easeInOut});
//     TweenMax.to(fondLigne4, 1.2, {x:"-100%", delay:0.5, ease:Power2.easeInOut});

//     TweenMax.fromTo(fondLigne1.nextElementSibling, 1.2, {x:"100%"}, {x:"0%", delay:0.2, ease:Power2.easeInOut});
//     TweenMax.fromTo(fondLigne2.nextElementSibling, 1.2, {x:"100%"}, {x:"0%", delay:0.3, ease:Power2.easeInOut});
//     TweenMax.fromTo(fondLigne3.nextElementSibling, 1.2, {x:"100%"}, {x:"0%", delay:0.4, ease:Power2.easeInOut});
//     TweenMax.fromTo(fondLigne4.nextElementSibling, 1.2, {x:"100%"}, {x:"0%", delay:0.5, ease:Power2.easeInOut, onComplete:function(){

//         document.querySelectorAll('.ingredients').forEach(x => x.classList.remove('current'));
//         fondLigne1.nextElementSibling.classList.add('current');
//         fondLigne2.nextElementSibling.classList.add('current');
//         fondLigne3.nextElementSibling.classList.add('current');
//         fondLigne4.nextElementSibling.classList.add('current');

//         TweenMax.set('.ingredients', {clearProps:"x"});

//     }});

// }




// function deplacementFond2(){

//     shuffle(demarrage);

//     fondLigne1 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[0]].querySelector('.current');
//     fondLigne2 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[1]].querySelector('.current');
//     fondLigne3 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[2]].querySelector('.current');
//     fondLigne4 = document.querySelectorAll('.c-backgroundHome__item')[demarrage[3]].querySelector('.current');

//     TweenMax.to(fondLigne1, 1.2, {x:"100%", delay:0.2, ease:Power2.easeInOut});
//     TweenMax.to(fondLigne2, 1.2, {x:"100%", delay:0.3, ease:Power2.easeInOut});
//     TweenMax.to(fondLigne3, 1.2, {x:"100%", delay:0.4, ease:Power2.easeInOut});
//     TweenMax.to(fondLigne4, 1.2, {x:"100%", delay:0.5, ease:Power2.easeInOut});

//     TweenMax.fromTo(fondLigne1.previousElementSibling, 1.2, {x:"-100%"}, {x:"0%", delay:0.2, ease:Power2.easeInOut});
//     TweenMax.fromTo(fondLigne2.previousElementSibling, 1.2, {x:"-100%"}, {x:"0%", delay:0.3, ease:Power2.easeInOut});
//     TweenMax.fromTo(fondLigne3.previousElementSibling, 1.2, {x:"-100%"}, {x:"0%", delay:0.4, ease:Power2.easeInOut});
//     TweenMax.fromTo(fondLigne4.previousElementSibling, 1.2, {x:"-100%"}, {x:"0%", delay:0.5, ease:Power2.easeInOut, onComplete:function(){

//         document.querySelectorAll('.ingredients').forEach(x => x.classList.remove('current'));
//         fondLigne1.previousElementSibling.classList.add('current');
//         fondLigne2.previousElementSibling.classList.add('current');
//         fondLigne3.previousElementSibling.classList.add('current');
//         fondLigne4.previousElementSibling.classList.add('current');

//         TweenMax.set('.ingredients', {clearProps:"x"});

//     }});
// }




// function deplacementTexte(){

//     var elmtText = document.querySelectorAll('.c-slider-content')[currentSlide-2];
//     var elmtTextNext = document.querySelectorAll('.c-slider-content')[currentSlide-1];

//     TweenMax.to(elmtText, 1, {opacity:0, delay:0.4});
//     // TweenMax.to(elmtText.querySelector('.c-slider-content__title'), 1.2, {x:"10%", delay:0.3, ease:Power1.easeIn});
//     TweenMax.to(elmtText.querySelector('.c-slider-content__inner-tween'), 1.2, {x:"10%", delay:0.3, ease:Power1.easeIn});


//     TweenMax.to(elmtTextNext, 1, {opacity:1, delay:1.4});
//     // TweenMax.fromTo(elmtTextNext.querySelector('.c-slider-content__title'), 1.2, {x:"10%"}, {x:"0%", delay:1.4, ease:Power2.easeOut});
//     TweenMax.fromTo(elmtTextNext.querySelector('.c-slider-content__inner-tween'), 1.2, {x:"10%"}, {x:"0%", delay:1.4, ease:Power2.easeOut});

// }




// function deplacementTexte2(){
//     // console.log(currentSlide);

//     var elmtText = document.querySelectorAll('.c-slider-content')[currentSlide];
//     var elmtTextNext = document.querySelectorAll('.c-slider-content')[currentSlide-1];

//     TweenMax.to(elmtText, 1, {opacity:0, delay:0.4});
//     // TweenMax.to(elmtText.querySelector('.c-slider-content__title'), 1.2, {x:"-10%", delay:0.3, ease:Power1.easeIn});
//     TweenMax.to(elmtText.querySelector('.c-slider-content__inner-tween'), 1.2, {x:"-10%", delay:0.3, ease:Power1.easeIn});

//     TweenMax.to(elmtTextNext, 1, {opacity:1, delay:1.4});
//     // TweenMax.fromTo(elmtTextNext.querySelector('.c-slider-content__title'), 1.2, {x:"-10%"}, {x:"0%", delay:1.4, ease:Power2.easeOut});
//     TweenMax.fromTo(elmtTextNext.querySelector('.c-slider-content__inner-tween'), 1.2, {x:"-10%"}, {x:"0%", delay:1.4, ease:Power2.easeOut});

// }




// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }




// function introHome(){

//     if(document.body.classList.contains('mobile')){
//         document.querySelector('.c-slider').style.height = window.innerHeight + "px";
//         document.getElementById('innerCanvas').style.width = window.innerWidth / ratioSpe + "px";
//         document.getElementById('innerCanvas').style.height = window.innerHeight + "px";

//         if(document.querySelector('.largeur') !== null){
//             document.querySelector('.largeur').style.left = -(window.innerWidth / ratioSpe - window.innerWidth)/2 - 0.04*window.innerWidth + "px";
//         }

//         // document.getElementById('innerCanvas').style.top = -0.06*window.innerWidth + "px";
//         TweenMax.fromTo(document.querySelectorAll('.c-slider__item__img .o-button')[0], 0.4, {opacity:0, y:'-20%'}, {opacity:1, y:'0%', delay:1.2, ease:Power2.easeOut});

//     }

//     renderer.render(stage);

//     TweenMax.to('#innerCanvas', 1, {x:'0%', delay:0.2, ease:Power4.easeOut});
//     TweenMax.to('.c-slider, .c-backgroundHome', 1.4, {x:'0%', delay:0.2, ease:Power4.easeOut, onComplete:function(){
//         document.addEventListener('wheel', scrollEvent);
//         document.addEventListener('mousewheel', scrollEvent);
//         document.addEventListener('DOMMouseScroll', scrollEvent);
//     }});

//     TweenMax.to('.c-scroll', 1.4, {y:'0%', opacity:1, delay:1.4, ease:Power4.easeOut});
//     TweenMax.to('.c-backgroundHome__item', 1.4, {x:'0%', delay:0.2, ease:Power4.easeOut, onComplete:function(){
//         TweenMax.staggerTo('.stagHome', 0.5, {opacity:1}, 0.1);
//     }});
//     TweenMax.to('.o-container', 1, {opacity:1, x:'0%', delay:0.8, ease:Power2.easeOut});
//     // TweenMax.fromTo('.c-slider-content__title', 1.4, {x:'10%'}, {opacity:1, x:'0%', delay:0.8, ease:Power2.easeOut});
//     TweenMax.fromTo('.c-slider-content__inner-tween', 1.4, {x:'10%'}, {opacity:1, x:'0%', delay:0.8, ease:Power2.easeOut});


// }
