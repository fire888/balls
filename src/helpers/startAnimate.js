var t0 = new Date().getTime();
var alpha = 0;
var cameraAngle = 0;


export const startAnimate = data => {
    
    const { textMesh } = data
    const { rendererText, cameraText, sceneText, controls } = data.studio

    function animate() {
        requestAnimationFrame( animate );
  
        var t1 = new Date().getTime();
        var ms = t1 - t0;
        var rotationSpeed = Math.PI/8;
        var rotationCameraSpeed = Math.PI/4;
        var movingSpeed = 200;
  
        var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
  
        var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        alpha = (ms/1000*rotationSpeed)%(Math.PI*2);
    
    
        cameraAngle = (ms/1000*rotationCameraSpeed)%(Math.PI*2);
    
  
        if (textMesh) textMesh.rotation.y = alpha;
    
  
        //controls.update();
    
        rendererText.render( sceneText, cameraText );
        rendererText.toneMapping=THREE.ReinhardToneMapping;
    }
    animate()
    
    return new Promise(resolve => resolve(data))
}