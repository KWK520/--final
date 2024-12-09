const grid = document.querySelector('.grid');
let cells = [];
const size = 4;

// 초기화 함수
function initializeGame() {
    grid.innerHTML = '';
    cells = [];
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.value = 0; // 초기값
        cells.push(cell);
        grid.appendChild(cell);
    }
    addNewNumber();
    addNewNumber();
    render();
}

// 새 숫자 추가
function addNewNumber() {
    const emptyCells = cells.filter(cell => cell.dataset.value == 0);
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.dataset.value = Math.random() > 0.1 ? 2 : 4;
}

// 화면 렌더링
function render() {
    cells.forEach(cell => {
        const value = parseInt(cell.dataset.value);
        cell.textContent = value > 0 ? value : '';
        cell.className = 'cell';
        if (value > 0) cell.classList.add(`cell-${value}`);
        cell.setAttribute('data-value', value);
    });
}

// 셀 이동
function slide(row) {
    const values = row.filter(value => value > 0);
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i] === values[i + 1]) {
            values[i] *= 2;
            values.splice(i + 1, 1);
        }
    }
    while (values.length < size) values.push(0);
    return values;
}

// 방향별 이동
function move(direction) {
    let hasMoved = false;

    if (direction === 'ArrowUp' || direction === 'ArrowDown') {
        for (let col = 0; col < size; col++) {
            let column = [];
            for (let row = 0; row < size; row++) {
                column.push(cells[row * size + col].dataset.value);
            }

            let newColumn = direction === 'ArrowUp' ? slide(column) : slide(column.reverse()).reverse();

            for (let row = 0; row < size; row++) {
                if (cells[row * size + col].dataset.value != newColumn[row]) {
                    hasMoved = true;
                }
                cells[row * size + col].dataset.value = newColumn[row];
            }
        }
    } else if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
        for (let row = 0; row < size; row++) {
            let currentRow = [];
            for (let col = 0; col < size; col++) {
                currentRow.push(cells[row * size + col].dataset.value);
            }

            let newRow = direction === 'ArrowLeft' ? slide(currentRow) : slide(currentRow.reverse()).reverse();

            for (let col = 0; col < size; col++) {
                if (cells[row * size + col].dataset.value != newRow[col]) {
                    hasMoved = true;
                }
                cells[row * size + col].dataset.value = newRow[col];
            }
        }
    }

    if (hasMoved) {
        addNewNumber();
        render();
    }
}

// 게임 재시작
function restartGame() {
    initializeGame();
}

// 키 입력 이벤트
window.addEventListener('keydown', e => {
    move(e.key);
});

// 초기화
initializeGame();


