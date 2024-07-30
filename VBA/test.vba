' 批量插入本地图片，并提取图片名，交换图片尺寸，居中，旋转，批量插入图片
' 每隔两张图，创建新页面

Sub 批量插入图片并提取图名()
    Dim myfile As FileDialog
    Dim counter As Integer
    Dim MyPic As InlineShape
    Dim ShapePic As Shape

    Set myfile = Application.FileDialog(msoFileDialogFilePicker)
    With myfile
        .InitialFileName = ""    '这里输入你要插入图片的目标文件夹,这里设为空
        If .Show = -1 Then
            For Each Fn In .SelectedItems

                If counter > 0 And counter Mod 2 = 0 Then
                    Selection.InsertBreak Type:=wdPageBreak
                End If

                Selection.Text = FileName(Fn)
                Selection.ParagraphFormat.Alignment = wdAlignParagraphCenter    '居中
                Selection.Font.Size = 16                  '三号字
                Selection.Font.Name = "黑体"
                Selection.EndKey

                If Selection.Start = ActiveDocument.Content.End - 1 Then  '如光标在文末
                    Selection.TypeParagraph  '在文末添加一空段
                Else
                    Selection.MoveDown
                End If
                
                Set MyPic = Selection.InlineShapes.AddPicture(FileName:=Fn, SaveWithDocument:=True)                '按比例调整相片尺寸
                
                '转换 InlineShape 为 Shape 以便旋转
                Set ShapePic = MyPic.ConvertToShape

                '旋转图片
                ShapePic.Rotation = 90  '这里设置图片旋转角度，可以根据需要调整

                '调整图片尺寸
                ShapePic.LockAspectRatio = msoFalse
                ShapePic.Width = 10 * 28.35   '宽10厘米（1cm等于28.35像素）
                ShapePic.Height = 15 * 28.35  '高15厘米

                ShapePic.ConvertToInlineShape

                Selection.MoveDown
                Selection.TypeParagraph

                counter = counter + 1
            Next Fn
        Else
        End If
    End With
    Set myfile = Nothing
End Sub

Function FileName(FullPath)    '取得文件名
    Dim x, y
    Dim tmpstring
    tmpstring = FullPath
    x = Len(FullPath)
    For y = x To 1 Step -1
        If Mid(FullPath, y, 1) = "\" Or _
           Mid(FullPath, y, 1) = ":" Or _
           Mid(FullPath, y, 1) = "/" Then
            tmpstring = Mid(FullPath, y + 1)
            Exit For
        End If
    Next
    FileName = Left(tmpstring, Len(tmpstring) - 4)
End Function