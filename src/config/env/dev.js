// 开发环境配置
// const winchaingroupApi = "https://www.bmeauto.cn";
const winchaingroupApi = "http://10.102.100.23:8001";


module.exports = {
//API
    //用户登录模块
    loginUser: winchaingroupApi + '/user/login/',//用户登录

    //商品模块
    getprojectList: winchaingroupApi + '/good/good/',//商品列表
    establishProject: winchaingroupApi + '/good/good/',// 添加商品
    getProjectDetail: winchaingroupApi + '/good/good/',//获取商品详情
    deleteProjectImg: winchaingroupApi + '/good/good_image/',//删除商品图片
    detectProjectDetailImg: winchaingroupApi + '/good/good_detail/',//删除商品详情图片
    //商品分类
    getprojectCategory: winchaingroupApi + '/good/category/',//商品分类列表
    deleteProjectCategory: winchaingroupApi + '/good/category/',//删除商品分类
    addProjectCategory: winchaingroupApi +  '/good/category/',//添加商品分类



    //茶坊
    getSeatList: winchaingroupApi + '/good/seat?p=',//茶坊列表
    addSeatData: winchaingroupApi + '/good/seat/',//添加茶坊
    deleteSeat : winchaingroupApi + '/good/seat/',//删除茶坊


    //代购
    getAnimalList: winchaingroupApi +  '/good/animal/?p=',//代购列表
    deleteAnimlList: winchaingroupApi + '/good/animal/',//删除代购
    addAnimlData: winchaingroupApi + '/good/animal/',//添加代购

    //活动
    getActivelyList: winchaingroupApi + '/good/activity/?p=',//活动列表
    //活动详情'
    getActivelyOneDetail: winchaingroupApi +  '/good/activityone/',//活动一详情信息
    getActivelyTwoDetail: winchaingroupApi +  '/good/activitytwo/',//活动二详情信息
    getActivelyThreeDetail: winchaingroupApi  + '/good/activitythree/',//活动三详情信息
    //查看活动信息
    getActivelyOneUserList: winchaingroupApi + '/order/users/?goods=',//获取活动1参与列表
    getActivelyTwoJoinList: winchaingroupApi + '/order/orderjoin/?goods=',//获取活动二参与列表
    getAcitvelyThreeLifeList: winchaingroupApi + '/order/animal_list/?good=',//获取活动三放生列表
    //修改添加活动
    setActivelyDetailOneData: winchaingroupApi + '/good/activityone/',//修改/添加活动一
    setActivelyDetailTwoData: winchaingroupApi + '/good/activitytwo/',//修改/添加商品二
    setActivelyDetailThreeData: winchaingroupApi + '/good/activitythree/',//修改/添加商品三
    //删除
    deleteActively: winchaingroupApi + '/good/activity/',//活动删除

    //获取活动三放生列表
    getAnimalinitList: winchaingroupApi + '/good/animalinit/',//获取活动三放生列表

    //系统管理
    setSystemData: winchaingroupApi +  '/user/system/',//创建系统管理
    getSystemData: winchaingroupApi +  '/user/system/',//系统管理详情

    deleteSystemBannerimage: winchaingroupApi + '/user/systemimage/',//系统管理 banner 删除

    //大屏
    setSystemVideo: winchaingroupApi + '/user/video/',//上传大屏视频

    //订单
    getOrderList: winchaingroupApi + '/order/order',//订单列表
    deleteOrderData: winchaingroupApi + '/order/order/',//订单删除


    //中控
    OrderList:winchaingroupApi + '/order/expressorder/',  //请求订单数据

    OrderPut: winchaingroupApi + '/order/expressorder/',   //订单发货


    TodayListTea: winchaingroupApi + '/good/teagoods/',   //今日茶单

    SendListTea: winchaingroupApi + '/good/teagoods/',   //提交今日茶单

    OrderListToady: winchaingroupApi + '/order/teaorder/',   //提交今日茶单

    XIList:winchaingroupApi+'/good/seatupdate/',    //获取全部席位

    ChangeXiStatus : winchaingroupApi + '/good/seatupdate/',  //改变席位状态    
    
getSystemVideo :winchaingroupApi +  '/user/video/',   //获取大屏视频
}