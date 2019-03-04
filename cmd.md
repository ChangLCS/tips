```
ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=1380:r=23 -vf "ass=0007.ass" 07.mp4
（ffmpeg）把字幕文件转成MP4进行操作
d是秒数，r是帧数
```
