const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// HTML 内容
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Video</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #282c34;
            color: white;
        }
        h1 {
            animation: fadeIn 3s infinite;
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    </style>
</head>
<body>
    <h1>Welcome to Node.js Video Generation</h1>
</body>
</html>
`;

// 保存 HTML 到本地
const htmlFilePath = path.join(__dirname, 'temp.html');
fs.writeFileSync(htmlFilePath, htmlContent);

(async () => {
    // 使用 Puppeteer 打开 HTML 文件
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file://${htmlFilePath}`);
    await page.setViewport({ width: 1920, height: 1080 });

    // 截图并保存帧
    const framesDir = path.join(__dirname, 'frames');
    if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);

    console.log('Capturing frames...');
    for (let i = 0; i < 10; i++) { // 生成 100 帧
        await page.screenshot({ path: `${framesDir}/frame${String(i).padStart(3, '0')}.png` });
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 100))); // 延迟 100ms
    }

    await browser.close();

    // 使用 FFmpeg 合成视频
    console.log('Generating video with FFmpeg...');
    const outputVideo = path.join(__dirname, 'output.mp4');
    const ffmpegCommand = `ffmpeg -framerate 10 -i ${framesDir}/frame%03d.png -pix_fmt yuv420p ${outputVideo}`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error generating video:', error);
        } else {
            console.log('Video created successfully:', outputVideo);
        }

        // 清理临时文件
        fs.rmSync(framesDir, { recursive: true, force: true });
        fs.unlinkSync(htmlFilePath);
    });
})();
