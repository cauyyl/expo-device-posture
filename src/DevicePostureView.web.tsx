import * as React from 'react';

import { DevicePostureViewProps } from './DevicePosture.types';

export default function DevicePostureView(props: DevicePostureViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
