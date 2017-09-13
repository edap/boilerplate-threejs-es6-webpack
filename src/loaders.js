import * as THREE from 'three';
let Promise = require('es6-promise').Promise;
import 'whatwg-fetch'; //https://github.com/github/fetch

export function loadTexture(url){
    let p = new Promise((resolve, reject) => {
        let texLoader = new THREE.TextureLoader();
        texLoader.load(url,
                        (tex)=>{ resolve(tex);},
                        (xhr)=>{
                            //console.log(xhr.loaded);
                        },
                        (err)=>{
                          console.log(url+ " not found"); 
                          reject(err);
                        }
                      );
    });
    return p;
}

export function getArrayBuffer(url){
    let p = new Promise((resolve, reject) => {
        return fetch(url).then(response => {
            if (response.ok) {
                resolve(response.arrayBuffer());
            } else {
                reject(new Error('error'));
            }
        }, error => {
            reject(new Error(error.message));
        });
    });
    return p;
}
