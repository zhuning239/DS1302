/**
* makecode DS1302 RTC Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

/**
 * DS1302 block
 */
//% weight=100 color=#A040E0 icon="\uf017" block="RTC DS1302" 
namespace DS1302 {
    let DS1302_REG_SECOND = 0x80
    let DS1302_REG_MINUTE = 0x82
    let DS1302_REG_HOUR = 0x84
    let DS1302_REG_DAY = 0x86
    let DS1302_REG_MONTH = 0x88
    let DS1302_REG_WEEKDAY = 0x8A
    let DS1302_REG_YEAR = 0x8C
    let DS1302_REG_WP = 0x8E
    let DS1302_REG_CTRL = 0x90
    let DS1302_REG_RAM = 0xC0

    /**
     * convert a Hex data to Dec
     */
    function HexToDec(dat: number): number {
        return (dat / 16) * 10 + (dat % 16);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return (dat / 10) * 16 + (dat % 10)
    }

    /**
     * DS1302 RTC class
     */
    export class DS1302RTC {
        clk: DigitalPin;
        dio: DigitalPin;
        cs: DigitalPin;

        /**
         * write a byte to DS1302
         */
        write_byte(dat: number) {
            for (let i = 0; i < 8; i++) {
                pins.digitalWritePin(this.dio, (dat >> i) & 1);
                pins.digitalWritePin(this.clk, 1);
                pins.digitalWritePin(this.clk, 0);
            }
        }

        /**
         * read a byte from DS1302
         */
        read_byte(): number {
            let d = 0;
            for (let i = 0; i < 8; i++) {
                d = d | (pins.digitalReadPin(this.dio) << i);
                pins.digitalWritePin(this.clk, 1);
                pins.digitalWritePin(this.clk, 0);
            }
            return d;
        }

        /**
         * read reg
         */
        getReg(reg: number): number {
            let t = 0;
            pins.digitalWritePin(this.cs, 1);
            this.write_byte(reg);
            t = this.read_byte();
            pins.digitalWritePin(this.cs, 0);
            return t;
        }

        /**
         * write reg
         */
        setReg(reg: number, dat: number) {
            pins.digitalWritePin(this.cs, 1);
            this.write_byte(reg);
            this.write_byte(dat);
            pins.digitalWritePin(this.cs, 0);
        }

        /**
         * write reg with WP protect
         */
        wr(reg: number, dat: number) {
            this.setReg(DS1302_REG_WP, 0)
            this.setReg(reg, dat)
            this.setReg(DS1302_REG_WP, 0)
        }

        /**
         * get Year
         */
        //% blockId="DS1302_get_year" block="%ds|get year"
        //% weight=80 blockGap=8
        //% parts="DS1302"
        getYear(): number {
            return (HexToDec(this.getReg(DS1302_REG_YEAR + 1)) + 2000)
        }

        /**
         * set year
         * @param dat is the Year will be set, eg: 2018
         */
        //% blockId="DS1302_set_year" block="%ds|set year %dat"
        //% weight=81 blockGap=8
        //% parts="DS1302"
        setYear(dat: number): void {
            this.wr(DS1302_REG_YEAR, DecToHex(dat % 100))
        }

        /**
         * get Month
         */
        //% blockId="DS1302_get_month" block="%ds|get month"
        //% weight=78 blockGap=8
        //% parts="DS1302"
        getMonth(): number {
            return HexToDec(this.getReg(DS1302_REG_MONTH + 1))
        }

        /**
         * set month
         * @param dat is Month will be set.  eg: 2
         */
        //% blockId="DS1302_set_month" block="%ds|set month %dat"
        //% weight=79 blockGap=8
        //% parts="DS1302"
        //% dat.min=1 dat.max=12
        setMonth(dat: number): void {
            this.wr(DS1302_REG_MONTH, DecToHex(dat % 13))
        }

        /**
         * get Day
         */
        //% blockId="DS1302_get_day" block="%ds|get day"
        //% weight=76 blockGap=8
        //% parts="DS1302"
        getDay(): number {
            return HexToDec(this.getReg(DS1302_REG_DAY + 1))
        }

        /**
         * set day
         * @param dat is the Day will be set, eg: 15
         */
        //% blockId="DS1302_set_day" block="%ds|set day %dat"
        //% weight=77 blockGap=8
        //% parts="DS1302"
        //% dat.min=1 dat.max=31
        setDay(dat: number): void {
            this.wr(DS1302_REG_DAY, DecToHex(dat % 32))
        }

        /**
         * get Week Day
         */
        //% blockId="DS1302_get_weekday" block="%ds|get weekday"
        //% weight=74 blockGap=8
        //% parts="DS1302"
        getWeekday(): number {
            return HexToDec(this.getReg(DS1302_REG_WEEKDAY + 1))
        }

        /**
         * set weekday
         * @param dat is the Week Day will be set, eg: 4
         */
        //% blockId="DS1302_set_weekday" block="%ds|set weekday %dat"
        //% weight=75 blockGap=8
        //% parts="DS1302"
        //% dat.min=1 dat.max=7
        setWeekday(dat: number): void {
            this.wr(DS1302_REG_WEEKDAY, DecToHex(dat % 8))
        }

