const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const NativeUI = require('NativeUI');
const Textures = require('Textures');

(async function(){
  const planeTracker = await Scene.root.findFirst('planeTracker')
  const horizontalIcon = await Textures.findFirst('horizontal')
  const verticalIcon = await Textures.findFirst('vertical')
  const movingIcon = await Textures.findFirst('moving')
  
  const picker = NativeUI.picker
  const index = 0
  
  const pickerConfiguration = {
    selectedIndex : index,
  
    items: [
      { image_texture: horizontalIcon },
      { image_texture: movingIcon }
    ]
  }
  
  picker.configure(pickerConfiguration)
  picker.visible = true

  picker.selectedIndex.monitor().subscribe(function(index){
    if(index.newValue == 0)
      planeTracker.mode = Scene.TrackingMode.PLANE
    else if(index.newValue == 1)
      planeTracker.mode = Scene.TrackingMode.MOVING_OBJECT
  })
  
  TouchGestures.onTap().subscribe(function(touch){
    planeTracker.trackPoint(touch.location)
  })
})();