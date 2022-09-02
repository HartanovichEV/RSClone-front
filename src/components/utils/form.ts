let currentTab = 0; 
function selectSingleCategory() {
  const selectSingle = document.querySelector('.__select') as HTMLElement;
  const selectSingleTitle = selectSingle.querySelector('.__select__title')  as HTMLElement;
  const selectSingleLabels: NodeListOf<Element> = selectSingle.querySelectorAll('.__select__label');
  console.log(selectSingle);
  // Toggle menu
  selectSingleTitle.addEventListener('click', () => {
    
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

  // Close when click to option
  for (let i = 0; i < selectSingleLabels.length; i++) {
    selectSingleLabels[i].addEventListener('click', (evt) => {
      const target = evt.target;
      if (target instanceof Element) selectSingleTitle.textContent = target.textContent;
      selectSingle.setAttribute('data-state', '');
    });
  }
}
function fixStepIndicator(n:number) {  
  selectSingleCategory(); 
  const x = document.getElementsByClassName('step');
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }  
  x[n].className += ' active';
  
}
export function showTab(n:number) {
  const prevBtn = document.getElementById('prevBtn') as HTMLElement;
  const nextBtn = document.getElementById('nextBtn') as HTMLElement;
  const x: HTMLCollectionOf<Element> = document.getElementsByClassName('tab');
  (x[n] as HTMLElement).style.display = 'flex';
  prevBtn.style.display = n == 0 ? 'none' : 'inline';
  nextBtn.innerHTML = n == (x.length - 1) ? 'Отправить' : 'Вперед';
  fixStepIndicator(n);

}

function validateForm() {  
  const valid = true;
  const x = document.getElementsByClassName('tab');
  const y = x[currentTab].getElementsByTagName('input');  
  for (let i = 0; i < y.length; i++) {
    // If a field is empty...
    // if (y[i].value == "") {
    //   // add an "invalid" class to the field:
    //   y[i].className += " invalid";
    //   // and set the current valid status to false:
    //   valid = false;
    // }
  }  
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
  }
  return valid; 
}

export function nextPrev(n:number) {
  const x = document.getElementsByClassName('tab');
  
  if (n == 1 && !validateForm()) return false;  
  (x[currentTab] as HTMLElement).style.display = 'none';  
  currentTab = currentTab + n; 
  if (currentTab >= x.length) {    
    (document.getElementById('regForm') as HTMLFormElement).submit();
    return false;
  }  
  showTab(currentTab);
  
}
//showTab(currentTab); 

