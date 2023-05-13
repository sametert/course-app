const title      = document.querySelector("#title");
const instructor = document.querySelector("#instructor");
const img        = document.querySelector("#image");
const form       = document.querySelector("#new-course");
const table      = document.querySelector("#course-list");

//create Course class
class Course {
    constructor(title,instructor,img) {
        this.courseId = Math.floor(Math.random() * 10000);
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
                <a href="#" data-id="${kurs.courseId}" class="btn btn-danger btn-sm delete" onclick="remove(this)">Delete</a>
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



class Storage {
    //local den bilgileri alıp gösterecek
    static getCourses() {
        let courses;

        if(localStorage.getItem("courses") === null) {
            courses = [];
        }else {
            courses = JSON.parse(localStorage.getItem("courses"));
        }

        return courses;
    }

    //ekranda gösterme
    static displayCourses() {
        //static'in önemi burada. new lemeden getCourses metodunu çağırabildik.
        const courses = Storage.getCourses();

        courses.forEach(kurss => {
            const ui = new UI();
            ui.addCourseToList(kurss);
        });
    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        console.log(courses);
        courses.push(course);

        localStorage.setItem("courses", JSON.stringify(courses));
    }
    
    static deleteCourse(element) {
        if(element.classList.contains("delete")) {
            const id = element.getAttribute("data-id");
            console.log(id);

            const courses = Storage.getCourses();

            courses.forEach((course,index) => {
                if(course.courseId == id) {
                    courses.splice(index,1);
                }
            });

            localStorage.setItem("courses",JSON.stringify(courses));

        }
    }
}



/*
const infoMy = {"namee": "Samet", "age": 23, "occupation": "UI Development"};

console.log(infoMy)
console.log(typeof infoMy)

// normal bir objeyi JSON formatına dönüştürmek için JSON.stringify() kullanıyoruz.
const jsonTrans = JSON.stringify(infoMy);
console.log(typeof jsonTrans);
console.log(jsonTrans)

// JSON yapıdaki bir stringi normal objeye dönüştürdük
const firstHal = JSON.parse(jsonTrans);
console.log(firstHal)
*/



document.addEventListener("DOMContentLoaded", Storage.displayCourses);


//eklenen listeyi silmemizi sağlayan fonksiyon
let remove = bu => {
    bu.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showAlert("the course has been deleted","danger");

    //delete from LS
    Storage.deleteCourse(bu);
}



form.addEventListener("submit",  e => {
    e.preventDefault();
    let titleContext = title.value;
    let instructorContext = instructor.value;
    let imgContext  = img.value;

    //Course class started
    let course = new Course(titleContext,instructorContext,imgContext);

    console.log(course);

    //UI class started
    let ui = new UI();

    if(titleContext === "" || instructorContext === "" || imgContext === "") {
        ui.showAlert('Please complete the form' , 'warning');
    }else {
        //add course to list
        ui.addCourseToList(course);

        //save to LS
        Storage.addCourse(course);

        ui.showAlert("the course has been added", "success");

        //clear controls
        ui.clearControls();        
    }
});
