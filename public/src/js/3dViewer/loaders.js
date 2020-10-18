import { GLTFLoader } from '../../dependencies/three/GLTFLoader.js'
import loadingManager from './loadingManager.js'
const models = {
    fox: { url: '../../src/models/FoxModel/Fox.gltf', scale: { x: 0.2, y: 0.2, z: 0.2 } },
    duck: { url: '../../src/models/DuckModel/Duck.gltf', scale: { x: 8, y: 8, z: 8 } }
}

const gltfLoader = new GLTFLoader(loadingManager.manager)

export function loadOneGLTFModel(model, onLoad) {
  // Set onLoad event
  loadingManager.events(onModelLoaded)
  // Load model
  gltfLoader.load(model.url, (gltf) => {
    if (model.scale) gltf.scene.scale.set(model.scale.x, model.scale.y, model.scale.z)
    console.log(gltf.scene.rotation)
    //gltf.scene.computeBoundingBox()
    model.gltf = gltf
  })
  // Handle callback. Can prep model animations here
  function onModelLoaded() {
    //model.gltf.scene.id = model.id
    onLoad(model)
  }
}

// Maybe deprecated
export function prepModelsAndAnimations() {
    Object.values(models).forEach(model => {
      console.log('------->:', model.url)
      const animsByName = {} 
      // TODO: Does it crash if model doenst have animation?
      model.gltf.animations.forEach((clip) => {
        animsByName[clip.name] = clip
        console.log('  ', clip.name)
      })
      model.animations = animsByName
    })
    return models
  }

  // Only for testing
export function loadGLTFModels(init) {
    loadingManager.events(init)

    for (const model of Object.values(models)) {
        gltfLoader.load(model.url, (gltf) => {
            model.gltf = gltf
        })
    }
}
