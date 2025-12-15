import { requireNativeView } from 'expo';
import * as React from 'react';

import { DevicePostureViewProps } from './DevicePosture.types';

const NativeView: React.ComponentType<DevicePostureViewProps> =
  requireNativeView('DevicePosture');

export default function DevicePostureView(props: DevicePostureViewProps) {
  return <NativeView {...props} />;
}
