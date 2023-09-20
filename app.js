var url = window.location.href;
//console.log("URL ++++++++++++++++++",url)

const paginationNumbers = document.getElementById("pagination-numbers");
const paginationNumbers2 = document.getElementById("pagination-numbers2");
const paginationNumbers3 = document.getElementById("pagination-numbers3");
const paginatedList = document.getElementById("paginated-list");
const paginatedList2 = document.getElementById("paginated-list2");
const paginatedList3 = document.getElementById("paginated-list3");
const listItems = paginatedList.querySelectorAll("li");
const listItems2 = paginatedList2.querySelectorAll("li");
const listItems3 = paginatedList3.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const nextButton2 = document.getElementById("next-button2");
const prevButton2 = document.getElementById("prev-button2");
const nextButton3 = document.getElementById("next-button3");
const prevButton3 = document.getElementById("prev-button3");
let orgIdUpdate;

const paginationLimit = 100;
let currentPage = 1;
let pageCount;
let currentPage2 = 1;
let pageCount2;
let currentPage3 = 1;
let pageCount3;
let loadfilteruser = false;
let loadfilterorg = false;

let form = document.getElementById("container");
let form1 = document.getElementById("container1");
let form2 = document.getElementById("container2");
let form3 = document.getElementById("container3");
let form4 = document.getElementById("container4");
let form5 = document.getElementById("container5");
let form6 = document.getElementById("container6");

//Form 1
let partner = document.getElementById("partner");
let lang = document.getElementById("lang");
let region = document.getElementById("region");
let isvnumber = document.getElementById("isvnumber");
let domainorg = document.getElementById("domainorg");
let details = document.getElementById("details");
let notes = document.getElementById("notes");
let partnerid = document.getElementById("partnerid");
let partnervertical = document.getElementById("partnetvertical");
let groupSelect = document.getElementById("groups");
let csmSelect = document.getElementById("csm");

//Form 2
let domain = document.getElementById("domain");
let emails = document.getElementById("emails");
let findUserbtn1 = document.getElementById("findUserbtn1");
let findUserbtn2 = document.getElementById("findUserbtn2");
//let select = document.getElementById("users");

//Form 3
const paragraph = document.querySelector('p');


//Form 4
form1.style.display = "none";
form2.style.display = "none";
form3.style.display = "none";
form4.style.display = "none";
form5.style.display = "none";
form6.style.display = "none";
emails.style.display = "none";

//Form6
let partneru = document.getElementById("partneru");
let langu = document.getElementById("langu");
let regionu = document.getElementById("regionu");
let isvnumberu = document.getElementById("isvnumberu");
let domainorgu = document.getElementById("domainorgu");
let detailsu = document.getElementById("detailsu");
let notesu = document.getElementById("notesu");
let partneridu = document.getElementById("partneridu");
let partnerverticalu = document.getElementById("partnetverticalu");
let groupSelectu = document.getElementById("groupsu");
let csmSelectu = document.getElementById("csmu");


window.onload = async function (e) {
    await getGroups();
    await getCSM();
    // await getGroups1();
    // await getCSM1();
    await getUsers();
    await getOrgs();
    getPaginationNumbers();
    getPaginationNumbers3();
    setCurrentPage(1);
    setCurrentPage2(1);
    setCurrentPage3(1);
    prevButton.addEventListener("click", async () => {
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        await getUsers(currentPage);
    });

    nextButton.addEventListener("click", async () => {
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
        await getUsers(currentPage)
    });

    prevButton2.addEventListener("click", async () => {
        setCurrentPage2(currentPage2 - 1);
        console.log(`estoy en`, currentPage2);
        console.log(`viy a `, currentPage2 - 1);
        await findUser(currentPage2);
    });

    nextButton2.addEventListener("click", async () => {
        setCurrentPage2(currentPage2 + 1);
        console.log(`estoy en`, currentPage2);
        console.log(`voy a`, currentPage2 + 1);
        await findUser(currentPage2)
    });

    prevButton3.addEventListener("click", async () => {
        setCurrentPage3(currentPage3 - 1);
        console.log(`estoy en`, currentPage3);
        console.log(`viy a `, currentPage3 - 1);
        await getOrgs(currentPage3);
    });

    nextButton3.addEventListener("click", async () => {
        setCurrentPage3(currentPage3 + 1);
        console.log(`estoy en`, currentPage3);
        console.log(`voy a`, currentPage3 + 1);
        await getOrgs(currentPage3)
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
            });
        }
    });

    document.querySelectorAll(".pagination-number3").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage2(pageIndex);
            });
        }
    });

};


