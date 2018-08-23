const data = {
  success: true,
  id: 'WF2018072319320414059781',
  nextService: 'RETRY',
  reason_code: '6001',
  reason_desc: '流量未购买或者未生效',
  result_desc: {
    AUTHENTICATION_INFOQUERY: {
      MobileAndNameAndIDCheck: {
        error_info: '流量未购买或者未生效',
      },
    },
    ANTIFRAUD: {
      final_score: 1325,
      risk_items: [
        {
          rule_id: 2903295,
          score: 10,
          decision: 'Accept',
          risk_name: '身份证归属地位于高风险较为集中地区',
          risk_detail: [
            {
              description: '是否命中自定义名单',
              type: 'custom_list',
              high_risk_areas: ['山东省枣庄市峄城区'],
            },
          ],
        },
        {
          rule_id: 2903297,
          score: 80,
          decision: 'Accept',
          risk_name: '身份证命中法院失信名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '法院失信、法院失信、法院失信、法院失信、法院失信、法院失信',
              description: '身份证命中法院失信名单',
              court_details: [
                {
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
                {
                  execute_court: '厦门市思明区人民法院',
                  case_date: '2014年07月16日',
                  evidence_court: '厦门市思明区人民法院',
                  specific_circumstances: '其他有履行能力而拒不履行生效法律文书确定义务',
                  carry_out: '全部未履行',
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
                {
                  execute_court: '厦门市思明区人民法院',
                  case_date: '2014年07月16日',
                  evidence_court: '厦门市思明区人民法院',
                  specific_circumstances: '其他有履行能力而拒不履行生效法律文书确定义务',
                  carry_out: '全部未履行',
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
                {
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
                {
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
                {
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
              ],
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903299,
          score: 80,
          decision: 'Accept',
          risk_name: '身份证命中犯罪通缉名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '刑事犯罪、刑事犯罪、刑事犯罪、刑事犯罪',
              description: '身份证命中犯罪通缉名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903301,
          score: 80,
          decision: 'Accept',
          risk_name: '身份证命中法院执行名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '法院执行、法院执行、法院执行、法院执行',
              description: '身份证命中法院执行名单',
              court_details: [
                {
                  execute_court: '晋中市榆次区人民法院',
                  case_code: '(2010)榆执字第0121233号',
                  executed_name: '11234',
                  case_date: '2010年1月4日',
                  evidence_court: '晋中市榆次区人民法院',
                  fraud_type: 'courtZhixing',
                  fraud_type_display_name: '法院执行',
                  value: '370404199006301915',
                },
                {
                  fraud_type: 'courtZhixing',
                  fraud_type_display_name: '法院执行',
                  value: '370404199006301915',
                },
                {
                  execute_court: '晋中市榆次区人民法院',
                  case_code: '(2010)榆执字第0121253号',
                  executed_name: '11234',
                  case_date: '2010年1月4日',
                  evidence_court: '晋中市榆次区人民法院',
                  fraud_type: 'courtZhixing',
                  fraud_type_display_name: '法院执行',
                  value: '370404199006301915',
                },
                {
                  execute_court: '晋中市榆次区人民法院',
                  case_code: '(2010)榆执字第0121233号',
                  executed_name: '11234',
                  case_date: '2010年1月4日',
                  evidence_court: '晋中市榆次区人民法院',
                  fraud_type: 'courtZhixing',
                  fraud_type_display_name: '法院执行',
                  value: '370404199006301915',
                },
              ],
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903303,
          score: 60,
          decision: 'Accept',
          risk_name: '身份证对应人存在助学贷款欠费历史',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '助学贷款欠费、助学贷款欠费',
              description: '身份证对应人存在助学贷款欠费历史',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903305,
          score: 100,
          decision: 'Accept',
          risk_name: '身份证命中信贷逾期名单',
          risk_detail: [
            {
              description: '身份证命中信贷逾期名单',
              discredit_times: 5,
              overdue_details: [
                {
                  overdue_time: '2017-06',
                  overdue_amount_range: '(10000, 50000] ',
                  overdue_day_range: '(0,  30]',
                  overdue_count: 1,
                },
                {
                  overdue_time: '2018-01',
                  overdue_amount_range: '500000+',
                  overdue_day_range: '360+',
                  overdue_count: 1,
                },
                {
                  overdue_time: '2017-02',
                  overdue_amount_range: '(10000, 50000] ',
                  overdue_day_range: '(90, 180]',
                  overdue_count: 4,
                },
                {
                  overdue_time: '2017-09',
                },
                {
                  overdue_time: '2017-02',
                  overdue_amount_range: '(10000, 50000]',
                  overdue_day_range: '(90, 180]',
                  overdue_count: 4,
                },
              ],
              type: 'discredit_count',
            },
          ],
        },
        {
          rule_id: 2903307,
          score: 40,
          decision: 'Accept',
          risk_name: '身份证命中高风险关注名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name:
                '异常交易、恶意爬取、游戏消费欠费、异常支付、风险激活、欠款公司法人代表、作弊行为、法院执行、法院失信欠款类、异常登录、异常充值、信贷逾期后还款、异常接单、欠税、刑事犯罪、电商风险名单、垃圾注册、盗卡、车贷风险名单、信贷逾期名单、机构代办、异常叫车、欠税公司法人代表、信用炒作、异常借款、异常退款、法院失信、异常租赁、异常提现、刷单、垃圾消息、异常转账、异常审核、伪冒风险、异常行为、电信欺诈、法院结案、骗取补贴、助学贷款欠费、异常注册、故意违章乘车',
              grey_list_details: [
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousTransaction',
                  fraud_type_display_name: '异常交易',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'Crawling',
                  fraud_type_display_name: '恶意爬取',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'paymentFraud',
                  fraud_type_display_name: '游戏消费欠费',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousPayment',
                  fraud_type_display_name: '异常支付',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'riskActivate',
                  fraud_type_display_name: '风险激活',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'companyCreditCrack',
                  fraud_type_display_name: '欠款公司法人代表',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'actionFraud',
                  fraud_type_display_name: '作弊行为',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'courtZhixing',
                  fraud_type_display_name: '法院执行',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1528878716000,
                  risk_level: '高',
                  fraud_type: 'courtOverdue',
                  fraud_type_display_name: '法院失信欠款类',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousLogin',
                  fraud_type_display_name: '异常登录',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousRecharge',
                  fraud_type_display_name: '异常充值',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'discreditRepay',
                  fraud_type_display_name: '信贷逾期后还款',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousOrders',
                  fraud_type_display_name: '异常接单',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'taxOwing',
                  fraud_type_display_name: '欠税',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'crime',
                  fraud_type_display_name: '刑事犯罪',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'e-commerce',
                  fraud_type_display_name: '电商风险名单',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'fraudulentSignup',
                  fraud_type_display_name: '垃圾注册',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'stolenCard',
                  fraud_type_display_name: '盗卡',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'carLoan',
                  fraud_type_display_name: '车贷风险名单',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'creditCrack',
                  fraud_type_display_name: '信贷逾期名单',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'agency',
                  fraud_type_display_name: '机构代办',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousCalling',
                  fraud_type_display_name: '异常叫车',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'companyTaxOwing',
                  fraud_type_display_name: '欠税公司法人代表',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'creditSpeculation',
                  fraud_type_display_name: '信用炒作',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1521105412000,
                  risk_level: '高',
                  fraud_type: 'suspiciousLoan',
                  fraud_type_display_name: '异常借款',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousRefund',
                  fraud_type_display_name: '异常退款',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1497143325000,
                  risk_level: '高',
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousRent',
                  fraud_type_display_name: '异常租赁',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousWithdraw',
                  fraud_type_display_name: '异常提现',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'scalping',
                  fraud_type_display_name: '刷单',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'spamMessage',
                  fraud_type_display_name: '垃圾消息',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousTransfer',
                  fraud_type_display_name: '异常转账',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousReview',
                  fraud_type_display_name: '异常审核',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'fakeFraud',
                  fraud_type_display_name: '伪冒风险',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousFraud',
                  fraud_type_display_name: '异常行为',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'teleFraud',
                  fraud_type_display_name: '电信欺诈',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'courtClose',
                  fraud_type_display_name: '法院结案',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1470469598000,
                  risk_level: '高',
                  fraud_type: 'subsidyFraud',
                  fraud_type_display_name: '骗取补贴',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'studentDefault',
                  fraud_type_display_name: '助学贷款欠费',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'suspiciousRegister',
                  fraud_type_display_name: '异常注册',
                  value: '370404199006301915',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '高',
                  fraud_type: 'travelCreditCrack',
                  fraud_type_display_name: '故意违章乘车',
                  value: '370404199006301915',
                },
              ],
              description: '身份证命中高风险关注名单',
              type: 'grey_list',
            },
          ],
        },
        {
          rule_id: 2903309,
          score: 70,
          decision: 'Accept',
          risk_name: '身份证命中车辆租赁违约名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '汽车租赁违约、汽车租赁违约',
              description: '身份证命中车辆租赁违约名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903311,
          score: 40,
          decision: 'Accept',
          risk_name: '身份证命中法院结案名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '法院结案、法院结案、法院结案、法院结案',
              description: '身份证命中法院结案名单',
              court_details: [
                {
                  term_duty: '被告于本判决生效后10日内偿还原告借款10000元并支付相应利息',
                  execute_court: '运城市人民法院',
                  gender: '男',
                  case_code: '(2010)榆执字第0121234号',
                  case_date: '2010年1月4日',
                  evidence_court: '运城市人民法院',
                  execute_status: '已结案',
                  carry_out: '全部未履行',
                  fraud_type: 'courtClose',
                  fraud_type_display_name: '法院结案',
                  execute_code: '(2017)榆民二初字第112号民事判决书',
                  execute_subject: '1000',
                  executed_name: '皮晴晴',
                  province: '山西',
                  specific_circumstances: '其他有履行能力而拒不履行生效法律文书确定义务',
                  value: '370404199006301915',
                  age: '27',
                },
                {
                  term_duty: '被告于本判决生效后10日内偿还原告借款10000元并支付相应利息',
                  execute_court: '晋中市榆次区人民法院',
                  gender: '男',
                  case_code: '(2010)榆执字第0121233号',
                  case_date: '2010年1月4日',
                  evidence_court: '晋中市榆次区人民法院',
                  carry_out: '全部未履行',
                  fraud_type: 'courtClose',
                  fraud_type_display_name: '法院结案',
                  execute_code: '(2017)榆民二初字第112号民事判决书',
                  executed_name: '皮晴晴',
                  province: '山西',
                  specific_circumstances: '其他有履行能力而拒不履行生效法律文书确定义务',
                  value: '370404199006301915',
                  age: '27',
                },
                {
                  fraud_type: 'courtClose',
                  fraud_type_display_name: '法院结案',
                  value: '370404199006301915',
                },
                {
                  fraud_type: 'courtClose',
                  fraud_type_display_name: '法院结案',
                  value: '370404199006301915',
                },
              ],
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903321,
          score: 80,
          decision: 'Accept',
          risk_name: '身份证命中欠款公司法人代表名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name:
                '欠款公司法人代表、欠款公司法人代表、欠款公司法人代表、欠款公司法人代表',
              description: '身份证命中欠款公司法人代表名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903323,
          score: 20,
          decision: 'Accept',
          risk_name: '身份证命中故意违章乘车名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '故意违章乘车、故意违章乘车、故意违章乘车',
              description: '身份证命中故意违章乘车名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903325,
          score: 60,
          decision: 'Accept',
          risk_name: '身份证命中欠税名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '欠税',
              description: '身份证命中欠税名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903327,
          score: 60,
          decision: 'Accept',
          risk_name: '身份证命中欠税公司法人代表名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name:
                '欠税公司法人代表、欠税公司法人代表、欠税公司法人代表、欠税公司法人代表',
              description: '身份证命中欠税公司法人代表名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903329,
          score: 30,
          decision: 'Accept',
          risk_name: '身份证命中信贷逾期后还款名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人身份证',
              fraud_type_display_name: '信贷逾期后还款、信贷逾期后还款、信贷逾期后还款',
              description: '身份证命中信贷逾期后还款名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903339,
          score: 30,
          decision: 'Accept',
          risk_name: '手机号命中虚假号码库',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '虚假号码',
              description: '手机号命中虚假号码库',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903341,
          score: 30,
          decision: 'Accept',
          risk_name: '手机号命中通信小号库',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '通信小号、通信小号',
              description: '手机号命中通信小号库',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903343,
          score: 30,
          decision: 'Accept',
          risk_name: '手机号命中诈骗骚扰库',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '举报欺诈',
              description: '手机号命中诈骗骚扰库',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903345,
          score: 30,
          decision: 'Accept',
          risk_name: '手机号命中高风险关注名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '法院执行、法院失信、法院结案',
              grey_list_details: [
                {
                  evidence_time: 1430740200000,
                  risk_level: '高',
                  fraud_type: 'courtZhixing',
                  fraud_type_display_name: '法院执行',
                  value: '13333333333',
                },
                {
                  evidence_time: 1422892800000,
                  risk_level: '高',
                  fraud_type: 'court',
                  fraud_type_display_name: '法院失信',
                  value: '13333333333',
                },
                {
                  evidence_time: 1450633523000,
                  risk_level: '高',
                  fraud_type: 'courtClose',
                  fraud_type_display_name: '法院结案',
                  value: '13333333333',
                },
              ],
              description: '手机号命中低风险关注名单',
              type: 'grey_list',
            },
          ],
        },
        {
          rule_id: 2903347,
          score: 85,
          decision: 'Accept',
          risk_name: '手机号命中信贷逾期名单',
          risk_detail: [
            {
              description: '手机号命中信贷逾期名单',
              discredit_times: 7,
              overdue_details: [
                {
                  overdue_time: '2017-06',
                  overdue_amount_range: '(10000, 50000] ',
                  overdue_day_range: '(0, 30]',
                  overdue_count: 1,
                },
                {
                  overdue_time: '2018-01',
                  overdue_amount_range: '500000+',
                  overdue_day_range: '360+',
                  overdue_count: 1,
                },
                {
                  overdue_time: '2017-02',
                  overdue_amount_range: '(10000, 50000] ',
                  overdue_day_range: '(90, 180] ',
                  overdue_count: 4,
                },
                {
                  overdue_time: '2018-07',
                  overdue_amount_range: '(50000, 100000] ',
                  overdue_day_range: '(60, 90] ',
                  overdue_count: 2,
                },
                {
                  overdue_time: '2017-02',
                  overdue_amount_range: '(10000, 50000] ',
                  overdue_day_range: '(90, 180] ',
                  overdue_count: 4,
                },
                {
                  overdue_time: '2016-03',
                  overdue_amount_range: '(10000, 50000] ',
                  overdue_day_range: '(90, 180] ',
                  overdue_count: 4,
                },
                {
                  overdue_time: '2018-07',
                  overdue_amount_range: '(5000, 10000] ',
                  overdue_day_range: '(30, 60]',
                  overdue_count: 2,
                },
              ],
              type: 'discredit_count',
            },
          ],
        },
        {
          rule_id: 2903349,
          score: 30,
          decision: 'Accept',
          risk_name: '手机号命中车辆租赁违约名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '汽车租赁违约',
              description: '手机号命中车辆租赁违约名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903351,
          score: 30,
          decision: 'Accept',
          risk_name: '手机号疑似乱填',
          risk_detail: [],
        },
        {
          rule_id: 2903353,
          score: 80,
          decision: 'Accept',
          risk_name: '手机号命中欠款公司法人代表名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '欠款公司法人代表、欠款公司法人代表',
              description: '手机号命中欠款公司法人代表名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903355,
          score: 20,
          decision: 'Accept',
          risk_name: '手机号命中信贷逾期后还款名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '信贷逾期后还款、信贷逾期后还款',
              description: '手机号命中信贷逾期后还款名单',
              type: 'black_list',
            },
          ],
        },
        {
          rule_id: 2903423,
          score: 30,
          decision: 'Accept',
          risk_name: '3个月内身份证关联多个申请信息',
          risk_detail: [
            {
              frequency_detail_list: [
                {
                  data: [
                    '13333333333',
                    '186※※※※6666',
                    '159※※※※7896',
                    '153※※※※2518',
                    '170※※※※5678',
                    '159※※※※8173',
                    '131※※※※4029',
                    '138※※※※1929',
                    '158※※※※6871',
                    '139※※※※1110',
                    '13333333332',
                    '180※※※※5912',
                    '138※※※※8888',
                  ],
                  detail: '3个月身份证关联手机号数：13',
                },
              ],
              type: 'frequency_detail',
            },
          ],
        },
        {
          rule_id: 2903429,
          score: 30,
          decision: 'Accept',
          risk_name: '3个月内申请信息关联多个身份证',
          risk_detail: [
            {
              frequency_detail_list: [
                {
                  data: [
                    '370404199006301915',
                    '3704※※※※※※※※※※1000',
                    '3713※※※※※※※※※※3729',
                    '2114※※※※※※※※※※1227',
                    '1505※※※※※※※※※※3654',
                    '2203※※※※※※※※※※0114',
                    '2201※※※※※※※※※※7812',
                    '5201※※※※※※※※※※0110',
                    '1101※※※※※※※※※※0106',
                    '1101※※※※※※※※※※0149',
                    '1101※※※※※※※※※※5816',
                    '1101※※※※※※※※※※0122',
                    '4305※※※※※※※※※※0092',
                    '4101※※※※※※※※※※0127',
                    '3601※※※※※※※※※※0120',
                    '3201※※※※※※※※※※0068',
                    '4304※※※※※※※※※※0086',
                    '4301※※※※※※※※※※0093',
                    '4303※※※※※※※※※※0070',
                    '4401※※※※※※※※※※0107',
                    '4401※※※※※※※※※※0139',
                    '5001※※※※※※※※※※0234',
                    '5001※※※※※※※※※※0111',
                    '5001※※※※※※※※※※0090',
                    '5001※※※※※※※※※※0095',
                    '4401※※※※※※※※※※0092',
                    '3704※※※※※※※※※※1915',
                    '3701※※※※※※※※※※0076',
                    '3704※※※※※※※※※※1914',
                    '1304※※※※※※※※※※6519',
                    '4101※※※※※※※※※※0055',
                    '3603※※※※※※※※※※0525',
                    '6960※※※※※※※※※※8708',
                    '4305※※※※※※※※※※0058',
                    '4304※※※※※※※※※※0053',
                    '4304※※※※※※※※※※0057',
                    '4210※※※※※※※※※※3663',
                    '1201※※※※※※※※※※0013',
                    '5222※※※※※※※※※※9817',
                    '1101※※※※※※※※※※0031',
                    '1101※※※※※※※※※※0090',
                    '4311※※※※※※※※※※3539',
                    '4311※※※※※※※※※※3538',
                    '2109※※※※※※※※※※6927',
                    '5101※※※※※※※※※※5026',
                    '3704※※※※※※※※※※1778',
                    '3704※※※※※※※※※※1777',
                    '8451※※※※※※※1651',
                    '2327※※※※※※※※※※0710',
                    '3704※※※※※※※※※※1966',
                    '3704※※※※※※※※※※1967',
                    '3704※※※※※※※※※※1921',
                    '1104※※※※※※※※※※1928',
                    '2300※※※※※※※※※※4345',
                    '3302※※※※※※※※※※0612',
                    '4511※※※※※※※※※※5626',
                    '5200※※※※※※※※※※1210',
                    '5002※※※※※※※※※※3412',
                    '4101※※※※※※※※※※1046',
                    '3704※※※※※※※※※※1918',
                    '3704※※※※※※※※※※1915',
                    '3704※※※※※※※※※※1915',
                    '1307※※※※※※※※※※2631',
                    '5224※※※※※※※※※※6013',
                    '5002※※※※※※※※※※0311',
                    '5002※※※※※※※※※※0312',
                    '2307※※※※※※※※※※7004',
                  ],
                  detail: '3个月手机号关联身份证数：67',
                },
              ],
              type: 'frequency_detail',
            },
          ],
        },
        {
          rule_id: 2903435,
          score: 10,
          decision: 'Accept',
          risk_name: '3个月内申请人身份证作为联系人身份证出现的次数过多',
          risk_detail: [
            {
              cross_frequency_detail_list: [
                {
                  detail: '3个月内申请人身份证作为第一联系人身份证出现的次数：6',
                },
              ],
              type: 'cross_frequency_detail',
            },
          ],
        },
        {
          rule_id: 2903437,
          score: 10,
          decision: 'Accept',
          risk_name: '3个月内申请人手机号作为联系人手机号出现的次数过多',
          risk_detail: [
            {
              cross_frequency_detail_list: [
                {
                  detail: '3个月内申请人手机号作为第二联系人手机号出现的次数：8',
                },
              ],
              type: 'cross_frequency_detail',
            },
          ],
        },
        {
          rule_id: 2903449,
          score: 5,
          decision: 'Accept',
          risk_name: '7天内设备或身份证或手机号申请次数过多',
          risk_detail: [
            {
              frequency_detail_list: [
                {
                  detail: '7天内手机号申请次数：38',
                },
              ],
              type: 'frequency_detail',
            },
          ],
        },
        {
          rule_id: 2903483,
          score: 30,
          decision: 'Accept',
          risk_name: '7天内申请人在多个平台申请借款',
          risk_detail: [
            {
              platform_detail_dimension: [
                {
                  count: 62,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '房地产金融',
                    },
                    {
                      count: 6,
                      industry_display_name: '一般消费分期平台',
                    },
                    {
                      count: 8,
                      industry_display_name: '银行个人业务',
                    },
                    {
                      count: 3,
                      industry_display_name: '融资租赁',
                    },
                    {
                      count: 2,
                      industry_display_name: '财产保险',
                    },
                    {
                      count: 1,
                      industry_display_name: '信息中介',
                    },
                    {
                      count: 6,
                      industry_display_name: '银行消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '直销银行',
                    },
                    {
                      count: 4,
                      industry_display_name: '信用卡中心',
                    },
                    {
                      count: 3,
                      industry_display_name: '网上银行',
                    },
                    {
                      count: 8,
                      industry_display_name: '小额贷款公司',
                    },
                    {
                      count: 13,
                      industry_display_name: 'P2P网贷',
                    },
                    {
                      count: 2,
                      industry_display_name: '大型消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '银行小微贷款',
                    },
                    {
                      count: 2,
                      industry_display_name: '厂商汽车金融',
                    },
                    {
                      count: 1,
                      industry_display_name: '综合类电商平台',
                    },
                  ],
                  dimension: '借款人手机',
                },
                {
                  count: 62,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '房地产金融',
                    },
                    {
                      count: 5,
                      industry_display_name: '一般消费分期平台',
                    },
                    {
                      count: 6,
                      industry_display_name: '银行个人业务',
                    },
                    {
                      count: 3,
                      industry_display_name: '融资租赁',
                    },
                    {
                      count: 2,
                      industry_display_name: '财产保险',
                    },
                    {
                      count: 1,
                      industry_display_name: '信息中介',
                    },
                    {
                      count: 2,
                      industry_display_name: '银行消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '直销银行',
                    },
                    {
                      count: 6,
                      industry_display_name: '信用卡中心',
                    },
                    {
                      count: 3,
                      industry_display_name: '网上银行',
                    },
                    {
                      count: 9,
                      industry_display_name: '小额贷款公司',
                    },
                    {
                      count: 15,
                      industry_display_name: 'P2P网贷',
                    },
                    {
                      count: 4,
                      industry_display_name: '大型消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '银行小微贷款',
                    },
                    {
                      count: 2,
                      industry_display_name: '厂商汽车金融',
                    },
                    {
                      count: 1,
                      industry_display_name: '综合类电商平台',
                    },
                  ],
                  dimension: '借款人身份证',
                },
              ],
              platform_detail: [
                {
                  count: 1,
                  industry_display_name: '房地产金融',
                },
                {
                  count: 6,
                  industry_display_name: '一般消费分期平台',
                },
                {
                  count: 9,
                  industry_display_name: '银行个人业务',
                },
                {
                  count: 4,
                  industry_display_name: '融资租赁',
                },
                {
                  count: 2,
                  industry_display_name: '财产保险',
                },
                {
                  count: 1,
                  industry_display_name: '信息中介',
                },
                {
                  count: 6,
                  industry_display_name: '银行消费金融公司',
                },
                {
                  count: 1,
                  industry_display_name: '直销银行',
                },
                {
                  count: 6,
                  industry_display_name: '信用卡中心',
                },
                {
                  count: 3,
                  industry_display_name: '网上银行',
                },
                {
                  count: 9,
                  industry_display_name: '小额贷款公司',
                },
                {
                  count: 15,
                  industry_display_name: 'P2P网贷',
                },
                {
                  count: 5,
                  industry_display_name: '大型消费金融公司',
                },
                {
                  count: 1,
                  industry_display_name: '银行小微贷款',
                },
                {
                  count: 2,
                  industry_display_name: '厂商汽车金融',
                },
                {
                  count: 1,
                  industry_display_name: '综合类电商平台',
                },
              ],
              description: '7天内申请人在多个平台申请借款',
              type: 'platform_detail',
              platform_count: 72,
            },
          ],
        },
        {
          rule_id: 2903485,
          score: 24,
          decision: 'Accept',
          risk_name: '1个月内申请人在多个平台申请借款',
          risk_detail: [
            {
              platform_detail_dimension: [
                {
                  count: 62,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '房地产金融',
                    },
                    {
                      count: 5,
                      industry_display_name: '一般消费分期平台',
                    },
                    {
                      count: 6,
                      industry_display_name: '银行个人业务',
                    },
                    {
                      count: 3,
                      industry_display_name: '融资租赁',
                    },
                    {
                      count: 2,
                      industry_display_name: '财产保险',
                    },
                    {
                      count: 1,
                      industry_display_name: '信息中介',
                    },
                    {
                      count: 2,
                      industry_display_name: '银行消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '直销银行',
                    },
                    {
                      count: 6,
                      industry_display_name: '信用卡中心',
                    },
                    {
                      count: 3,
                      industry_display_name: '网上银行',
                    },
                    {
                      count: 9,
                      industry_display_name: '小额贷款公司',
                    },
                    {
                      count: 15,
                      industry_display_name: 'P2P网贷',
                    },
                    {
                      count: 4,
                      industry_display_name: '大型消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '银行小微贷款',
                    },
                    {
                      count: 2,
                      industry_display_name: '厂商汽车金融',
                    },
                    {
                      count: 1,
                      industry_display_name: '综合类电商平台',
                    },
                  ],
                  dimension: '借款人身份证',
                },
                {
                  count: 70,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '房地产金融',
                    },
                    {
                      count: 6,
                      industry_display_name: '一般消费分期平台',
                    },
                    {
                      count: 8,
                      industry_display_name: '银行个人业务',
                    },
                    {
                      count: 3,
                      industry_display_name: '融资租赁',
                    },
                    {
                      count: 2,
                      industry_display_name: '财产保险',
                    },
                    {
                      count: 1,
                      industry_display_name: 'O2O',
                    },
                    {
                      count: 1,
                      industry_display_name: '信息中介',
                    },
                    {
                      count: 6,
                      industry_display_name: '银行消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '直销银行',
                    },
                    {
                      count: 4,
                      industry_display_name: '信用卡中心',
                    },
                    {
                      count: 4,
                      industry_display_name: '网上银行',
                    },
                    {
                      count: 12,
                      industry_display_name: '小额贷款公司',
                    },
                    {
                      count: 14,
                      industry_display_name: 'P2P网贷',
                    },
                    {
                      count: 3,
                      industry_display_name: '大型消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '银行小微贷款',
                    },
                    {
                      count: 2,
                      industry_display_name: '厂商汽车金融',
                    },
                    {
                      count: 1,
                      industry_display_name: '综合类电商平台',
                    },
                  ],
                  dimension: '借款人手机',
                },
              ],
              platform_detail: [
                {
                  count: 1,
                  industry_display_name: '房地产金融',
                },
                {
                  count: 6,
                  industry_display_name: '一般消费分期平台',
                },
                {
                  count: 9,
                  industry_display_name: '银行个人业务',
                },
                {
                  count: 4,
                  industry_display_name: '融资租赁',
                },
                {
                  count: 2,
                  industry_display_name: '财产保险',
                },
                {
                  count: 1,
                  industry_display_name: 'O2O',
                },
                {
                  count: 1,
                  industry_display_name: '信息中介',
                },
                {
                  count: 6,
                  industry_display_name: '银行消费金融公司',
                },
                {
                  count: 1,
                  industry_display_name: '直销银行',
                },
                {
                  count: 6,
                  industry_display_name: '信用卡中心',
                },
                {
                  count: 4,
                  industry_display_name: '网上银行',
                },
                {
                  count: 13,
                  industry_display_name: '小额贷款公司',
                },
                {
                  count: 16,
                  industry_display_name: 'P2P网贷',
                },
                {
                  count: 6,
                  industry_display_name: '大型消费金融公司',
                },
                {
                  count: 1,
                  industry_display_name: '银行小微贷款',
                },
                {
                  count: 2,
                  industry_display_name: '厂商汽车金融',
                },
                {
                  count: 1,
                  industry_display_name: '综合类电商平台',
                },
              ],
              description: '1个月内申请人在多个平台申请借款',
              type: 'platform_detail',
              platform_count: 80,
            },
          ],
        },
        {
          rule_id: 2903487,
          score: 0,
          decision: 'Accept',
          risk_name: '3个月内申请人在多个平台申请借款',
          risk_detail: [
            {
              platform_detail_dimension: [
                {
                  count: 62,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '房地产金融',
                    },
                    {
                      count: 5,
                      industry_display_name: '一般消费分期平台',
                    },
                    {
                      count: 6,
                      industry_display_name: '银行个人业务',
                    },
                    {
                      count: 3,
                      industry_display_name: '融资租赁',
                    },
                    {
                      count: 2,
                      industry_display_name: '财产保险',
                    },
                    {
                      count: 1,
                      industry_display_name: '信息中介',
                    },
                    {
                      count: 2,
                      industry_display_name: '银行消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '直销银行',
                    },
                    {
                      count: 6,
                      industry_display_name: '信用卡中心',
                    },
                    {
                      count: 3,
                      industry_display_name: '网上银行',
                    },
                    {
                      count: 9,
                      industry_display_name: '小额贷款公司',
                    },
                    {
                      count: 15,
                      industry_display_name: 'P2P网贷',
                    },
                    {
                      count: 4,
                      industry_display_name: '大型消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '银行小微贷款',
                    },
                    {
                      count: 2,
                      industry_display_name: '厂商汽车金融',
                    },
                    {
                      count: 1,
                      industry_display_name: '综合类电商平台',
                    },
                  ],
                  dimension: '借款人身份证',
                },
                {
                  count: 70,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '房地产金融',
                    },
                    {
                      count: 6,
                      industry_display_name: '一般消费分期平台',
                    },
                    {
                      count: 8,
                      industry_display_name: '银行个人业务',
                    },
                    {
                      count: 3,
                      industry_display_name: '融资租赁',
                    },
                    {
                      count: 2,
                      industry_display_name: '财产保险',
                    },
                    {
                      count: 1,
                      industry_display_name: 'O2O',
                    },
                    {
                      count: 1,
                      industry_display_name: '信息中介',
                    },
                    {
                      count: 6,
                      industry_display_name: '银行消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '直销银行',
                    },
                    {
                      count: 4,
                      industry_display_name: '信用卡中心',
                    },
                    {
                      count: 4,
                      industry_display_name: '网上银行',
                    },
                    {
                      count: 12,
                      industry_display_name: '小额贷款公司',
                    },
                    {
                      count: 14,
                      industry_display_name: 'P2P网贷',
                    },
                    {
                      count: 3,
                      industry_display_name: '大型消费金融公司',
                    },
                    {
                      count: 1,
                      industry_display_name: '银行小微贷款',
                    },
                    {
                      count: 2,
                      industry_display_name: '厂商汽车金融',
                    },
                    {
                      count: 1,
                      industry_display_name: '综合类电商平台',
                    },
                  ],
                  dimension: '借款人手机',
                },
              ],
              platform_detail: [
                {
                  count: 1,
                  industry_display_name: '房地产金融',
                },
                {
                  count: 6,
                  industry_display_name: '一般消费分期平台',
                },
                {
                  count: 9,
                  industry_display_name: '银行个人业务',
                },
                {
                  count: 4,
                  industry_display_name: '融资租赁',
                },
                {
                  count: 2,
                  industry_display_name: '财产保险',
                },
                {
                  count: 1,
                  industry_display_name: 'O2O',
                },
                {
                  count: 1,
                  industry_display_name: '信息中介',
                },
                {
                  count: 6,
                  industry_display_name: '银行消费金融公司',
                },
                {
                  count: 1,
                  industry_display_name: '直销银行',
                },
                {
                  count: 6,
                  industry_display_name: '信用卡中心',
                },
                {
                  count: 4,
                  industry_display_name: '网上银行',
                },
                {
                  count: 13,
                  industry_display_name: '小额贷款公司',
                },
                {
                  count: 16,
                  industry_display_name: 'P2P网贷',
                },
                {
                  count: 6,
                  industry_display_name: '大型消费金融公司',
                },
                {
                  count: 1,
                  industry_display_name: '银行小微贷款',
                },
                {
                  count: 2,
                  industry_display_name: '厂商汽车金融',
                },
                {
                  count: 1,
                  industry_display_name: '综合类电商平台',
                },
              ],
              description: '3个月内申请人在多个平台申请借款',
              type: 'platform_detail',
              platform_count: 80,
            },
          ],
        },
        {
          rule_id: 2903489,
          score: 4,
          decision: 'Accept',
          risk_name: '3个月内申请人在多个平台被放款_不包含本合作方',
          risk_detail: [
            {
              platform_detail_dimension: [
                {
                  count: 1,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '小额贷款公司',
                    },
                  ],
                  dimension: '借款人手机',
                },
                {
                  count: 1,
                  detail: [
                    {
                      count: 1,
                      industry_display_name: '大型消费金融公司',
                    },
                  ],
                  dimension: '借款人身份证',
                },
              ],
              platform_detail: [
                {
                  count: 1,
                  industry_display_name: '小额贷款公司',
                },
                {
                  count: 1,
                  industry_display_name: '大型消费金融公司',
                },
              ],
              description: '3个月内申请人被放款平台个数_不包含本合作方',
              type: 'platform_detail',
              platform_count: 2,
            },
          ],
        },
        {
          rule_id: 2903613,
          score: 5,
          decision: 'Accept',
          risk_name: '申请人信息命中中风险关注名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '信用异常',
              grey_list_details: [
                {
                  evidence_time: 1505964241000,
                  risk_level: '中',
                  fraud_type: 'creditSuspicious',
                  fraud_type_display_name: '信用异常',
                  value: '13333333333',
                },
              ],
              description: '手机命中中风险关注名单',
              type: 'grey_list',
            },
          ],
        },
        {
          rule_id: 2903615,
          score: 2,
          decision: 'Accept',
          risk_name: '申请人信息命中低风险关注名单',
          risk_detail: [
            {
              hit_type_display_name: '借款人手机',
              fraud_type_display_name: '机构代办、异常借款',
              grey_list_details: [
                {
                  evidence_time: 1434961040000,
                  risk_level: '低',
                  fraud_type: 'agency',
                  fraud_type_display_name: '机构代办',
                  value: '13333333333',
                },
                {
                  evidence_time: 1434961040000,
                  risk_level: '低',
                  fraud_type: 'suspiciousLoan',
                  fraud_type_display_name: '异常借款',
                  value: '13333333333',
                },
              ],
              description: '手机命中低风险关注名单',
              type: 'grey_list',
            },
          ],
        },
        {
          rule_id: 2903391,
          score: 20,
          decision: 'Accept',
          risk_name: '1小时内身份证或手机号申请次数大于等于3',
          risk_detail: [
            {
              frequency_detail_list: [
                {
                  detail: '1小时内身份证申请次数：5',
                },
              ],
              type: 'frequency_detail',
            },
          ],
        },
        {
          rule_id: 2903425,
          score: 50,
          decision: 'Accept',
          risk_name: '1个月内同一个手机号码申请被拒次数大于等于4',
          risk_detail: [],
        },
      ],
      final_decision: 'REJECT',
    },
  },
};

