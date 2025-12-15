import React from "react";
import type { DevicePostureModuleEvents } from "../DevicePosture.types";
type DevicePostureListener = DevicePostureModuleEvents["onDevicePostureChange"];
type DevicePostureChangeEvent = Parameters<DevicePostureListener>[0];
type DevicePostureValue = DevicePostureChangeEvent["posture"];
export declare const devicePostureState: {
    current: DevicePostureValue;
};
type DevicePostureProviderProps = {
    children?: React.ReactNode;
};
export declare const DevicePostureProvider: React.FC<DevicePostureProviderProps>;
export declare const useDevicePosture: () => DevicePostureValue;
export {};
//# sourceMappingURL=DevicePostureContext.d.ts.map