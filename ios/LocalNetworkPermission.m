#import "LocalNetworkPermission.h"
#import "LocalNetworkPrivacy.h"

@implementation LocalNetworkPermission
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(check:(double)blank
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    if (@available(iOS 14, *)){
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"check local network permission with timeout");
            LocalNetworkPrivacy* localNetworkPrivacy = [LocalNetworkPrivacy new];
            [localNetworkPrivacy checkAccessState:^(BOOL granted) {
                NSLog(@"Granted: %@", granted ? @"YES" : @"NO");
                resolve(@(granted));
            }];
        });
    }else{
        resolve(@(true));
    }
}

@end

