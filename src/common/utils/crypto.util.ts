/**
 * 加密工具类
 */
import * as crypto from 'crypto';

export class CryptoUtil {
  /**
   * MD5 加密
   * @param text 要加密的文本
   */
  static md5(text: string): string {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  /**
   * SHA256 加密
   * @param text 要加密的文本
   */
  static sha256(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  /**
   * Base64 编码
   * @param text 要编码的文本
   */
  static base64Encode(text: string): string {
    return Buffer.from(text).toString('base64');
  }

  /**
   * Base64 解码
   * @param base64Text Base64 编码的文本
   */
  static base64Decode(base64Text: string): string {
    return Buffer.from(base64Text, 'base64').toString('utf-8');
  }

  /**
   * AES 加密
   * @param text 要加密的文本
   * @param key 密钥（32字节）
   * @param iv 初始化向量（16字节）
   */
  static aesEncrypt(text: string, key: string, iv: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(key),
      Buffer.from(iv),
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  /**
   * AES 解密
   * @param encryptedText 加密的文本
   * @param key 密钥（32字节）
   * @param iv 初始化向量（16字节）
   */
  static aesDecrypt(encryptedText: string, key: string, iv: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key),
      Buffer.from(iv),
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * 生成随机字符串
   * @param length 长度
   */
  static randomString(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
}
