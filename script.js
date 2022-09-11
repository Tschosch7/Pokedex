//variables
const pokedex = document.querySelector('.pokedex')
const topSectionBlue = document.querySelector('.top-section__blue')
const pokeName = document.querySelector(".poke-name");
const pokeTypeWrapper = document.querySelector(".poke-type__wrapper");
const pokeType1 = document.querySelector(".poke-type1");
const pokeType2 = document.querySelector(".poke-type2");
const mainScreen = document.querySelector(".main-screen");
const mainScreenMenu = document.querySelector(".main-screen__menu");
const mainSectionBlack = document.querySelector(".main-section__black");
const detailsScreen = document.querySelector(".details-screen");
const searchHeader = document.querySelector(".search__header");
const searchBar = document.getElementById("searchbar");
const searchIcon = document.querySelector(".search-icon");
const searchRightScreen = document.querySelector(".search__right-screen");
const headline = document.querySelector(".headline");
const rightScreen = document.querySelector(".right-container__screen");
const rightScreenMiddle = document.querySelector(".right-screen__middle");
const pokeballWrapper = document.querySelector(".pokeball__wrapper");
const pokeIdWrapper = document.querySelector(".poke-id__wrapper");
const pokeDescriptionWrapper = document.querySelector(".poke-description__wrapper");
const filterRightScreen = document.querySelector('.filter__right-screen')
const pokeHeight = document.querySelector(".height");
const pokeWeight = document.querySelector(".weight");
const frontImage = document.querySelector(".front-img__right-screen");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const bottomCross = document.querySelector(".bottom");
const topCross = document.querySelector(".top");
const leftCross = document.querySelector(".left");
const rightCross = document.querySelector(".right");
const startButton = document.querySelector(".start-button");
const nav = document.querySelector(".nav");
const yButton = document.querySelector(".buttons__button--y");
const xButton = document.querySelector(".buttons__button--x");
const aButton = document.querySelector(".buttons__button--a");
const bButton = document.querySelector(".buttons__button--b");
const hpRow = document.querySelector("hp__row");
const attRow = document.querySelector("att__row");
const defRow = document.querySelector("def__row");
const spAttRow = document.querySelector("sp-att__row");
const spDefRow = document.querySelector("sp-def__row");
const speedRow = document.querySelector("speed__row");
const filterTypes = document.querySelectorAll('.filter-type')
const filterTypeWrapper = document.querySelector('.filter__type--wrapper')
const startMenu = document.querySelector('.start-menu')
const startMenuLink = document.querySelectorAll('.start-menu__link')
const national = document.querySelector('.national')
const kanto = document.querySelector('.kanto')
const sinnoh = document.querySelector('.sinnoh')
const johto = document.querySelector('.johto')
const hoenn = document.querySelector('.hoenn')
const pokedexLogoWrapper = document.querySelector('.pokedex-logo__wrapper')
const loadingScreen = document.querySelector('.loading-screen')
const arrowLeft = document.querySelector('.fa-arrow-left')
const a = document.querySelector('.a')
const b = document.querySelector('.b')
const x = document.querySelector('.x')
const y = document.querySelector('.y')

//get all the data from the api

async function getRightScreenData() {
  pokeIdWrapper.classList.remove("hide");
  rightScreenMiddle.classList.remove("hide");
  pokeDescriptionWrapper.classList.remove("hide");
  nav.classList.remove("hide");
  pokeName.classList.remove('hide')
  pokeName.style.fontSize = '25px'
  pokedexLogoWrapper.classList.add('hide')
  const mainUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let promises = await fetch(mainUrl);
  let data = await promises.json();
  pokeType1.className = "";
  pokeType2.className = "";
  frontImage.src = data["sprites"]["front_default"] || "";
  pokeName.textContent =
    "#" + data["id"].toString().padStart(3, "0") + " " + data.name;
    if (pokeName.offsetWidth > 260) {
      pokeName.style.fontSize = '20px'
      pokeName.textContent =
      "#" + data["id"].toString().padStart(3, "0") + " " + data.name;
    }
  const pokeTypes = data["types"];
  pokeType1.textContent = pokeTypes[0]["type"]["name"];
  pokeType1.classList.add(pokeTypes[0]["type"]["name"]);
  pokeType1.classList.add("poke-type");
  pokeHeight.textContent = data.height + '"';
  pokeWeight.textContent = data.weight + "lbs.";
  const Type2 = pokeTypes[1];
  if (Type2) {
    pokeType2.classList.remove("hide");
    pokeType2.textContent = Type2["type"]["name"];
    pokeType2.classList.add(Type2["type"]["name"]);
    pokeType2.classList.add("poke-type");
  } else {
    pokeType2.classList.add("hide");
  }

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const englishText = data["flavor_text_entries"].filter(
        (elem) => elem.language.name == "en"
      );
      const resultTexts = englishText.map((element) => element.flavor_text);
      shortestEnglishText = resultTexts.sort((a, b) => a.length - b.length);
      pokeDescriptionWrapper.textContent = shortestEnglishText[0];
    });
}

