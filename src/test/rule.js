const rule = require('../poker/rule.js'),
    poker = require('../poker');

let AllPoker = new poker();
let allP='1-9,6-88,2-12,3-11,4-12,2-2,1-5,1-7,4-14,2-8,4-5,4-4,3-6,4-11,2-6,3-9,1-8,1-6';
    allP=allP.split(',');
let orderPoker=allP.sort((a,b)=>{
    a=a.split('-');
    b=b.split('-');
    if(b[1] == a[1]) return a[0]-b[0];
    else return a[1]-b[1];
})
console.log(orderPoker.toString());
let CanD=new rule(orderPoker,'4-5,3-6,1-7,1-8,3-9,3-11');
console.log(CanD.canOut());
