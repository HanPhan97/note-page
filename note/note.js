const addBtn = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) =>{
        addNewNote(note);
    });
}

addBtn.addEventListener("click", () =>{
    addNewNote();
});

function addNewNote(text = ''){
    //Tạo thẻ div mới có class = note
    const note = document.createElement("div"); 
    note.classList.add("note");

    //nối chuỗi: thêm nút edit và delete vào note

    /*note.innerHTML ='<div class="note">'+
            '<div class = "tools">'+
                '<button class = "edit"><i class="fas fa-edit"></i></button>'+
                '<button class = "delete"><i class="fas fa-trash-alt"></i></button>'+
            '</div>'+
            '<div class="main ${text ? "" : "hidden"}"></div>'+
            '<textarea class="${text ? "hidden" : ""}"></textarea>'+
        '</div>';*/
        note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

        const editBtn = note.querySelector(".edit");
        const deleteBtn = note.querySelector(".delete");
    
        const main = note.querySelector(".main");
        const textArea = note.querySelector("textarea");
    
        textArea.value = text;
        main.innerHTML = marked(text);
    
        editBtn.addEventListener("click", () => {
            main.classList.toggle("hidden");
            textArea.classList.toggle("hidden");
        });
    
        deleteBtn.addEventListener("click", () => {
            note.remove();
    
            updateLS();
        });

        textArea.addEventListener("input", (e) => {
            const { value } = e.target;
    
            main.innerHTML = marked(value);
    
            updateLS();
        });
    
        document.body.appendChild(note);
    }

function updateLS() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });
    //Lưu data "notes" vào localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
}

