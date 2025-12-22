import type { DevicePostureModuleEvents } from "./DevicePosture.types";
type Subscription = {
    remove: () => void;
};
type DevicePostureModuleInterface = {
    addListener: <TEvent extends keyof DevicePostureModuleEvents>(eventName: TEvent, listener: DevicePostureModuleEvents[TEvent]) => Subscription;
};
declare const DevicePostureModule: DevicePostureModuleInterface;
export default DevicePostureModule;
//# sourceMappingURL=DevicePostureModule.web.d.ts.map