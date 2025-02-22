import { createEventName as createEventNames } from 'alemonjs'

/**
 * 创建app名称
 * @param url
 * @param select
 * @returns
 */
export const createEventName = (url: string) => createEventNames(url, 'apps')

/**
 *
 * @param size
 * @returns
 */
export const formatSize = (size: number): string => {
  if (size < 1024) {
    return `${size}B`
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`
  }
}