function showCreateOrg() {
    form1.style.display = "block";
    form.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
    form5.style.display = "none";
    form6.style.display = "none";
    emails.style.display = "none";
}
function showGetDomain() {
    paragraph.textContent = ""
    domain.value = "";
    form2.style.display = "block";
    findUserbtn1.style.display = "block";
    findUserbtn2.style.display = "block";
    form.style.display = "none";
    form1.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
    form5.style.display = "none";
    form6.style.display = "none";
    emails.style.display = "none";
}
function listUsers() {
    form4.style.display = "block";
    form.style.display = "none";
    form1.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "none";
    form5.style.display = "none";
    form6.style.display = "none";
    emails.style.display = "none";
}

function listOrgs() {
    form5.style.display = "block";
    form.style.display = "none";
    form1.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
    form6.style.display = "none";
    emails.style.display = "none";
}

function menu() {
    form.style.display = "block";
    form1.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
    emails.style.display = "none";
    form5.style.display = "none";
    form6.style.display = "none";
}



//Pagination
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
};

const handlePageButtonsStatus2 = () => {
    if (currentPage2 === 1) {
        disableButton(prevButton2);
    } else {
        enableButton(prevButton2);
    }

    if (pageCount2 === currentPage2) {
        disableButton(nextButton2);
    } else {
        enableButton(nextButton2);
    }
};

const handlePageButtonsStatus3 = () => {
    if (currentPage3 === 1) {
        disableButton(prevButton3);
    } else {
        enableButton(prevButton3);
    }

    if (pageCount3 === currentPage3) {
        disableButton(nextButton3);
    } else {
        enableButton(nextButton3);
    }
};

const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};

const handleActivePageNumber2 = () => {
    document.querySelectorAll(".pagination-number2").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage2) {
            button.classList.add("active");
        }
    });
};

const handleActivePageNumber3 = () => {
    document.querySelectorAll(".pagination-number3").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage3) {
            button.classList.add("active");
        }
    });
};

const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
};

const appendPageNumber2 = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number2";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers2.appendChild(pageNumber);
};

const appendPageNumber3 = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number3";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers3.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};

const getPaginationNumbers2 = () => {
    for (let i = 1; i <= pageCount2; i++) {
        appendPageNumber2(i);
    }
};

const getPaginationNumbers3 = () => {
    for (let i = 1; i <= pageCount3; i++) {
        appendPageNumber3(i);
    }
};

const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};

const setCurrentPage2 = (pageNum) => {
    currentPage2 = pageNum;

    handleActivePageNumber2();
    handlePageButtonsStatus2();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems2.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};

const setCurrentPage3 = (pageNum) => {
    currentPage3 = pageNum;

    handleActivePageNumber3();
    handlePageButtonsStatus3();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems3.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};


async function createOrg() {
    var myBody = {
        "organizationName": partner.value,
        "lang": lang.value,
        "region": region.value,
        "batchId": isvnumber.value,
        "domain": domainorg.value,
        "details": details.value,
        "notes": notes.value,
        "partnerId": partnerid.value,
        "partnerVertical": partnervertical.value,
        "groupId": groupSelect.value,
        "csm": csmSelect.value
    };
    console.log(myBody);
    const response = await fetch(`${url}createOrganization`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody),
    });


    const myJson = await response.json();

    if (myJson.message) {
        alert(myJson.message);
        form1.style.display = "none";
        form.style.display = "block";

    }

}

