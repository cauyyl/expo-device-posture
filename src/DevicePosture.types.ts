export type DevicePostureChangePayload = {
  posture: string;
};

export type DevicePostureModuleEvents = {
  onDevicePostureChange: (event: DevicePostureChangePayload) => void;
};
