const noop = () => { };
const DevicePostureModule = {
    addListener: (_, listener) => {
        // Web platform reports a static posture value.
        listener({ posture: "unknown" });
        return { remove: noop };
    },
};
export default DevicePostureModule;
//# sourceMappingURL=DevicePostureModule.web.js.map