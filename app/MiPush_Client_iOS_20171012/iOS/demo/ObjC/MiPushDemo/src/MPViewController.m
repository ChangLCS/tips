//
//  MPViewController.m
//  MiPushDemo
//
//  Created by shen yang on 14-3-6.
//  Copyright (c) 2014年 Xiaomi. All rights reserved.
//


#import "MPViewController.h"
#import "MiPushSDK.h"

@interface MPViewController (Private)
<
    UIAlertViewDelegate
>

- (IBAction)hitCommand:(UIButton*)sender;
- (IBAction)hitAppNotify;
- (IBAction)hitBack;

@end


@implementation MPViewController
{
    NSArray *arrAlertTitle;

    UIAlertView *vAlertView;

    IBOutletCollection(UIButton) NSArray *vButtons;
    IBOutlet UILabel *vText;
    IBOutlet UIButton *vAppNotify;
    IBOutlet UIBarButtonItem *barItem;
    IBOutlet UIView *vResetContain;
    IBOutlet UIButton *vReset;
}
@synthesize iDelegate;

- (void)viewDidLoad
{
    [super viewDidLoad];

    // 初始化UIViewController界面.
    [self resetObject];
}

- (void)dealloc
{
    [vAlertView dismissWithClickedButtonIndex:vAlertView.cancelButtonIndex animated:NO];
    vAlertView = nil;

    arrAlertTitle = nil;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

// 输出Log
- (void) printLog:(NSString*)string
{
    NSString *encodeString = string;//[self replaceUnicode:string];
    if (encodeString.length==0) {
        return;
    }

    NSString *text = vText.text;

    NSMutableString *tmp = [[NSMutableString alloc] initWithString:encodeString];
    [tmp replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:NSMakeRange(0, [tmp length])];

    NSString *result = [NSString stringWithFormat:@"%@\n%@", tmp, text];
    if (result.length > 2000) {
        result = [result substringToIndex:2000];
    }
    vText.text = result;
    NSLog(@"%@", tmp);
}

- (void) setRunState:(BOOL)run
{
    CGRect r = vText.frame;
    
    if (run) {
        vResetContain.hidden = YES;
        barItem.enabled = YES;
        r.origin.y = vResetContain.frame.origin.y ;
    }else{
        vResetContain.hidden = NO;
        barItem.enabled = NO;
        r.origin.y = vResetContain.frame.origin.y + vResetContain.frame.size.height;
    }
    
    vText.frame = r;
    
}

// 初始化UI
- (void)resetObject
{
    self.navigationItem.title = @"MiPush";
    self.navigationItem.rightBarButtonItem = barItem;
    
    UIImage *img = [[UIImage imageNamed:@"button"] stretchableImageWithLeftCapWidth:6 topCapHeight:18];
    for (UIButton *btn in vButtons) {
        [btn setBackgroundImage:img forState:UIControlStateNormal];
        [btn setBackgroundImage:img forState:UIControlStateHighlighted];
    }

    arrAlertTitle = [[NSArray alloc] initWithObjects:
                     @"设置别名",
                     @"取消别名",
                     @"设置主题",
                     @"取消主题",
                     @"设置账号",
                     @"取消账号",
                     nil];
}

- (IBAction)hitCommand:(UIButton*)sender
{
    [self showAlert:(int)sender.tag];
}

- (IBAction)hitAppNotify
{
    // 统计app开启行为
    [MiPushSDK openAppNotify:nil];
}

- (IBAction)hitBack
{
    // 注销push
    [MiPushSDK unregisterMiPush];
}

- (IBAction)hitResetRegister
{
    [MiPushSDK registerMiPush:iDelegate];
}

- (void) showAlert:(int)type
{
    NSString *msg = [arrAlertTitle objectAtIndex:type];

    vAlertView = [[UIAlertView alloc] initWithTitle:msg
                                            message:nil
                                           delegate:self
                                  cancelButtonTitle:@"取消"
                                  otherButtonTitles:@"确定", nil];
    vAlertView.alertViewStyle = UIAlertViewStylePlainTextInput;
    vAlertView.tag = type;
    [vAlertView show];
}

#pragma mark UIAlertViewDelegate
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    UITextField *field=[alertView textFieldAtIndex:0];
    NSString *text = [field text];

    if (buttonIndex!=alertView.cancelButtonIndex && [text length]>0) {
        NSInteger tag = alertView.tag;
        switch (tag) {
            case 0:
                // 设置别名
                [MiPushSDK setAlias:text];
                break;
            case 1:
                // 取消别名
                [MiPushSDK unsetAlias:text];
                break;
            case 2:
                // 设置主题
                [MiPushSDK subscribe:text];
                break;
            case 3:
                // 取消主题
                [MiPushSDK unsubscribe:text];
                break;
            case 4:
                // 设置账号
                [MiPushSDK setAccount:text];
                break;
            case 5:
                // 取消账号
                [MiPushSDK unsetAccount:text];
                break;
        }
    }
}

// 把unicode码 转成普通文字.  (\u6790)
- (NSString *)replaceUnicode:(NSString *)unicodeStr
{
    NSString *tempStr1 = [unicodeStr stringByReplacingOccurrencesOfString:@"\\u" withString:@"\\U"];
    NSString *tempStr2 = [tempStr1 stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""];
    NSString *tempStr3 = [[@"\"" stringByAppendingString:tempStr2] stringByAppendingString:@"\""];
    NSData *tempData = [tempStr3 dataUsingEncoding:NSUTF8StringEncoding];
    NSString* returnStr = [NSPropertyListSerialization propertyListFromData:tempData
                                                           mutabilityOption:NSPropertyListImmutable
                                                                     format:NULL
                                                           errorDescription:NULL];

    return [returnStr stringByReplacingOccurrencesOfString:@"\\r\\n" withString:@"\n"];
}

@end
