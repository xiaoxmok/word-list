Sub 批量设置图片格式()
  ' 批量设置图片格式 宏
  '
  '
  '定义变量
  Dim picwidth
  Dim picheight
  
  On Error Resume Next '忽略错误
  
  picheight = 15 '单位厘米，可修改
  picwidth = 10 '单位厘米，可修改
  
  While ActiveDocument.InlineShapes.Count > 0
  
    ''类型1：嵌入式图形 InlineShapes类型图片
    For Each PictShape In ActiveDocument.InlineShapes
      '转换为Shape类型(文字环绕型)
      PictShape.ConvertToShape
    
    Next
    
  Wend
  
  While ActiveDocument.Shapes.Count > 0
  
    For Each PictShape In ActiveDocument.Shapes
    
      PictShape.Height = picheight * 28.35 '设置图片高度为 15cm （1cm等于28.35px）
      PictShape.Width = picwidth * 28.35 '设置图片宽度10cm
      PictShape.Rotation = -90 '设置图片角度
      
      '转换回InlineShapes类型(嵌入型)
      PictShape.ConvertToInlineShape
    
    Next
  Wend
End Sub