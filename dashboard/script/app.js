/**
 * Implementation - class for all implementation of teacher & student data
 */

export default class Implementation {

    constructor(url, person) {
        // Initialize instance variables with provided values
        this.url = url;              // URL to fetch data from
        this.user = person;          // User type (e.g., student or teacher)
        this.token = localStorage.getItem('authToken');
        this.select = $('#select');  // Select field for filtering by class
        this.table = $('.tdata');    // Table container to display data
        this.input = $("input");   // Input field for filtering by name or email
        
    }

    // Function to load data from the provided URL
    loaddata() { 
      

    return fetch(this.url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {

        
            let value = this.formatdata(data.data);
            
            localStorage.setItem('datavalue', JSON.stringify(value));
          
        })


    }

    // Load all data and populate the table based on the user type
    loadalldata() {

   
        // filter data from type in all user teacher/ student
        let data = this.checktype(this.user);


        this.choooseloadData(data)
    }

    // Decide which data-loading method to use based on user type
    choooseloadData(data) {
        if (this.user === 'student') {
            this.loadStudentData(data);  // Load student data into the table
        } else {
            this.loadTeacherData(data); // Load teacher data into the table
        }
    }

    // Function to filter data by class
    filterClass() {
        this.select.change((e) => {
            let value = $(e.target).val().toLowerCase(); // Get selected class value

            // loads the data first by checking the types
            let data = this.checktype(this.user);
            // Fetch data and filter by class

         
                let filter = data.filter(val => val.class.toLowerCase() === value);

                // Clear the table and display filtered data
                this.table.find('tbody').html('');
                this.choooseloadData(filter);

                if (value === 'all class') {
                    this.choooseloadData(data); // Reload all data if "All Class" is selected
                }
        
        });
    }

    // Function to filter data by name or email
    filtername() {
        this.input.keyup((e) => {
            let value = $(e.target).val().toLowerCase(); // Get input value

            // Fetch data and filter by name or email
            let loaddata = this.checktype(this.user);
            
                let filter = loaddata.filter(val => 
                    val.name.toLowerCase().includes(value) || 
                    val.email.toLowerCase().includes(value)
                );

                // Clear the table and display filtered data
                this.table.find('tbody').html('');
                this.choooseloadData(filter);
          
        });
    }

    // Display the student profile when a row is clicked
    displayStudentprofile() {
        this.table.click((e) => {
            let student_profile = $('.profilpic');
            student_profile.hide(); // Hide the profile by default

            // Check if the clicked row has the class 'strow'
            if ($(e.target).parent('tr').hasClass('strow')) {
                let student_id = $($(e.target).parent().children()[0]).text(); // Get student ID

                // Fetch data and find the matching student
                        let data = this.checktype(this.user);

                        // console.log(data)
                    let value = data.filter(val => val.ids === student_id);
                        console.log(value)
                    // Populate profile fields with student details
                    let details = $('.id, .prof, .name, .class, .aboutinfo, .ag, .gen');

                    $(details[0]).text(value[0].ids);
                    $(details[1]).attr('src', value[0].avatar);
                    $(details[2]).text(value[0].name);
                    $(details[3]).text(value[0].class);
                    $(details[4]).text(value[0].about);
                    $(details[5]).text(value[0].age);
                    $(details[6]).text(value[0].gender);

                    // Show the profile with a fade-in effect
                    student_profile.fadeIn('slow');
                
            }
        });
    }

    // Load teacher data into the table
    loadTeacherData(data) {
        data.forEach(val => {
            // Create a table row with teacher details
            let dvalue = `
                <tr>
                    <td>
                        <img src="${val.avatar}" alt="">
                        ${val.name}
                    </td>
                    <td>${val.subject}</td>
                    <td>${val.class}</td>
                    <td>${val.email}</td>
                    <td>${val.gender}</td>
                </tr>
            `;
            // Append the row to the table body
            this.table.find('tbody').append(dvalue);
        });
    }

