// premier appel menu
// import {AppLoaderPlugin} from '@pixi/loaders';
// import {Application} from '@pixi/app';
// Application.registerPlugin(AppLoaderPlugin);
//创建一个舞台 (stage)
//创建一个画布 (render)
//把画布插入DOM中
//创建一个精灵 (sprite)
////把精灵加入画布 
//把画布加入舞台
//刷新舞台
// 注意事项：

//  对于有事件的精灵，通常需要设置sprite.interactive = true ， 对于作按钮用的精灵，需要设置sprite.buttonMode = true;
//  与DOM的事件不同的是，精灵中的事件，是进行了二次封装的，
//  通常需要用var event = data.originalEvent来与普通dom中的event对象保持一至
//  不过又不完全相同，如data.originalEvent.stopPropagation()就不起作用.

//  关于stopPropagation的问题，stopPropagation是dom中的概念，在canvas/webGL中是没有的，所以不能说是pixi的问题
PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var raf_pixi_menu, deltaX, deltaY, ancienX = 0, ancienY = 0, attributsMenu = {}, grilleOvered = false;
var rendererMenu =PIXI.autoDetectRenderer(//创建一个画布
    document.getElementById('canvasMenu').clientWidth * (1 + 0.3), document.getElementById('canvasMenu').clientWidth * (1 + 0.3), {transparent:!0}
);

document.getElementById('canvasMenu').appendChild(rendererMenu.view);

var stageMenu = new PIXI.Container();//创建一个舞台（容器）(1)容器表示显示对象的集合。它是作为其他对象的容器的所有显示对象的基类，即容器是用来装载多个显示对象的，其中也包括它自身的类别即Container


//上面提到了Sprite是继承于Container的，那么Container又继承于什么对象呢？
//那就是DisplayObject，DisplayObject是最基本的显示对象，也就是说，三者之间的继承关系是
//PIXI.Sprite->PIXI.Container->PIXI.DisplayObject


//var texture = PIXI.Texture.fromImage("bunny.png");
//texture可以理解成一种承载图片的结构，它本身不能直接用于显示，需要通过精灵(sprite)才能显示，有点类似于dom中的临时碎片（DocumentFragment）
//可以直接用于舞台显示的对象,可以理解为DOM中的element.
//精灵可以直接用图片创建，也可以先创建材质，再用材质创建精灵
//displacement 1
var displacementSpriteMenu=PIXI.Sprite.fromImage("/wp-content/themes/img/gradient6verti.png"); //精灵对象表示基于纹理对象存在，是能将纹理显示到舞台的显示对象
//容器与精灵的继承关系是PIXI.Sprite->PIXI.Container
displacementSpriteMenu.texture.baseTexture.wrapMode=PIXI.WRAP_MODES.REPEAT; //REPEAT // MIRRORED_REPEAT //CLAMP
var displacementFilterMenu = new PIXI.filters.DisplacementFilter(displacementSpriteMenu);


var fondMenu = new PIXI.Sprite(PIXI.Texture.fromImage("/wp-content/themes/img/menu.png"));


fondMenu.width = fondMenu.height = document.getElementById('canvasMenu').clientWidth * (1 + 0.3);

//settings displacement1

//intensité
displacementFilterMenu.scale.x = 0; //100
displacementFilterMenu.scale.y = 0; //100 // 200



//centre pour curseur
displacementSpriteMenu.pivot.x = 256;
displacementSpriteMenu.pivot.y = 256;

//echelle x/y
displacementSpriteMenu.scale.y = 2;
displacementSpriteMenu.scale.x = 1;

attributsMenu.intensiteX = 0;
attributsMenu.intensiteY = 0;
attributsMenu.posiX = 0;
attributsMenu.posiY = 0;



stageMenu.addChild(displacementSpriteMenu);

stageMenu.addChild(fondMenu);

stageMenu.filters=[displacementFilterMenu]; //, displacementFilter2

var deformX = 0, deformY = 0;

var posX = 0;
var posY = 0;

function pixiMenu() {
    ancienX = 5;
    ancienY = 5;

	// TEST
    displacementSpriteMenu.rotation += 0.02;
    
    raf_pixi_menu = requestAnimationFrame(pixiMenu);
    rendererMenu.render(stageMenu);

    // console.log((posX - ancienX) * 8);

    if((posX - ancienX) * 8 > 500){
        deformX = 500;
    }else if((posX - ancienX) * 8 < -500){
        deformX = -500;
    }else{
        deformX = (posX - ancienX) * 8;
    }

    if((posY - ancienY) * 8 > 500){
        deformY = 500;
    }else if((posY - ancienY) * 8 < -500){
        deformY = -500;
    }else{
        deformY = (posY - ancienY) * 8;
    }

    displacementSpriteMenu.x = posX;
    displacementSpriteMenu.y = posY;
    //TweenMax.to('#obj'(动画对象),动画持续时间(s),{left:200px（css属性）})
    //TweenMax.to("#obj", 3, {x:200});//在原有位置向右移动200px
    //TweenMax.to("#obj", 3, {x:200, y:100});//向右移动200px的同时向下移动100px
    TweenMax.to(attributsMenu, 2, {
        intensiteX: deformX,
        intensiteY: deformY,
        posiX: posX,
        posiY: posY,
        ease: Power1.easeOut,
        onUpdate: function () {//当动画发生改变时(动画进行中的每一帧)不停的触发此事件。
            displacementFilterMenu.scale.x = attributsMenu.intensiteX;
            displacementFilterMenu.scale.y = attributsMenu.intensiteY;
            displacementSpriteMenu.x = attributsMenu.posiX;
    		displacementSpriteMenu.y = attributsMenu.posiY;
        }
    });

    ancienX = posX;
    ancienY = posY;
    

}

function animation_menu(){
	pixiMenu();
}


animation_menu()


function onHover(){

    grilleOvered = true;

    ancienX = posX;
    ancienY = posY;
}


function offHover(){
    grilleOvered = false;
}