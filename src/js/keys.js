/**
 * Список клавиш для клавиатуры
 */
const keys = [

  // 1 line
  { code: 'Backquote',    value: { 'en': ['`', '~'], 'ru': ['ё', 'Ё'] } },
  { code: 'Digit1',       value: { 'en': ['1', '!'], 'ru': ['1', '!'] } },
  { code: 'Digit2',       value: { 'en': ['2', '@'], 'ru': ['2', '"'] } },
  { code: 'Digit3',       value: { 'en': ['3', '#'], 'ru': ['3', '№'] } },
  { code: 'Digit4',       value: { 'en': ['4', '$'], 'ru': ['4', ';'] } },
  { code: 'Digit5',       value: { 'en': ['5', '%'], 'ru': ['5', '%'] } },
  { code: 'Digit6',       value: { 'en': ['6', '^'], 'ru': ['6', ':'] } },
  { code: 'Digit7',       value: { 'en': ['7', '&'], 'ru': ['7', '?'] } },
  { code: 'Digit8',       value: { 'en': ['8', '*'], 'ru': ['8', '*'] } },
  { code: 'Digit9',       value: { 'en': ['9', '('], 'ru': ['9', '('] } },
  { code: 'Digit0',       value: { 'en': ['0', ')'], 'ru': ['0', ')'] } },
  { code: 'Minus',        value: { 'en': ['-', '_'], 'ru': ['-', '_'] } },
  { code: 'Equal',        value: { 'en': ['=', '+'], 'ru': ['=', '+'] } },
  { code: 'Backspace',    label: 'Backspace', value: 'Backspace', s: true },

  // 2 line
  { code: 'Tab',          label: 'Tab', value: '\t', s: true },
  { code: 'KeyQ',         value: { 'en': ['q', 'Q'], 'ru': ['й', 'Й'] } },
  { code: 'KeyW',         value: { 'en': ['w', 'W'], 'ru': ['ц', 'Ц'] } },
  { code: 'KeyE',         value: { 'en': ['e', 'E'], 'ru': ['у', 'У'] } },
  { code: 'KeyR',         value: { 'en': ['r', 'R'], 'ru': ['к', 'К'] } },
  { code: 'KeyT',         value: { 'en': ['t', 'T'], 'ru': ['е', 'Е'] } },
  { code: 'KeyY',         value: { 'en': ['y', 'Y'], 'ru': ['н', 'Н'] } },
  { code: 'KeyU',         value: { 'en': ['u', 'U'], 'ru': ['г', 'Г'] } },
  { code: 'KeyI',         value: { 'en': ['i', 'I'], 'ru': ['ш', 'Ш'] } },
  { code: 'KeyO',         value: { 'en': ['o', 'O'], 'ru': ['щ', 'Щ'] } },
  { code: 'KeyP',         value: { 'en': ['p', 'P'], 'ru': ['з', 'З'] } },
  { code: 'BracketLeft',  value: { 'en': ['[', '{'], 'ru': ['х', 'Х'] } },
  { code: 'BracketRight', value: { 'en': [']', '}'], 'ru': ['ъ', 'Ъ'] } },
  { code: 'Backslash',    value: { 'en': ['\\','|'], 'ru': ['\\','/'] } },
  { code: 'Delete',       label: 'Del', value: 'Del', s: true },

  // 3 line
  { code: 'CapsLock',     label: 'Caps', s: true },
  { code: 'KeyA',         value: { 'en': ['a', 'A'], 'ru': ['ф', 'Ф'] } },
  { code: 'KeyS',         value: { 'en': ['s', 'S'], 'ru': ['ы', 'Ы'] } },
  { code: 'KeyD',         value: { 'en': ['d', 'D'], 'ru': ['в', 'В'] } },
  { code: 'KeyF',         value: { 'en': ['f', 'F'], 'ru': ['а', 'А'] } },
  { code: 'KeyG',         value: { 'en': ['g', 'G'], 'ru': ['п', 'П'] } },
  { code: 'KeyH',         value: { 'en': ['h', 'H'], 'ru': ['р', 'Р'] } },
  { code: 'KeyJ',         value: { 'en': ['j', 'J'], 'ru': ['о', 'О'] } },
  { code: 'KeyK',         value: { 'en': ['k', 'K'], 'ru': ['л', 'Л'] } },
  { code: 'KeyL',         value: { 'en': ['l', 'L'], 'ru': ['д', 'Д'] } },
  { code: 'Semicolon',    value: { 'en': [';', ':'], 'ru': ['ж', 'Ж'] } },
  { code: 'Quote',        value: { 'en': ['\'','"'], 'ru': ['э', 'Э'] } },
  { code: 'Enter',        label: 'Enter', value: '\n', s: true },

  // 4 line
  { code: 'ShiftLeft',    label: 'Shift', s: true },
  { code: 'KeyZ',         value: { 'en': ['z', 'Z'], 'ru': ['я', 'Я'] } },
  { code: 'KeyX',         value: { 'en': ['x', 'X'], 'ru': ['ч', 'Ч'] } },
  { code: 'KeyC',         value: { 'en': ['c', 'C'], 'ru': ['с', 'С'] } },
  { code: 'KeyV',         value: { 'en': ['v', 'V'], 'ru': ['м', 'М'] } },
  { code: 'KeyB',         value: { 'en': ['b', 'B'], 'ru': ['и', 'И'] } },
  { code: 'KeyN',         value: { 'en': ['n', 'N'], 'ru': ['т', 'Т'] } },
  { code: 'KeyM',         value: { 'en': ['m', 'M'], 'ru': ['ь', 'Ь'] } },
  { code: 'Comma',        value: { 'en': [',', '<'], 'ru': ['б', 'Б'] } },
  { code: 'Period',       value: { 'en': ['.', '>'], 'ru': ['ю', 'Ю'] } },
  { code: 'Slash',        value: { 'en': ['/', '?'], 'ru': ['.', ','] } },
  { code: 'ArrowUp',      label: '&uarr;', value: '↑', s: true },
  { code: 'ShiftRight',   label: 'Shift', s: true },

  // 5 line
  { code: 'ControlLeft',  label: 'Ctrl', s: true },
  { code: 'OSLeft',       label: 'Win', s: true },
  { code: 'AltLeft',      label: 'Alt', s: true },
  { code: 'Space',        value: ' ' },
  { code: 'AltRight',     label: 'Alt', s: true },
  { code: 'ArrowLeft',    label: '&larr;', value: '←', s: true },
  { code: 'ArrowDown',    label: '&darr;', value: '↓', s: true },
  { code: 'ArrowRight',   label: '&rarr;', value: '→', s: true },
  { code: 'ControlRight', label: 'Ctrl', s: true }

]

export default keys
