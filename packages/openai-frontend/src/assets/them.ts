import cssVariables from './them.init.json'
Object.keys(cssVariables).forEach(key => {
  const KEY = key as keyof typeof cssVariables
  document.documentElement.style.setProperty(`--${key}`, cssVariables[KEY])
})
// 黑暗
document.documentElement.classList.add('dark')
