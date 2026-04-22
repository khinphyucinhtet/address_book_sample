let contacts = [];

const contactForm = document.getElementById("contactForm");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contactList");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addContact();
});

searchInput.addEventListener("input", function () {
    searchContact();
});

function addContact() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || phone === "" || email === "") {
        alert("Please fill in all fields.");
        return;
    }

    let newContact = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email
    };

    contacts.push(newContact);
    contactForm.reset();
    displayContacts(contacts);
}

function displayContacts(contactArray) {
    contactList.innerHTML = "";

    if (contactArray.length === 0) {
        contactList.innerHTML = '<p class="empty-text">No contacts found.</p>';
        return;
    }

    for (let i = 0; i < contactArray.length; i++) {
        let contact = contactArray[i];

        contactList.innerHTML += `
            <div class="contact-card">
                <p><strong>ID:</strong> ${contact.id}</p>
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <button class="delete-btn" onclick="deleteContact(${contact.id})">Delete</button>
            </div>
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

function deleteContact(id) {
    contacts = contacts.filter(function (contact) {
        return contact.id !== id;
    });

    searchContact();
}

displayContacts(contacts);
