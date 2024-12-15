import "./styles.css";

function isAlphabetAndSpace(string) {
  for (const char of string) {
    const charIntCode = char.charCodeAt()
    if (
      // a-z: 97-122; A-Z; 65 - 90
      !(charIntCode >= 97 &&
      charIntCode <= 122) &&
      !(charIntCode >= 65 &&
      charIntCode  <= 90)
      ) {
        return false
    }
  }
  return true
}

function isNumber(char) {
  if (isNaN(parseFloat(char))) return false
  return true
}

/*
name: required!
Must only alphabets and space and length <= 20
*/

function validateName(name) {
  name = name.trim()
  if (!name.length || name.length > 20) return false
  if (!(isAlphabetAndSpace(name) || name !== " ")) return false;
  return name
}

/*
mobile: required!
Must only numbers and lenght <= 10
 */

function validateMobile(mobile) {
  mobile = mobile.trim()
  if (!mobile.length || mobile.length > 10) return false;

  for (const val of mobile) {
    if (isNaN(parseFloat(val))) return false
  }
  return mobile
}


/*
Email: required!
(1)start with a letter
(2)Before @:  
  length between 2 and 10;
  it can contain combinations of only letters, digits, and dots.
(3) Afer @ and before dot:
  length between 2 and 20;
  mush alphabets
(4) After dot:
  2 to 10 alphabetic characters

*/

function validateEmail(email) {
  email = email.trim()
  if (!email.length || !isAlphabetAndSpace(email[0])) return false;

  const beforeAt = email.split("@")[0]
  const afterAt = email.split("@")[1];

  console.log("!")

  if (beforeAt.length < 2 || beforeAt.length > 10) return false;
  for (const val of beforeAt) {
    if (!(isNumber(val) || isAlphabetAndSpace(val) || val === " ")) {
      return false
    }
  }

  console.log("!!")

  const afterAtSplit = afterAt.split('.');
  if (afterAtSplit.length !== 2) return false;
  if (afterAtSplit[0] < 2 || afterAtSplit[0] > 20) return false;
  for (const char of afterAtSplit[0]) {
    if (!isAlphabetAndSpace(char)) return false
  }

  console.log("!!!")

  if (afterAtSplit[1] < 2 || afterAtSplit[1] > 10) return false;
  for (const char of afterAtSplit[1]) {
    if (!isAlphabetAndSpace(char)) return false
  }

  return email

}


/*
After submit:
(1) If any of valiations failed, show the error
(2) If success:
  a: Clear all form fields 
  b: Add a new table row

*/

document.getElementById('submit').addEventListener("click", function(event){
  // Prevent the default button click behavior
  event.preventDefault();

  const nameFieldVal = document.getElementById("name");
  const telFieldVal = document.getElementById("mobile");
  const emailFieldVal = document.getElementById("email");

  const errorEle = document.getElementById("error")

  const name = validateName(nameFieldVal.value)
  const mobile = validateMobile(telFieldVal.value)
  const email = validateEmail(emailFieldVal.value)

  if(!(name && mobile && email)) {
    errorEle.style.display = "block";
    return;
  }


  const table = document.getElementById("contactTable")
  const body = table.querySelector("tbody");

  const row = document.createElement("tr");

  const cell1 =document.createElement("td")
  cell1.textContent = name;

  const cell2 =document.createElement("td")
  cell2.textContent = email;

  const cell3 =document.createElement("td")
  cell3.textContent = mobile;

  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);

  body.appendChild(row);

  nameFieldVal.value = "";
  telFieldVal.value = "";
  emailFieldVal.value = "";

  errorEle.style.display = "none";

  return;
})