let id = 1;
let pokemon = [];
let typeFilteredPokemon = []
let filteredPokemon = [];
let currentPokemon = "";
let currentContainerId = 1;
let selectedFilterTypes = []
let disableFunctions = true

async function getNationalDexData() {
  disableFunctions = true
  checkDisableFunctions()
  displayPokedex()
  for (let i = 1; i <= 493; i++) {
    const promises = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    data = await promises.json();
    pokemon.push(data);
    typeFilteredPokemon.push(data)
  }
  filteredPokemon = pokemon
  console.log('hi')
  loadPokedexHtml();
  headline.textContent = 'NATIONAL-DEX'
  disableFunctions = false
  checkDisableFunctions()
  adjustMainScreenHeight()
}

async function getKantoDexData() {
  disableFunctions = true
  checkDisableFunctions()
  displayPokedex()
  for (let i = 1; i <= 151; i++) {
    const promises = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    data = await promises.json();
    pokemon.push(data);
    typeFilteredPokemon.push(data)
  }
  filteredPokemon = pokemon
  loadPokedexHtml();
  headline.textContent = 'KANTO-DEX'
  disableFunctions = false
  checkDisableFunctions()
  adjustMainScreenHeight()
}

async function getJohtoDexData() {
  disableFunctions = true
  checkDisableFunctions()
   displayPokedex()
  for (let i = 152; i <= 251; i++) {
    const promises = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    data = await promises.json();
    pokemon.push(data);
    typeFilteredPokemon.push(data)
  }
  filteredPokemon = pokemon
  loadPokedexHtml();
  headline.textContent = 'JOHTO-DEX'
  disableFunctions = false
  checkDisableFunctions()
  adjustMainScreenHeight()
}

async function getHoennDexData() {
  disableFunctions = true
  checkDisableFunctions()
   displayPokedex()
  for (let i = 252; i <= 386; i++) {
    const promises = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    data = await promises.json();
    pokemon.push(data);
    typeFilteredPokemon.push(data)
  }
  filteredPokemon = pokemon
  loadPokedexHtml();
  headline.textContent = 'HOENN-DEX'
  disableFunctions = false
  checkDisableFunctions()
  adjustMainScreenHeight()
}

async function getSinnohDexData() {
  disableFunctions = true
  checkDisableFunctions()
  displayPokedex()
  startMenu.classList.add('hide')
  for (let i = 387; i <= 493; i++) {
    const promises = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    data = await promises.json();
    pokemon.push(data);
    typeFilteredPokemon.push(data)
  }
  filteredPokemon = pokemon
  loadPokedexHtml();
  headline.textContent = 'SINNOH-DEX'
  disableFunctions = false
  checkDisableFunctions()
  adjustMainScreenHeight()
}


function checkDisableFunctions() {
  if(disableFunctions) {
    mainSectionBlack.classList.add('hide')
    mainScreenMenu.classList.add('hide')
    loadingScreen.classList.remove('hide')
  }else if (!disableFunctions) {
    loadingScreen.classList.add('hide')
    mainSectionBlack.classList.remove('hide')
    mainScreenMenu.classList.remove('hide')
  }
}

function displayPokedex() {
  pokemon = [];
  isMenuScreenActive = false
  isPokedexScreenActive = true
  startMenu.classList.add('hide')
  headline.classList.remove('hide')
  mainScreen.classList.remove('hide')
}

function getCurrentPokemon() {
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  currentPokemon.style.border = "3px solid red";
  dexNumberWithZeros = currentPokemon.querySelector(".dex-number").textContent;
  id = parseInt(dexNumberWithZeros, 10);
}

let searchString = ''

