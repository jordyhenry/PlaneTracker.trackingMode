import Scene from 'Scene';
import Patches from 'Patches';

/*
  Values taken from https://sparkar.facebook.com/ar-studio/learn/reference/enums/scenemodule.trackingmode
*/
enum TrackingModes {
  PLANE = "PLANE",
  MOVING_OBJECT = "MOVING_OBJECT"
}

(async function () {
  const planeTracker = await Scene.root.findFirst('planeTracker') as PlaneTracker
  const selectedTrackingModeIndex = await Patches.outputs.getScalar('pickerSelectedIndex')

  selectedTrackingModeIndex.monitor({fireOnInitialValue: true}).subscribe(({newValue}) => {
    if(newValue == 0)
      planeTracker.setMode(TrackingModes.PLANE)
    else if(newValue == 1)
      planeTracker.setMode(TrackingModes.MOVING_OBJECT)
  }) 
})(); 
