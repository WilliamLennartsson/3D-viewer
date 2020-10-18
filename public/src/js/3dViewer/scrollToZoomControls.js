import * as THREE from '../../dependencies/three/three.module.js'

export default class ScrollToZoomControls {
    constructor(camera, canvas, onChangeListener) {
        this.canvas = canvas
        this.camera = camera
        this.onChange = onChangeListener
        this.mouse = new THREE.Vector2()

        // Only for FireFox 
        this.FFScrollSpeed = 3

        // Scroll EventListener
        const mouseWheelEvent=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
        this.eventType = mouseWheelEvent
        if (document.attachEvent) //if IE (and Opera depending on user setting)
            this.canvas.attachEvent("on"+mouseWheelEvent, function(e){alert('Mouse wheel movement detected!')})
        else if (document.addEventListener) //WC3 browsers
            this.canvas.addEventListener(mouseWheelEvent, this.onDocumentMouseWheel, false)
    }

    notifyOnChange = () => {
        if (this.onChange) this.onChange()
    }

    onDocumentMouseWheel = ( event ) => {
        let newFov
        const fovMAX = 80
        const fovMIN = 1
        // Check if browser is firefox
        if (this.eventType == "DOMMouseScroll") {
            if (event.detail < 0) newFov = -this.FFScrollSpeed  // Up
            else newFov = this.FFScrollSpeed // Down
        } else
            newFov = event.wheelDelta * 0.05 

        
        this.camera.fov -= newFov
        this.camera.fov = Math.max( Math.min( this.camera.fov, fovMAX ), fovMIN )
        this.camera.updateProjectionMatrix()
        this.notifyOnChange()
    }

}
