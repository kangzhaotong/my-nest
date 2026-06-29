/**
 * 验证工具类
 */
export class ValidatorUtil {
  /**
   * 验证邮箱格式
   * @param email 邮箱地址
   */
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 验证手机号格式（中国大陆）
   * @param phone 手机号
   */
  static isPhone(phone: string): boolean {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  }

  /**
   * 验证身份证号格式（中国大陆）
   * @param idCard 身份证号
   */
  static isIdCard(idCard: string): boolean {
    const idCardRegex =
      /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
    return idCardRegex.test(idCard);
  }

  /**
   * 验证 URL 格式
   * @param url URL 地址
   */
  static isUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 验证 IP 地址格式（IPv4）
   * @param ip IP 地址
   */
  static isIPv4(ip: string): boolean {
    const ipRegex =
      /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    return ipRegex.test(ip);
  }

  /**
   * 验证密码强度
   * @param password 密码
   * @param minLength 最小长度，默认 8
   * @returns 强度等级：0-弱，1-中，2-强
   */
  static getPasswordStrength(password: string, minLength: number = 8): number {
    if (password.length < minLength) return 0;

    let strength = 0;
    // 包含小写字母
    if (/[a-z]/.test(password)) strength++;
    // 包含大写字母
    if (/[A-Z]/.test(password)) strength++;
    // 包含数字
    if (/\d/.test(password)) strength++;
    // 包含特殊字符
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    return strength >= 3 ? 2 : strength >= 2 ? 1 : 0;
  }

  /**
   * 验证是否为空
   * @param value 要验证的值
   */
  static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  }
}
