declare module "expo-device-posture" {
  import type { FC, ReactNode } from "react";

  export type DevicePostureChangePayload = {
    posture: string;
  };

  export type DevicePostureModuleEvents = {
    onDevicePostureChange: (event: DevicePostureChangePayload) => void;
  };

  export interface DevicePostureProviderProps {
    children?: ReactNode;
  }

  export const DevicePostureProvider: FC<DevicePostureProviderProps>;

  export function useDevicePosture(): DevicePostureChangePayload["posture"];

  export interface DevicePostureModule {
    addListener<E extends keyof DevicePostureModuleEvents>(
      event: E,
      listener: DevicePostureModuleEvents[E]
    ): { remove?: () => void };
  }

  const DevicePostureModule: DevicePostureModule;

  export { DevicePostureModule };

  export default DevicePostureModule;
}
