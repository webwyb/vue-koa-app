/**
 * Created by wuyanbin on 2019/2/21.
 */

const fs = require('fs');

fs.readFile('./goods.json', 'utf-8', function (err, data) {
  let newData = JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map((value, index) => {
    if (value.IMAGE !== null) {
      i++
      console.log(value.NAME);
      pushData.push(value)
    }
  })
  console.log(i);
  console.log(pushData);
  fs.writeFile('./newGoods.json', JSON.stringify(pushData), function (err) {
    if (!err) {
      console.log('写入成功');
    }
    else {
      console.log(err);
    }
  })
})
