var raf_fond, rendererF, stageF, displacementSpriteF, displacementFilterF, loaderF, fond1F;

var ancienDelta = 0, attributsF, debutAnimFond, ordoX = 0, ordoY = 0;

function animation_fond(){

    ratioSpe = window.innerWidth / (window.innerHeight * 1.5);
    
    debutAnimFond = true;

    attributsF = {};
    attributsF.intensite = 0;
    attributsF.distance = 0;

    if(rendererF !== undefined){
        rendererF.destroy();
        rendererF = null;
    }

    if(window.innerWidth >= window.innerHeight){
        rendererF=PIXI.autoDetectRenderer(
            window.innerWidth, window.innerWidth, {transparent:!0}
        );
    }else{
        document.getElementById('inner_canvas').classList.add('largeur');
        document.body.classList.add('mobile');
        
        rendererF=PIXI.autoDetectRenderer(
            window.innerWidth / ratioSpe, window.innerWidth / ratioSpe, {transparent:!0}
        );

    }

    if(document.body.classList.contains('mobile')){
        document.querySelector('.c-volet').classList.remove('haut');
    }

    if(document.body.classList.contains('page-template-retailler')){
        extend();
    }

    document.getElementById('inner_canvas').appendChild(rendererF.view);

    if(stageF !== undefined){
        stageF.removeChildren();
    }
    stageF = new PIXI.Container();
    loaderF = new PIXI.loaders.Loader();

    loaderF.add("image1", directory_uri+"/img/background-stripe.png");
    loaderF.add("image2", directory_uri+"/img/gradient6verti.png");

    loaderF.load((loader, resources) => {

        //console.log(resources.image1);
        // fond1F = new PIXI.Sprite();
        fond1F = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(resources.image1.url));
        fond1F.width = fond1F.height = window.innerWidth;

        if(window.innerWidth > 2273){
            fond1F.scale.x = window.innerWidth / 2273;
            fond1F.scale.y = window.innerWidth / 2200;
        }
        
        fond1F.tileScale.x = window.innerWidth / 2273; //(resolution img)
        fond1F.tileScale.y = window.innerWidth / 2200; //(resolution img)
        

        if(document.body.classList.contains('mobile')){
            // window["fond"+i].width = window.innerWidth / ratioSpe;
            // fond1F.height = window.innerWidth / ratioSpe;

            fond1F.width = fond1F.height = window.innerWidth / ratioSpe;
            fond1F.tileScale.x = window.innerWidth / 2273 / ratioSpe; //(resolution img)
            fond1F.tileScale.y = window.innerWidth / 2200 / ratioSpe;
            // fond1F.width = window.innerWidth * 4;
        }

        //fond1F.tilePosition.x= 10;
        // fond1F.texture.baseTexture.wrapMode=PIXI.WRAP_MODES.REPEAT;



        

        //displacement 1
        displacementSpriteF=PIXI.Sprite.fromImage(resources.image2.url); //gradient4_bis //gradient4
        displacementSpriteF.texture.baseTexture.wrapMode=PIXI.WRAP_MODES.REPEAT; //REPEAT // MIRRORED_REPEAT //CLAMP
        displacementFilterF = new PIXI.filters.DisplacementFilter(displacementSpriteF);




        //intensité
        displacementFilterF.scale.x = 0;

        if(document.body.classList.contains('page-template-about') || isMobile()){
            displacementFilterF.scale.y = 150; 
            if(document.querySelector('.c-about-video__wrap') !== null){
                document.querySelector('.c-about-video__wrap').addEventListener("mouseenter", onVideo);
                document.querySelector('.c-about-video__wrap').addEventListener("mouseleave", offVideo);
            }
        }else{
            displacementFilterF.scale.y = 0; // 200
        }

        if(document.body.classList.contains('page-template-retailler')){
            TweenMax.set('.o-text p, .o-form', {opacity:0, x:"-5%"});
        }
        
        //centre pour curseur
        // displacementSprite.pivot.x = 256;
        // displacementSprite.pivot.y = 256;

        //echelle x/y
        displacementSpriteF.scale.y=1;
        displacementSpriteF.scale.x=1.2;

        displacementSpriteF.y += 20;

        stageF.addChild(displacementSpriteF);
        stageF.addChild(fond1F);
        stageF.filters=[displacementFilterF]; //, displacementFilter2

        rendererF.render(stageF);

        if(!premier_appel){
            introFond();
        }
    });
}


