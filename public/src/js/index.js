import ThreeDViewer from './3dViewer/viewer.js'

const models = {
    fox: { 
        url: '../../src/models/FoxModel/Fox.gltf', // Required
        scale: { x: 0.2, y: 0.2, z: 0.2 }, // Not required
        name: 'Fox', // Required
    },
    duck: { 
        url: '../../src/models/DuckModel/Duck.gltf', 
        scale: { x: 5, y: 5, z: 5 }, 
        name: 'Duck',
    },
}

// Initialize new 3dViewer
const viewer = new ThreeDViewer()


viewer.init(() => {
    // Just for testing. Space bar listener
    document.addEventListener("keydown", (e) => {
        if (e.code == "Space") displayNextModel()
    })

    console.log('viewer :>> ', viewer)

    // Code for loading and displaying a model
    viewer.loadModel(models.duck, model => {
        console.log('loadedModel :>> ', model)
        viewer.displayModel(model)
    })

})

let foxOrDuck = true
function displayNextModel() {
    let m
    if (foxOrDuck) m = models.fox
    else m = models.duck 
    if (m.gltf) {
        viewer.displayModel(m)
    } else {
        viewer.loadModel(m, model => {
            console.log('loadedModel :>> ', model)
            viewer.displayModel(model)
        })
    }
    foxOrDuck = !foxOrDuck
}