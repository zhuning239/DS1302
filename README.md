# DS1302

makecode 的 DS1302 时钟模块 microbit 软件包

作者: 朱林  
时间: 2018/4  

![image](https://github.com/zhuning239/DS1302/blob/master/icon.png)  
  
![image](https://github.com/zhuning239/DS1302/blob/master/ds1302.jpg)

## 使用方法

打开 makecode 编辑器，在项目中选择添加软件包，然后在地址栏输入下面网址：

https://github.com/zhuning239/DS1302 

搜索后就可以添加并使用本软件包了。


## API

- **function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number)**  
set Date and Time.  

- **function setSecond(dat: number)**  
set second.

- **function getSecond(dat: number)**  
get second.

- **function setMinute(dat: number)**  
set minute.

- **function getMinute(dat: number)**  
get minute.

- **function setHour(dat: number)**  
set hour.

- **function getHour(dat: number)**  
get hour.

- **function setWeekday(dat: number)**  
set week day.

- **function getWeekday(dat: number)**  
get week day.

- **function setDay(dat: number)**  
set day.

- **function getDay(dat: number)**  
get day.

- **function setMonth(dat: number)**  
set month.

- **function getMonth(dat: number)**  
get month.

- **function setYear(dat: number)**  
set year.

- **function getYear(dat: number)**  
get year.

- **writeRam(reg: number, dat: number)**  
write data to ram  
reg: 0-30

- **readRam(reg: number)**  
read data from ram  
reg: 0-30

## 演示

![image](https://github.com/zhuning239/DS1302/blob/master/demo.jpg)  

![image](https://github.com/zhuning239/DS1302/blob/master/demo.gif)  

## 授权方式

MIT

湖南创乐博智能科技有限公司

## 支持硬件

* for PXT/microbit