searchBar.addEventListener("keyup", (e) => {
  searchString = e.target.value;
  filteredPokemon = typeFilteredPokemon.filter((poke) => {
    return poke.name.includes(searchString);
  });
  mainScreen.innerHTML = filteredPokemon
    .map((poke, index) => {
      const smallImage = poke["sprites"]["front_default"];
      containerId = index + 1;
      return `<div class="pokemon__container" id="container${containerId}" onclick="selectPokemon(this.id)">
      <div class="dex-number">${poke.id.toString().padStart(3, 0)}</div>
      <img src="${smallImage}" alt="" class="small__img">
          </div>`;
    })
    .join("");
    adjustMainScreenHeight()
  currentContainerId = 1;
  if (filteredPokemon.length === 0) {
    frontImage.src = "";
    pokeType1.removeAttribute("class");
    pokeType1.textContent = "";
    pokeType2.removeAttribute("class");
    pokeType2.textContent = "";
    pokeHeight.textContent = "??";
    pokeWeight.textContent = "??";
    pokeDescriptionWrapper.textContent = "??????";
    pokeDescriptionWrapper.style.textAlign = "center";
    pokeName.textContent = "#???" + "\xa0\xa0\xa0\xa0" + "?????";
    return
  }
  if(aClickSelect === true) {
    aClick()
  }
  currentPokemon = document.getElementById(`container${currentContainerId}`)
  console.log(filteredPokemon)
});

filterTypeWrapper.addEventListener('click', (e)=> {
  if(e.target === filterTypeWrapper) {
    return
  }
  mainScreen.style.padding = `0`
  if(e.target !== filterTypeWrapper && selectedFilterTypes.length <2 || selectedFilterTypes.includes(e.target.textContent)) {
    e.target.style.border = '2px solid black'
    e.target.style.filter = 'brightness(100%)'
    e.target.style.padding = '0 2px'
    if(selectedFilterTypes.includes(e.target.textContent)){
      const index = selectedFilterTypes.indexOf(e.target.textContent)
      selectedFilterTypes.splice(index, 1)
      e.target.style.border = '1px solid rgb(110, 107, 107)'
      e.target.style.filter = 'brightness(60%)'
      e.target.style.padding = '2px 4px'
      typeFilteredPokemon = pokemon.filter((poke) => {
        if(poke.types[1]=== undefined) {
          return poke.types[0]["type"]["name"].includes(selectedFilterTypes) 
        } else {
          return poke.types[0]["type"]["name"].includes(selectedFilterTypes) || poke.types[1]["type"]["name"].includes(selectedFilterTypes) 
        }
      });
      filteredPokemon = typeFilteredPokemon.filter((poke) => {
        return poke.name.includes(searchString)
      })
      mainScreen.innerHTML = filteredPokemon
      .map((poke, index) => {
        const smallImage = poke["sprites"]["front_default"];
        containerId = index + 1;
        return `<div class="pokemon__container" id="container${containerId}" onclick="selectPokemon(this.id)">
        <div class="dex-number">${poke.id.toString().padStart(3, 0)}</div>
        <img src="${smallImage}" alt="" class="small__img">
            </div>`;
      })
      .join("");
      adjustMainScreenHeight()
      return
    }
    selectedFilterTypes.push(e.target.textContent)
  }

    if (selectedFilterTypes.length === 1) {
      typeFilteredPokemon = pokemon.filter((poke) => {
        if(poke.types[1]=== undefined) {
          return poke.types[0]["type"]["name"].includes(selectedFilterTypes[0]) 
        } else {
          return poke.types[0]["type"]["name"].includes(selectedFilterTypes[0]) || poke.types[1]["type"]["name"].includes(selectedFilterTypes[0]) 
        }
      });
      filteredPokemon = typeFilteredPokemon.filter((poke) => {
        return poke.name.includes(searchString)
      })
      mainScreen.innerHTML = filteredPokemon
      .map((poke, index) => {
        const smallImage = poke["sprites"]["front_default"];
        containerId = index + 1;
        return `<div class="pokemon__container" id="container${containerId}" onclick="selectPokemon(this.id)">
        <div class="dex-number">${poke.id.toString().padStart(3, 0)}</div>
        <img src="${smallImage}" alt="" class="small__img">
            </div>`;
      })
      .join("");
      adjustMainScreenHeight()
    }
    if (selectedFilterTypes.length === 2) {
      typeFilteredPokemon = typeFilteredPokemon.filter((poke) => {
        if(poke.types[1]=== undefined) {
          return poke.types[0]["type"]["name"].includes(selectedFilterTypes[1]) 
        } else {
          return poke.types[0]["type"]["name"].includes(selectedFilterTypes[1]) || poke.types[1]["type"]["name"].includes(selectedFilterTypes[1]) 
        }
      });
      filteredPokemon = typeFilteredPokemon.filter((poke) => {
        return poke.name.includes(searchString)
      })
      mainScreen.innerHTML = filteredPokemon
      .map((poke, index) => {
        const smallImage = poke["sprites"]["front_default"];
        containerId = index + 1;
        return `<div class="pokemon__container" id="container${containerId}" onclick="selectPokemon(this.id)">
        <div class="dex-number">${poke.id.toString().padStart(3, 0)}</div>
        <img src="${smallImage}" alt="" class="small__img">
            </div>`;
      })
      .join("");
      adjustMainScreenHeight()
    }
  
})








