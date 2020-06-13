import * as THREE from 'three'

export const initItems = appData => {

    return new Promise(resolve => {  
      
      const { 
        sceneText 
      } = appData.studio

      const { 
        starTexture, 
        textureAlpha, 
        textMesh, 
        asterMeshes, 
        spaceTimeMesh, 
        skyboxTexture 
      } = appData.resourses
      

      sceneText.background = skyboxTexture;
        
      // STARS
      var vertices = [];
      for ( var i = 0; i < 1000; i ++ ) { 
        var angle = Math.random()*Math.PI*2
        vertices.push(
          Math.cos(angle) * (100+Math.random()*200),
          (Math.random()-.5) * 1000,
          Math.sin(angle) * (100+Math.random()*200)
        );
      }
    
    
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ) );
      
      var starMaterial = new THREE.PointsMaterial({
        size: 0.7,
        map: starTexture,
        transparent: true
      });
      
      var stars = new THREE.Points(geometry, starMaterial);
      sceneText.add(stars);

      // GRID
      var grid = new THREE.GridHelper( 10, 10, 0xffffff, 0xffffff );
      grid.position.set(0, 20, 0);
      grid.visible = false
      sceneText.add(grid);
        
      // BALL
      textMesh.position.set(0, 0, 0)
      textMesh.material.metalness = .5;
      textMesh.material.color = new THREE.Color(0xffffff);
    
      textMesh.material.alphaMap = textureAlpha;
      textMesh.material.transparent = true;
      textMesh.material.needsUpdate = true;
          
      textMesh.visible = false
      sceneText.add(textMesh);  


      // ASTEROID
      const asterGroup = new THREE.Group()
      asterGroup.visible = false
      asterMeshes.forEach(function(asterMesh, asterMeshIndex){
        asterGroup.add(asterMesh);
      });
      sceneText.add(asterGroup)
  
              
      // PROTUBERANEC
      spaceTimeMesh.scale.set(.75,.75,.75);
      //items.spaceTimeMesh = spaceTimeMesh    

      var edgesGeom = new THREE.EdgesGeometry( spaceTimeMesh.geometry );
      var timeMesh = new THREE.LineSegments( edgesGeom, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
      timeMesh.position.set(0,-1.5,0);
      timeMesh.scale.set(.75,.75,.75);
      timeMesh.visible = false
      sceneText.add(timeMesh);

      appData.items = {
        timeMesh,
        asterMeshes,
        asterGroup,
        ball: textMesh,
        stars,
        grid,
      }
      resolve(appData)
    })
  }