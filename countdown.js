// Initialize countdown values
let days = 14;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Update the countdown every second
setInterval(() => {
  // Update the seconds box every second
  updateBox('seconds-box', 60, seconds);
  seconds--;
  if (seconds < 0) {
    seconds = 59;

    // Update the minutes box when the seconds box resets to 59
    updateBox('minutes-box', 60, minutes);
    minutes--;
    if (minutes < 0) {
      minutes = 59;

      // Update the hours box when the minutes box resets to 59
      updateBox('hours-box', 24, hours);
      hours--;
      if (hours < 0) {
        hours = 23;

        // Update the days box when the hours box resets to 23
        updateBox('days-box', Infinity, days);
        days--;
      }
    }
  }
}, 950);

function updateBox(boxId, maxValue) {
    const box = document.getElementById(boxId);
    const boxTopBefore = box.querySelector('.box-top-before');
    const boxTopAfter = box.querySelector('.box-top-after');
    const boxBottom = box.querySelector('.box-bottom');
    const boxBottomNew = box.querySelector('.box-bottom-new');
  
    let newValue = parseInt(boxBottom.textContent);
    if (newValue < 0) {
      newValue = maxValue - 1;
    }
  
    // Convert newValue to a string and pad it with zeros to ensure it always has two digits
    newValue = newValue.toString().padStart(2, '0');
  
    const oldBox = box.cloneNode(true);
    box.parentNode.replaceChild(oldBox, box);
  
    oldBox.classList.add('flip-animation');
    oldBox.querySelector('.box-top-before').textContent = (newValue === '00' ? maxValue - 1 : parseInt(newValue) - 1).toString().padStart(2, '0');
  

    oldBox.addEventListener('animationend', () => {
      return new Promise((resolve) => {
        setTimeout(() => {
            oldBox.querySelector('.box-top-after').textContent = (newValue === '00' ? maxValue - 1 : parseInt(newValue) - 1).toString().padStart(2, '0');
            oldBox.querySelector('.box-bottom-new').textContent = (newValue === '00' || newValue === '01' ? maxValue - 1 : parseInt(newValue) - 2).toString().padStart(2, '0');
            resolve();
        }, 250);
    }).then(() => {
        oldBox.classList.remove('flip-animation');
          oldBox.querySelector('.box-bottom').textContent = (newValue === '00' ? maxValue - 1 : parseInt(newValue) - 1).toString().padStart(2, '0');
      });
  });
}
  
  
