let Promise = require('es6-promise').Promise;
import {loadTexture, getArrayBuffer} from "./loaders.js";

export function loadAllAssets(){
    let textureFen1 = loadTexture('./textures/example.jpg');
    //let audioError = getArrayBuffer('sounds/error.wav');

    return Promise.all([textureFen1]).then(
        (res) => {
            let assets = {
                tex: res[0]
            };
            return assets;
        },
        (err) => {
            console.error(err);
            return err;
        }
    );
}
