# DS1302

makecode DS1302 RTC package for micro:bit  

Author: shaoziyang  
Date:   2018.Mar  

![](https://raw.githubusercontent.com/microbit-makecode-packages/DS1302/master/icon.png)  
  
![](https://raw.githubusercontent.com/microbit-makecode-packages/DS1302/master/ds1302.jpg)

## usage

open your microbit makecode project, in Add Package, paste  

https://github.com/microbit-makecode-packages/DS1302  

to search box then search.


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

## Demo

![](https://raw.githubusercontent.com/microbit-makecode-packages/DS1302/master/demo.jpg)  

![](https://raw.githubusercontent.com/microbit-makecode-packages/DS1302/master/demo.gif)  

## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  

## Supported targets

* for PXT/microbit


[From microbit/micropython Chinese community](http://www.micropython.org.cn)
