import * as THREE from '../../dependencies/three/three.module.js'

import { prepModelsAndAnimations, loadOneGLTFModel } from './loaders.js'
import DragToRotateControls from './dragToRotateControls.js'
import ScrollToZoomControls from './scrollToZoomControls.js'

const ThreeDViewerProps = {
    containerId: '3dViewerContainer',
    models: null,
    canvasSize: {
        width: 0,
        height: 0
    }
}

export default class ThreeDViewer{

    constructor(props) {
        this.currentModel = null
        this.models = {}
        this.canvas = null
        this.props = Object.assign(ThreeDViewerProps, props)
        this.canvas = this.camera = this.scene = this.clock = null

        this.scrollControls = null
        this.rotateControls = null
    }
    
    loadModel = function(model, onLoad) {
        loadOneGLTFModel(model, (loadedModel) => {
            // this.models[model.name] = model // Can be used when we want to cache loaded models
            if (onLoad) onLoad(loadedModel)
        })
    }

    displayModel = function(model) {
        // Remove old currentModel
        if (this.currentModel != null) {
            const oldModel = this.scene.getObjectById(this.currentModel.gltf.scene.id)
            this.scene.remove(oldModel)
        }
        this.currentModel = model
        this.scene.add(model.gltf.scene)
        this.rotateControls.setModel(model.gltf.scene)
        this.render()
    }

    displayModelByName = function(modelName) {}

    getModels = function() {
        const models = prepModelsAndAnimations()
        this.models = models
        return models
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
    
    init = function(callback) {
        this.container = document.getElementById(this.props.containerId)

        var positionInfo = this.container.getBoundingClientRect()
        // Seems to work
        var canvasHeightStyle = parseInt(positionInfo.height)
        var canvasWidthStyle = parseInt(positionInfo.width)
        const canvasWidth = parseInt(canvasWidthStyle)
        const canvasHeight = parseInt(canvasHeightStyle)
        // Clock
        this.clock = new THREE.Clock()
        // Scene 
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x222222)
        // Camera
        const fov = 45
        const aspect = 2  // the canvas default
        const near = 0.1
        const far = 100
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this.camera.position.set(0, 5, 20)
        // Renderer
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(canvasWidth, canvasHeight)
        this.canvas = this.renderer.domElement
        this.container.appendChild( this.renderer.domElement )
        // Light
        var light = new THREE.DirectionalLight(0xfdfdfd, 2)
        light.position.set(2, 2, 1).normalize()
        this.scene.add(light)
        
        // Controls
        // Drag to rotate
        this.rotateControls = new DragToRotateControls(null, () => {
            this.render()
        })
        // Scroll to zoom
        this.scrollControls = new ScrollToZoomControls(this.camera, this.canvas, () => {
            this.render()
        })
        
        window.onresize = () => { this.resizeScreen(this.renderer)}
        if (callback) callback()
    }
    
    resizeScreen(renderer) {
        var positionInfo = this.canvas.parentElement.getBoundingClientRect()
        var canvasHeightStyle = positionInfo.height
        var canvasWidthStyle = positionInfo.width
        const canvasWidth = parseInt(canvasWidthStyle)
        const canvasHeight = parseInt(canvasHeightStyle)

        renderer.setSize(canvasWidth, canvasHeight)
        const canvas = renderer.domElement
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
        this.render()
    }
      
}
