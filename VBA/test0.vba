' 批量将本地的图片插入wold中，然后提取图片的文件名，图名显示在图片的上方

Sub 批量插入图片并提取图名()
    Dim myfile As FileDialog

    Set myfile = Application.FileDialog(msoFileDialogFilePicker)
    With myfile
        .InitialFileName = ""    '这里输入你要插入图片的目标文件夹,这里设为空
        If .Show = -1 Then
            For Each Fn In .SelectedItems

                If Selection.Start = ActiveDocument.Content.End - 1 Then  '如光标在文末
                    Selection.TypeParagraph    '在文末添加一空段
                Else
                    Selection.MoveDown
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
                WidthNum = MyPic.Width
                c = 15 * 28.35        '在此处修改相片宽,15厘米（1cm等于28.35像素）
                MyPic.Width = c
                MyPic.Height = (c * 1 / WidthNum) * MyPic.Height

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