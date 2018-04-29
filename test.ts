let b = 0
let tmy: number[] = []
let a = 0
let tmx: number[] = []
let item: DS1302.DS1302RTC = null
let old = 0
let sec = 0
sec = 0
old = -1
item = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
tmx = [2, 3, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1]
tmy = [0, 0, 1, 2, 3, 4, 4, 4, 3, 2, 1, 0]
basic.forever(() => {
    sec = item.getSecond()
    if (sec != old) {
        old = sec
        a = sec / 5
        b = sec % 5
        if (4 == b) {
            led.unplot(tmx[a], tmy[a])
        } else {
            led.plotBrightness(tmx[a], tmy[a], 20 + b * 20)
        }
        led.toggle(2, 2)
    }
    basic.pause(300)
})
