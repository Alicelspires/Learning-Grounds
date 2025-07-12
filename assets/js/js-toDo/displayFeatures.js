import {saveNotesToStorage , renderNotes} from './to-do.js'

export let currentFilterColor = null;

function colorFolder(){
    let colorFolder = document.querySelector('.colors');

    let colors = [
        "#0c625d",
        "#77172E",
        "#7c4a03",
        "#462e59",
        "#256377"
    ]

    colors.forEach((color) => {
        let spanFolder = document.createElement('span');
        spanFolder.innerHTML = `
            <i id="folder-color" class="fi fi-sr-folder"></i>
        `
        spanFolder.style.backgroundColor = `${color}`
        spanFolder.addEventListener('click', () => filterNotes(color, spanFolder))
        colorFolder.appendChild(spanFolder)
    })

    dropDownColor(colors)
}

function dropDownColor(colors){
    let divOptions = document.querySelector('.color-options')

    colors.forEach((color) => {
        divOptions.innerHTML += `
            <span class="color-circle" data-color="${color}" style="background-color: ${color};"></span>
        `
    })
}

export function chooseColor(note, notes) {
    let toggle = document.querySelector('.color-toggle');
    let dropdown = document.querySelector('.color-dropdown');
    let colorCircles = document.querySelectorAll('.color-circle');

    toggle.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    colorCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            note.color = circle.dataset.color;
            saveNotesToStorage(notes);
            renderNotes();
            dropdown.classList.remove('show');
        });
    });
}


function filterNotes(color, spanFolder){
    if(currentFilterColor === color) {
        currentFilterColor = null;
        spanFolder.style.opacity = '1'
    } else {
        currentFilterColor = color;
        spanFolder.style.opacity = '.4'
    }

    renderNotes()
}

// Calling functions
colorFolder()