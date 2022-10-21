const refs = {
  calc: document.querySelector('.calc'),
  input: document.querySelector('.calc-display'),
  result: document.querySelector('.results-section'),
  history: document.querySelector('.history-section'),
};

const dataFromDisplay = {
  dataValue: [],
  operationsType: [],
};

let counterOperations = 0;
let res = 0;

refs.calc.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (e.target.nodeName === 'BUTTON') {
    //   chech for dgits 0-9 and mzx length 12 digits for add to screen
    updateDisplayData(e);
    // check input begins not from 0
    isNotNullStart(e);

    //   ====================================== action buttons
    // check for push Null button
    isPushNullBtn(e);
    // check for push Del button
    isDelBtn(e);

    sum(e);
    min(e);
    multi(e);
    div(e);
    result(e);
    isActionBtn(e);
  }
}

function result(e) {
  if (e.target.dataset.value === 'res') {
    let { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.value));

    for (let i = 0; i < operationsType.length; i += 1) {
      res = dataValue[0];
      let operation = operationsType[i];
      let b = dataValue[i + 1];

      doMath(res, operation, b);
    }
    //=====================================
    const history = [];
    for (let i = 0; i < dataValue.length; i += 1) {
      history.push(dataValue[i]);
      history.push(operationsType[i]);
    }
    history.pop();
    const historyEl = history.join('');
    //================================

    createResMarkup(res);
    createHistoryMarkup(historyEl);
    refs.input.value = res;
    counterOperations = 0;
    clearDataFromDisplay(dataFromDisplay);
  }
}

function sum(e) {
  if (e.target.dataset.value === 'sum') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.value));
    operationsType.push('+');
    refs.input.value = ' ';
  }
}

function min(e) {
  if (e.target.dataset.value === 'min') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.value));
    operationsType.push('-');
    refs.input.value = ' ';
  }
}
function multi(e) {
  if (e.target.dataset.value === 'multi') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.value));
    operationsType.push('*');
    refs.input.value = ' ';
  }
}

function div(e) {
  if (e.target.dataset.value === 'div') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.value));
    operationsType.push('/');
    refs.input.value = ' ';
  }
}

function clearDataFromDisplay(obj) {
  for (key in obj) {
    obj[key] = [];
  }
}

function isActionBtn(e) {
  if (e.target.classList.contains('action')) {
    counterOperations += 1;
  }
}

function updateDisplayData(e) {
  if (Number(e.target.textContent) >= 0 && refs.input.value.length < 12) {
    refs.input.value += e.target.textContent;
  }
}

function isNotNullStart(e) {
  //block begin input from 0
  if (refs.input.value[0] === '0' && refs.input.value.length > 1) {
    refs.input.value = '';
  }
}

function isPushNullBtn(e) {
  if (e.target.textContent === 'Null') {
    refs.input.value = '';
    counterOperations = 0;
    res = 0;

    for (key in dataFromDisplay) {
      dataFromDisplay[key] = [];
    }
  }
}

function isDelBtn(e) {
  if (e.target.dataset.value === 'del') {
    const targetValue = refs.input.value.split('');
    targetValue.pop();
    refs.input.value = targetValue.join('');
  }
}

function createResMarkup(res) {
  const markup = `<p>${res}</p>`;
  refs.result.insertAdjacentHTML('beforeend', markup);
}
function createHistoryMarkup(historyEl) {
  const markup = `<p>${historyEl}</p>`;
  refs.history.insertAdjacentHTML('beforeend', markup);
}

function doMath(x, operation, y) {
  switch (operation) {
    case '+':
      res = x + y;
      break;
    case '-':
      res = x - y;
      break;
    case '*':
      res = x * y;
      break;
    case '/':
      res = x / y;
      break;
    case '%':
      res = x % y;
      break;
    case '^':
      res = x ^ y;
      break;
  }
  return res;
}