function loadPokedexHtml() {
  mainScreen.style.padding = `0`
  mainScreen.innerHTML = pokemon
    .map((poke, index) => {
      const smallImage = poke["sprites"]["front_default"];
      containerId = index + 1;
      return `<div class="pokemon__container" id="container${containerId}" onclick="selectPokemon(this.id)">
    <div class="dex-number">${poke.id.toString().padStart(3, 0)}</div>
    <img src="${smallImage}" alt="" class="small__img">
        </div>`;
    })
    .join("");
    adjustMainScreenHeight()
    console.log('done')
}
let disableOnOff = false

function turnOnOff() {
  if(disableOnOff === true) {
    console.log('hi')
    return
  }
  if (mainSectionBlack.classList.contains("black")) {
    disableOnOff = true
    pokedex.style.animation = 'zoom-in 3.5s ease-in'
    pokedex.style.transform = 'scale(1.4)'
    topSectionBlue.style.animation = 'blinking-button 5s'
    topSectionBlue.style.backgroundImage = 'var(--btn-blue)';  
    setTimeout(() => {
      aClickSelect = false
      id = 1;
      pokemon = [];
      typeFilteredPokemon = []
      filteredPokemon = [];
      currentPokemon = "";
      currentContainerId = 1;
      selectedFilterTypes = []
      isStatScreenActive = false;
      isSearchScreenActive = false;
      isMenuScreenActive = true
      isPokedexScreenActive = false
      startMenu.classList.remove('hide')
      mainSectionBlack.classList.remove("black");
      mainSectionBlack.classList.add('hide')
      rightScreen.classList.remove("hide");
      leftButton.addEventListener("click", leftButtonClick);
      rightButton.addEventListener("click", rightButtonClick);
      bottomCross.addEventListener("click", bottomCrossClick);
      topCross.addEventListener("click", topCrossClick);
      leftCross.addEventListener("click", leftCrossClick);
      rightCross.addEventListener("click", rightCrossClick);
    }, 2200);
    setTimeout(() => {
      disableFunctions = false
      disableOnOff = false
    }, 3500);
    return
  } else {
    disableOnOff = true
      bClick()
      bClick()
      bClick()
      bClick()
    disableFunctions = true
    loadingScreen.classList.add('hide')
    mainScreenMenu.classList.add('hide')
    searchHeader.classList.add('hide')
    searchIcon.classList.add('hide')
    searchBar.classList.add('hide')
    filterRightScreen.classList.add('hide')
    detailsScreen.classList.add('hide')
    hideStatsScreen()
    pokedexLogoWrapper.classList.remove('hide')
    startMenu.classList.add('hide')
    mainSectionBlack.classList.add("black");
    mainSectionBlack.classList.remove("hide");
    headline.classList.add("hide");
    mainScreen.classList.add("hide");
    mainScreenMenu.classList.add("hide");
    rightScreen.classList.add("hide");
    leftButton.removeEventListener("click", leftButtonClick);
    rightButton.removeEventListener("click", rightButtonClick);
    bottomCross.removeEventListener("click", bottomCrossClick);
    topCross.removeEventListener("click", topCrossClick);
    leftCross.removeEventListener("click", leftCrossClick);
    rightCross.removeEventListener("click", rightCrossClick);
    pokedex.style.animation = 'zoom-out 1.75s ease-in'
    pokedex.style.transform = 'scale(1)'
    topSectionBlue.style.animation = 'none'
    topSectionBlue.style.backgroundImage = 'var(--btn-black)';  
    setTimeout(() => {
      disableFunctions = false
      disableOnOff = false
    }, 1500);
  }
}

//menu

function selectPokemon(selectedPokemon) {
  isPokedexScreenActive = false 
  filterRightScreen.classList.add("hide");
  pokedexLogoWrapper.classList.add("hide");
  removeRedBoxes();
  currentPokemon = document.getElementById(selectedPokemon);
  currentContainerId = parseInt(currentPokemon.id.replace(/[^0-9.]/g, ""));
  dexNumberWithZeros = currentPokemon.querySelector(".dex-number").textContent;
  id = parseInt(dexNumberWithZeros, 10);
  currentPokemon.style.border = "3px solid red";
  getRightScreenData(id);
}

