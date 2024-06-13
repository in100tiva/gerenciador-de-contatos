document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactsList = document.getElementById('contactsList');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const closeModalButton = document.querySelector('.close');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let editingContactIndex = null;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        contacts.push({ name, email, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        contactForm.reset();
        renderContacts();
    });

    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;
        const phone = document.getElementById('editPhone').value;

        if (editingContactIndex !== null) {
            contacts[editingContactIndex] = { name, email, phone };
            editingContactIndex = null;
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        editForm.reset();
        closeModal();
        renderContacts();
    });

    closeModalButton.onclick = function () {
        closeModal();
    };

    window.onclick = function (event) {
        if (event.target == editModal) {
            closeModal();
        }
    };

    function renderContacts() {
        contactsList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');

            const contactInfo = document.createElement('div');
            contactInfo.className = 'contact-info';
            contactInfo.innerHTML = `
                <strong>Nome:</strong> ${contact.name}<br>
                <strong>Email:</strong> ${contact.email}<br>
                <strong>Telefone:</strong> ${contact.phone}
            `;

            const contactActions = document.createElement('div');
            contactActions.className = 'contact-actions';
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => openEditModal(index);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteContact(index);

            contactActions.appendChild(editButton);
            contactActions.appendChild(deleteButton);

            li.appendChild(contactInfo);
            li.appendChild(contactActions);
            contactsList.appendChild(li);
        });
    }

    function openEditModal(index) {
        const contact = contacts[index];
        document.getElementById('editName').value = contact.name;
        document.getElementById('editEmail').value = contact.email;
        document.getElementById('editPhone').value = contact.phone;
        editingContactIndex = index;
        editModal.style.display = 'block';
    }

    function closeModal() {
        editModal.style.display = 'none';
    }

    function deleteContact(index) {
        if (confirm("Tem certeza que deseja excluir este contato?")) {
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
        }
    }

    renderContacts();
});
