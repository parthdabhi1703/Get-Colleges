// let url = "https://universities.hipolabs.com/search?name=";
let url = "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  let country = document.querySelector("input").value.trim();
  if (!country) {
      alert("Please enter a country name.");
  }
  
  // Check if the country is valid
  if (!countries.includes(country)) {
      alert("Please enter a valid country name from the list.");
  }

  let colArr = await getColleges(country);
  
  show(colArr);
});

function show(colArr) {
  let list = document.querySelector("#list");
  list.innerText = "";
  for (col of colArr) {
      console.log(col.name);
      let li = document.createElement("li");

      // Create a string to display college name, state/province, and country
      let collegeInfo = col.name;
      if (col['state-province']) {
          collegeInfo += `, ${col['state-province']}`; 
      }
      collegeInfo += `, ${col.country}`; 

      li.innerText = collegeInfo; 
      list.appendChild(li);
  }
}

async function getColleges(country) {
    try {
        let res = await axios.get(url+country);
        return res.data;
    } catch(e) {
        console.log("error :", e);
        return [];
    }
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", 
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", 
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
  "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", 
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", 
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
  "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
  "Zambia", "Zimbabwe"
];
const input = document.getElementById('country-input');
const suggestionsContainer = document.getElementById('suggestions');

input.addEventListener('input', function() {
  const inputValue = this.value.toLowerCase();
  suggestionsContainer.innerHTML = '';
  
  if (inputValue) {
    const filteredCountries = countries.filter(country => country.toLowerCase().includes(inputValue));
    
    filteredCountries.forEach(country => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = country;
      suggestionItem.addEventListener('click', function() {
        input.value = country;
        suggestionsContainer.innerHTML = ''; // Clear suggestions
      });
      suggestionsContainer.appendChild(suggestionItem);
    });
  }
});
