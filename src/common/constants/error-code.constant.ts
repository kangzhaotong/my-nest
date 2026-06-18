/**
 * 错误码常量
 */
export const ErrorCode = {
  // 通用错误码 (1000-1999)
  SUCCESS: 0,
  UNKNOWN_ERROR: 1000,
  PARAMS_ERROR: 1001,
  PARAMS_MISSING: 1002,
  UNAUTHORIZED: 1003,
  FORBIDDEN: 1004,
  NOT_FOUND: 1005,
  METHOD_NOT_ALLOWED: 1006,
  CONFLICT: 1007,

  // 用户相关错误码 (2000-2999)
  USER_NOT_FOUND: 2000,
  USER_ALREADY_EXISTS: 2001,
  USER_PASSWORD_ERROR: 2002,
  USER_DISABLED: 2003,
  USER_NOT_LOGIN: 2004,

  // 数据库相关错误码 (3000-3999)
  DATABASE_ERROR: 3000,
  DATABASE_CONNECT_ERROR: 3001,
  DATABASE_QUERY_ERROR: 3002,

  // 文件相关错误码 (4000-4999)
  FILE_NOT_FOUND: 4000,
  FILE_UPLOAD_ERROR: 4001,
  FILE_TYPE_ERROR: 4002,
  FILE_SIZE_ERROR: 4003,
} as const;

/**
 * 错误码对应的消息
 */
export const ErrorMessage: Record<number, string> = {
  [ErrorCode.SUCCESS]: '操作成功',
  [ErrorCode.UNKNOWN_ERROR]: '未知错误',
  [ErrorCode.PARAMS_ERROR]: '参数错误',
  [ErrorCode.PARAMS_MISSING]: '缺少必要参数',
  [ErrorCode.UNAUTHORIZED]: '未授权',
  [ErrorCode.FORBIDDEN]: '禁止访问',
  [ErrorCode.NOT_FOUND]: '资源不存在',
  [ErrorCode.METHOD_NOT_ALLOWED]: '方法不允许',
  [ErrorCode.CONFLICT]: '资源冲突',

  [ErrorCode.USER_NOT_FOUND]: '用户不存在',
  [ErrorCode.USER_ALREADY_EXISTS]: '用户已存在',
  [ErrorCode.USER_PASSWORD_ERROR]: '密码错误',
  [ErrorCode.USER_DISABLED]: '用户已被禁用',
  [ErrorCode.USER_NOT_LOGIN]: '用户未登录',

  [ErrorCode.DATABASE_ERROR]: '数据库错误',
  [ErrorCode.DATABASE_CONNECT_ERROR]: '数据库连接失败',
  [ErrorCode.DATABASE_QUERY_ERROR]: '数据库查询失败',

  [ErrorCode.FILE_NOT_FOUND]: '文件不存在',
  [ErrorCode.FILE_UPLOAD_ERROR]: '文件上传失败',
  [ErrorCode.FILE_TYPE_ERROR]: '文件类型错误',
  [ErrorCode.FILE_SIZE_ERROR]: '文件大小超出限制',
};
