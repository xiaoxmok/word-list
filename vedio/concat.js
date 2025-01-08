const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const startTime = new Date().getTime();
console.log('startTime', startTime)

// 合并音频和视频
const file1 = path.join(__dirname, 'final_output_3.mp4');
console.log('file1', file1)
const file2 = path.join(__dirname, 'final_output.mp4');
const finalOutput = path.join(__dirname, 'output.mp4');
// const ffmpegCommand2 = `ffmpeg -i ${outputVideo} -i ${audioFile} -c:v copy -c:a aac -shortest -y ${finalOutput}`;
const ffmpegCommand2 = `ffmpeg -i ${file2} -i ${file1} -filter_complex "[0:v:0][0:a:0][1:v:0][1:a:0]concat=n=2:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" ${finalOutput}`;
exec(ffmpegCommand2, (error, stdout, stderr) => {
    if (error) {
        console.error('Error adding audio:', error);
    } else {
        console.log('Final video with audio created:', finalOutput);
    }

    // 清理临时文件
    // fs.rmSync(framesDir, { recursive: true, force: true });
    // fs.unlinkSync(outputVideo);

    const endTime = new Date().getTime();
    console.log('endTime', endTime)
    console.log('totalTime', `${(endTime - startTime) / 1000}s`)
});