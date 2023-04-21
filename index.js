
function save() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        mySeries.push({"name": inputEl.value, "url": tabs[0].url} );
        localStorage.setItem("mySeries", JSON.stringify(mySeries));
        inputEl.value = "";
        renderLeads(mySeries);
    });
}

function deleteLead(event) {
    console.log("paso");
    console.log(event.target.id);
    var serieselement = document.getElementById(event.target.id);
    var index = parseInt(serieselement.getAttribute('data-ind'));
    console.log(index);
    mySeries.splice(index, 1);
    localStorage.setItem("mySeries", JSON.stringify(mySeries));
    renderLeads(mySeries);
}

function editLead(event) {
    var serieselement = document.getElementById(event.target.id);
    var index = parseInt(serieselement.getAttribute('data-ind'));
    inputEl.value = mySeries[index].name;
    deleteLead(event);
}

function renderLeads(series) {
    let listItems = "";
    let lastindex = 0;
    for (let i = 0; i < series.length; i++) {
        let clickableLink = `
            <a target='_blank' href='${series[i].url}'> 
                ${series[i].name} 
            </a>`;
        let icons = `
            <img class='click-img' id='del${i}' src='delete.png' width='20' data-ind='${i}'>
            <img class='click-img-edit' id='edi${i}' src='edit.png' width='20' data-ind='${i}'>
            `;
        listItems += "<li>" + clickableLink + icons +"</li>";
        lastindex = i;
    }
    ulEl.innerHTML = listItems;
    if (series.length > 0) {
        console.log("paso primero");
        let intervalId;
        intervalId = setInterval(() => {
            let element = document.getElementsByClassName("click-img");
            if (element.length>0) {
                console.log(element);
                clearInterval(intervalId);
                const deleteBtns = document.getElementsByClassName("click-img");
                console.log("length es ",deleteBtns.length);
                for (var i = 0 ; i < deleteBtns.length; i++) {
                    console.log("paso para agregar click");
                    deleteBtns[i].addEventListener("click", deleteLead);
                }
                const editBtns = document.getElementsByClassName("click-img-edit");
                for (var i = 0 ; i < editBtns.length; i++) {
                    editBtns[i].addEventListener("click", editLead);
                }
            }
        }, 100);
    }
}

let mySeries = JSON.parse(localStorage.getItem("mySeries")) || [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
renderLeads(mySeries);

inputBtn.addEventListener("click", save);
