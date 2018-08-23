//
//  MPViewController.h
//  MiPushDemo
//
//  Created by shen yang on 14-3-6.
//  Copyright (c) 2014年 Xiaomi. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MPViewController : UIViewController

@property(nonatomic, unsafe_unretained) id iDelegate;

// 输出Log
- (void) printLog:(NSString*)string;

- (void) setRunState:(BOOL)run;

@end