async function updateOrg() {
    var myBody = {
        "organization_id": orgIdUpdate,
        "organizationName": partneru.value,
        "lang": langu.value,
        "region": regionu.value,
        "batchId": isvnumberu.value,
        "domain": domainorgu.value,
        "details": detailsu.value,
        "notes": notesu.value,
        "partnerId": partneridu.value,
        "partnerVertical": partnerverticalu.value,
        "groupId": groupSelectu.value,
        "csm": csmSelectu.value
    };
    console.log(myBody);
    const response = await fetch(`${url}updateOrganization`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody),
    });


    const myJson = await response.json();

    if (myJson.message) {
        alert(myJson.message);
        form6.style.display = "none";
        form.style.display = "block";

    }
}

async function getOrgDetails() {
    let select = document.querySelectorAll('[id=radioCheckDefault]');

    const selectedOptions = [];
    for (const option of select) {
        if (option.checked) {
            let id = option.attributes.value.value;
            selectedOptions.push({ id: id });
        }
    }
    console.log(selectedOptions, selectedOptions[0].id);
    orgIdUpdate = selectedOptions[0].id
    await getOrgById(selectedOptions[0].id);
    for (const option of select) {
        if (option.checked) {
            let id = option.attributes.value.value;
            selectedOptions.push({ id: id });
        }
    }

}

async function getGroups() {
    console.log(`getting groups`);
    const response = await fetch(`${url}getGroups`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const groups = await response.json();
    for (let index = 0; index < groups.groups.length; index++) {
        let newOption = new Option(groups.groups[index].name, groups.groups[index].id);
        let newOption2 = new Option(groups.groups[index].name, groups.groups[index].id);
        groupSelect.add(newOption, undefined);
        groupSelectu.add(newOption2, undefined);
    }

}



async function getOrgById(id) {

    var myBody = {
        "orgid": id
    };

    const response = await fetch(`${url}getOrgById`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody),
    });

    const orgC = await response.json();
    let org = orgC.org;
    console.log("org",org)
    partneru.value = org.name,
    langu.value = org.organization_fields.isv_language,
    regionu.value = org.organization_fields.isv_region,
    isvnumberu.value = org.organization_fields.partner_batch_id,
    domainorgu.value = org.domain_names[0],
    detailsu.value = org.details,
    notesu.value = org.notes,
    partneridu.value = org.organization_fields.partner_id,
    partnerverticalu.value = org.organization_fields.partner_vertical,
    groupSelectu.value = org.group_id,
    csmSelectu.value = org.organization_fields.csm_name,
    form6.style.display = "block";
    form5.style.display = "none";

}


async function getCSM() {
    console.log(`getting csm`);
    const response = await fetch(`${url}getCSM`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const csm = await response.json();
    for (let index = 0; index < csm.csm.length; index++) {
        let newOption = new Option(csm.csm[index].name, csm.csm[index].value);

        let newOption2 = new Option(csm.csm[index].name, csm.csm[index].value);
        
        csmSelect.add(newOption, undefined);
        csmSelectu.add(newOption2, undefined);
    }

}


async function findUser(page = 1) {

    paginatedList2.innerHTML = "";
    var myBody = {
        "query": `${domain.value}`,
        "page": page
    };

    const response = await fetch(`${url}findUser`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody),
    });
    const users = await response.json();
    console.log('users', users)
    pageCount2 = Math.ceil(users.count / paginationLimit);
    if (page == 1 && !loadfilteruser) {
        loadfilteruser = true;
        getPaginationNumbers2();

        document.querySelectorAll(".pagination-number2").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));

            if (pageIndex) {
                button.addEventListener("click", () => {
                    setCurrentPage2(pageIndex);
                });
            }
        });
    }

    for (let index = 0; index < users.users.length; index++) {
        if (users.users[index].email) {

            var row = paginatedList2.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell2.innerHTML = users.users[index].email;
            cell3.innerHTML = users.users[index].verified;
            cell1.innerHTML = `<div class="form-check">
                <input class="form-check-input" type="checkbox" value="${users.users[index].id},${users.users[index].email}" id="flexCheckDefault" />
              </div>`;
        }
    }


    findUserbtn1.style.display = "none";
    findUserbtn2.style.display = "none";
    emails.style.display = "block";
}

