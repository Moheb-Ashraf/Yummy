const dataMeals = document.getElementById("dataMeals");
const SearchInput = document.getElementById("SearchInput");



//!side nav minu
const widthNav = $('.side-nav-minu').outerWidth();
closeSideNav()
function closeSideNav() {
    $('.side-nav-minu-close').animate({ left: -widthNav }, 500);
    $(".openAndClose").removeClass("fa-x")
    $(".openAndClose").addClass("fa-bars")

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 400 }, (i + 5) * 100)
    }
}

$('.close-open-nav').click(function () {
    if ($('.side-nav-minu-close').css("left") == "0px") {
        closeSideNav()
    }
    else {
        $('.side-nav-minu-close').animate({ left: 0 }, 500);
        $(".openAndClose").removeClass("fa-bars")
        $(".openAndClose").addClass("fa-x")

        $(".links li").eq(0).animate({ top: 0 }, 500)
        $(".links li").eq(1).animate({ top: 0 }, 600)
        $(".links li").eq(2).animate({ top: 0 }, 700)
        $(".links li").eq(3).animate({ top: 0 }, 800)
        $(".links li").eq(4).animate({ top: 0 }, 900)
    }
})

// ! when click at any li in side nav minu 
$(".links li").on("click", function () {
    closeSideNav()
})
//! home page

async function searchByName(index) {
    SearchInput.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`)
    response = await response.json()

    displayMeal(response.meals);
}

searchByName("")

function displayMeal(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="(Recipes('${arr[i].idMeal}'))" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="layer-meal bg-white bg-opacity-75 top-100 position-absolute d-flex align-items-center ps-3 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}
// !categories

async function categories() {
    SearchInput.innerHTML = ""
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json();
    displayCategories(response.categories);
}

function displayCategories(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="opencatygory('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="layer-meal bg-white bg-opacity-75 top-100 position-absolute text-center p-1 text-black">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 25).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}

// ! Area
async function Area() {
    SearchInput.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json();
    displayArea(response.meals)
}
function displayArea(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="openArea('${arr[i].strArea}')" class="text-center rounded-2 cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}

// ! Ingredients

async function Ingredients() {
    SearchInput.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json();
    displayIngredients(response.meals.slice(0, 20))
}
function displayIngredients(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="openIngredients('${arr[i].strIngredient}')" class="text-center rounded-2 cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 15).join(" ")} </p>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}
// ! when you open any category 

async function opencatygory(index) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${index}`)
    response = await response.json()
    DisCategory(response.meals);
}
function DisCategory(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="(Recipes('${arr[i].idMeal}'))" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="layer-meal bg-white bg-opacity-75 top-100 position-absolute d-flex align-items-center ps-3 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}
// ! when you open any Area 

async function openArea(index) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${index}`)
    response = await response.json()
    DisArea(response.meals);
}
function DisArea(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="(Recipes('${arr[i].idMeal}'))" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="layer-meal bg-white bg-opacity-75 top-100 position-absolute d-flex align-items-center ps-3 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}
// ! when you open any Ingredients 

async function openIngredients(index) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}`)
    response = await response.json()
    DisIngredients(response.meals);
}
function DisIngredients(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="(Recipes('${arr[i].idMeal}'))" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="layer-meal bg-white bg-opacity-75 top-100 position-absolute d-flex align-items-center ps-3 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    dataMeals.innerHTML = content;
}

