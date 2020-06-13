import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


function generateTexture() {

    var canvas = document.createElement( 'canvas' );
    canvas.width = 2;
    canvas.height = 2;

    var context = canvas.getContext( '2d' );
    context.fillStyle = '#e0e0e0';
    context.fillRect( 0, 0, 2, 2 );

    return canvas;
}



export const initStudio = data => {
    return new Promise(resolve => {
      var cameraText = new THREE.PerspectiveCamera( 70, $('#textCanvas').width() / $('#textCanvas').height(), 0.01, 1000 ); //new 
      cameraText.position.set(0,Math.cos(2*Math.PI/5)*10,Math.sin(2*Math.PI/5)*10);
      cameraText.lookAt(new THREE.Vector3(0,0,0));
      
      //var controls = new OrbitControls(cameraText, document.getElementById('textCanvas'))
      //controls.update();
  
      var sceneText = new THREE.Scene();
      
      var textureAlpha = new THREE.CanvasTexture( generateTexture() );
      textureAlpha.magFilter = THREE.NearestFilter;
      textureAlpha.wrapT = THREE.RepeatWrapping;
      textureAlpha.wrapS = THREE.RepeatWrapping;
      textureAlpha.repeat.set( 1, 1 );
            
      var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
      sceneText.add( ambientLight );
      
      var pointLight1 = new THREE.PointLight( 0xffffff, 1 );
      pointLight1.position.set(50, 50, 50);
      sceneText.add( pointLight1 );
      
      
      var rendererText = new THREE.WebGLRenderer( { antialias: true, canvas: document.getElementById('textCanvas'), alpha: false } );
      cameraText.aspect = $('#textCanvas').width() / $('#textCanvas').height();
      cameraText.updateProjectionMatrix();
      rendererText.setSize( $('#textCanvas').width(), $('#textCanvas').height() );



      window.addEventListener('resize', function(event) {
        if (document.getElementById('textCanvas')) {
          rendererText.setSize(window.innerWidth, window.innerHeight)
          cameraText.left = document.getElementById('textCanvas').clientWidth / -2;
          cameraText.right = document.getElementById('textCanvas').clientWidth / 2;
          cameraText.top = document.getElementById('textCanvas').clientHeight / 2;
          cameraText.bottom = document.getElementById('textCanvas').clientHeight / -2;
          cameraText.aspect = document.getElementById('textCanvas').clientWidth / document.getElementById('textCanvas').clientHeight;
          cameraText.updateProjectionMatrix();
        }
      })

  
      data.studio = {
        cameraText,
        //controls,
        sceneText,
        textureAlpha,
        ambientLight,
        pointLight1,
        rendererText
      }

      resolve(data)
    })
  }