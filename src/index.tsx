import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-local-network-permission' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const LocalNetworkPermission = NativeModules.LocalNetworkPermission
  ? NativeModules.LocalNetworkPermission
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const DEFAULT_TIMEOUT_WAITING_FOR_LOCAL_NETWORK_CHECKING = 1;

/**
 * following function also will trigger the local network permission dialog if it never show up
 * when the permission wasn't granted, the false result will return soon
 * but when the permission was granted, we only can wait for some seconds and assume it is positive result
 */
export const checkLocalNetworkAccess = (
  timeoutSeconds?: number
): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return LocalNetworkPermission.check(
      timeoutSeconds ?? DEFAULT_TIMEOUT_WAITING_FOR_LOCAL_NETWORK_CHECKING
    );
  }
  return Promise.resolve(true);
};

/**
 * following function also will trigger the local network permission dialog if it never show up
 */
export const requestLocalNetworkAccess = (): Promise<void> => {
  return checkLocalNetworkAccess()
    .then(() => Promise.resolve())
    .catch((error: Error) => {
      console.warn(`requestLocalNetworkAccess ${JSON.stringify(error)}`);
    });
};
