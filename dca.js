function calculate() {
  const data = []

  let value = 30;
  const results = [value];

  let percentage = 3
  const percentages = [percentage]

  const positionAvgPrice = calculateTradeAvgPrice(percentage, value)

  const row = [1, value.toFixed(2), accumulate(results).toFixed(2), (accumulate(results) / 20).toFixed(2), percentage.toFixed(2) + ' %', accumulate(percentages).toFixed(2) + ' %', positionAvgPrice.toFixed(2)]
  data.push(row)

  for (let i = 0; i < 20; i++) {
      value *= 1.5
      results.push(value);
      const count = accumulate(results)

      percentage *= 1.2
      percentages.push(percentage)
      const percentageCount = accumulate(percentages)

      const positionAvgPrice = calculateTradeAvgPrice(percentageCount, value)

      const row = [i + 2, value.toFixed(2), count.toFixed(2), (count / 20).toFixed(2), percentage.toFixed(2) + ' %', percentageCount.toFixed(2) + ' %', positionAvgPrice.toFixed(2)]
      data.push(row)
  }

  drawTable(data)
}

// 累加数组元素
function accumulate(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0)
}


// 计算持仓平均价格
function calculatePositionAvgPrice(trades) {
  let totalCost = 0;
  let totalQuantity = 0;

  // 遍历所有交易记录
  for (let trade of trades) {
      totalCost += trade.price * trade.quantity;
      totalQuantity += trade.quantity;
  }

  // 如果有成交记录
  if (totalQuantity > 0) {
      return totalCost / totalQuantity;
  } else {
      return 0; // 如果没有成交记录，则返回 0
  }
}

// 示例交易记录
const trades = []

// 计算交易平均价格
function calculateTradeAvgPrice(percentage, value) {
  
  const options = {
    price: 1000 * (1 - percentage / 100),
    quantity: value
  }

  trades.push(options)

  // 计算持仓平均价格
  const positionAvgPrice = calculatePositionAvgPrice(trades);

  return positionAvgPrice

}

// // 示例交易记录
// const trades = [
//   { price: 100, quantity: 10 },
//   { price: 110, quantity: 5 },
//   { price: 120, quantity: 8 },
//   { price: 115, quantity: 15 } // 减仓操作，数量为负数
// ];

// // 计算持仓平均价格
// const positionAvgPrice = calculatePositionAvgPrice(trades);
// console.log("Position average price:", positionAvgPrice);

function drawTable(data) {
    // 计算每列的宽度
    const columnWidth = 5; // 每列的宽度设为12个字符
    // | Quantity | Order Amount | Cumulative Amount | Margin | Percent | Cumulative Percent | Average Price |

    // 打印表头
    console.log('------------------------------------------------------------------------------------------');
    // console.log(`|  Quantity${' '.repeat(columnWidth - 2)} |  Order Amount${' '.repeat(columnWidth - 4)} |  Cumulative Amount${' '.repeat(columnWidth - 4)} |  Margin${' '.repeat(columnWidth - 3)} |  Percent${' '.repeat(columnWidth - 3)} |  Cumulative Percent${' '.repeat(columnWidth - 5)} |  Average Price${' '.repeat(columnWidth - 4)} |`);
    console.log('| Quantity | Order Amount | Cumulative Amount | Margin | Percent | Cumulative Percent | Average Price |');
    console.log('------------------------------------------------------------------------------------------');

    // 打印数据行
    data.forEach(row => {
        const rowData = row.map((item, index) => {
            let paddingNum = 10
            if (index === 0) {
                paddingNum = 2
            }
            let padding = paddingNum > item.toString().length ? ' '.repeat(paddingNum - item.toString().length) : ''
            return `${item}${padding}`;
        });
        console.log(`|  ${rowData[0]} |  ${rowData[1]} |  ${rowData[2]} |  ${rowData[3]} |  ${rowData[4]} |  ${rowData[5]} |  ${rowData[6]} |`);
    });

    // 打印表格底部
    console.log('------------------------------------------------------------------------------------------');
}


calculate()

