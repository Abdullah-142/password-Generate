const inputSlider = document.querySelector('.slider');
const datalengthnum = document.querySelector('.datalengthnum');
const passwordDispaly = document.querySelector("#show_pass")
const copybtn = document.querySelector('[copybtn]');
const copymsg = document.querySelector('[copymsg]');
const uppercasecheck = document.querySelector('#uppercase');
const lowercasecheck = document.querySelector('#lowercase');
const numberscheck = document.querySelector('#number');
const symbolscheck = document.querySelector('#Symbol');
const indicator = document.querySelector('.data-indecater');
const generatebtn = document.querySelector('#pass-generate');
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_+|:?";

let password = "";
let passwordLength = 10;
let count = 0;
handleslider();
// color 

// this function Only display the value to ui 
function handleslider() {
  inputSlider.value = passwordLength;
  datalengthnum.innerText = passwordLength;
}

// it set the color 
function setindicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.shadow = color;

}

function getinteger(min, max) {
  return Math.floor(Math.random() * (min - max)) + max;
}

function genramnum() {
  return getinteger(0, 9);
}

function getramlower() {
  return String.fromCharCode(getinteger(97, 123));
}
function getramupper() {
  return String.fromCharCode(getinteger(65, 91));
}
function getramsymbol() {
  const randNum = getinteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function strength() {
  let upper = false;
  let lower = false;
  let num = false;
  let sym = false;
  //ststus
  if (uppercasecheck.checked) upper = true;
  if (lowercasecheck.checked) lower = true;
  if (numberscheck.checked) num = true;
  if (symbolscheck.checked) sym = true;

  if (upper && lower && (num | sym) && passwordLength >= 8) {
    setindicator("#0f0");
  }
  else if (upper && lower && passwordLength >= 6) {
    setindicator("#ff0")
  } else {
    setindicator("#ff00")
  }
}

async function copycontent() {
  try {
    // used to coyy the text its a method
    await navigator.clipboard.writeText(passwordDispaly.value);
    copymsg.innerText = "copied";
  } catch (error) {
    copymsg.innerText = "failed";
  }
  copymsg.classList.add('active');

  setTimeout(() => {
    copymsg.innerText = '';
  }, 1000);
}



inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleslider();//again change the ui 
});



copybtn.addEventListener('click', () => {
  if (passwordDispaly.value) {
    copycontent();
  }
})



function handleCheckBoxChange() {
  count = 0;
  allcheckbox.forEach((checkbox) => {
    if (checkbox.checked)
      count++;

  });

  // special case

  if (passwordLength < count) {
    passwordLength = count;
    handleslider();
  }
}

allcheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange) // for each to check 

});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = '';
  array.forEach((el) => (str += el));
  return str;
}

generatebtn.addEventListener('click', () => {
  if (count == 0) return;
  if (passwordLength < count) {
    passwordLength = count;
    handleslider();
  }
  password = "";
  let Arr = [];
  if (uppercasecheck.checked)
    Arr.push(getramupper);
  if (lowercasecheck.checked)
    Arr.push(getramlower);
  if (numberscheck.checked)
    Arr.push(genramnum);
  if (symbolscheck.checked)
    Arr.push(getramsymbol);


  for (let i = 0; i < Arr.length; i++) {
    password += Arr[i]();
  }


  for (let i = 0; i < passwordLength - Arr.length; i++) {
    let randindex = getinteger(0, Arr.length)
    password += Arr[randindex]();

  }
  password = shuffle(Array.from(password));
  passwordDispaly.value = password;
  strength();
});