// !Recipes
async function Recipes(index) {
    SearchInput.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${index}`)
    response = await response.json();

    displayRecipes(response.meals[0])

}

function displayRecipes(arr) {

    let ingredients = ''
    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="alert-info alert p-1 mb-0">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }
    let tags = arr.strTags?.split(",")
    if (!tags) tags = []
    let Strtags = ''
    for (let i = 0; i < tags.length; i++) {
        Strtags += `<li class="alert-danger alert p-1 mb-3">${tags[i]} </li>`

    }



    let content = `
        <div class="col-md-4">
                <img class="w-100 rounded-2" src="${arr.strMealThumb}" alt="">
                <h3 class="pt-2 fw-bold">${arr.strMeal}</h3>
            </div>
            <div class="col-md-8">
                <h3 class="fw-bold">Instructions</h3>
                <p>${arr.strInstructions}</p>
                <h3 class="h4"><span class="fw-bold h3">Area :</span> ${arr.strArea}</h3>
                <h3 class="h4"><span class="fw-bold h3">Category :</span> ${arr.strCategory}</h3>
                <h3 class="h4"><span class="fw-bold h3">Recipes :</span> </h3>
                <ul class="list-unstyled d-flex gap-2 ms-3 mt-3 mb-0 flex-wrap">
                ${ingredients}
                </ul>
                <h3 class="h4"><span class="fw-bold h3">Tags : </span> </h3>
                <ul class="list-unstyled d-flex gap-2 ms-3 mt-3 mb-0 flex-wrap">
                ${Strtags}
                </ul>
                <a target="-blank" href="${arr.strSource}" class="btn btn-success">
                    Source
                </a>
                <a target="-blank" href="${arr.strYoutube}" class="btn btn-danger">
                    Youtube
                </a>
            </div>`

    dataMeals.innerHTML = content;
}

// ! Search 
function showInputSearch() {
    SearchInput.innerHTML = `
    <div class="col-md-6">
                <input onkeyup="SearchName(this.value)" class="w-100 mt-4 bg-transparent rounded-3 p-2  " type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="SearchFirstLatter(this.value)" maxlength="1" class="w-100 mt-4 bg-transparent rounded-3 p-2  " type="text" placeholder="Search By First Latter">
            </div>`
    dataMeals.innerHTML = ""
}

// ! Search by name in input 1
async function SearchName(index) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`)
    response = await response.json()

    if (response.meals) {
        displayMeal(response.meals)
    }
    else {
        displayMeal([])
    }
}
// ! Search by first latter in input 2
async function SearchFirstLatter(index) {
    if (index == "") {
        index = "a"
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${index}`)
    response = await response.json()

    if (response.meals) {
        displayMeal(response.meals)
    }
    else {
        displayMeal([])
    }
}

// !Show contact us 
function ShowContactUs() {
    SearchInput.innerHTML = ""
    dataMeals.innerHTML = `
    <div class="container w-75 min-vh-100 d-flex justify-content-center align-items-center flex-column " >
        <div class="row g-4" >
            <div class="col-md-6">
                <input onkeyup="validation()" id="namevalid" class="w-100 form-control" type="text" placeholder="Enter Your Name" >
                <div id="alert1" class="alert alert-danger w-100 mb-0 mt-2 d-none">
                Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="emailvalid" class="w-100 form-control" type="text" placeholder="Enter Your Email">
                <div id="alert2" class="alert alert-danger w-100 mb-0 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="phonevalid" class="w-100 form-control" type="text" placeholder="Enter Your Phone">
                <div id="alert3" class="alert alert-danger w-100 mb-0 mt-2 d-none">
                Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="agevalid" class="w-100 form-control" type="text" placeholder="Enter Your Age">
                <div id="alert4" class="alert alert-danger w-100 mb-0 mt-2 d-none">
                Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="passwordvalid" class="w-100 form-control" type="text" placeholder="Enter Your Password">
                <div id="alert5" class="alert alert-danger w-100 mb-0 mt-2 d-none">
                not valid
                </div>
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="repasswordvalid" class="w-100 form-control" type="text" placeholder="Enter Your RePassword">
                <div id="alert6" class="alert alert-danger w-100 mb-0 mt-2 d-none">
                not valid
                </div>
            </div>
        </div>
        <button  class="btn btn-outline-danger mt-3 disabled" id="validbtn">
            Submit
        </button>
    </div>`
}

// ! validation contact us 
function validation() {
    if (nameValidation()) {
        $("#alert1").addClass("d-none").removeClass("d-block")
    }
    else {
        $("#alert1").removeClass("d-none").addClass("d-block")
    }
    if (emailValidation()) {
        $("#alert2").addClass("d-none").removeClass("d-block")
    }
    else {
        $("#alert2").removeClass("d-none").addClass("d-block")
    }
    if (phoneValidation()) {
        $("#alert3").addClass("d-none").removeClass("d-block")
    }
    else {
        $("#alert3").removeClass("d-none").addClass("d-block")
    }

    ageValidation() ? $("#alert4").addClass("d-none").removeClass("d-block") : $("#alert4").removeClass("d-none").addClass("d-block")
    passwordValidation() ? $("#alert5").addClass("d-none").removeClass("d-block") : $("#alert5").removeClass("d-none").addClass("d-block")
    repasswordValidation() ? $("#alert6").addClass("d-none").removeClass("d-block") : $("#alert6").removeClass("d-none").addClass("d-block")

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        $("#validbtn").removeClass("disabled");
    }

}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("namevalid").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailvalid").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phonevalid").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("agevalid").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordvalid").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordvalid").value == document.getElementById("passwordvalid").value
}

// ! spinner

$("document").ready(function () {
    searchByName("").then(function () {
        $(".loading").fadeOut(500)
        $("body").removeClass("overflow-hidden")
    })
})