const render = (s, n) => {
  let ret = '';
  for (let i = 0; i < n; i += 1) {
    ret += s;
  }
  return ret;
};

const JSONfmatter = (str) => {
  let jsonString = '';
  if (typeof str === 'object') {
    jsonString = JSON.stringify(str);
  } else {
    jsonString = str;
  }

  jsonString = jsonString.replace(/(,)(?=[^"}{[\]]+)/g, '(_1)');
  jsonString = jsonString.replace(/(])(?=[^,{}\][]+)/g, '(_2)');

  let ret = '';
  let space = 0;
  const count = 4; //  缩进空格数

  const s = '&nbsp;';
  jsonString = jsonString.split('');
  for (let i = 0; i < jsonString.length; i += 1) {
    const item = jsonString[i];
    if (/({|\[)/.test(item)) {
      space += count;
      ret += `${item}<br />${render(s, space)}`;
    } else if (/(}|\]|,)/.test(item)) {
      if (/(,)/.test(item)) {
        ret += `${item}<br />${render(s, space)}`;
      } else if (jsonString[i + 1] && !/(,)/.test(jsonString[i + 1])) {
        if (/(}|\])/.test(jsonString[i + 1])) {
          ret += `<br />${render(s, space - count)}${item}`;
        } else {
          ret += `${item}<br />${render(s, space - count)}`;
        }
      } else if (jsonString[i + 1] && /(,)/.test(jsonString[i + 1])) {
        ret += `<br />${render(s, space - count)}${item}`;
      } else if (!jsonString[i + 1]) {
        ret += `<br />${item}`;
      } else {
        ret += `${item}`;
      }
      if (/(}|\])/.test(jsonString[i])) {
        space -= count;
      }
    } else {
      ret += item;
    }
  }

  ret = ret.replace(/\(_1\)/g, ',');
  ret = ret.replace(/\(_2\)/g, ']');

  return ret;
};

const html = JSONfmatter(data);

document.body.innerHTML = html;
document.body.style.backgroundColor = '#fff';

// export default JSONfmatter;
