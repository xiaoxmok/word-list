const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function addBookmarksToPDF(inputPath, outputPath) {
  // 加载 PDF 文件
  const existingPdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // 获取所有页面
  const pages = pdfDoc.getPages();
  console.log('pages', pages.length)

  // 创建书签
  const outline = pdfDoc.context.obj({
    Type: 'Outlines',
    Count: 2,
    First: pdfDoc.context.obj({
      Title: '(Chapter 1)',
      Dest: [pages[0].ref, 'XYZ', 0, pages[0].getHeight(), 1],
      Parent: '<<parent reference>>'
    }),
  });

  // 将书签添加到 PDF
  pdfDoc.catalog.set('Outlines', outline);

  // 保存新 PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  console.log('PDF with bookmarks created at:', outputPath);
}

addBookmarksToPDF('/Users/xiaoxiangming/me/github/word-list/pdf/test.pdf', '/Users/xiaoxiangming/me/github/word-list/pdf/output_test.pdf');
