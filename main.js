const size = 300 / 4;

class Panel {
  constructor(x, y, value) {
    const container = document.getElementById("container");
    const div = document.createElement("div");
    this.div = div;
    container.appendChild(div);
    div.style.position = "absolute";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundColor = `#8f8`;
    div.style.border = `${size / 7}px ridge #484`;
    div.style.boxSizing = `border-box`;

    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.fontSize = `${size / 3}px`;
    div.style.fontWeight = `bold`;

    div.style.transition = `all 150ms ease-out`;
    div.style.transform = `scale(0)`;
    div.style.opacity = `0`;

    this.setPosition(x, y);
    this.setValue(value);
    setTimeout(() => {
      this.show(true);
    }, 50);
  }

  show(flag) {
    this.div.style.transform = `scale(${flag ? 1 : 0})`;
    this.div.style.opacity = `${flag ? 1 : 0}`;
  }

  setValue(value) {
    const sizeList = [0, size / 2, size / 2, size / 2.5, size / 3];
    this.value = value;
    this.div.textContent = value;
    this.div.style.fontSize = `${sizeList[String(value).length]}px`;
  }

  setPosition(x, y) {
    if (this.prevPanelList) {
      for (const panel of this.prevPanelList) {
        panel.setPosition(x, y);
        setTimeout(() => {
          panel.show(false);
        }, 150);
      }
      this.prevPanelList = null;
    }
    if (this.x === x && this.y === y) {
      return false;
    }
    this.x = x;
    this.y = y;
    this.div.style.left = `${size * x}px`;
    this.div.style.top = `${size * y}px`;
    return true;
  }
}

const board = [];
const init = () => {
  const container = document.getElementById("container");

  for (let y = 0; y < 4; y++) {
    board[y] = [];
    for (let x = 0; x < 4; x++) {
      board[y][x] = null;
      const div = document.createElement("div");
      container.appendChild(div);
      div.style.position = "absolute";
      div.style.left = `${size * x}px`;
      div.style.top = `${size * y}px`;
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.backgroundColor = `#fa8`;
      div.style.border = `${size / 30}px ridge #864`;
      div.style.boxSizing = `border-box`;
    }
  }
  createNewPanel();
  createNewPanel();
};

const createNewPanel = () => {
  const availableList = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (!board[y][x]) {
        availableList.push([x, y]);
      }
    }
  }

  const [x, y] = availableList[
    Math.trunc(Math.random() * availableList.length)
  ];
  board[y][x] = new Panel(x, y, 2);

  return availableList.length === 1;
};

window.onload = () => {
  init();
};