function removeRedBoxes() {
  document.querySelectorAll(".pokemon__container").forEach((el) => {
    el.style.border = "";
  });
}

//CROSS

function rightCrossClick() {
  if(disableFunctions) {
    return
  }
  if(isMenuScreenActive) {
    return
  }
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    aClick()
    return
  }
  if (isStatScreenActive === false) {
    currentContainerId++;
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    if (currentPokemon === null) {
       currentContainerId--;
       currentPokemon = document.getElementById(`container${currentContainerId}`);
       return
    }
    crossClick();
  }
}

function leftCrossClick() {
  if(disableFunctions) {
    return
  }
  if(isMenuScreenActive) {
    return
  }
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    aClick()
    return
  }
  if (isStatScreenActive === false) {
    currentContainerId--;
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    if (currentPokemon === null) {
      currentContainerId++;
      currentPokemon = document.getElementById(`container${currentContainerId}`);
      return
    }
    crossClick();
  }
}

function topCrossClick() {
  if(disableFunctions) {
    return
  }
  if(isMenuScreenActive) {
    if(national.style.border === '1px solid black') {
      return
    }
    else if(kanto.style.border === '1px solid black') {
      kanto.style.border = 'none'
      national.style.border ='1px solid black'
      return
    }
    else if(johto.style.border === '1px solid black') {
      johto.style.border = 'none'
      kanto.style.border ='1px solid black'
      return
    }
    else if(hoenn.style.border === '1px solid black') {
      hoenn.style.border = 'none'
      johto.style.border ='1px solid black'
      return
    }
    else if(sinnoh.style.border === '1px solid black') {
      sinnoh.style.border = 'none'
      hoenn.style.border ='1px solid black'
      return
    }else {
      national.style.border = '1px solid black'
      return
    }
  }
  console.log('test')
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    aClick()
    return
  }
  if (isStatScreenActive === false) {
    currentContainerId -= 5;
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    if (currentPokemon === null) {
      (currentContainerId += 5);
      currentPokemon = document.getElementById(`container${currentContainerId}`);
      return
    }
    crossClick();
  }
}

function bottomCrossClick() {
  if(disableFunctions) {
    return
  }
  if(isMenuScreenActive) {
    if(national.style.border === '1px solid black') {
      national.style.border = 'none'
      kanto.style.border ='1px solid black'
      return
    }
    else if(kanto.style.border === '1px solid black') {
      kanto.style.border = 'none'
      johto.style.border ='1px solid black'
      return
    }
    else if(johto.style.border === '1px solid black') {
      johto.style.border = 'none'
      hoenn.style.border ='1px solid black'
      return
    }
    else if(hoenn.style.border === '1px solid black') {
      hoenn.style.border = 'none'
      sinnoh.style.border ='1px solid black'
      return
    }
    else if(sinnoh.style.border === '1px solid black') {
      return
    }else {
      national.style.border = '1px solid black'
      return
    }
  }
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    aClick()
    return
  }
  if (isStatScreenActive === false) {
    currentContainerId += 5;
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    if (currentPokemon === null) {
      (currentContainerId -= 5);
      currentPokemon = document.getElementById(`container${currentContainerId}`);
      return
    }
    crossClick();
  }
}

function crossClick() {
  isPokedexScreenActive = false 
  removeRedBoxes();
  dexNumberWithZeros = currentPokemon.querySelector(".dex-number").textContent;
  id = parseInt(dexNumberWithZeros, 10);
  getCurrentPokemon();
  getRightScreenData();
  currentPokemon.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });
}

// BUTTONS

startButton.addEventListener("click", turnOnOff);
aButton.addEventListener('click', aClick)
bButton.addEventListener('click', bClick)
xButton.addEventListener('click', xClick)
yButton.addEventListener('click', yClick)

let isStatScreenActive = false;
let isSearchScreenActive = false;
let isMenuScreenActive = true
let isPokedexScreenActive = false
let aClickSelect = false

