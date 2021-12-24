const goodslist = document.querySelector('.goodslist ul')
const xhr = new XMLHttpRequest()
xhr.onload = function () {
    // const data = JSON.parse(xhr.responseText)
    console.log(xhr.response)
    const datalist = xhr.response;
    const htmlContent = datalist.map(item => {
        return `<li data-id="${item.id}">
                        <h4>${item.name}</h4>
                        <p class="price">${item.price}</p>
                        <button class="btnDel">删除</button>
                        <button class="btnModify">修改</button>
                    </li>`
    }).join('')
    goodslist.innerHTML = htmlContent;
}
// 设置后端响应数据类型
xhr.responseType = 'json';
xhr.open('get', 'http://localhost:2110/api/goods/list', true)
xhr.send();


goodslist.onclick = function (e) {
    // 删除商品
    if (e.target.className === 'btnDel') {
        // const {id} = e.target.parentElement.getAttribute('data-id');

        // element.dataset: 得到element这个元素所有data-*属性值
        const { id } = e.target.parentElement.dataset
        let xhr = new XMLHttpRequest()
        xhr.open('delete', 'http://localhost:2110/api/goods/' + id, true)
        xhr.send();
    }
    // 修改商品
    else if (e.target.className === 'btnModify') {
        const { id } = e.target.parentElement.dataset
        let xhr = new XMLHttpRequest()
        xhr.open('put', 'http://localhost:2110/api/goods/' + id, true)

        // 设置请求头
        xhr.setRequestHeader('Content-Type', 'application/json')

        // x-www-form-urlencoded
        // xhr.send(`price=998&oldprice=1998`); 
        xhr.send(`{"price":998,"oldprice":1998}`);
    }
}