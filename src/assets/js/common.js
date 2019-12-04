const root = document.createElement('div');
root.className = 'root-wrapper';
document.body.append(root);

const textarea = document.createElement('textarea');
textarea.classList.add('text-field', 'use-keyboard');
textarea.autofocus = true;
root.prepend(textarea);

const keyLayoutRu = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
  'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
  'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift',
  'fn', 'control', 'option', 'command', '', 'command', 'option', '',
];

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    command: false,
    space: false,
    ru: false,
    en: false,
  },

  init(keyboardPlate) {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys(keyboardPlate));

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    root.appendChild(this.elements.main);
  },

  createKeys(startKeyboard) {
    const fragment = document.createDocumentFragment();

    const supperLayoutRu = [
      'Ë', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'delete',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
      'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'shift',
      'fn', 'control', 'option', 'command', '', 'command', 'option', '',
    ];

    const keyLayoutEn = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'return',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift',
      'fn', 'control', 'option', 'command', '', 'command', 'option', '',
    ];

    const supperLayoutEn = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'delete',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'return',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'shift',
      'fn', 'control', 'option', 'command', '', 'command', 'option', '',
    ];

    const area = document.querySelector('.use-keyboard');
    let example = localStorage.getItem('keyLanguage') || startKeyboard;
    if (typeof example === 'string') {
      example = example.split('+');
      if (example[0] === '`') {
        this.properties.en = true;
      } else {
        this.properties.ru = true;
      }
    } else {
      this.properties.ru = true;
    }

    example.forEach((key, i) => {
      const keyElement = document.createElement('button');

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      if (key === 'delete') {
        keyElement.classList.add('keyboard__key--wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-right');
        keyElement.textContent = 'delete';
        keyElement.addEventListener('click', () => {
          this.properties.value = this.properties.value.substring(0,
            this.properties.value.length - 1);
          this.triggerKeyInput(area);
        });
      } else if (key === 'caps lock') {
        keyElement.classList.add('keyboard__key--mid-wide',
          'keyboard__key--activatable', 'keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.textContent = 'caps lock';
        keyElement.addEventListener('click', () => {
          this.toggleField('capsLock');
          keyElement.classList.toggle('keyboard__key--active',
            this.properties.capsLock);
          this.resetShift();
          if (this.properties.ru) {
            this.changeLayout(keyLayoutRu);
          } else {
            this.changeLayout(keyLayoutEn);
          }
          this.triggerCapsLock();
        });
      } else if (key === 'return') {
        keyElement.classList.add('keyboard__key--mid-wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-right');
        keyElement.textContent = 'return';
        keyElement.addEventListener('click', () => {
          this.properties.value += '\n';
        });
      } else if (key === 'tab') {
        keyElement.classList.add('keyboard__key--wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-left');
        keyElement.textContent = 'tab';
        keyElement.addEventListener('click', () => {
          this.properties.value += '\t';
        });
      } else if (i === 41 || i === 52) {
        keyElement.textContent = key;
        if (i === 41) {
          keyElement.classList.add('keyboard__key--shift-wide',
            'keyboard__key--low-font', 'keyboard__key--low-font-left');
        } else {
          keyElement.classList.add('keyboard__key--shift-wide',
            'keyboard__key--low-font', 'keyboard__key--low-font-right');
        }
        keyElement.addEventListener('click', () => {
          this.toggleField('shift');
          keyElement.classList.toggle('keyboard__key--shift-wide-active',
            this.properties.shift);

          if (this.properties.shift) {
            if (this.properties.ru) {
              this.changeLayout(supperLayoutRu);
            } else {
              this.changeLayout(supperLayoutEn);
            }
          } else if (!this.properties.shift) {
            if (this.properties.ru) {
              this.changeLayout(keyLayoutRu);
            } else {
              this.changeLayout(keyLayoutEn);
            }
            this.triggerCapsLock();
          }
        });
      } else if (key === 'control') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.textContent = 'control';
        keyElement.addEventListener('click', () => {
        });
      } else if (key === 'option') {
        keyElement.classList.add('keyboard__key--low-font');
        keyElement.textContent = 'option';
        keyElement.addEventListener('click', () => {
        });
      } else if (key === 'command') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--command-wide');
        keyElement.textContent = 'command';
        keyElement.addEventListener('click', () => {
          this.toggleField('command');
          keyElement.classList.toggle('keyboard__key--command-wide-active',
            this.properties.command);
        });
      } else if (i === 57) {
        keyElement.textContent = '';
        keyElement.classList.add('keyboard__key--space-wide');
        keyElement.addEventListener('click', () => {
          if (!this.properties.command) {
            this.properties.value += ' ';
          }
          this.toggleSpace();
          keyElement.classList.toggle('keyboard__key--space-wide-active',
            this.properties.space);
          if (this.properties.command && this.properties.space) {
            if (this.properties.ru) {
              localStorage.setItem('keyLanguage', keyLayoutEn.join('+'));
              this.changeLayout(keyLayoutEn);
            } else {
              localStorage.setItem('keyLanguage', keyLayoutRu.join('+'));
              this.changeLayout(keyLayoutRu);
            }
            this.triggerCapsLock();
            this.switchLanguage();
            this.resetCommand();
            this.resetSpace();
            this.resetShift();
          }
        });
      } else if (i === 60) {
        keyElement.classList.add('keyboard__key--arrows-wide');
        keyElement.addEventListener('click', () => {
        });
      } else if (key === 'fn') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.textContent = 'fn';
        keyElement.addEventListener('click', () => {
        });
      } else {
        keyElement.textContent = key;
        keyElement.addEventListener('click', () => {
          this.properties.value += keyElement.textContent;
          this.resetShift();
          if (this.properties.ru) {
            this.changeLayout(keyLayoutRu);
          } else if (this.properties.en) {
            this.changeLayout(keyLayoutEn);
          }
          if (this.properties.capsLock) { this.triggerCapsLock(); }
          this.resetCommand();
          this.triggerKeyInput(area);
        });
      }
      fragment.appendChild(keyElement);

      if (i === 13 || i === 27 || i === 40 || i === 52) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  triggerKeyInput(area) {
    const input = area;
    input.value = this.properties.value;
  },

  triggerCapsLock() {
    this.elements.keys.forEach((key) => {
      if (key.textContent.length <= 1) {
        const caps = key;
        caps.textContent = Keyboard.properties.capsLock
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    });
  },

  toggleField(field) {
    this.properties[field] = !this.properties[field];
  },

  toggleSpace() {
    if (this.properties.command) {
      this.toggleField('space');
    }
  },

  resetCommand() {
    this.properties.command = false;
    Keyboard.elements.keys[56].classList.remove('keyboard__key--command-wide-active');
    Keyboard.elements.keys[58].classList.remove('keyboard__key--command-wide-active');
  },

  resetShift() {
    this.properties.shift = false;
    Keyboard.elements.keys[41].classList.remove('keyboard__key--shift-wide-active');
    Keyboard.elements.keys[52].classList.remove('keyboard__key--shift-wide-active');
  },

  resetSpace() {
    this.properties.space = false;
    Keyboard.elements.keys[57].classList.remove('keyboard__key--space-wide-active');
  },

  switchLanguage() {
    this.properties.ru = !this.properties.ru;
    this.properties.en = !this.properties.en;
  },

  changeLayout(keyboard) {
    this.elements.keys.forEach((change, index) => {
      if (change.textContent.length <= 1) {
        const element = change;
        element.textContent = Keyboard.properties.shift
          ? keyboard[index].toUpperCase() : keyboard[index].toLowerCase();
      }
    });
  },
};

root.addEventListener('DOMContentLoader', Keyboard.init(keyLayoutRu));