        /**
         * get Hour
         */
        //% blockId="DS1302_get_hour" block="%ds|get hour"
        //% weight=72 blockGap=8
        //% parts="DS1302"
        getHour(): number {
            return HexToDec(this.getReg(DS1302_REG_HOUR + 1)) % 24
        }

        /**
         * set hour
         * @param dat is the Hour will be set, eg: 0
         */
        //% blockId="DS1302_set_hour" block="%ds|set hour %dat"
        //% weight=73 blockGap=8
        //% parts="DS1302"
        //% dat.min=0 dat.max=23
        setHour(dat: number): void {
            this.wr(DS1302_REG_HOUR, DecToHex(dat % 24))
        }

        /**
         * get Minute
         */
        //% blockId="DS1302_get_minute" block="%ds|get minute"
        //% weight=72 blockGap=8
        //% parts="DS1302"
        getMinute(): number {
            return HexToDec(this.getReg(DS1302_REG_MINUTE + 1)) % 60
        }

        /**
         * set minute
         * @param dat is the Minute will be set, eg: 0
         */
        //% blockId="DS1302_set_minute" block="%ds|set minute %dat"
        //% weight=71 blockGap=8
        //% parts="DS1302"
        //% dat.min=0 dat.max=59
        setMinute(dat: number): void {
            this.wr(DS1302_REG_MINUTE, DecToHex(dat % 60))
        }

        /**
         * get Second
         */
        //% blockId="DS1302_get_second" block="%ds|get second"
        //% weight=70 blockGap=8
        //% parts="DS1302"
        getSecond(): number {
            return HexToDec(this.getReg(DS1302_REG_SECOND + 1)) % 60
        }

        /**
         * set second
         * @param dat is the Second will be set, eg: 0
         */
        //% blockId="DS1302_set_second" block="%ds|set second %dat"
        //% weight=69 blockGap=8
        //% parts="DS1302"
        //% dat.min=0 dat.max=59
        setSecond(dat: number): void {
            this.wr(DS1302_REG_SECOND, DecToHex(dat % 60))
        }

        /**
         * set Date and Time
         * @param year is the Year will be set, eg: 2018
         * @param month is the Month will be set, eg: 2
         * @param day is the Day will be set, eg: 15
         * @param weekday is the Weekday will be set, eg: 4
         * @param hour is the Hour will be set, eg: 0
         * @param minute is the Minute will be set, eg: 0
         * @param second is the Second will be set, eg: 0
         */
        //% blockId="DS1302_set_DateTime" block="%ds|set Date and Time: Year %year|Month %month|Day %day|WeekDay %weekday|Hour %hour|Minute %minute|Second %second"
        //% weight=50 blockGap=8
        //% parts="DS1302"
        //% year.min=2000 year.max=2100
        //% month.min=1 month.max=12
        //% day.min=1 day.max=31
        //% weekday.min=1 weekday.max=7
        //% hour.min=0 hour.max=23
        //% minute.min=0 minute.max=59
        //% second.min=0 second.max=59
        DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
            this.setYear(year);
            this.setMonth(month);
            this.setDay(day);
            this.setWeekday(weekday);
            this.setHour(hour);
            this.setMinute(minute);
            this.setSecond(second);
        }

        /**
         * start ds1302 (go on)
         */
        //% blockId="DS1302_start" block="%ds|start RTC"
        //% weight=41 blockGap=8
        //% parts="DS1302"
        start() {
            let t = this.getSecond()
            this.setSecond(t & 0x7f)
        }

        /**
         * stop ds1302 (pause)
         */
        //% blockId="DS1302_pause" block="%ds|pause RTC"
        //% weight=40 blockGap=8
        //% parts="DS1302"
        stop() {
            let t = this.getSecond()
            this.setSecond(t | 0x80)
        }

        /**
         * read RAM
         */
        //% blockId="DS1302_read_ram" block="%ds|read ram %reg"
        //% weight=43 blockGap=8
        //% parts="DS1302"
        //% reg.min=0 reg.max=30
        readRam(reg: number): number {
            return this.getReg(DS1302_REG_RAM + 1 + (reg % 31) * 2)
        }

        /**
         * write RAM
         */
        //% blockId="DS1302_write_ram" block="%ds|write ram %reg|with %dat"
        //% weight=42 blockGap=8
        //% parts="DS1302"
        //% reg.min=0 reg.max=30
        writeRam(reg: number, dat: number) {
            this.wr(DS1302_REG_RAM + (reg % 31) * 2, dat)
        }
    }

    /**
     * create a DS1302 object.
     * @param clk the CLK pin for DS1302, eg: DigitalPin.P13
     * @param dio the DIO pin for DS1302, eg: DigitalPin.P14
     * @param cs the CS pin for DS1302, eg: DigitalPin.P15
     */
    //% weight=200 blockGap=8
    //% blockId="DS1302_create" block="CLK %clk|DIO %dio|CS %cs"
    export function create(clk: DigitalPin, dio: DigitalPin, cs: DigitalPin): DS1302RTC {
        let ds = new DS1302RTC();
        ds.clk = clk;
        ds.dio = dio;
        ds.cs = cs;
        pins.digitalWritePin(ds.clk, 0);
        pins.digitalWritePin(ds.cs, 0);
        return ds;
    }
}
