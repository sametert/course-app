const title      = document.querySelector("#title");
const instructor = document.querySelector("#instructor");
const img        = document.querySelector("#image");
const form       = document.querySelector("#new-course");
const table      = document.querySelector("#course-list");

//create Course constructor
function Course(title,instructor,img) {
    this.title = title;
    this.instructor = instructor;
    this.img = img;
}

//create UI constructor (gruplama yapmak için)
function UI() {

}

UI.prototype.addCourseToList = function(kurs) {
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
        </tr>
    `;

    table.insertAdjacentHTML("beforeend",yeniSatir);

    
   
}

//eklenen listeyi silmemizi sağlayan fonksiyon
function remove(bu) {
    bu.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showAlert("the course has been deleted","danger");
}


UI.prototype.clearControls = function() {
    title.value = "";
    instructor.value = "";
    img.value ="";
}

UI.prototype.showAlert = function(message, className) {
    var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
    `;

    const mesaj = document.querySelector("#message");
    mesaj.innerHTML = alert;
};

form.addEventListener("submit",  e => {
    e.preventDefault();
    let titleContext = title.value;
    let instructorContext = instructor.value;
    let imgContext  = img.value;

    let course = new Course(titleContext,instructorContext,imgContext);

    // console.log(course);

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






