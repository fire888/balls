import mapJpg from '../assets/map.jpg'
import starPng from '../assets/star.png'
import textureJpg from '../assets/texture.jpg'
import normalMapJpg from '../assets/normalMap.jpg'
import pxjpg from '../assets/skybox/px.jpg'
import nxjpg from '../assets/skybox/nx.jpg'
import pyjpg from '../assets/skybox/py.jpg'
import nyjpg from '../assets/skybox/ny.jpg'
import pzjpg from '../assets/skybox/pz.jpg'
import nzjpg from '../assets/skybox/nz.jpg'
import ballglb from '../assets/ball.glb'
import aster2glb from '../assets/aster2.glb'
import spacetimeglb from '../assets/spacetime.glb'


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'



var manager = new THREE.LoadingManager();
var textureLoader = new THREE.TextureLoader(manager);
var cubeTextureLoader = new THREE.CubeTextureLoader(manager);
var loader = new GLTFLoader(manager);



export const loadAssets = appData => {
    return new Promise(resolve => {
        appData.resourses = {}
        load(appData.resourses) 
        manager.onLoad = () => resolve(appData)
    })
} 


const load = res => {
    textureLoader.load(mapJpg,
        function ( texture ) {
            res.roughnessMetalnessMap = texture;
        },
        undefined,
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );


    textureLoader.load(starPng,
        function ( texture ) {
            console.log('star.png loaded');
            console.log(texture);
            res.starTexture = texture;
        },
        undefined,
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );

    textureLoader.load(textureJpg,
        function ( texture ) {
            console.log('texture.jpg loaded');
            console.log(texture);
            res.textureMap = texture;
        },
        undefined,
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );

    textureLoader.load(normalMapJpg,
        // onLoad callback
        function ( texture ) {
            res.normalMap = texture;
        },
        undefined,
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );



    cubeTextureLoader.load([pxjpg, nxjpg, pyjpg, nyjpg, pzjpg, nzjpg],
        function ( texture ) {
            res.skyboxTexture = texture;
        },
        undefined,
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );


    loader.load(ballglb,
        function ( gltf ) {
            res.textMesh = gltf.scene.children[0];
            
            if (res.textMesh) {
                res.textMesh.scale.set(.5, .5, .5);
                res.textMesh2 = res.textMesh.clone();
                res.textMesh3 = res.textMesh.clone();
            }
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error);
        }
    );


    loader.load( aster2glb,
        function ( gltf ) {
            res.asterMeshes = []
            for (var i = 0; i < gltf.scene.children.length; i ++) {
                //if (i > 0) { 
                    // gltf.scene.children[i].visible = false;
                //}
                //else {
                    // gltf.scene.children[i].speedVector = new THREE.Vector3();
                //    gltf.scene.children[i].visible = false;
                //}
                if (i > 0) res.asterMeshes.push(gltf.scene.children[i]);
            }
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error);
        }
    );



    loader.load(spacetimeglb,
        function ( gltf ) {
            res.spaceTimeMesh = gltf.scene.children[0];
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error);
        }
    );
}