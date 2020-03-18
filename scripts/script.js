const Scene = require('Scene')
const TouchGestures = require('TouchGestures')
const NativeUI = require('NativeUI')
const Textures = require('Textures')

const planeTracker = Scene.root.find('planeTracker')
const horizontalIcon = Textures.get('horizontal')
const verticalIcon = Textures.get('vertical')
const movingIcon = Textures.get('moving')

const picker = NativeUI.picker
const index = 0

const pickerConfiguration = {
	selectedIndex : index,

	items: [
		{ image_texture: horizontalIcon },
		{ image_texture: verticalIcon },
		{ image_texture: movingIcon },
		{ image_texture: horizontalIcon }
	]
}

picker.configure(pickerConfiguration)
picker.visible = true

picker.selectedIndex.monitor().subscribe(function(index){
	if(index.newValue == 0)
		planeTracker.trackingMode = Scene.TrackingMode.PLANE
	else if(index.newValue == 1)
		planeTracker.trackingMode = Scene.TrackingMode.VERTICAL_PLANE
	else if(index.newValue == 2)
		planeTracker.trackingMode = Scene.TrackingMode.MOVING_OBJECT
	else if(index.newValue == 3)
		planeTracker.trackingMode = Scene.TrackingMode.ARBITRARY_DEPTH
})

TouchGestures.onTap().subscribe(function(touch){
	planeTracker.trackPoint(touch.location)
})