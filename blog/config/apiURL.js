let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList', //首页接口
    getArticleById: ipUrl + 'getArticleById/', //详情页接口
    getTypeInfo: ipUrl + 'getTypeInfo',//文章类别接口
    getListById: ipUrl + 'getListById/'
}

export default servicePath