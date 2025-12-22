import type { DevicePostureModuleEvents } from "./DevicePosture.types";

type Subscription = {
  remove: () => void;
};

type DevicePostureModuleInterface = {
  addListener: <TEvent extends keyof DevicePostureModuleEvents>(
    eventName: TEvent,
    listener: DevicePostureModuleEvents[TEvent]
  ) => Subscription;
};

const noop = () => {};

const DevicePostureModule: DevicePostureModuleInterface = {
  addListener: (_, listener) => {
    // Web platform reports a static posture value.
    listener({ posture: "unknown" });
    return { remove: noop };
  },
};

export default DevicePostureModule;
