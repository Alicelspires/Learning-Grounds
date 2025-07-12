import { prevNotes } from './prevNotes.js'
import { chooseColor, currentFilterColor } from './displayFeatures.js';

function getNotes(){
    return JSON.parse(localStorage.getItem('notes')) || []
}

export function saveNotesToStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNotes(){
    let addNotesButton = document.querySelector('#addNote');

    addNotesButton.addEventListener('click', () => {
        let notes = getNotes()
        const newNotes = {
            id: Date.now(),
            title: "New note",
            text: "Type something",
            date: Date.now(),
            color:"#323438"
        }

        notes.push(newNotes)
        saveNotesToStorage(notes)
        renderNotes()
    })

}

export function renderNotes(){
    let notesList = document.querySelector('#notes');
    let notes = getNotes()
    notesList.innerHTML = "";

    if(currentFilterColor) {
        notes = notes.filter(note => note.color === currentFilterColor);
    }

    notes.forEach((note) => {
        let item = document.createElement('article');
        let id = note.id;
        let noteDate = new Date(note.date)
        let year = noteDate.getFullYear();
        let monthFull = noteDate.toLocaleString('default', { month: 'short' });
        let month = monthFull.charAt(0).toUpperCase() + monthFull.slice(1);
        let day = noteDate.getDate();
        
        item.innerHTML = `
            <div class="main-info">
                <h3>${note.title}</h3>
                <span>
                    <span class="date" >
                        ${day},
                        ${month} 
                        ${year}</span>
                    <i id="trash" class="fi fi-rr-trash" data-id="${id}"></i>
                </span>
            </div>
            <div class="btns-notes">
                <p>${note.text.slice(0, 100)} ...</p>
            </div>
        `
        item.style.backgroundColor = `${note.color}`;
        item.addEventListener('click', () => editNotes(note, day, month, year))
        notesList.appendChild(item)
    })
    removeNotes()
}

function editNotes(e, d, mm, yyyy){
    let title = document.querySelector("#title");
    let text = document.querySelector("#text");
    let date = document.querySelector(".dateEdit");
    let notes = getNotes()
    let id = e.id;

    title.dataset.id = id; 

    title.value = e.title
    text.value = e.text
    date.innerHTML = `${d}, ${mm} ${yyyy}`;

    let note = notes.find(n => n.id == id);

    chooseColor(note, notes);

    if(!note) return;

    title.addEventListener('input', () => {
        updateAndSave(note, "title", title.value, notes)
    })
    text.addEventListener('input', () => {
        updateAndSave(note, "text", text.value, notes)
    })

}

function updateAndSave(note, field, value, notes) {
    note[field] = value;
    saveNotesToStorage(notes);
    renderNotes();
}

function removeNotes(){
    let trashIcons = document.querySelectorAll("#trash");

    trashIcons.forEach((trash) => {
        trash.addEventListener('click', () => {
            
            let id = parseInt(trash.dataset.id);
            let notes = getNotes();
            let updatedNotes = notes.filter(n => n.id != id);

            let titleInput = document.querySelector('#title');
            let textArea = document.querySelector('#text');
            let dateSpan = document.querySelector('.dateEdit');

            if (titleInput.dataset.id && parseInt(titleInput.dataset.id) === id) {
                titleInput.value = '';
                textArea.value = '';
                dateSpan.innerHTML = '';
                delete titleInput.dataset.id;
            }
            saveNotesToStorage(updatedNotes);
            renderNotes();
        })
    })
}

// Calling functions
prevNotes()
addNotes()
renderNotes()