// Reexport the native module. On web, it will be resolved to DevicePostureModule.web.ts
// and on native platforms to DevicePostureModule.ts
import DevicePostureModule from "./DevicePostureModule";
export function hello(): string {
  return DevicePostureModule.hello();
}

export {
  DevicePostureProvider,
  useDevicePosture,
} from "./context/DevicePostureContext";
