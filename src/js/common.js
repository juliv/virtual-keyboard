import keys from './keys.js'
import locale from './locale.js'

/**
 * Создание html-базиса для клавиатуры
 */
const createSkeleton = () => {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="container">
      <h1 class="app-title">Виртуальная клавиатура (JSFE2022Q1)</h1>
      <textarea class="app-input" id="app-input"></textarea>
      <div id="kb" class="keys"></div>
      <div class="app-legend">
        <p>Клавиатура создана в Windows</p>
        <p>Для переключения языка используйте Ctrl + Alt</p>
      </div>
    </div>`)
}

/**
 * Создание html для клавиш виртуальной клавиатуры
 * @param {Array} keys - массив из keys.js
 */
const createKeys = (keys) => {
  let html = ''
  for (const id in keys) {
    const {
      code,
      label = null,
      value = null,
      s = false
    } = keys[id]
    const suffix = s ? ' key--s' : ''
    let item = ''
    if (label !== null) {
      item = label
    } else {
      for (const l in value) {
        item += `<span class="lang lang--${l}">
            <span class="caps caps--off">${value[l][0]}</span>
            <span class="caps caps--on">${value[l][1]}</span>
          </span>`
      }
    }
    html += `<div class="key key--${code}${suffix}" data-id="${id}">${item}</div>`
  }
  kb.innerHTML = html
}

/**
 * Отображение только текущего набора клавиш (зависит от locale и caps)
 * @param {boolean} caps - если верхний регистр
 */
const showKeys = (caps = false) => {
  const lang = locale.current()
  kb.className = `keys keys--${lang} keys--caps-${caps ? 'on' : 'off'}`
}

/**
 * Переключение 'статуса активности' у кнопки клавиатуры
 * @param {string} keyCode
 * @param {boolean} state
 */
const changeKeyActive = (keyCode, state) => {
  const key = document.querySelector('div.key--' + keyCode)
  if (key !== null) {
    if (state) {
      key.classList.add('active')
    } else {
      key.classList.remove('active')
    }
  }
}

/**
 * Определяем символ/текст для вставки в поле ввода
 * @param {string} keyCode
 * @param {boolean} caps
 * @returns {string}
 */
const keyInsert = (keyCode, caps = false) => {
  const key = document.querySelector('div.key--' + keyCode)
  const lang = locale.current()
  if (key !== null) {
    const keyId = parseInt(key.dataset.id || -1)
    if (keyId in keys) {
      const {
        value = '',
        s = false
      } = keys[keyId]
      if (typeof value === 'string' && value) {
        return value
      } else if (typeof value === 'object' && !s) {
        return value[lang][!caps ? 0 : 1]
      }
    }
  }
  return ''
}

const insertToTextarea = (text) => {
  if (input.selectionStart || input.selectionStart === 0) {
    const pos = [ input.selectionStart, input.selectionEnd ]
    input.value = input.value.substring(0, pos[0]) + text + input.value.substring(pos[1])
    input.selectionStart = pos[0] + text.length;
    input.selectionEnd = pos[0] + text.length;
  } else {
    input.value += text
  }
}

/**
 * Навешивание событий на клавиатуру
 */
const addEvents = () => {

  document.addEventListener('keydown', (e) => {
    e.preventDefault()

    // console.log(e.key, '-', e.code, e.shiftKey, e.ctrlKey, e.altKey, e.getModifierState('CapsLock'))

    const capsActive = e.getModifierState('CapsLock')
    const caps = Boolean(capsActive ^ e.shiftKey)
    if (capsActive) {
      changeKeyActive('CapsLock', true)
    }
    if (e.ctrlKey && e.altKey) {
      // Переключаем язык по Ctrl+Alt
      locale.switchLocale()
    }
    showKeys(caps)
    if (e.code !== 'CapsLock') {
      changeKeyActive(e.code, true)
      const k = keyInsert(e.code, caps)
      insertToTextarea(k)
    }
  })

  document.addEventListener('keyup', (e) => {
    e.preventDefault()
    const capsActive = e.getModifierState('CapsLock')
    const caps = Boolean(capsActive ^ e.shiftKey)
    if (!capsActive) {
      changeKeyActive('CapsLock', false)
    }
    showKeys(caps)
    if (e.code !== 'CapsLock') {
      changeKeyActive(e.code, false)
    }
  })

  kb.addEventListener('click', (e) => {
    e.preventDefault()

    // console.log(e.key, '-', e.code, e.shiftKey, e.ctrlKey, e.altKey, e.getModifierState('CapsLock'))

    const _this = e.target
    const caps = Boolean(e.getModifierState('CapsLock') ^ e.shiftKey)

    if (_this.classList.contains('key')) {
      const id = parseInt(_this.dataset.id || -1)
      const key = (id in keys) ? keys[id] : null
      if (key) {
        const k = keyInsert(key.code, caps)
        insertToTextarea(k)
      }
    }

  })

}

createSkeleton()

const kb = document.getElementById('kb')
const input = document.getElementById('app-input')
input.value = ''

createKeys(keys)
showKeys()
addEvents()