function aClick() {
  if(disableFunctions) {
    return
  }
  if(national.style.border === '1px solid black') {
    national.style.border = 'none'
    getNationalDexData()
    return
  }
  else if(kanto.style.border === '1px solid black') {
    kanto.style.border = 'none'
    getKantoDexData()
    return
  }
  else if(johto.style.border === '1px solid black') {
    johto.style.border = 'none'
    getJohtoDexData()
    return
  }
  else if(hoenn.style.border === '1px solid black') {
    hoenn.style.border = 'none'
    getHoennDexData()
    return
  }
  else if(sinnoh.style.border === '1px solid black') {
    sinnoh.style.border = 'none'
    getSinnohDexData()
    return
  }
  if (isMenuScreenActive === true) {
    national.style.border = '1px solid black'
    console.log('2')
    return
  }
  aClickSelect = true
  isPokedexScreenActive = false 
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  dexNumberWithZeros =
  currentPokemon.querySelector(".dex-number").textContent;
  id = parseInt(dexNumberWithZeros, 10);
  filterRightScreen.classList.add("hide");
  showRightStatsScreen()
  currentPokemon.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });
  pokedexLogoWrapper.classList.add("hide");
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    currentPokemon.style.border = "3px solid red";
    getRightScreenData();
  }
}

function bClick() {
  if(disableFunctions) {
    return
  }
  if(isMenuScreenActive) {
    national.style.border = 'none'
    kanto.style.border = 'none'
    johto.style.border = 'none'
    sinnoh.style.border = 'none'
    hoenn.style.border = 'none'
    return
  }
  console.log('hid')
  aClickSelect = false
  searchString = ''
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if(isPokedexScreenActive === true) {
    getBackToMenu()
    return
  }
  else if (isSearchScreenActive === true && isStatScreenActive === false && rightScreenMiddle.classList.contains('hide')) {
    console.log('hi4')
    isPokedexScreenActive = true
    filterTypes.forEach(el => {
      el.style.border = '1px solid rgb(110, 107, 107)'
      el.style.filter = 'brightness(60%)'
      el.style.padding = '2px 4px'
    })
    filterRightScreen.classList.add("hide");
    headline.classList.remove("hide");
    searchHeader.classList.add("hide");
    mainSectionBlack.classList.remove('hide')
    mainScreenMenu.classList.remove('hide')
    loadPokedexHtml();
    hideStatsScreen()
    pokedexLogoWrapper.classList.remove('hide')
    id = 1;
    currentContainerId = 1;
    isSearchScreenActive = false;
    searchBar.value = "";
    selectedFilterTypes = []
    typeFilteredPokemon = pokemon
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    currentPokemon.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
    return;
  } 
  else if (isSearchScreenActive === true && isStatScreenActive === false && filteredPokemon.length === 0){
    hideStatsScreen()
    filterRightScreen.classList.remove('hide')
    id = 1;
    currentContainerId = 1;
    searchBar.focus();
    console.log(
      'hideeea'
    )
    return;
  }
  else if (isSearchScreenActive === true && isStatScreenActive === false && currentPokemon.style.border === "3px solid red"){
    console.log('hi2')
    currentPokemon.style.border = "";
    hideStatsScreen()
    filterRightScreen.classList.remove('hide')
    id = 1;
    currentContainerId = 1;
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    currentPokemon.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
    searchBar.focus();
  }
else if (isStatScreenActive === true && isSearchScreenActive === true) {
    currentContainerId = filteredPokemon.findIndex(poke => poke.id === id) + 1;
    currentPokemon.style.border = 'none'
    getCurrentPokemon()
    detailsScreen.classList.add("hide");
    headline.classList.add("hide");
    mainScreen.classList.remove("hide");
    mainScreenMenu.classList.remove("hide");
    searchHeader.classList.remove("hide");
    headline.textContent = "Kanto-Dex";
    currentPokemon.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
    isStatScreenActive = false;
    dexNumberWithZeros =
      currentPokemon.querySelector(".dex-number").textContent;
    id = parseInt(dexNumberWithZeros, 10);
    getRightScreenData();
  } else if (isStatScreenActive === true && isSearchScreenActive === false) {
    currentPokemon.style.border = 'none'
    getCurrentPokemon()
    detailsScreen.classList.add("hide");
    headline.classList.add("hide");
    mainScreen.classList.remove("hide");
    mainScreenMenu.classList.remove("hide");
    headline.classList.remove("hide");
    headline.textContent = "Kanto-Dex";
    currentPokemon.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
    isStatScreenActive = false;
  } else if (isStatScreenActive === false && isSearchScreenActive === false) {
    console.log('test')
    isPokedexScreenActive = true
    currentPokemon.style.border = "";
    hideStatsScreen()
    pokedexLogoWrapper.classList.remove("hide");
    searchHeader.classList.add("hide");
    id = 1;
    currentContainerId = 1;
    currentPokemon = document.getElementById(`container${currentContainerId}`);
    currentPokemon.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  }
}

