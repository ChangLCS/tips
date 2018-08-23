//
//  AppDelegate.swift
//  MiPushDemo
//
//  Created by zhangdali on 2016/11/1.
//  Copyright © 2016年 Xiaomi. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, MiPushSDKDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?
    var mainViewController: ViewController?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        mainViewController = UIStoryboard.init(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "ViewController") as? ViewController
        let nav = UINavigationController.init(rootViewController: mainViewController!)
        window?.rootViewController = nav
        window?.makeKeyAndVisible()
        MiPushSDK.registerMiPush(self, type: UIRemoteNotificationType(rawValue: UInt(0)), connect: true);
        
        // 点击通知打开app处理
        let userInfo = launchOptions?[UIApplicationLaunchOptionsKey.remoteNotification]
        if (userInfo != nil) {
            let alertVC = UIAlertController.init(title: "消息", message: "\(userInfo)", preferredStyle: .alert)
            let act = UIAlertAction.init(title: "确定", style: .cancel, handler: nil)
            alertVC.addAction(act)
            nav.present(alertVC, animated: true, completion: nil)
            
        }
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let nsdata = NSData(data: deviceToken)
        let token = nsdata.description
        print("APNS Token: \(token)")
        MiPushSDK.bindDeviceToken(deviceToken)
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        // 自行处理失败
    }
    
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        MiPushSDK.handleReceiveRemoteNotification(userInfo)
        let log = "APNs notify: \(userInfo)"
        mainViewController?.printLog(str: log)
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        let userInfo: [AnyHashable : Any] = notification.request.content.userInfo;
        if notification.request.trigger is UNPushNotificationTrigger {
            MiPushSDK.handleReceiveRemoteNotification(userInfo)
        }
        completionHandler(UNNotificationPresentationOptions.alert)
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        let userInfo: [AnyHashable : Any] = response.notification.request.content.userInfo;
        if response.notification.request.trigger is UNPushNotificationTrigger {
            MiPushSDK.handleReceiveRemoteNotification(userInfo)
            let log = "MiPush notify: \(userInfo)";
            mainViewController?.printLog(str: log)
        }
        completionHandler()
    }
    
    func miPushRequestSucc(withSelector selector: String!, data: [AnyHashable : Any]!) {
        let log = "\(selector): \(data)"
        mainViewController?.printLog(str: log)
        if selector == "bindDeviceToken:" {
            let regId = data["regid"]
            print("regId = \(regId)")
        }
    }
    
    func miPushRequestErr(withSelector selector: String!, error: Int32, data: [AnyHashable : Any]!) {
        let log = "command error(\(error)|\(selector)): \(data.description)"
        mainViewController?.printLog(str: log)
    }
    
    func miPushReceiveNotification(_ data: [AnyHashable : Any]!) {
        let log = "MiPush notify: \(data)";
        mainViewController?.printLog(str: log)
    }
}

