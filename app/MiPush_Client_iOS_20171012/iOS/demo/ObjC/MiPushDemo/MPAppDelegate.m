//
//  MPAppDelegate.m
//  MiPushDemo
//
//  Created by shen yang on 14-3-6.
//  Copyright (c) 2014年 Xiaomi. All rights reserved.
//

#import "MPAppDelegate.h"
#import "MPViewController.h"

@implementation MPAppDelegate
{
    MPViewController *vMain;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

    vMain = [[MPViewController alloc] init];
    vMain.iDelegate = self;
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vMain];
    self.window.rootViewController = nav;
    [self.window makeKeyAndVisible];

    [MiPushSDK registerMiPush:self type:0 connect:YES];
    
    // 点击通知打开app处理逻辑
    NSDictionary* userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    if(userInfo){
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"消息"
                                                                       message:[NSString stringWithFormat:@"%@", userInfo]
                                                                preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *act = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
        [alert addAction:act];
        [nav presentViewController:alert animated:YES completion:nil];
    }
    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
}

#pragma mark 注册push服务.
- (void)application:(UIApplication *)app didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [vMain printLog:[NSString stringWithFormat:@"APNS token: %@", [deviceToken description]]];

    // 注册APNS成功, 注册deviceToken
    [MiPushSDK bindDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)app didFailToRegisterForRemoteNotificationsWithError:(NSError *)err
{
    [vMain printLog:[NSString stringWithFormat:@"APNS error: %@", err]];

    // 注册APNS失败.
    // 自行处理.
}

#pragma mark Local And Push Notification
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    [vMain printLog:[NSString stringWithFormat:@"APNS notify: %@", userInfo]];
    
    // 当同时启动APNs与内部长连接时, 把两处收到的消息合并. 通过miPushReceiveNotification返回
    [MiPushSDK handleReceiveRemoteNotification:userInfo];
}

// iOS10新加入的回调方法
// 应用在前台收到通知
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    NSDictionary * userInfo = notification.request.content.userInfo;
    if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [vMain printLog:[NSString stringWithFormat:@"APNS notify: %@", userInfo]];
        [MiPushSDK handleReceiveRemoteNotification:userInfo];
    }
    //    completionHandler(UNNotificationPresentationOptionAlert);
}

// 点击通知进入应用
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [vMain printLog:[NSString stringWithFormat:@"APNS notify: %@", userInfo]];
        [MiPushSDK handleReceiveRemoteNotification:userInfo];
    }
    completionHandler();
}

#pragma mark MiPushSDKDelegate
- (void)miPushRequestSuccWithSelector:(NSString *)selector data:(NSDictionary *)data
{
    [vMain printLog:[NSString stringWithFormat:@"command succ(%@): %@", [self getOperateType:selector], data]];
    
    if ([selector isEqualToString:@"registerMiPush:"]) {
        [vMain setRunState:YES];
    }else if ([selector isEqualToString:@"registerApp"]) {
        // 获取regId
        NSLog(@"regid = %@", data[@"regid"]);
    }else if ([selector isEqualToString:@"bindDeviceToken:"]) {
        [MiPushSDK setAlias:@"dailybuild_test_alias"];
        [MiPushSDK subscribe:@"dailybuild_test_topic"];
        [MiPushSDK setAccount:@"dailybuild_test_account"];
        // 获取regId
        NSLog(@"regid = %@", data[@"regid"]);
    }else if ([selector isEqualToString:@"unregisterMiPush"]) {
        [vMain setRunState:NO];
    }
}

- (void)miPushRequestErrWithSelector:(NSString *)selector error:(int)error data:(NSDictionary *)data
{
    [vMain printLog:[NSString stringWithFormat:@"command error(%d|%@): %@", error, [self getOperateType:selector], data]];
}

- (void)miPushReceiveNotification:(NSDictionary*)data
{
    // 1.当启动长连接时, 收到消息会回调此处
    // 2.[MiPushSDK handleReceiveRemoteNotification]
    //   当使用此方法后会把APNs消息导入到此
    [vMain printLog:[NSString stringWithFormat:@"XMPP notify: %@", data]];
}

- (NSString*)getOperateType:(NSString*)selector
{
    NSString *ret = nil;
    if ([selector hasPrefix:@"registerMiPush:"] ) {
        ret = @"客户端注册设备";
    }else if ([selector isEqualToString:@"unregisterMiPush"]) {
        ret = @"客户端设备注销";
    }else if ([selector isEqualToString:@"registerApp"]) {
        ret = @"注册App";
    }else if ([selector isEqualToString:@"bindDeviceToken:"]) {
        ret = @"绑定 PushDeviceToken";
    }else if ([selector isEqualToString:@"setAlias:"]) {
        ret = @"客户端设置别名";
    }else if ([selector isEqualToString:@"unsetAlias:"]) {
        ret = @"客户端取消别名";
    }else if ([selector isEqualToString:@"subscribe:"]) {
        ret = @"客户端设置主题";
    }else if ([selector isEqualToString:@"unsubscribe:"]) {
        ret = @"客户端取消主题";
    }else if ([selector isEqualToString:@"setAccount:"]) {
        ret = @"客户端设置账号";
    }else if ([selector isEqualToString:@"unsetAccount:"]) {
        ret = @"客户端取消账号";
    }else if ([selector isEqualToString:@"openAppNotify:"]) {
        ret = @"统计客户端";
    }else if ([selector isEqualToString:@"getAllAliasAsync"]) {
        ret = @"获取Alias设置信息";
    }else if ([selector isEqualToString:@"getAllTopicAsync"]) {
        ret = @"获取Topic设置信息";
    }
    
    return ret;
}


@end