function yClick() { 
  if(disableFunctions) {
    return
  }
  if(isMenuScreenActive === false) {
    if (isStatScreenActive === false) {
      aClickSelect = false
      hideStatsScreen()
      searchBar.classList.remove('hide')
      headline.classList.add("hide");
      searchHeader.classList.remove("hide");
      isPokedexScreenActive = false 
      searchBar.focus();
      currentPokemon = document.getElementById(
        `container${currentContainerId}`
      );
      if (currentPokemon !== null) {
      currentPokemon.style.border = "none"
        if (currentPokemon.style.border !== "3px solid red") {
        hideStatsScreen()
        filterRightScreen.classList.remove("hide");
        pokedexLogoWrapper.classList.add("hide");
        }
      }
      id = 1
      currentContainerId = 1
      currentPokemon = document.getElementById(
        `container${currentContainerId}`
      );
      filterRightScreen.classList.remove("hide");
      isSearchScreenActive = true;
    }
  }
}
 

function xClick() {
  if(disableFunctions) {
    return
  }
  if (isMenuScreenActive === false) {
  if (currentPokemon.style.border === "3px solid red") {
    isPokedexScreenActive = false 
    searchHeader.classList.add("hide");
    detailsScreen.classList.remove("hide");
    headline.classList.remove("hide");
    headline.textContent = "Base-Stats";
    mainScreen.classList.add("hide");
    mainScreenMenu.classList.add("hide");
    getStatsData();
    isStatScreenActive = true;
}
}
}


function hideStatsScreen() {
  rightScreenMiddle.classList.add('hide')
  pokeDescriptionWrapper.classList.add('hide')
  pokeName.classList.add('hide')
  nav.classList.add('hide')
}

function showRightStatsScreen() {
  rightScreenMiddle.classList.remove('hide')
  pokeDescriptionWrapper.classList.remove('hide')
  pokeName.classList.remove('hide')
  nav.classList.remove('hide')
}

async function getStatsData() {
  pokedexLogoWrapper.classList.add("hide");
  promises = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  data = await promises.json();
  hpBaseStat = data.stats[0]["base_stat"];
  attackBaseStat = data.stats[1]["base_stat"];
  defenseBaseStat = data.stats[2]["base_stat"];
  specialAttackBaseStat = data.stats[3]["base_stat"];
  specialDefenseBaseStat = data.stats[4]["base_stat"];
  speedBaseStat = data.stats[5]["base_stat"];
  detailsScreen.innerHTML = `<div class="details__row hp__row">
        <div class="details-name">
          Hp:
          </div>
          <div class="stats__loading-bar stats__loading-bar--hp"></div>
          <div class="details-data">${hpBaseStat}</div>
          </div>
          <div class="details__row att__row">
          <div class="details-name">
          Att:
          </div>
          <div class="stats__loading-bar stats__loading-bar--att"></div>
          <div class="details-data">${attackBaseStat}</div>
      </div>
      <div class="details__row def__row">
      <div class="details-name">
      Def:
      </div>
      <div class="stats__loading-bar stats__loading-bar--def"></div>
          <div class="details-data">${defenseBaseStat}</div>
      </div>
      <div class="details__row sp-att__row">
      <div class="details-name">
      Sp. Att:
      </div>         
      <div class="stats__loading-bar stats__loading-bar--sp-att"></div>
        <div class="details-data">${specialAttackBaseStat}</div>
      </div>
      <div class="details__row sp-def__row">
      <div class="details-name">
      Sp. Def:
      </div>
      <div class="stats__loading-bar stats__loading-bar--sp-def"></div>
          <div class="details-data">${specialDefenseBaseStat}</div>
      </div>
      <div class="details__row sp-def__row">
      <div class="details-name">
      Speed:
      </div>
      <div class="stats__loading-bar stats__loading-bar--speed"></div>
          <div class="details-data">${speedBaseStat}</div>
      </div>`;
  const statsLoadingBarHp = document.querySelector(".stats__loading-bar--hp");
  statsLoadingBarHp.style.width = `${180 * (hpBaseStat / 255)}px`;
  const statsLoadingBarAtt = document.querySelector(".stats__loading-bar--att");
  statsLoadingBarAtt.style.width = `${180 * (attackBaseStat / 190)}px`;
  const statsLoadingBarDef = document.querySelector(".stats__loading-bar--def");
  statsLoadingBarDef.style.width = `${180 * (defenseBaseStat / 250)}px`;
  const statsLoadingBarSpAtt = document.querySelector(
    ".stats__loading-bar--sp-att"
  );
  statsLoadingBarSpAtt.style.width = `${180 * (specialAttackBaseStat / 194)}px`;
  const statsLoadingBarSpDef = document.querySelector(
    ".stats__loading-bar--sp-def"
  );
  statsLoadingBarSpDef.style.width = `${
    180 * (specialDefenseBaseStat / 250)
  }px`;
  const statsLoadingBarSpeed = document.querySelector(
    ".stats__loading-bar--speed"
  );
  statsLoadingBarSpeed.style.width = `${180 * (speedBaseStat / 200)}px`;
}

