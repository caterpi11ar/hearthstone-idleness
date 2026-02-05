export interface LoggingConfig {
  /**
   * log level
   * - silent: 不输出日志
   * - fatal: 严重错误
   * - error: 错误
   * - warn: 警告
   * - info: 信息
   * - debug: 调试
   * - trace: 跟踪
   */
  level?: 'silent' | 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
}
