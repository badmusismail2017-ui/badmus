window.addEventListener('dblclick', (event) => {
  const myLink = document.querySelector('a');

  if (myLink) {
    console.log('Link found');
    myLink.textContent = "Iran fighters are strong";
    myLink.href = "https:thenkiri.com/";
  } else {
    console.log('Link not found');
  }
  console.log(myLink);
});
 
window.addEventListener('copy', (event) => {
  const mrBadmus = document.querySelector('p');

  if (mrBadmus) {
    console.log('Link found');
    mrBadmus.textContent = "Nerd Registration";
    mrBadmus.style.cursor = "pointer";
    mrBadmus.style.color = "blue";
    mrBadmus.style.textDecoration = "underline";
    mrBadmus.addEventListener('click', () => {
      window.location.href = "https://esmat.ned.gov.ng/ai/enrol_v2.php";
    });
    mrBadmus.style.marginBottom = "-10px";
  } else {
    console.log('Link not found');
  }
  console.log(mrBadmus);
});

window.addEventListener('cut', (event) => {
  const mrIsmail = document.querySelector('span');

  if (mrIsmail) {
    console.log('Link found');
    mrIsmail.textContent = "Cocademy";
    mrIsmail.href = "https:thenkiri.com/";
    mrIsmail.style.cursor = "pointer";
    mrIsmail.style.color = "green";
    mrIsmail.style.textDecoration = "underline";
    mrIsmail.addEventListener('click', () => {
      window.location.href = "https://www.w3schools.com/js/js_htmldom.asp";
    });
  } else {
    console.log('Link not found');
  }
  console.log(mrIsmail);
});


 


