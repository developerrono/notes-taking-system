document.addEventListener('DOMContentLoaded', () => {
    const notesListDiv = document.getElementById('notesList');
    const loadingMessage = document.getElementById('loadingMessage');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');

    const editNoteModal = document.getElementById('editNoteModal');
    const closeButton = document.querySelector('.close-button');
    const editNoteIdInput = document.getElementById('editNoteId');
    const editNoteTitleInput = document.getElementById('editNoteTitle');
    const editNoteContentInput = document.getElementById('editNoteContent');
    const saveEditBtn = document.getElementById('saveEditBtn');

    const API_URL = 'backend/api.php';

    // Function to fetch notes from the backend
    async function fetchNotes() {
        loadingMessage.style.display = 'block';
        notesListDiv.innerHTML = ''; // Clear previous notes, except loading message
        notesListDiv.appendChild(loadingMessage); // Re-add loading message if it was removed

        try {
            const response = await fetch(`${API_URL}?action=get_all`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();

            if (result.success) {
                loadingMessage.style.display = 'none'; // Hide loading message on success
                if (result.data.length === 0) {
                    notesListDiv.innerHTML = '<p>No notes found. Add one above!</p>';
                } else {
                    renderNotes(result.data);
                }
            } else {
                notesListDiv.innerHTML = `<p class="error-message">Error: ${result.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            notesListDiv.innerHTML = `<p class="error-message">Failed to load notes. Please try again. (${error.message})</p>`;
        }
    }

    // Function to render notes in the DOM
    function renderNotes(notes) {
        notesListDiv.innerHTML = ''; // Clear existing notes
        notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.dataset.id = note.id;

            const formattedDate = new Date(note.updated_at).toLocaleString();

            noteItem.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content || 'No content'}</p>
                <small>Last updated: ${formattedDate}</small>
                <div class="note-actions">
                    <button class="edit-btn" data-id="${note.id}">Edit</button>
                    <button class="delete-btn" data-id="${note.id}">Delete</button>
                </div>
            `;
            notesListDiv.appendChild(noteItem);
        });
    }

    // Function to add a new note
    async function addNote() {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();

        if (!title) {
            alert('Note title cannot be empty.');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add', title, content })
            });
            const result = await response.json();

            if (result.success) {
                noteTitleInput.value = '';
                noteContentInput.value = '';
                fetchNotes(); // Re-fetch all notes to update the list
            } else {
                alert(`Error adding note: ${result.message}`);
            }
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Failed to add note. Please try again.');
        }
    }

    // Function to update an existing note
    async function updateNote() {
        const id = editNoteIdInput.value;
        const title = editNoteTitleInput.value.trim();
        const content = editNoteContentInput.value.trim();

        if (!title) {
            alert('Note title cannot be empty.');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update', id, title, content })
            });
            const result = await response.json();

            if (result.success) {
                editNoteModal.style.display = 'none'; // Hide modal
                fetchNotes(); // Re-fetch all notes
            } else {
                alert(`Error updating note: ${result.message}`);
            }
        } catch (error) {
            console.error('Error updating note:', error);
            alert('Failed to update note. Please try again.');
        }
    }

    // Function to delete a note
    async function deleteNote(id) {
        if (!confirm('Are you sure you want to delete this note?')) {
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            const result = await response.json();

            if (result.success) {
                fetchNotes(); // Re-fetch all notes
            } else {
                alert(`Error deleting note: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        }
    }

    // Event Listeners
    addNoteBtn.addEventListener('click', addNote);

    notesListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.dataset.id;
            const noteItem = event.target.closest('.note-item');
            const title = noteItem.querySelector('h3').textContent;
            const content = noteItem.querySelector('p').textContent;

            editNoteIdInput.value = id;
            editNoteTitleInput.value = title;
            editNoteContentInput.value = content;
            editNoteModal.style.display = 'flex'; // Show modal
        } else if (event.target.classList.contains('delete-btn')) {
            const id = event.target.dataset.id;
            deleteNote(id);
        }
    });

    closeButton.addEventListener('click', () => {
        editNoteModal.style.display = 'none';
    });

    // Close modal if clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === editNoteModal) {
            editNoteModal.style.display = 'none';
        }
    });

    saveEditBtn.addEventListener('click', updateNote);

    // Initial fetch of notes when the page loads
    fetchNotes();
});