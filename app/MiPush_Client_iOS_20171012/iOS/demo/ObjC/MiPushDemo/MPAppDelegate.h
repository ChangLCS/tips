//
//  MPAppDelegate.h
//  MiPushDemo
//
//  Created by shen yang on 14-3-6.
//  Copyright (c) 2014年 Xiaomi. All rights reserved.
//


#import <UIKit/UIKit.h>
#import "MiPushSDK.h"

@interface MPAppDelegate : UIResponder
<
    MiPushSDKDelegate,
    UIApplicationDelegate,
    UNUserNotificationCenterDelegate
>

@property (strong, nonatomic) UIWindow *window;

@end
