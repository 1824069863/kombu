var hover, toggleVideo = false;
var le_scroll = null

document.addEventListener("click", function(event){
    if(event.target.classList.contains('c-slider__prev') || (event.target.classList.contains('c-slider-nav-arrow') && event.target.classList.contains('-left') ) ){
        if( !animEnCours && currentSlide > 1 ){
            prevSlide();
        }
    }else if(event.target.classList.contains('c-slider__next') || (event.target.classList.contains('c-slider-nav-arrow') && event.target.classList.contains('-right') ) ){
        if( !animEnCours && currentSlide < 4){
            nextSlide();
        }

    // menu 
    }else if(event.target.classList.contains('c-menu')){
    	document.body.classList.toggle('has-nav-open');

    	// ouverture
    	if(document.body.classList.contains('has-nav-open')){
    		animation_menu();
            if(le_scroll !== null){
                le_scroll.off();
            }

            document.querySelector('.c-nav-col-right').addEventListener('mouseenter', onHover);
            document.querySelector('.c-nav-col-right').addEventListener('mouseleave', offHover);  

            if(document.body.classList.contains('single')){
                grilleOvered = false;
                cancelAnimationFrame(raf_single);
            }

            // arreter les rafs des différents templates



        // fermeture
    	}else{
            cancelAnimationFrame(raf_pixi_menu);
            if(le_scroll !== null){
                le_scroll.on();
            }
            
            document.querySelector('.c-nav-col-right').removeEventListener('mouseenter', onHover);
            document.querySelector('.c-nav-col-right').removeEventListener('mouseleave', offHover);

            if(document.body.classList.contains('single')){
                grilleOvered = true;
                le_raf_single();
            }
            // relancer les rafs des différents templates
    	}
    }else if(event.target.classList.contains('toNextItem') && !animEnCours){
        goNextItem();
    }else if(event.target.classList.contains('toPrevItem') && !animEnCours){
        goPrevItem();
    }else if(event.target.classList.contains('c-footer-copyright__label__credit') && !animEnCours){
        document.body.classList.add('has-credit-open');
    }else if((event.target.classList.contains('c-credit__close') && !animEnCours) || (event.target.classList.contains('.c-credit__close__button__line') && !animEnCours)){
        document.body.classList.remove('has-credit-open');
    }else if(event.target.classList.contains('c-about-video-wrap') && !animEnCours){
        if(!toggleVideo){
            toggleVideo = true;
            TweenMax.to('.innerParallax, .c-about-video-play', 0.4, {opacity:0});
            document.querySelector('.c-about-video-wrap').insertAdjacentHTML('beforeend', chaineIframe);
        }else{
            toggleVideo = false;
            TweenMax.to('.innerParallax, .c-about-video-play', 0.4, {opacity:1, onComplete:function(){
                var elem = document.querySelector('iframe');
                elem.parentNode.removeChild(elem);
            }});
        }
    }


});
