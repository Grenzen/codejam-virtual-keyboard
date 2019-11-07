const root = document.createElement('div');
root.className = 'root-wrapper';
document.body.append(root);

const textarea = document.createElement('textarea');
textarea.classList.add('text-field', 'use-keyboard');
textarea.autofocus = true;
root.prepend(textarea);

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    command: false,
    space: false,
    ru: true,
    en: false
  },

  init() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    root.appendChild(this.elements.main);

    // use keyboard
    document.querySelectorAll('.use-keyboard').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayoutRu = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
      'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
      'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'rshift',
      'fn', 'control', 'option', 'command', 'space', 'command', 'option', 'arrows'
    ];

    const supperLayoutRu = [
      'Ë', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'delete',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
      'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'shift',
      'fn', 'control', 'option', 'command', '', 'command', 'option', ''
    ];

    const keyLayoutEn = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'return',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift',
      'fn', 'control', 'option', 'command', '', 'command', 'option', ''
    ];

    const supperLayoutEn = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'delete',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'return',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'shift',
      'fn', 'control', 'option', 'command', '', 'command', 'option', ''
    ];

    // create html
    keyLayoutRu.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['delete', '\\', 'return', 'rshift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      if (key === 'delete') {
        keyElement.classList.add('keyboard__key--wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-right');
        keyElement.textContent = 'delete';
        keyElement.addEventListener('click', () => {
          this.properties.value = this.properties.value.substring(0,
            this.properties.value.length - 1);
          this.triggerEvent('oninput');
        });
      } else if (key === 'caps lock') {
        keyElement.classList.add('keyboard__key--mid-wide',
          'keyboard__key--activatable', 'keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.textContent = 'caps lock';
        keyElement.addEventListener('click', () => {
          this.toggleCapsLock();
          keyElement.classList.toggle('keyboard__key--active',
            this.properties.capsLock);
        });
      } else if (key === 'return') {
        keyElement.classList.add('keyboard__key--mid-wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-right');
        keyElement.textContent = 'return';
        keyElement.addEventListener('click', () => {
          this.properties.value += '\n';
          this.triggerEvent('oninput');
        });
      } else if (key === 'tab') {
        keyElement.classList.add('keyboard__key--wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-left');
        keyElement.textContent = 'tab';
        keyElement.addEventListener('click', () => {
          this.properties.value += '\t';
          this.triggerEvent('oninput');
        });
      } else if (key === 'lshift' || key === 'rshift') {
        const sliced = key.slice(1);
        keyElement.textContent = sliced;
        if (key === 'lshift') {
          keyElement.classList.add('keyboard__key--shift-wide',
            'keyboard__key--low-font', 'keyboard__key--low-font-left');
        } else {
          keyElement.classList.add('keyboard__key--shift-wide',
            'keyboard__key--low-font', 'keyboard__key--low-font-right');
        }
        keyElement.addEventListener('click', () => {
          this.toggleShift();
          keyElement.classList.toggle('keyboard__key--shift-wide-active',
            this.properties.shift);

          if (this.properties.shift) {
            this.elements.keys.forEach((change, index) => {
              const element = change;
              if (this.properties.ru) {
                element.textContent = supperLayoutRu[index];
              } else {
                element.textContent = supperLayoutEn[index];
              }
            });
          } else {
            this.elements.keys.forEach((change, index) => {
              const element = change;
              if (this.properties.ru) {
                if (keyLayoutRu[index] === 'space' || keyLayoutRu[index] === 'arrows') {
                  element.textContent = '';
                } else if (keyLayoutRu[index] === 'lshift' || keyLayoutRu[index] === 'rshift') {
                  keyElement.textContent = sliced;
                } else {
                  element.textContent = keyLayoutRu[index];
                }
              } else {
                element.textContent = keyLayoutEn[index];
              }
            });
          }
        });
      } else if (key === 'control') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.textContent = 'control';
        keyElement.addEventListener('click', () => {
          this.triggerEvent('oninput');
        });
      } else if (key === 'option') {
        keyElement.classList.add('keyboard__key--low-font');
        keyElement.textContent = 'option';
        keyElement.addEventListener('click', () => {
          this.triggerEvent('oninput');
        });
      } else if (key === 'command') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--command-wide');
        keyElement.textContent = 'command';
        keyElement.addEventListener('click', () => {
          this.toggleCommand();
          keyElement.classList.toggle('keyboard__key--command-wide-active',
            this.properties.command);
          this.triggerEvent('oninput');
        });
      } else if (key === 'space') {
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
            this.elements.keys.forEach((change, index) => {
              const element = change;
              if (this.properties.ru) {
                element.textContent = keyLayoutEn[index];
              } else {
                this.elements.keys.forEach((change, index) => {
                  const element = change;
                  if (keyLayoutRu[index] === 'space' || keyLayoutRu[index] === 'arrows') {
                    element.textContent = '';
                  } else if (keyLayoutRu[index] === 'lshift' || keyLayoutRu[index] === 'rshift') {
                    const sliced = key.slice(1);
                    keyElement.textContent = sliced;
                  } else {
                    element.textContent = keyLayoutRu[index];
                  }
                });
              }
            });
            this.properties.ru = !this.properties.ru;
            this.properties.en = !this.properties.en;
            this.properties.command = false;
            this.properties.space = false;
            Keyboard.elements.keys[56].classList.remove('keyboard__key--command-wide-active');
            Keyboard.elements.keys[57].classList.remove('keyboard__key--space-wide-active');
            Keyboard.elements.keys[58].classList.remove('keyboard__key--command-wide-active');
          }
          this.triggerEvent('oninput');
        });
      } else if (key === 'arrows') {
        keyElement.classList.add('keyboard__key--arrows-wide');
        keyElement.addEventListener('click', () => {
          this.triggerEvent('oninput');
        });
      } else if (key === 'fn') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.textContent = 'fn';
        keyElement.addEventListener('click', () => {
          this.triggerEvent('oninput');
        });
      } else {
        keyElement.textContent = key.toLowerCase();
        keyElement.addEventListener('click', () => {
          this.properties.value += keyElement.textContent;
          this.triggerEvent('oninput');
        });
      }
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((key) => {
      if (key.textContent.length <= 1) {
        const caps = key;
        caps.textContent = Keyboard.properties.capsLock
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    });
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
  },

  toggleCommand() {
    this.properties.command = !this.properties.command;
    // console.log(this.properties.command);
  },

  toggleSpace() {
    if (this.properties.command) {
      this.properties.space = !this.properties.space;
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  }
};

root.addEventListener('DOMContentLoader', Keyboard.init());
