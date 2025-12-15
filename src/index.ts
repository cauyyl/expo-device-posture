// Reexport the native module. On web, it will be resolved to DevicePostureModule.web.ts
// and on native platforms to DevicePostureModule.ts
export { default } from './DevicePostureModule';
export { default as DevicePostureView } from './DevicePostureView';
export * from  './DevicePosture.types';
