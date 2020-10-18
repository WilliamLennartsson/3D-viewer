
export default class DragToRotateControls {
    constructor(model, onChangeListener) {
        this.model = model
        this.onChange = onChangeListener

        this.targetRotationX = 0;
        this.targetRotationOnMouseDownX = 0;
        this.targetRotationY = 0;
        this.targetRotationOnMouseDownY = 0;
        
        this.mouseX = 0;
        this.mouseXOnMouseDown = 0;
        
        this.mouseY = 0;
        this.mouseYOnMouseDown = 0;

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.finalRotationY = 0

        document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
    }

    setModel = (model) => {
        this.model = model
    }

    notifyOnChange = () => {

        //horizontal rotation   
        this.model.rotation.y += ( this.targetRotationX - this.model.rotation.y ) * 0.1;
   
        //vertical rotation 
        this.finalRotationY = (this.targetRotationY - this.model.rotation.x); 
   
        if (this.model.rotation.x  <= 1 && this.model.rotation.x >= -1 ) { this.model.rotation.x += this.finalRotationY * 0.1; }
        if (this.model.rotation.x  > 1 ) { this.model.rotation.x = 1 }
        if (this.model.rotation.x  < -1 ) { this.model.rotation.x = -1 }

        this.finalRotationY = (this.targetRotationY - this.model.rotation.x); 

        if (this.model.rotation.x <= 1 && this.model.rotation.x >= -1) { this.model.rotation.x += this.finalRotationY * 0.1; }
        if (this.model.rotation.x > 1) { this.model.rotation.x = 1 }
        else if (this.model.rotation.x < -1) { this.model.rotation.x = -1 }
        
        this.onChange()
   }

    onDocumentMouseDown = ( event ) => {
        event.preventDefault();
        
        if (!this.model) return

        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', this.onDocumentMouseOut, false );

        this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
        this.targetRotationOnMouseDownX = this.targetRotationX;

        this.mouseYOnMouseDown = event.clientY - this.windowHalfY;
        this.targetRotationOnMouseDownY = this.targetRotationY;

    }

    onDocumentMouseMove = ( event ) => {
        this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;

        this.targetRotationY = this.targetRotationOnMouseDownY + (this.mouseY - this.mouseYOnMouseDown) * 0.02;
        this.targetRotationX = this.targetRotationOnMouseDownX + (this.mouseX - this.mouseXOnMouseDown) * 0.02;
        this.notifyOnChange()
    }

    onDocumentMouseUp = ( event ) => {

        document.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', this.onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', this.onDocumentMouseOut, false );

    }

    onDocumentMouseOut = ( event ) => {

        document.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', this.onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', this.onDocumentMouseOut, false );

    }

    onDocumentTouchStart = ( event ) => {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                this.mouseXOnMouseDown = event.touches[ 0 ].pageX - this.windowHalfX;
                this.targetRotationOnMouseDownX = this.targetRotationX;

                this.mouseYOnMouseDown = event.touches[ 0 ].pageY - this.windowHalfY;
                this.targetRotationOnMouseDownY = this.targetRotationY;

        }

    }

    onDocumentTouchMove = ( event ) => {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
                this.targetRotationX = this.targetRotationOnMouseDownX + ( this.mouseX - this.mouseXOnMouseDown ) * 0.05;

                this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
                this.targetRotationY = this.targetRotationOnMouseDownY + (this.mouseY - this.mouseYOnMouseDown) * 0.05;
        }

    }
}