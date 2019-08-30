var mouseX = 0, mouseY = 0,

            windowHalfX = window.innerWidth / 2,
            //在自适应设计中，需要用js来判断浏览器宽度，从而调整网页宽度和布局，我一开始用的是window.innerWidth。
            //$(window).width()也是获得浏览器宽度的方法，但它跟window.innerWidth是不同的。

            // 1）$(window).width()需要引用jquery.js文件，它是jquery方法。而window.innerWidth是js方法，不需要引用jquery.js文件。

            // 2）它们获取的数值是不同的，window.innerWidth获取当前窗口的宽度(包含滚动条)，$(window).width()获取当前窗口的宽度(不包含滚动条)
            //  ———————————————— 
            // 版权声明：本文为CSDN博主「function__」的原创文章，遵循CC 4.0 by-sa版权协议，转载请附上原文出处链接及本声明。
            // 原文链接：https://blog.csdn.net/function__/article/details/72843722
            //window.innerWidth能获取当前窗口的宽度(包含滚动条)，当浏览器宽度调整时，这个值也会跟着变化
            windowHalfY = window.innerHeight / 2,

            SEPARATION = 200,
            AMOUNTX = 1,
            AMOUNTY = 1,

            camera, scene, renderer;

            init();
            animate();



            function init() {


                /*
                 *   Define variables
                 */
                var container, separation = 1000, amountX = 50, amountY = 50, color = 0xffffff,
                particles, particle;

                container = document.getElementById("canvas");


                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 100;

                scene = new THREE.Scene();
                //alpha:true/false 是否可以设置背景色透明
                //devicePixelRatio,canvas的实际渲染倍率
                //在浏览器的window变量中有一个devicePixelRatio的属性，该属性表示了屏幕的设备像素比，即用几个（通常是2个）像素点宽度来渲染1个像素。

//在canvas context中也存在一个 webkitBackingStorePixelRatio 的属性，该属性的值决定了浏览器在渲染canvas之前会用几个像素来来存储画布信息
//要使canvas适配高倍屏，就是要将canvas放大到设备像素比来绘制，最后将canvas压缩成一倍的物理大小来展示。如下：

// canvas.style.width = canvas.width;
// canvas.style.height = canvas.height;

// canvas.width = canvas.width * ratio;
// canvas.height = canvas.height * ratio;              
                renderer = new THREE.CanvasRenderer({ alpha: true });
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setClearColor( 0x000000, 0 );   // canvas background color
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );

               

                var PI2 = Math.PI * 2;
                var material = new THREE.SpriteCanvasMaterial( {

                    color: color,
                    opacity: 0.5,
                    program: function ( context ) {

                        context.beginPath();
                        context.arc( 0, 0, 0.5, 0, PI2, true );
                        context.fill();

                    }

                } );
                //THREE.Geometry(画布几何)
                var geometry = new THREE.Geometry();

                /*
                 *   Number of particles
                 */
                for ( var i = 0; i < 150; i ++ ) {

                    particle = new THREE.Sprite( material );
                    particle.position.x = Math.random() * 2 - 1;
                    particle.position.y = Math.random() * 2 - 1;
                    particle.position.z = Math.random() * 2 - 1;
                    particle.position.normalize();
                    particle.position.multiplyScalar( Math.random() * 10 + 600 );
                    particle.scale.x = particle.scale.y = 5;

                    scene.add( particle );

                    geometry.vertices.push( particle.position );

                }

                /*
                 *   Lines
                 */

                var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: color, opacity: 0.2 } ) );
                scene.add( line );

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            //

            function onDocumentMouseMove(event) {

                mouseX = (event.clientX - windowHalfX) * 0.05;
                mouseY = (event.clientY - windowHalfY) * 0.2;

            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length > 1 ) {

                    event.preventDefault();

                    mouseX = (event.touches[ 0 ].pageX - windowHalfX) * 0.7;
                    mouseY = (event.touches[ 0 ].pageY - windowHalfY) * 0.7;

                }

            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length == 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }

            //

            function animate() {

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                camera.position.x += ( mouseX - camera.position.x ) * 0.1;
                camera.position.y += ( - mouseY + 200 - camera.position.y ) * 0.05;
                camera.lookAt( scene.position );

                renderer.render( scene, camera );

            }