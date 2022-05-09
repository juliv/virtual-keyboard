/**
 * Список языков: 'en' и 'ru'
 */

/**
 * Текущий язык
 * @return {string}
 */
const current = () => {
  return localStorage.getItem('locale') || 'en'
}

/**
 * Установка языка
 * @param {string} locale - 'en' или 'ru'
 */
const setLocale = (locale) => {
  const locales = ['ru', 'en']
  const l = (locales.indexOf(locale) !== -1) ? locale : 'en'
  localStorage.setItem('locale', l)
  printLocale()
}

/**
 * Вывод текущего языка в html
 */
const printLocale = () => {
  document.getElementById('app-locale').innerText = current()
}

/**
 * Переключение текущего языка
 */
const switchLocale = () => {
  setLocale(current() === 'en' ? 'ru' : 'en')
}

export default {
  current,
  setLocale,
  switchLocale,
  printLocale
}
