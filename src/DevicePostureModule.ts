import { NativeModule, requireNativeModule } from "expo";

import { DevicePostureModuleEvents } from "./DevicePosture.types";

declare class DevicePostureModule extends NativeModule<DevicePostureModuleEvents> {}

// This call loads the native module object from the JSI.
export default requireNativeModule<DevicePostureModule>("DevicePosture");
