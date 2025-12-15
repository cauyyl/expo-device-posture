import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import DevicePostureModule from "../DevicePostureModule";
import type { DevicePostureModuleEvents } from "../DevicePosture.types";

type DevicePostureListener = DevicePostureModuleEvents["onDevicePostureChange"];
type DevicePostureChangeEvent = Parameters<DevicePostureListener>[0];
type DevicePostureValue = DevicePostureChangeEvent["posture"];

export const devicePostureState: { current: DevicePostureValue } = {
  current: "unknown",
};

const DevicePostureContext = createContext<DevicePostureValue>(
  devicePostureState.current
);

type DevicePostureProviderProps = {
  children?: React.ReactNode;
};

export const DevicePostureProvider: React.FC<DevicePostureProviderProps> = ({
  children,
}) => {
  const [posture, setPosture] = useState<DevicePostureValue>(
    devicePostureState.current
  );

  useEffect(() => {
    devicePostureState.current = posture;
  }, [posture]);

  useEffect(() => {
    const handlePostureChange: DevicePostureListener = (nextPosture) => {
      devicePostureState.current = nextPosture.posture;
      setPosture(nextPosture.posture);
    };

    const subscription = DevicePostureModule.addListener(
      "onDevicePostureChange",
      handlePostureChange
    );

    return () => {
      subscription.remove?.();
    };
  }, []);

  const value = useMemo(() => posture, [posture]);

  return (
    <DevicePostureContext.Provider value={value}>
      {children}
    </DevicePostureContext.Provider>
  );
};

export const useDevicePosture = (): DevicePostureValue => {
  return useContext(DevicePostureContext);
};
