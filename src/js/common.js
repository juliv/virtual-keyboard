import keys from './keys.js'
import locale from './locale.js'

/**
 * Создание html-базиса для клавиатуры
 */
const createSkeleton = () => {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="container">
      <h1 class="app-title">Виртуальная клавиатура <br> <span class="small">(JSFE2022Q1)</span></h1>
      <div class="rel-line"><span class="locale" id="app-locale"></span></div>
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
// eslint-disable-next-line no-shadow
const createKeys = (keys) => {
  let html = ''
  for (let id = 0; id < keys.length; id++) {
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
      const ll = Object.keys(value)
      for (let i = 0; i < ll.length; i++) {
        item += `<span class="lang lang--${ll[i]}">
            <span class="caps caps--off">${value[ll[i]][0]}</span>
            <span class="caps caps--on">${value[ll[i]][1]}</span>
          </span>`
      }
    }
    html += `<div class="key key--${code}${suffix}" data-id="${id}">${item}</div>`
  }
  document.getElementById('kb').innerHTML = html
}

/**
 * Отображение только текущего набора клавиш (зависит от locale и caps)
 * @param {boolean} caps - если верхний регистр
 */
const showKeys = (caps = false) => {
  const lang = locale.current()
  const kb = document.getElementById('kb')
  kb.className = `keys keys--${lang} keys--caps-${caps ? 'on' : 'off'}`
}

/**
 * Переключение 'статуса активности' у кнопки клавиатуры
 * @param {string} keyCode
 * @param {boolean} state
 */
const changeKeyActive = (keyCode, state) => {
  const key = document.querySelector(`div.key--${keyCode}`)
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
  const key = document.querySelector(`div.key--${keyCode}`)
  const lang = locale.current()
  if (key !== null) {
    const keyId = parseInt(key.dataset.id || -1, 10)
    if (keyId in keys) {
      const {
        value = '',
        s = false
      } = keys[keyId]
      if (typeof value === 'string' && value) {
        return value
      }
      if (typeof value === 'object' && !s) {
        return value[lang][!caps ? 0 : 1]
      }
    }
  }
  return ''
}

const insertToTextarea = (text) => {
  const input = document.getElementById('app-input')
  const pos = [input.selectionStart, input.selectionEnd]
  if (text === 'Backspace' || text === 'Delete') {
    if (pos[0] !== pos[1]) {
      input.value = input.value.substring(0, pos[0]) + input.value.substring(pos[1])
      input.selectionStart = pos[0]
      input.selectionEnd = pos[0]
    } else if (text === 'Backspace') {
      const pos0 = (pos[0] > 1) ? (pos[0] - 1) : 0
      input.value = input.value.substring(0, pos0) + input.value.substring(pos[1])
      input.selectionStart = pos0
      input.selectionEnd = pos0
    } else if (text === 'Delete') {
      const pos1 = (pos[1] < input.value.length - 1) ? (pos[1] + 1) : input.value.length
      input.value = input.value.substring(0, pos[0]) + input.value.substring(pos1)
      input.selectionStart = pos[0]
      input.selectionEnd = pos[0]
    }
  } else {
    input.value = input.value.substring(0, pos[0]) + text + input.value.substring(pos[1])
    input.selectionStart = pos[0] + text.length
    input.selectionEnd = pos[0] + text.length
  }
}

/**
 * Навешивание событий на клавиатуру
 */
const addEvents = () => {
  const kb = document.getElementById('kb')
  document.addEventListener('keydown', (e) => {
    e.preventDefault()
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

    const t = e.target
    const caps = Boolean(e.getModifierState('CapsLock') ^ e.shiftKey)

    if (t.classList.contains('key')) {
      const id = parseInt(t.dataset.id || -1, 10)
      const key = (id in keys) ? keys[id] : null
      if (key) {
        const k = keyInsert(key.code, caps)
        insertToTextarea(k)
      }
    }
  })
}

/**/

createSkeleton()

const input = document.getElementById('app-input')
input.value = ''

locale.printLocale()
createKeys(keys)
showKeys()
addEvents()
