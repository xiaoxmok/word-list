const axios = require('axios');

// 并发请求
async function sendRequestsParallel() {
  const request = {
    userId: 1,
    template: '2',
    nickName: '周同学',
    medalId: '135',
    medalNo: 'No.0002121212',
    persona: '以开怀面对世界万千姿态',
    conclusion: '运势如虹 贵人相助',
    wishes: '#笑林旅行家',
    label: '仙侠奇缘',
    regDays: '4368天',
    playHours: '1000小时',
  }
  const promises = []
  for (let i = 0; i < 20; i++) {
    request.userId = request.userId + i
    promises.push(axios.post('http://127.0.0.1:3000/api/createVedio', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: request, // 将请求数据作为 URL 参数发送
    }))
  }

  try {
    const responses = await Promise.all(promises);
    responses.forEach((response, index) =>
      console.log(`Response for request ${index}:`, response.data)
    );
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

async function getRequestsParallel() {

  const promises = []

  for (let i = 0; i < 20; i++) {
    promises.push(axios.get('http://127.0.0.1:3000/api/getUserVedioInfo?template=2&userId=25645244', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }))
  }


  try {
    const responses = await Promise.all(promises);
    responses.forEach((response, index) =>
      console.log(`Response for request ${index}:`, response.data)
    );
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}


sendRequestsParallel()
// getRequestsParallel()