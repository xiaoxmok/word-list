const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

(async () => {
    const startTime = new Date().getTime();
    console.log('startTime', startTime)
    // 启动 Puppeteer 浏览器
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 设置移动端浏览器环境
    await page.setUserAgent(
        // 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 LRUA/iOS16.6.1/yyting/Apple/iPhone SE (2nd generation)/ch_AppStore/5.3.1/iPhone/WIFI/A8EFBDE1-6A5B-4C76-B406-204776687108/750x1334'
    );
    await page.setViewport({
        width: 375,
        height: 700,
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2
    });

    // 打开目标 URL
    // const url = 'https://m.lrts.me/music/share?id=000bb0Un2D6wCe&radioId=200000';

    // 设置超时为 60 秒
    // const url = 'https://m.lrts.me/activity/annual-report-202212';
    // const url = 'https://anijs.github.io/';
    // const url = 'https://xiaoxmok.github.io/xiao/canvas/countdown/index.html';
    // const url = 'http://xxm.lrts.me:8081/activity/test/soundCard';
    const url = 'https://earth-m.lazyaudio.com/activity/test/soundCard';
    try {
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 60000, // 设置超时时间
        });
        console.log('Page loaded successfully.');
    } catch (error) {
        console.error('Error loading page:', error);
    }

    // 截图并保存帧
    const framesDir = path.join(__dirname, 'frames');
    if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);

    console.log('Capturing frames...');

    const frameCount = 100; // 总帧数
    const frameRate = 10; // 目标帧率 (10 FPS)
    const delay = 1000 / frameRate; // 每帧的时间间隔 (ms)

    for (let i = 0; i < frameCount; i++) { // 生成 100 帧
        await page.screenshot({ path: `${framesDir}/frame${String(i).padStart(3, '0')}.png` });
        // await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 100))); // 延迟 100ms
        // await new Promise(resolve => setTimeout(resolve, delay)); // 延迟
    }

    await browser.close();

    // 使用 FFmpeg 合成视频
    console.log('Generating video with FFmpeg...');
    const outputVideo = path.join(__dirname, 'output.mp4');
    const ffmpegCommand1 = `ffmpeg -framerate 10 -i ${framesDir}/frame%03d.png -pix_fmt yuv420p -y ${outputVideo}`;
    exec(ffmpegCommand1, (error, stdout, stderr) => {
        if (error) {
            console.error('Error generating video:', error);
        } else {
            console.log('Video created successfully:', outputVideo);

            // 合并音频和视频
            const finalOutput = path.join(__dirname, 'final_output_3.mp4');
            const audioFile = path.join(__dirname, 'background.mp3'); // 音乐文件路径
            const ffmpegCommand2 = `ffmpeg -i ${outputVideo} -i ${audioFile} -c:v copy -c:a aac -shortest -y ${finalOutput}`;
            exec(ffmpegCommand2, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error adding audio:', error);
                } else {
                    console.log('Final video with audio created:', finalOutput);
                }

                // 清理临时文件
                // fs.rmSync(framesDir, { recursive: true, force: true });
                fs.unlinkSync(outputVideo);

                const endTime = new Date().getTime();
                console.log('endTime', endTime)
                console.log('totalTime', `${(endTime - startTime) / 1000}s`)
            });
        }
    });
})();