async function getUsers(page = 1) {
    paginatedList.innerHTML = "";
    console.log('getting users')
    var myBody = {
        "page": page
    };

    const response = await fetch(`${url}listUsers`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody),
    });




    const users = await response.json();
    console.log(users)

    pageCount = Math.ceil(users.count / paginationLimit);
    for (let index = 0; index < users.users.length; index++) {
        let ex = users.users[index].email;
        if (ex) {
            // var li = document.createElement("li");
            // li.appendChild(document.createTextNode(users.users[index].email));
            // paginatedList.appendChild(li);
            // <th scope="row">

            // </th>
            var row = paginatedList.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell2.innerHTML = users.users[index].id;
            cell3.innerHTML = users.users[index].email;
            cell4.innerHTML = users.users[index].verified;
            cell1.innerHTML = `<div class="form-check">
                <input class="form-check-input" type="checkbox" value="${users.users[index].id},${users.users[index].email}" id="flexCheckDefault" />
              </div>`;
        }
    }
}

async function getOrgs(page = 1) {
    paginatedList3.innerHTML = "";
    var myBody = {
        "page": page
    };

    const response = await fetch(`${url}listOrgs`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myBody),
    });

    const orgs = await response.json();
    console.log("orgs.count", orgs.count)
    pageCount3 = Math.ceil(orgs.count / paginationLimit);
    for (let index = 0; index < orgs.orgs.length; index++) {
        var row = paginatedList3.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell2.innerHTML = orgs.orgs[index].id;
        cell3.innerHTML = orgs.orgs[index].name;
        cell4.innerHTML = orgs.orgs[index].organization_fields.isv_region;
        cell1.innerHTML = `<div class="form-check">
                <input class="form-check-input" type="radio" name="radio1" value="${orgs.orgs[index].id}" id="radioCheckDefault" />
              </div>`;
    }
}

async function verifyUser() {
    let select = document.getElementById('users');
    const selectedOptions = [];

    for (const option of select.options) {
        if (option.selected) {
            selectedOptions.push({ id: option.value, email: option.text });
        }
    }


    for (let index = 0; index < selectedOptions.length; index++) {
        const element = selectedOptions[index];
        var myBody = {
            "userId": element.id,
            "email": element.email
        };

        const response = await fetch(`${url}verifyUser`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myBody),
        });

        paragraph.textContent += ` ${element.email},`;
        const myJson = await response.json();
        console.log(myJson)
    }

    form1.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "block";


}


async function verifyUser2() {
    let select = document.querySelectorAll('[id=flexCheckDefault]');
    const selectedOptions = [];
    for (const option of select) {
        if (option.checked) {
            let id = option.attributes.value.value.split(",")[0];
            let email = option.attributes.value.value.split(",")[1];
            selectedOptions.push({ id: id, email: email });
        }
    }
    console.log(selectedOptions)

    for (let index = 0; index < selectedOptions.length; index++) {
        const element = selectedOptions[index];
        var myBody = {
            "userId": element.id,
            "email": element.email
        };

        const response = await fetch(`${url}verifyUser`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myBody),
        });

        paragraph.textContent += ` ${element.email},`;
        const myJson = await response.json();
        console.log(myJson)
    }

    form4.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "block";


}