var chaineIframe = '<iframe src="https://player.vimeo.com/video/53343768?loop=1&autoplay=1&color=ffffff&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
// var chaineIframe = '<iframe src="https://www.youtube.com/embed/71Es-8FfATo?controls=0?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
function introFond(){

    if(document.body.classList.contains('page-template-contact')){
        document.querySelectorAll('.c-nav-main ul li')[4].querySelector('a').classList.add('is-active');
    }else if(document.body.classList.contains('page-template-about')){
        document.querySelectorAll('.c-nav-main ul li')[2].querySelector('a').classList.add('is-active');
    }else if(document.body.classList.contains('page-template-retailler')){
        document.querySelectorAll('.c-nav-main ul li')[3].querySelector('a').classList.add('is-active');
    }else if(document.body.classList.contains('page-template-cocktails')){
        document.querySelectorAll('.c-nav-main ul li')[1].querySelector('a').classList.add('is-active');
    }

    if(!isMobile()){
        document.addEventListener('wheel', scrollEventF);
        document.addEventListener('mousewheel', scrollEventF);
        document.addEventListener('DOMMouseScroll', scrollEventF);
    }

    rendererF.render(stageF);
    if(document.body.classList.contains('mobile')){
        // document.querySelector('.c-volet').classList.remove('haut');
        if(document.querySelector('.o-stripe-bg__volet') !== null){
            document.querySelector('.o-stripe-bg__volet').style.display = "none";
        }
        TweenMax.to('.c-volet', 1, {scaleY: 0, ease:Power4.easeInOut, onComplete:function(){
            if(document.querySelector('.c-volet') !== null){
                document.querySelector('.c-volet').classList.add('haut');
            }
        }});
    }else{
        TweenMax.to('.o-stripe-bg__volet', 1, {x:0.0375*window.innerWidth+"px", y:0.0375*window.innerWidth+"px", ease:Power2.easeInOut, onComplete:function(){
            if(document.querySelector('.o-stripe-bg__volet') !== null){
                document.querySelector('.o-stripe-bg__volet').style.display = "none";
            }
        }});
    }
    
    
    TweenMax.staggerTo('.stagF', 0.5, {opacity:1, delay:1}, 0.1);

    if(!document.body.classList.contains('page-template-about') && !document.body.classList.contains('page-template-cocktails')){
        
        TweenMax.to('.c-retailler-spacer .voile', 0.8, {scaleX:0, delay:1, ease:Power3.easeOut});
        
        if(document.body.classList.contains('page-template-retailler')){
            TweenMax.to('.o-text p, .o-form', 0.8, {opacity:1, x:'0%', delay:1, ease:Power3.easeOut});
        }

        TweenMax.to('.o-inner-tween', 0.6, {opacity:1, y:'0px', ease:Power2.easeOut, delay:0.6});
        
        if(document.body.classList.contains('mobile')){
            attributsF.intensite = 200;
        }else{
            attributsF.intensite = 400;
        }

        if(!isMobile()){
            TweenMax.to(attributsF, 2, {
                intensite: 0,
                onUpdate: function () {
                    
                    displacementFilterF.scale.y = attributsF.intensite;
                    rendererF.render(stageF);
                    displacementSpriteF.y += 4;
                
                    // console.log(attributsF.intensite);
                },
                ease: Power2.easeInOut,
                onComplete:function(){
                    le_raf_fond();
                    debutAnimFond = false;
                }
            });
        }else{
            le_raf_fond();
            debutAnimFond = false;
        }

        if(document.body.classList.contains('page-template-contact')){
            document.getElementById('submit').addEventListener('click', submitEvent);
        }else if(document.body.classList.contains('page-template-retailler')){
            document.getElementById('submit').addEventListener('click', submitEvent2);
        }

    // si template cocktails
    }else if(document.body.classList.contains('page-template-cocktails')){

        if(document.body.classList.contains('mobile')){
            attributsF.intensite = 200;
        }else{
            attributsF.intensite = 400;
        }

        if(!isMobile()){
            TweenMax.to(attributsF, 2, {
                intensite: 0,
                onUpdate: function () {
                    
                    displacementFilterF.scale.y = attributsF.intensite;
                    rendererF.render(stageF);
                    displacementSpriteF.y += 4;
                    
                },
                ease: Power2.easeInOut,
                onComplete:function(){
                    le_raf_fond();
                    debutAnimFond = false;
                }
            });
        }else{
            le_raf_fond();
            debutAnimFond = false;
        }

        TweenMax.to('.c-about-big-title__title, .o-text', 0.8, {y:'0%', opacity:1, delay:0.7, ease:Power2.easeOut});
        TweenMax.to('.c-about-big-title__bg span', 0.8, {scaleY:0, delay:1, ease:Power1.easeOut});
        TweenMax.staggerTo('.c-cocktail-voile', 0.8, {scaleY:0, ease:Power2.easeIn}, 0.1);

    // si template about
    }else if(document.body.classList.contains('page-template-about')){
        // quand page about
        le_raf_fond();
        debutAnimFond = false;
        TweenMax.to('.o-inner-tween', 1.2, {y:'0%', ease:Power2.easeOut});
        TweenMax.to('.c-volet', 1, {scaleY: 0, ease:Power4.easeInOut, onComplete:function(){
            if(document.querySelector('.c-volet') !== null){
                document.querySelector('.c-volet').classList.add('haut');
            }
        }});
    }

    document.body.classList.remove('bloque');

}