function leftButtonClick() {
  if(isMenuScreenActive) {
    return
  }
  isPokedexScreenActive = false 
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    aClick()
    return
  }
      currentContainerId--;
      currentPokemon = document.getElementById(
        `container${currentContainerId}`
      );
      if (currentPokemon === null) {
        currentContainerId++;
        currentPokemon = document.getElementById(
          `container${currentContainerId}`
        );
      }
      dexNumberWithZeros =
        currentPokemon.querySelector(".dex-number").textContent;
      id = parseInt(dexNumberWithZeros, 10);
      crossClick();
    if (isStatScreenActive === true && isSearchScreenActive === false ) {
      getStatsData();
      getRightScreenData();
    }
    else if(isStatScreenActive === true && isSearchScreenActive === true) {
      if (filteredPokemon === true) {
        checkNextId = filteredPokemon.findIndex(poke => poke.id === id);
        id = filteredPokemon[checkNextId - 1].id
      }
      getStatsData();
      getRightScreenData();
    }
  }


function rightButtonClick() {
  if(isMenuScreenActive) {
    return
  }
  isPokedexScreenActive = false 
  currentPokemon = document.getElementById(`container${currentContainerId}`);
  if (currentPokemon.style.border !== "3px solid red" && mainScreen.childNodes.length !== 0) {
    aClick()
    return
  }
      currentContainerId++;
      currentPokemon = document.getElementById(
        `container${currentContainerId}`
      );
      if (currentPokemon === null) {
        currentContainerId--;
        currentPokemon = document.getElementById(
          `container${currentContainerId}`
        );
      }
      dexNumberWithZeros =
        currentPokemon.querySelector(".dex-number").textContent;
      id = parseInt(dexNumberWithZeros, 10);
      crossClick();
      if (isStatScreenActive === true && isSearchScreenActive === false) {
      getStatsData();
      getRightScreenData();
    }
    else if(isStatScreenActive === true && isSearchScreenActive === true) {
      if (filteredPokemon === true) {
        checkNextId = filteredPokemon.findIndex(poke => poke.id === id);
        id = filteredPokemon[checkNextId + 1].id
      }
      getStatsData();
      getRightScreenData();
    }
  }



// EVENTLISTENERS 

kanto.addEventListener('click', getKantoDexData)
national.addEventListener('click', getNationalDexData)
johto.addEventListener('click', getJohtoDexData)
hoenn.addEventListener('click', getHoennDexData)
sinnoh.addEventListener('click', getSinnohDexData)

arrowLeft.addEventListener('click',arrowFunction)

a.addEventListener('click', aClick)
b.addEventListener('click', bClick)
x.addEventListener('click', xClick)
y.addEventListener('click', yClick)

function arrowFunction() {
  bClick()
  bClick()
  bClick()
  bClick()
  bClick()
}



function getBackToMenu() {
  id = 1;
  pokemon = [];
  typeFilteredPokemon = []
  filteredPokemon = [];
  currentPokemon = "";
  currentContainerId = 1;
  selectedFilterTypes = []
  isStatScreenActive = false;
  isSearchScreenActive = false;
  isMenuScreenActive = true
  isPokedexScreenActive = false
  startMenu.classList.remove('hide')
  mainScreen.classList.add('hide')
  headline.classList.add('hide')
  mainScreenMenu.classList.add('hide')
  mainSectionBlack.classList.add('hide')
}

function adjustMainScreenHeight() {
    mainScreen.style.padding = `0`
   if (mainScreen.getElementsByTagName('div').length <= 30) {
    console.log(mainScreen.scrollHeight)
    paddingBottom = Math.round((mainScreen.scrollHeight) / 100) * 100
    mainScreen.style.padding = `51px 0 ${paddingBottom - 100}px 24px`
  } else {
    paddingBottom = Math.round((mainScreen.scrollHeight + 50) / 100) * 100
    mainScreen.style.padding = `51px 0 ${paddingBottom}px 24px`
  }
}

