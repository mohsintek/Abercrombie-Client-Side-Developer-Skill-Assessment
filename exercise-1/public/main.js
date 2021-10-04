var userlist;
let apiurl = "https://5dc588200bbd050014fb8ae1.mockapi.io/assessment";

async function userData(url) {

    let response = await fetch(url);
    let data = await response.json();
    return data

}



async function setData() {

    userlist = await userData(apiurl);
    let userListEl = document.getElementById('user-list').innerHTML;
    let template = Handlebars.compile(userListEl);
    var userData1 = template({ usersList: userlist })
    document.getElementById('test').innerHTML = userData1;

}



setData();


const toggleDisplay = (value) => {

    const targetDiv = document.getElementsByClassName("userDetail");
    const toggleButton = document.getElementsByClassName("toggleButton");

    if (targetDiv[value].style.display === '')
        targetDiv[value].style.display = "none";

    if (targetDiv[value].style.display === "none") {
        targetDiv[value].style.display = "block";
        toggleButton[value].innerHTML = "Hide detail"

    } else {

        targetDiv[value].style.display = "none";
        toggleButton[value].innerHTML = "Detail"

    }



}

module.exports = userData;