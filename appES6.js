const title      = document.querySelector("#title");
const instructor = document.querySelector("#instructor");
const img        = document.querySelector("#image");
const form       = document.querySelector("#new-course");
const table      = document.querySelector("#course-list");

//create Course class
class Course {
    constructor(title,instructor,img) {
        this.title = title;
        this.instructor = instructor;
        this.img = img;
    }

  
}


class UI {
    constructor() {

    }
    //ekleme method
    addCourseToList(kurs) {
        let yeniSatir = `
        <tr>
            <td>
                <img src="img/${kurs.img}" class="img-fluid" width=50 height=50>
            </td>
            <td>${kurs.title}</td>
            <td>${kurs.instructor}</td>
            <td>
                <a href="#" class="btn btn-danger btn-sm" onclick="remove(this)">Delete</a>
            </td>
        </tr>`;

        table.insertAdjacentHTML("beforeend",yeniSatir);
    };

    //kontrolleri sıfırlama
    clearControls() {
        title.value = "";
        instructor.value = "";
        img.value = "";
    }

    //mesajları gösterme
    showAlert(message, className) {
        const alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
        `;

        const mesaj = document.querySelector("#message");
        mesaj.innerHTML = alert;

        setTimeout(() => {
            document.querySelector(".alert").remove();
        },3000);
    };   
}

//eklenen listeyi silmemizi sağlayan fonksiyon
let remove = bu => {
    bu.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showAlert("the course has been deleted","danger");
}



form.addEventListener("submit",  e => {
    e.preventDefault();
    let titleContext = title.value;
    let instructorContext = instructor.value;
    let imgContext  = img.value;

    //Course class started
    let course = new Course(titleContext,instructorContext,imgContext);

    //UI class started
    let ui = new UI();

    if(titleContext === "" || instructorContext === "" || imgContext === "") {
        ui.showAlert('Please complete the form' , 'warning');
    }else {
        //add course to list
        ui.addCourseToList(course);

        ui.showAlert("the course has been added", "success");

        //clear controls
        ui.clearControls();        
    }
});
