/* let product = 
{
    제품명: '7D 건조망고',
    유형: '당절임',
    성분: '망고, 설탕, 메타중아황산나트륨, 치자황색소',
    원산지: '필리핀'
};

console.log(product);
console.log(product.성분);
console.log(product.원산지);
console.log(product.유형);
console.log(product.제품명);
 */
let object = 
{
    name: '바나나',
    price: 1200
};

for (let key in object)
{
    console.log(    `${key}: ${object[key]}`);
}