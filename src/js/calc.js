const refs = {
  calc: document.querySelector('.calc'),
  input: document.querySelector('.entered-data-string'),
  result: document.querySelector('.result-string'),
  history: document.querySelector('.history-string'),
};

const dataFromDisplay = {
  dataValue: [],
  operationsType: [],
};

let counterOperations = 0;
let res = 0;
let prevBtn = null;

refs.calc.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (e.target.nodeName === 'BUTTON') {
    // check for push Null button
    isPushNullBtn(e);
    // check for push Del button
    isDelBtn(e);
    //   ====================================== action buttons
    sum(e);
    min(e);
    multi(e);
    div(e);
    result(e);
    isActionBtn(e);
    //====================================== update digits on calc screen
    updateDisplayData(e);
    // }
  }
}

function result(e) {
  if (e.target.dataset.value === 'res') {
    let { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.textContent));
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
    //=====================================

    createResMarkup(res);
    createHistoryMarkup(historyEl);
    prevBtn = 'action';

    refs.input.textContent = 0;
    counterOperations = 0;
    res = 0;

    clearDataFromDisplay(dataFromDisplay);
  }
}

function sum(e) {
  if (e.target.dataset.value === 'sum') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.textContent));
    operationsType.push('+');
    prevBtn = 'action';
  }
}

function min(e) {
  if (e.target.dataset.value === 'min') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.textContent));
    operationsType.push('-');
    prevBtn = 'action';
  }
}
function multi(e) {
  if (e.target.dataset.value === 'multi') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.textContent));
    operationsType.push('*');
    prevBtn = 'action';
  }
}

function div(e) {
  if (e.target.dataset.value === 'div') {
    const { dataValue, operationsType } = dataFromDisplay;
    dataValue.push(Number(refs.input.textContent));
    operationsType.push('/');
    prevBtn = 'action';
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
  if (refs.input.textContent.length > 12 || e.target.dataset.value) {
    return;
  } else if (prevBtn) {
    refs.input.textContent = e.target.textContent;
    prevBtn = null;
  } else if (Number(e.target.textContent) > 0) {
    if (refs.input.textContent[0] === '0') {
      const newString = refs.input.textContent.split('');
      newString.pop();
      refs.input.textContent = newString.join('');
    }
    refs.input.textContent += e.target.textContent;
  } else if (
    Number(e.target.textContent) === 0 &&
    refs.input.textContent.length >= 1 &&
    Number(refs.input.textContent) !== 0
  ) {
    refs.input.textContent += e.target.textContent;
  } else {
    refs.input.textContent = 0;
  }
}

function isPushNullBtn(e) {
  if (e.target.textContent === 'Null') {
    prevBtn = null;

    refs.input.textContent = '';
    counterOperations = 0;
    res = 0;

    clearDataFromDisplay(dataFromDisplay);
  }
}

function isDelBtn(e) {
  if (e.target.dataset.value === 'del') {
    const targetValue = refs.input.textContent.split('');
    targetValue.pop();
    refs.input.textContent = targetValue.join('');
  }
}

function createResMarkup(res) {
  const markup = `<span>${res}</span>`;
  refs.result.innerHTML = markup;
}
function createHistoryMarkup(historyEl) {
  const markup = `<span>${historyEl} </span>`;
  if (refs.history.textContent.length < 40) {
    refs.history.insertAdjacentHTML('beforeend', markup);
  } else {
    refs.history.innerHTML = markup;
  }
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
