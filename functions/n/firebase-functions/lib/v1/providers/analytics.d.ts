import { CloudFunction, EventContext } from "../cloud-functions";
import { DeploymentOptions } from "../function-configuration";
/**
 * Registers a function to handle analytics events.
 *
 * @param analyticsEventType Name of the analytics event type to which
 *   this Cloud Function is scoped.
 *
 * @returns Analytics event builder interface.
 */
export declare function event(analyticsEventType: string): AnalyticsEventBuilder;
/**
 * The Firebase Analytics event builder interface.
 *
 * Access via `functions.analytics.event()`.
 */
export declare class AnalyticsEventBuilder {
    private triggerResource;
    private options;
    /** @hidden */
    constructor(triggerResource: () => string, options: DeploymentOptions);
    /**
     * Event handler that fires every time a Firebase Analytics event occurs.
     *
     * @param handler Event handler that fires every time a Firebase Analytics event
     *   occurs.
     *
     * @returns A function that you can export and deploy.
     */
    onLog(handler: (event: AnalyticsEvent, context: EventContext) => PromiseLike<any> | any): CloudFunction<AnalyticsEvent>;
}
/** Interface representing a Firebase Analytics event that was logged for a specific user. */
export declare class AnalyticsEvent {
    /**
     * The date on which the event.was logged.
     * (`YYYYMMDD` format in the registered timezone of your app).
     */
    reportingDate: string;
    /** The name of the event. */
    name: string;
    /**
     * A map of parameters and their values associated with the event.
     *
     * Note: Values in this map are cast to the most appropriate type. Due to
     * the nature of JavaScript's number handling, this might entail a loss of
     * precision in cases of very large integers.
     */
    params: {
        [key: string]: any;
    };
    /** UTC client time when the event happened. */
    logTime: string;
    /** UTC client time when the previous event happened. */
    previousLogTime?: string;
    /** Value parameter in USD. */
    valueInUSD?: number;
    /** User-related dimensions. */
    user?: UserDimensions;
    /** @hidden */
    constructor(wireFormat: any);
}
/**
 * Interface representing the user who triggered the events.
 */
export declare class UserDimensions {
    /**
     *  The user ID set via the `setUserId` API.
     *  [Android](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.html#setUserId(java.lang.String))
     *  [iOS](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics#/c:objc(cs)FIRAnalytics(cm)setUserID)
     */
    userId?: string;
    /** The time (in UTC) at which the user first opened the app. */
    firstOpenTime?: string;
    /**
     * A map of user properties set with the
     * [`setUserProperty`](https://firebase.google.com/docs/analytics/android/properties) API.
     *
     * All values are [`UserPropertyValue`](providers_analytics_.userpropertyvalue) objects.
     */
    userProperties: {
        [key: string]: UserPropertyValue;
    };
    /** Device information. */
    deviceInfo: DeviceInfo;
    /** User's geographic information. */
    geoInfo: GeoInfo;
    /** App information. */
    appInfo?: AppInfo;
    /** Information regarding the bundle in which these events were uploaded. */
    bundleInfo: ExportBundleInfo;
    /** @hidden */
    constructor(wireFormat: any);
}
/** Predefined or custom properties stored on the client side. */
export declare class UserPropertyValue {
    /** The last set value of a user property. */
    value: string;
    /** UTC client time when the user property was last set. */
    setTime: string;
    /** @hidden */
    constructor(wireFormat: any);
}
/**
 * Interface representing the device that triggered these
 * Firebase Analytics events.
 */
export interface DeviceInfo {
    /**
     * Device category.
     *
     * Examples: "tablet" or "mobile".
     */
    deviceCategory?: string;
    /**
     * Device brand name.
     *
     * Examples: "Samsung", "HTC"
     */
    mobileBrandName?: string;
    /**
     * Device model name in human-readable format.
     *
     * Example: "iPhone 7"
     */
    mobileModelName?: string;
    /**
     * Device marketing name.
     *
     * Example: "Galaxy S4 Mini"
     */
    mobileMarketingName?: string;
    /**
     * Device model, as read from the OS.
     *
     * Example: "iPhone9,1"
     */
    deviceModel?: string;
    /**
     * Device OS version when data capture ended.
     *
     * Example: "4.4.2"
     */
    platformVersion?: string;
    /**
     * Vendor specific device identifier. This is IDFV on iOS. Not used for Android.
     *
     * Example: '599F9C00-92DC-4B5C-9464-7971F01F8370'
     */
    deviceId?: string;
    /**
     * The type of the [`resettable_device_id`](https://support.google.com/dfp_premium/answer/6238701?hl=en)
     * is IDFA on iOS (when available) and AdId on Android.
     *
     * Example: "71683BF9-FA3B-4B0D-9535-A1F05188BAF3"
     */
    resettableDeviceId?: string;
    /**
     * The user language in language-country format, where language is an ISO 639
     * value and country is an ISO 3166 value.
     *
     * Examples: "en-us", "en-za", "zh-tw", "jp"
     */
    userDefaultLanguage: string;
    /**
     * The time zone of the device when data was uploaded, as seconds skew from UTC.
     * Use this to calculate the device's local time for
     * [`EventContext.timestamp`](cloud_functions_eventcontext.html#timestamp).
     */
    deviceTimeZoneOffsetSeconds: number;
    /**
     * The device's Limit Ad Tracking setting.
     * When `true`, you cannot use `resettableDeviceId` for remarketing, demographics or influencing ads serving
     * behaviour. However, you can use `resettableDeviceId` for conversion tracking and campaign attribution.
     */
    limitedAdTracking: boolean;
}
/** Interface representing the geographic origin of the events. */
export interface GeoInfo {
    /**
     * The geographic continent.
     *
     * Example: "South America".
     */
    continent?: string;
    /**
     * The geographic country.
     *
     * Example: "Brazil".
     */
    country?: string;
    /**
     * The geographic region.
     *
     * Example: "State of Sao Paulo".
     */
    region?: string;
    /**
     * The geographic city.
     *
     * Example: "Sao Paulo".
     */
    city?: string;
}
/** Interface representing the application that triggered these events. */
export interface AppInfo {
    /**
     * The app's version name.
     *
     * Examples: "1.0", "4.3.1.1.213361", "2.3 (1824253)", "v1.8b22p6".
     */
    appVersion?: string;
    /**
     * Unique ID for this instance of the app.
     *
     * Example: "71683BF9FA3B4B0D9535A1F05188BAF3".
     */
    appInstanceId: string;
    /**
     * The identifier of the store that installed the app.
     *
     * Examples: "com.sec.android.app.samsungapps", "com.amazon.venezia", "com.nokia.nstore".
     */
    appStore?: string;
    /**
     * The app platform.
     *
     * Examples: "ANDROID", "IOS".
     */
    appPlatform: string;
    /** Unique application identifier within an app store. */
    appId?: string;
}
/** Interface representing the bundle these events were uploaded to. */
export declare class ExportBundleInfo {
    /** Monotonically increasing index for each bundle set by the Analytics SDK. */
    bundleSequenceId: number;
    /** Timestamp offset (in milliseconds) between collection time and upload time. */
    serverTimestampOffset: number;
    /** @hidden */
    constructor(wireFormat: any);
}
