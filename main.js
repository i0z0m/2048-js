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
    if (value === 2) {
    div.style.backgroundColor = '#eee4da';
    }
    else if (value === 4) {
        div.style.backgroundColor = '#ede0c8';
    }
    else if (value === 8) {
        div.style.backgroundColor = '#f2b179';
    }
    else if (value === 16) {
        div.style.backgroundColor = '#f59563';
    }
    else if (value === 32) {
        div.style.backgroundColor = '#f67c5f';
    }
    else if (value === 64) {
        div.style.backgroundColor = '#f65e3b';
    }
    else if (value === 128) {
        div.style.backgroundColor = '#edcf72';
    }
    else if (value === 256) {
        div.style.backgroundColor = '#edcc61';
    }
    else if (value === 512) {
        div.style.backgroundColor = '#edc850';
    }
    else if (value === 1024) {
        div.style.backgroundColor = '#edc53f';
    }
    else if (value === 2048) {
        div.style.backgroundColor = '#edc22e';
    }
    div.style.border = `${size / 7}px ridge #cdc1b4`;
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

  setGameover() {
    this.div.style.backgroundColor = "#f88";
    this.div.style.borderColor = "#844";
  }

  setPrevPanels(panelList) {
    this.prevPanelList = panelList;
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
      div.style.backgroundColor = `#cdc1b4`;
      div.style.border = `${size / 30}px ridge #bbada0`;
      div.style.boxSizing = `border-box`;
    }
  }
  createNewPanel();
  createNewPanel();

  document.onkeydown = (e) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        move("up");
        break;
      case "ArrowDown":
        move("down");
        break;
      case "ArrowLeft":
        move("left");
        break;
      case "ArrowRight":
        move("right");
        break;
      default:
        break;
    }
  };

  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });
  document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    // Determine the swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        move("right");
      } else {
        move("left");
      }
    } else {
      if (deltaY > 0) {
        move("down");
      } else {
          move("up");
      }
    }
  });
};

const move = (direction) => {
  let isMove = false;
  for (let index = 0; index < 4; index++) {
    const bin = [];
    for (let pos = 0; pos < 4; pos++) {
      if (direction === "left" || direction === "right") {
        bin.push(board[index][pos]);
      } else {
        bin.push(board[pos][index]);
      }
    }
    if (direction === `right` || direction === "down") {
      bin.reverse();
    }

    let result = bin.filter((v) => !!v);
    for (let pos = 0; pos < 4; pos++) {
      const current = result[pos];
      const next = result[pos + 1];
      if (current && next && current.value === next.value) {
        const panel = new Panel(-1, -1, current.value + next.value);
        panel.setPrevPanels([current, next]);
        result[pos] = panel;
        result[pos + 1] = null;
      }
    }
    result = result.filter((v) => !!v);
    result.length = 4;

    if (direction === `right` || direction === "down") {
      result.reverse();
    }
    for (let pos = 0; pos < 4; pos++) {
      if (direction === "left" || direction === "right") {
        board[index][pos] = result[pos];
        if (result[pos]) {
          isMove = result[pos].setPosition(pos, index) || isMove;
        }
      } else {
        board[pos][index] = result[pos];
        if (result[pos]) {
          isMove = result[pos].setPosition(index, pos) || isMove;
        }
      }
    }
  }
  if (isMove) {
    if (createNewPanel()) {
      let gameover = true;
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          const current = board[y][x];
          const right = board[y][x + 1];
          const down = board[y + 1] && board[y + 1][x];
          if (right && current.value === right.value) {
            gameover = false;
          }
          if (down && current.value === down.value) {
            gameover = false;
          }
        }
      }
      if (gameover) {
        for (const panel of board.flat()) {
          panel.setGameover();
        }
      }
    }
  }
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
