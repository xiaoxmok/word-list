const axios = require('axios');

// 批量发请求
async function sendRequests() {
  const request = {
    userId: '25645244',
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
  for (let i = 0; i < 20; i++) {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/createVedio', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: request, // 将请求数据作为 URL 参数发送
      });
      console.log(`Response for userId ${request.userId}:`, response.data);
    } catch (error) {
      console.error(`Error for userId ${request.userId}:`, error.message);
    }
  }
}

async function getRequests() {
  for (let i = 0; i < 20; i++) {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/getUserVedioInfo?template=2&userId=25645244', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        // params: request, // 将请求数据作为 URL 参数发送
      });
      console.log(`Response ${i}:`, response.data);
    } catch (error) {
      console.error(`Error ${i}:`, error.message);
    }
  }
}

sendRequests()
// getRequests()