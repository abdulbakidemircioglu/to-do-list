const input = document.querySelector("#task");
const addBtn = document.querySelector("#liveToastBtn");
const list = document.querySelector("#list");
const toastSuccess = document.querySelector("#liveToast");
const toastUnSuccess = document.querySelector("#liveToastErr")

loadedPage();

addBtn.addEventListener("click",newElement);
list.addEventListener("click",deleteElement);
list.addEventListener("click",missionComplite);



// ekle butonuna tıklandığında li elementi oluşturup listeye eklenen kısım
function crtElement(){
    const li = document.createElement("li");
    const span =document.createElement("span");
    span.classList.add("close");
    span.innerHTML="x";
    li.innerHTML= `<span> ${input.value}</span>`
    li.appendChild(span);
    list.appendChild(li);
}

// boş veya boşluk  kullanılmadıysa listeye element ekleyen fonskiyon
function newElement(){
    if (input.value !="" && input.value != " "){
        crtElement();
        loadStorage(input.value);
        input.value = "";
    }
}
// // sağ üstte beliren bildirim
// function showToast(e){
//     if(e){
//         toastSuccess.classList.replace("hide" , "show");
//         setTimeout(() => (
//             toastSuccess.classList.replace("show","hide")
//         ) ,2000);
//     }
//     else{
//         toastUnSuccess.classList.replace("hide" , "show");
//         setTimeout(() => (
//             toastUnSuccess.classList.replace("show","hide")
//         ) ,2000);
//     }
// }


// listeden eleman silme class üzerinden parent eleman siliyor
function deleteElement(e){
    if(e.target.className === "close"){
        if(confirm("Are You Sure?")){
            e.target.parentElement.remove();
            let prm = e.target.parentElement.firstChild.nextElementSibling.textContent.trim();
            dltStorage(prm);
        }
    }
}


function missionComplite(e){
    e.target.parentElement.classList.toggle("checked");
}

function loadStorage (prm){
    let str = JSON.parse(localStorage.getItem("todo"));
    let toDos;
    if(str == null){
        toDos = [];
    } else{
        toDos = getStorage();
    }
    toDos.push(prm);
    localStorage.setItem("todo",JSON.stringify(toDos));
}


function getStorage(){
    let toDo = JSON.parse(localStorage.getItem("todo"))
    return toDo
}


function loadedPage(){
    let toDo = getStorage();
    if(toDo != null){
        let html;
        for(let i = 0; i < toDo.length; i++){
            html=`<li>
            <span>
            ${toDo[i]}
            </span>
            <span class="close">x</span>
            </li>`;
            list.innerHTML += html;
        }
    }
}

function dltStorage(prm) {
    let toDo = getStorage();
    toDo.forEach((element, id) => {
        if(element === prm){
            toDo.splice(id,1);
        }
    });
    localStorage.setItem("todo",JSON.stringify(toDo));
}