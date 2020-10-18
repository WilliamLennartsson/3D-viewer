import * as THREE from '../../dependencies/three/three.module.js'

const manager = new THREE.LoadingManager();

function events(onLoadCallback) {
    //const progressbarElem = document.querySelector('#progressbar');
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        // progressbarElem.style.width = `${itemsLoaded / itemsTotal * 100 | 0}%`;
    };
    manager.onLoad = () => {
        // prepModelsAndAnimations()
        onLoadCallback()
    }
}

export default {
    manager, 
    events
}