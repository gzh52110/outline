/**
 * 统一前后端响应数据
 * @param {Object} param
 * @returns {Object}
 */
function formatData(
    {
        code = 200,
        msg = 'success',
        data = []
    } = {}
) {
    // const {code=200,msg='success',data:[]} = options;

    if (code === 400 && msg === 'success') {
        msg = 'fail';
    }
    return {
        code,
        msg,
        data,
    }
}
formatData.success = function(data){
    return formatData({data})
}
formatData.fail = function(){
    return formatData({code:400})
}

// formatData({ code: 200, msg: 'success', data: [] })

/**
 * 格式化前端传入的数据
 * @param {Object} data 
 * @param {Array} params 
 */
function formatParams(data,params){
    const newData = {}

    params.forEach(key=>{
        let type;
        let value;
        if(typeof key === 'object'){
            // {key:'age'}
            type = key.type
            key = key.key;
        }
        if(data[key] !== undefined){
            value = data[key];

            // 处理数据类型
            switch(type){
                case 'number':
                    value = Number(value);
                    break;
                case 'boolean':
                    value = Boolean(value);
                    break;
            }
    
            newData[key] = value;
        }

    })

    return newData;
}
// formatParams(req.body,['password','age','gender'])


const jwt = require('jsonwebtoken');
const privateKey = 'laoxie';
const token = {
    // 生成token
    create(data,expiresIn='1d'){
        const token = jwt.sign(
            // 加密的数据
            data, 

            // 密钥
            privateKey,

            {
                // 有效期
                // 60: 60s
                // '60': 60ms
                // '7d': 7天
                expiresIn
            }
        );

        return token;
    },

    // 校验token
    verify(token){
        let result;
        try {
            // 校验其实就是解密，校验成功则得到加密前的数据，否则报错
            var data = jwt.verify(token, privateKey);
            result = true;
        } catch(err) {
            // err
            result = false;
        }

        return result;
    }
}

module.exports = {
    formatData,
    formatParams,
    token
}