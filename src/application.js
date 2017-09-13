/* eslint-env browser */
import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
import CollectionGeometries from './geometries.js';
import CollectionMaterials from './materials.js';
import {loadAllAssets} from './assets.js';

const gui = new Gui();
const debug = true;
const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const stats = new Stats();
const materials = new CollectionMaterials;
const geometries = new CollectionGeometries;
let controls;

function init(assets){
    console.log(assets);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.style.margin =0;
    document.body.appendChild(renderer.domElement);
    camera.position.z = 80;
    controls = new OrbitControls(camera, renderer.domElement);

    // stats
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom

    //lights
    let ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );
    gui.addScene(scene, ambientLight, renderer);
    gui.addMaterials(materials);

    let light = new THREE.PointLight( 0xffffff, 1, 0 );
    light.position.set( 0, 200, 0 );
    scene.add( light );

    var axisHelper = new THREE.AxisHelper( 50 );
    //scene.add( axisHelper );

    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    let object = new THREE.Mesh(geometries["box"], materials["phong"]);
    scene.add(object);

    addStats(debug);
    render();
}


function addStats(debug) {
    if (debug) {
        document.body.appendChild(stats.domElement);
    }
}

function render(){
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(render);
}

loadAllAssets().then(
    (assets) => {
        init(assets);
    },
    (err) => { console.log(`impossible to load the assets: ${err}`); }
);