function scrollEventF (e) {

    if (e.type == "wheel"){ supportsWheel = true; }
    else if (supportsWheel){ return; }

    delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

    if(delta > 100){
        delta = 100;
    }else if(delta < -100){
        delta = -100;
    }



    //displacementFilterF.scale.y += ancienDelta - delta;

    // console.log(delta);


}



var isOnVideo = false, passageUnique = false;
function onVideo(){
    isOnVideo = true;
}
function offVideo(){
    isOnVideo = false;
}







function le_raf_fond(){
    raf_fond = requestAnimationFrame(le_raf_fond);

    //displacementSpriteF.x += delta;
    
    //if(ancienDelta - delta !== 0){
        if(!debutAnimFond && !document.body.classList.contains('page-template-about') && !isMobile()){
            TweenMax.to(attributsF, 2, {
                intensite: delta * 4,
                onUpdate: function () {
                    displacementFilterF.scale.y = attributsF.intensite;
                    fond1F.tilePosition.x = document.querySelector('.vs-section').getBoundingClientRect().top;
                },
                ease: Linear.easeNone
            });
        }

    //}

    //PAS OUF
    if(document.body.classList.contains('page-template-about') || isMobile()){
        displacementFilterF.scale.y = 150;
    }


    rendererF.render(stageF);

    displacementSpriteF.y += 4;


    // console.log('raf fond tourne');

    if(isOnVideo){
        passageUnique = false;
        ordoX = posX - document.querySelector('.c-about-video__wrap').getBoundingClientRect().left - document.querySelector('.c-about-video__wrap').clientWidth/2;
        ordoY = posY - document.querySelector('.c-about-video__wrap').getBoundingClientRect().top - document.querySelector('.c-about-video__wrap').clientHeight/2;
        
        TweenMax.to('.c-about-video-wrap .-black', 0.5, {x: ordoX + "px",y: ordoY + "px",ease:Linear.easeNone});
        TweenMax.to('.c-about-video-wrap .-red', 0.6, {x: ordoX + "px",y: ordoY + "px",ease:Linear.easeNone});
        TweenMax.to('.c-about-video-wrap .-yellow', 0.7, {x: ordoX + "px",y: ordoY + "px",ease:Linear.easeNone});
        TweenMax.to('.c-about-video-wrap .-purple', 0.8, {x: ordoX + "px",y: ordoY + "px",ease:Linear.easeNone});
        TweenMax.to('.c-about-video-wrap .-green', 0.9, {x: ordoX + "px",y: ordoY + "px",ease:Linear.easeNone});
    }else if(passageUnique === false){
        
        passageUnique = true;
        TweenMax.to('.c-about-video-wrap .-black', 0.5, {x: "0px",y: "0px",ease:Power4.easeInOut});
        TweenMax.to('.c-about-video-wrap .-red', 0.6, {x: "0px",y: "0px",ease:Power4.easeInOut});
        TweenMax.to('.c-about-video-wrap .-yellow', 0.7, {x: "0px",y: "0px",ease:Power4.easeInOut});
        TweenMax.to('.c-about-video-wrap .-purple', 0.8, {x: "0px",y: "0px",ease:Power4.easeInOut});
        TweenMax.to('.c-about-video-wrap .-green', 0.9, {x: "0px",y: "0px",ease:Power4.easeInOut});
    }

    if(document.body.classList.contains('page-template-about') && document.querySelector('.vs-div').classList.contains('inviewport')){
        if(window.innerWidth < 1440){
            TweenMax.to('.c-about-logo div', 0.8, { scale: (0.6 + le_scroll.vars.current/1300), rotation:le_scroll.vars.current/80, ease:Linear.easeNone});
        }else{
            TweenMax.to('.c-about-logo div', 0.8, { scale: (0.6 + le_scroll.vars.current/(window.innerWidth*1.3)), rotation:le_scroll.vars.current/80, ease:Linear.easeNone});
        }
    }

}
