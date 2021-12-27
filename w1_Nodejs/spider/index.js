const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const db = require('./db')

// 请求html内容
// https://www.wbiao.cn/search/share/list/?bCode=111&w=%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD&exposedFrom=1

superagent.get('https://www.wbiao.cn/search/share/list').query({
    bCode: 111,
    w: '百达翡丽',
    exposedFrom: 1
})
    .set({
        // :authority: 'www.wbiao.cn',
        // :method: 'GET',
        // :path: '/search/share/list/?bCode=111&w=%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD&exposedFrom=1',
        // :scheme: 'https',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        cookie: 'OZ_1U_2037=vid=v99db2c5c0b106.0&ctime=1503507140&ltime=0;WBIAOID=fee01e3d0da8c342b0de56e82347007f29bbf6e9%7Ef2031346363c8b8807ab7be46c2b09d7; NTKF_T2D_CLIENTID=guest8B459F5E-9418-A43B-AED3-100253872D6F; _ga=GA1.2.872240365.1503507142; wbiaoid=b622d8f51d2597e7c01c13b5c3ef04c4; wbiaoid.sig=KIunMm5NIblyNzfZHXTBn7QYsSRnw59WNdablUSSvmM; Hm_lvt_d8e95c635d8135c55060c556fd69e039=1628822940; acw_tc=71606c0516405702497091524e48e8d2df992f6607a7e2edb039af200d; wTk=s2VRwUPNBt95uUocrqVmMwjn; w_info=eyJlbnYiOiJwcm9kIn0=; showNum=0; nTalk_CACHE_DATA={uid:wx_1000_ISME9754_guest8B459F5E-9418-A4,tid:1640570251319634}; showMark=0',
        pragma: 'no-cache',
        referer: 'https://www.wbiao.cn/',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
    })
    .then((res) => {
        // console.log('res',res.text);
        // 通过cheerio筛选数据

        const $ = cheerio.load(res.text);

        let goodslist = []

        $('.share__list li').each((i, el) => {
            const $el = $(el);

            const goods = {
                name: $el.find('.desc').text(),
                price: $el.find('.price .new').text().replace(/¥|,/g,''),
                oldPrice: $el.find('.price .old').text().replace(/¥|,/g,''),
                imgurl: $el.find('img').attr('src')
            }

            goodslist.push(goods);
        })

        console.log('goodslist', goodslist)

        

        // 爬取图片
        const insertSql = []
        goodslist = goodslist.map(item => {
            const imgurl = 'https:' + item.imgurl;

            // 请求图片
            // superagent.get(imgurl).then(res=>{
            //     // console.log('img',res.body)
            //     // 提取文件名
            //     const {pathname} = new URL(imgurl)
            //     const filename = path.basename(pathname)
            //     // console.log('filename',filename)
            //     fs.writeFile('./img/'+filename,res.body,function(err){
            //         console.log('err',err);
            //     })
            // })

            const { pathname } = new URL(imgurl)
            const filename = path.basename(pathname)
            const filePath = './img/' + filename

            // 创建写入文件流
            const writeFileStream = fs.createWriteStream(filePath)

            superagent.get(imgurl).pipe(writeFileStream)

            item.imgurl = filename;

            insertSql.push(`('${item.name}','${item.price}','${item.oldPrice}','${filename}')`)

            return item
        })

        // 写入数据库
        // insertSql=['()','()']
        let sql = 'insert into wanbiao(name,price,oldprice,imgurl) values' + insertSql.join(',');

        // console.log('sql',sql);
        db.query(sql).then(()=>{
            console.log('数据写入成功')
        })
    })