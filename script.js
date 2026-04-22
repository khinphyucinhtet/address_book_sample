let contacts = [
    { id: 1, name: "Pinky", phone: "01234567", email: "abc@gmail.com" },
    { id: 2, name: "Pinky Htet", phone: "012333456", email: "bcd@gmail.com" },
    { id: 3, name: "Pinky Phyu", phone: "01237777", email: "def@gmail.com" }
];

let nextId = 4;
let editId = null;

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contactList");
const formTitle = document.getElementById("formTitle");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (editId === null) {
        addContact();
    } else {
        updateContact();
    }
});

searchInput.addEventListener("input", function () {
    searchContact();
});

cancelButton.addEventListener("click", function () {
    clearForm();
});

function formatId(id) {
    return String(id).padStart(4, "0");
}

function isValidName(name) {
    return /^[A-Za-z ]+$/.test(name);
}

function isValidPhone(phone) {
    return /^[0-9]{7,}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getFormData() {
    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let email = emailInput.value.trim();

    if (name === "" || phone === "" || email === "") {
        alert("Please fill in all fields.");
        return null;
    }

    if (!isValidName(name)) {
        alert("Name must contain letters and spaces only.");
        return null;
    }

    if (!isValidPhone(phone)) {
        alert("Phone must contain numbers only and at least 7 digits.");
        return null;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return null;
    }

    return { name: name, phone: phone, email: email };
}

function addContact() {
    let formData = getFormData();

    if (formData === null) {
        return;
    }

    let newContact = {
        id: nextId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
    };

    contacts.push(newContact);
    nextId++;
    clearForm();
    searchContact();
}

function displayContacts(contactArray) {
    contactList.innerHTML = "";

    if (contactArray.length === 0) {
        contactList.innerHTML = '<tr><td colspan="5" class="empty-row">No contacts found.</td></tr>';
        return;
    }

    for (let i = 0; i < contactArray.length; i++) {
        let contact = contactArray[i];

        contactList.innerHTML += `
            <tr>
                <td>${formatId(contact.id)}</td>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="editContact(${contact.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteContact(${contact.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }
}

function searchContact() {
    let searchValue = searchInput.value.toLowerCase();

    let filteredContacts = contacts.filter(function (contact) {
        return contact.name.toLowerCase().includes(searchValue);
    });

    displayContacts(filteredContacts);
}

function editContact(id) {
    let contact = contacts.find(function (item) {
        return item.id === id;
    });

    if (contact === undefined) {
        return;
    }

    editId = id;
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    formTitle.textContent = "Edit Contact " + formatId(id);
    saveButton.textContent = "Update Contact";
    cancelButton.style.display = "inline-block";
}

function updateContact() {
    let formData = getFormData();

    if (formData === null) {
        return;
    }

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === editId) {
            contacts[i].name = formData.name;
            contacts[i].phone = formData.phone;
            contacts[i].email = formData.email;
            break;
        }
    }

    clearForm();
    searchContact();
}

function deleteContact(id) {
    contacts = contacts.filter(function (contact) {
        return contact.id !== id;
    });

    if (editId === id) {
        clearForm();
    }

    searchContact();
}

function clearForm() {
    contactForm.reset();
    editId = null;
    formTitle.textContent = "Add Contact";
    saveButton.textContent = "Add Contact";
    cancelButton.style.display = "none";
}

displayContacts(contacts);
