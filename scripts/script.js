const Scene = require('Scene');
const Patches = require('Patches');

(async function(){
  const planeTracker = await Scene.root.findFirst('planeTracker')
  const selectedTrackingModeIndex = await Patches.outputs.getScalar('pickerSelectedIndex')

  selectedTrackingModeIndex.monitor({ fireOnInitialValue: true }).subscribe((index) => {
    if(index.newValue == 0)
      planeTracker.mode = Scene.TrackingMode.PLANE
    else if(index.newValue == 1)
      planeTracker.mode = Scene.TrackingMode.MOVING_OBJECT
  })
})();
