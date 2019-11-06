const root = document.createElement('div');
root.className = 'root-wrapper';
document.body.append(root);

const textarea = document.createElement('textarea');
textarea.className = 'text-field';
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
    capsLock: false
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
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
      'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
      'lshift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'rshift',
      'fn', 'control', 'option', 'command', 'space', 'command', 'option', 'arrows'
    ];

    // create html
    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['delete', '\\', 'return', 'rshift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.textContent = key.toLowerCase();

      if (key === 'delete') {
        keyElement.classList.add('keyboard__key--wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-right');
        keyElement.addEventListener('click', () => {
          this.properties.value = this.properties.value.substring(0,
            this.properties.value.length - 1);
          this.triggerEvent('oninput');
        });
      } else if (key === 'caps lock') {
        keyElement.classList.add('keyboard__key--mid-wide',
          'keyboard__key--activatable', 'keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.addEventListener('click', () => {
          this.toggleCapsLock();
          keyElement.classList.toggle('keyboard__key--active',
            this.properties.capsLock);
        });
      } else if (key === 'return') {
        keyElement.classList.add('keyboard__key--mid-wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-right');
        keyElement.addEventListener('click', () => {
          this.properties.value += '\n';
          this.triggerEvent('oninput');
        });
      } else if (key === 'space') {
        keyElement.textContent = '';
        keyElement.classList.add('keyboard__key--extra-wide');
        keyElement.addEventListener('click', () => {
          this.properties.value += ' ';
          this.triggerEvent('oninput');
        });
      } else if (key === 'tab') {
        keyElement.classList.add('keyboard__key--wide',
          'keyboard__key--low-font', 'keyboard__key--low-font-left');
        keyElement.addEventListener('click', () => {
          this.properties.value += '  ';
          this.triggerEvent('oninput');
        });
      } else if (key === 'lshift' || key === 'rshift') {
        const sliced = key.slice(1);
        keyElement.textContent = sliced.toLowerCase();
        if (key === 'lshift') {
          keyElement.classList.add('keyboard__key--shift-wide',
            'keyboard__key--low-font', 'keyboard__key--low-font-left');
        } else {
          keyElement.classList.add('keyboard__key--shift-wide',
            'keyboard__key--low-font', 'keyboard__key--low-font-right');
        }
        keyElement.addEventListener('click', () => {
          this.triggerEvent('oninput');
        });
      } else if (key === 'control') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.addEventListener('click', () => {
          // this.triggerEvent('oninput');
        });
      } else if (key === 'option') {
        keyElement.classList.add('keyboard__key--low-font');
        keyElement.addEventListener('click', () => {
          // this.triggerEvent('oninput');
        });
      } else if (key === 'command') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--command-wide');
        keyElement.addEventListener('click', () => {
          // this.triggerEvent('oninput');
        });
      } else if (key === 'arrows') {
        keyElement.classList.add('keyboard__key--arrows-wide');
        keyElement.addEventListener('click', () => {
          // this.triggerEvent('oninput');
        });
      } else if (key === 'fn') {
        keyElement.classList.add('keyboard__key--low-font',
          'keyboard__key--low-font-left');
        keyElement.addEventListener('click', () => {
          // this.triggerEvent('oninput');
        });
      } else {
        keyElement.addEventListener('click', () => {
          this.properties.value += this.properties.capsLock
            ? key.toUpperCase() : key.toLocaleLowerCase();
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
    console.log(`Event Triggered! Event Name ${handlerName}`);
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
  }
};

root.addEventListener('DOMContentLoader', Keyboard.init());
