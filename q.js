import { throttle } from 'throttle-debounce';

function getRandom(min, max) {
  min = Math.ceil(0);
  max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const diceFunc = throttle(10, (num) => {
    console.log('numDice:', num);	
})
const throttleFunc = throttle(100, (num) => {
    console.log('num:', num);
});

for (let i = 0; i < 100; i++) { 
  diceFunc(i);
}

for (let i = 0; i < 20; i++) { 
  throttleFunc(i);
}