    // Load student data into the table
    loadStudentData(data) {
        data.forEach(val => {
            // Create a table row with student details
            let dvalue = `
                <tr class='strow'>
                    <td>S${val.id.slice(-4)}</td>
                    <td>
                        <img src="${val.avatar}" alt="">
                        ${val.name}
                    </td>
                    <td>${val.email}</td>
                    <td>${val.class}</td>
                    <td>${val.gender}</td>
                </tr>
            `;
            // Append the row to the table body
            this.table.find('tbody').append(dvalue);
        });
    }

    // Search for a teacher profile by name
    Searchprofile() {
        $(".ps").click(() => {
            let value = $('#psearch').val().trim().toLowerCase(); // Get search input value

                let data = this.checktype(this.user);
                let filtered = data.filter(val => val.name.toLowerCase() === value);

                if (filtered.length >= 1) {

                    // Display teacher profile if found
                    $('.notfound').css('display', 'none');   
                    $('.tprofile').css('display', 'none');   
                    this.displayTeacherProfile(filtered[0]);
                } else {

                    // Display "profile not found" message if no match is found
                    $('.tprofile').css('display', 'none');
                    $('.notfound').css('display', 'none');
                    this.profilenotfound();
                }
        
        });
    }

    // Build and display the teacher's profile
    displayTeacherProfile(data) {


        let profile = $('.name, .subject, .aboutinfo, .ag, .gen, .img');

        $(profile[0]).attr('src', `${data.avatar}`); 
        $(profile[1]).text(data.name); 
        $(profile[2]).text(data.subject); 
        $(profile[3]).text(data.about); 
        $(profile[4]).text(data.age); 
        $(profile[5]).text(data.gender);
        $('.tprofile').fadeIn('slow');
        $('.tprofile').css('display', 'flex');
    }

    // Display a "profile not found" message
    profilenotfound() {
        let div = $('<div>');
        div.addClass('notfound');
        div.html(`
            <img src="./image/no notification.png" alt="">
            <h1>No Teacher found at this time</h1>
        `);
        $('.tsearch').after(div);
    }


    formatdata(data){
        let value = []; 
        data.forEach(val => {
         let dat =   {
                name: val.fullName,
               subject: `${val.subject? val.subject: 'mathematices'}`,
               class: `${val.class? val.class: 'jss2'}`,
                email:  val.email,
                gender: val.gender,
                age: val.age,
                about: val.description,
                type: val.type,
                id: `${val._id}`,
                ids: `S${val._id.slice(-4)}`,
                avatar: `${val.avatar ? val.avatar.url: this.avatar()}`
            }
            value.push(dat);
        })


        return value;

    }

    checktype(type)
    {
        let data = JSON.parse(localStorage.getItem('datavalue'));
        
        let value  = []
        data.filter(val => {
            if (val.type  == type)
            {
                    value.push(val);
            }

        })

        return value;

    }


    avatar () 
    {

        let list = [
            "./image/svg/Ellipse 14-11.svg",
            "./image/svg/Ellipse 14.svg",
            "./image/svg/Ellipse 14-1.svg",
            "./image/svg/Ellipse 14-2.svg",
            "./image/svg/Ellipse 14-3.svg",
            "./image/svg/Ellipse 14-4.svg",
            "./image/svg/Ellipse 14-5.svg",
            "./image/svg/Ellipse 14-6.svg",
            "./image/svg/Ellipse 14-7.svg",
            "./image/svg/Ellipse 14-8.svg",
            "./image/svg/Ellipse 14-9.svg",
            "./image/svg/Ellipse 14-10.svg",
            "./image/svg/Ellipse 14-11.svg",
            "./image/svg/Ellipse 14.svg",
            "./image/svg/Ellipse 14-1.svg"
        ]
        

        let num = Math.round(Math.random() * 10)
        return list[num]


    }
}
