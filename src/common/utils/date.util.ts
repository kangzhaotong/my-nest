/**
 * 日期时间工具类
 */
export class DateUtil {
  /**
   * 格式化日期
   * @param date 日期对象或时间戳
   * @param format 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
   */
  static format(
    date: Date | number = new Date(),
    format: string = 'YYYY-MM-DD HH:mm:ss',
  ): string {
    const d = typeof date === 'number' ? new Date(date) : date;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    const second = String(d.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second);
  }

  /**
   * 获取当前时间戳（秒）
   */
  static timestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * 获取当前时间戳（毫秒）
   */
  static timestampMs(): number {
    return Date.now();
  }

  /**
   * 计算两个日期的天数差
   * @param date1 日期1
   * @param date2 日期2
   */
  static daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  }

  /**
   * 添加天数
   * @param date 日期
   * @param days 要添加的天数（可以为负数）
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * 添加小时
   * @param date 日期
   * @param hours 要添加的小时数（可以为负数）
   */
  static addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  /**
   * 判断是否为同一天
   * @param date1 日期1
   * @param date2 日期2
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /**
   * 获取日期的开始时间（00:00:00）
   * @param date 日期
   */
  static startOfDay(date: Date = new Date()): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * 获取日期的结束时间（23:59:59）
   * @param date 日期
   */
  static endOfDay(date: Date = new Date()): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }
}
