import React, { createContext, useContext, useEffect, useMemo, useState, } from "react";
import DevicePostureModule from "../DevicePostureModule";
export const devicePostureState = {
    current: "unknown",
};
const DevicePostureContext = createContext(devicePostureState.current);
export const DevicePostureProvider = ({ children, }) => {
    const [posture, setPosture] = useState(devicePostureState.current);
    useEffect(() => {
        devicePostureState.current = posture;
    }, [posture]);
    useEffect(() => {
        const handlePostureChange = (nextPosture) => {
            devicePostureState.current = nextPosture.posture;
            setPosture(nextPosture.posture);
        };
        const subscription = DevicePostureModule.addListener("onDevicePostureChange", handlePostureChange);
        return () => {
            subscription.remove?.();
        };
    }, []);
    const value = useMemo(() => posture, [posture]);
    return (<DevicePostureContext.Provider value={value}>
      {children}
    </DevicePostureContext.Provider>);
};
export const useDevicePosture = () => {
    return useContext(DevicePostureContext);
};
//# sourceMappingURL=DevicePostureContext.js.map