// Variables
const allNotes = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];
const string1 = createNotesOnString(allNotes, 8);
const string2 = createNotesOnString(allNotes, 3);
const string3 = createNotesOnString(allNotes, 11);
const string4 = createNotesOnString(allNotes, 6);
const string5 = createNotesOnString(allNotes, 1);
const string6 = createNotesOnString(allNotes, 8);
let correct = 0;
let incorrect = 0;


// DOM Manipulation
const neck = document.querySelector("#guitar-container");

createFretboard();

const fretsString1  = document.querySelectorAll(".string-1");
const fretsString2  = document.querySelectorAll(".string-2");
const fretsString3  = document.querySelectorAll(".string-3");
const fretsString4  = document.querySelectorAll(".string-4");
const fretsString5  = document.querySelectorAll(".string-5");
const fretsString6  = document.querySelectorAll(".string-6");
const allFrets      = document.querySelectorAll(".fret");
const targetNote    = document.querySelector("#target");
const numCorrect    = document.querySelector("#num-correct");
const numWrong      = document.querySelector("#num-wrong");

setNotesOnDivs(fretsString1, string1);
setNotesOnDivs(fretsString2, string2);
setNotesOnDivs(fretsString3, string3);
setNotesOnDivs(fretsString4, string4);
setNotesOnDivs(fretsString5, string5);
setNotesOnDivs(fretsString6, string6);


function createFretboard(){
    for (let string = 1; string <= 6; string++) {
        for (let fret = 1; fret <= 12; fret++) {
            let div = document.createElement("div");
            div.classList.add(`string-${string}`);
            div.classList.add("fret");
            neck.appendChild(div);
        }
    }
};

function createDot(frets, position, name){
    let div = document.createElement("div");
    div.classList.add(`dot-${position + 1}${name}`)
    div.classList.add("dots");
    frets[position].appendChild(div);
}

function createNotesOnString(notes, position){
    let string = [];

    while(string.length < 12) {
        string.push(notes[position % 12]);
        position++;
    }

    return string;
};

function setNotesOnDivs(frets, notes){
    frets.forEach((fret, index) => {
        fret.value = notes[index];
        fret.textContent = "";
    });
};

function createRandomNote(notes){
    let position = Math.floor(Math.random() * Math.floor(12));
    return notes[position];
};

function restart() {
    let correctAnswers = document.querySelectorAll(".correct");
    let wrongAnswers = document.querySelectorAll(".wrong");

    correctAnswers.forEach( (answer) => {
        answer.classList.remove("correct");
    })

    wrongAnswers.forEach( (answer) => {
        answer.classList.remove("wrong");
    })

    correct = 0;
    incorrect = 0;

    numCorrect.textContent = "Correct Answers: 0";
    numWrong.textContent = "Wrong Answers: 0";
    targetNote.textContent = createRandomNote(allNotes);
}

targetNote.textContent = createRandomNote(allNotes);

allFrets.forEach( (fret) => {
    fret.addEventListener("click", (e) => {

        if (targetNote.textContent === fret.value){
            if (!fret.classList.contains("correct")){
                fret.classList.add("correct");
                correct++;
            }
            numCorrect.textContent = `Correct answers: ${correct}`;
        } else {
            if (!fret.classList.contains("wrong")){
                fret.classList.add("wrong");
                incorrect++;
            }
            numWrong.textContent = `Wrong answers: ${incorrect}`;
        }

        if (correct === 6) {
            restart(); 
        }
    });
});

createDot(fretsString1, 2, "");
createDot(fretsString1, 4, "");
createDot(fretsString1, 6, "a");
createDot(fretsString1, 6, "b");
createDot(fretsString1, 8, "");
createDot(fretsString1, 11, "a");
createDot(fretsString1, 11, "b");
/* ToDo:
-   Refactor: Instead of repetitive code (e.g. setNotesOnDivs(fretsString1, string1), 
    setNotesOnDivs(fretsString2, string2...), use (window['value' + i]), see
    https://www.geeksforgeeks.org/how-to-use-dynamic-variable-names-in-javascript/

*/