import { dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * 创建app名称
 * @param url
 * @param select
 * @returns
 */
export const createEventName = (url: string, select = 'apps') => {
  const __dirname = dirname(fileURLToPath(url))
  const dirs = __dirname.split('/').reverse()
  const name = dirs.slice(0, dirs.indexOf(select)).join(':')
  return `ollama:${select}:${name}`
}

const cdCache = {}

/**
 * @param UID
 * @returns
 */
export const operationLocalLock = (UID: string) => {
  const Now = Date.now()
  // 2300
  if (cdCache[UID] && Number(cdCache[UID]) + 2300 > Now) {
    return false
  }
  cdCache[UID] = Now
  return true
}

export const AI = new Map()

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
