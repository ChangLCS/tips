//
//  ViewController.swift
//  MiPushDemo
//
//  Created by zhangdali on 2016/11/1.
//  Copyright © 2016年 Xiaomi. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    var arrAlertTitle = ["设置别名", "取消别名", "设置主题", "取消主题", "设置账号", "取消账号"]
    
    @IBOutlet weak var logTextView: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func commandBtnClick(_ sender: AnyObject) {
        self.showAlert(type: sender.tag)
    }
    
    func showAlert(type: Int) -> Void {
        let title = arrAlertTitle[type]
        let alertController = UIAlertController.init(title: title, message: nil, preferredStyle: UIAlertControllerStyle.alert)
        alertController.addTextField { (textField: UITextField) in
        }
        let cancelAction = UIAlertAction(title: "取消", style: UIAlertActionStyle.cancel, handler: nil)
        let okAction = UIAlertAction(title: "确定", style: .default) { (action) in
            let text = alertController.textFields?.first?.text
            if (text?.isEmpty)! {
                return
            }
            switch type {
            case 0:
                MiPushSDK.setAlias(text)
            case 1:
                MiPushSDK.unsetAlias(text)
            case 2:
                MiPushSDK.subscribe(text)
            case 3:
                MiPushSDK.unsubscribe(text)
            case 4:
                MiPushSDK.setAccount(text)
            case 5:
                MiPushSDK.unsetAccount(text)
            default: break
            }
            
        }
        alertController.addAction(cancelAction)
        alertController.addAction(okAction)
        self.present(alertController, animated:true, completion: nil)
    }
    
    public func printLog(str: String) -> Void {
        if str.isEmpty {
            return
        }
        print(str)
        logTextView.text.insert("\n", at: logTextView.text.startIndex)
        logTextView.text.insert(contentsOf: str.characters, at: logTextView.text.startIndex)
    }

}

