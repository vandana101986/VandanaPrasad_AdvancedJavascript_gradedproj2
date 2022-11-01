let indx = 0;
let resumeList = [];

//fetch resumes to display
const fetchResumes = async () => {
    const response = await fetch('http://localhost:4000/resume');
    const apiResponseResumes = await response.json();

    /*.then((response) => response.json())
    .then((response) => {
        let apiResponseResumes = response;*/

    //getting searchBar elements
    const prev = document.querySelector(".previous");
    const next = document.querySelector(".next");
    const searchWord = document.querySelector("#searchInput");

    const noResult = document.querySelector(".searchResultNegative");
    const yesResult = document.querySelector(".searchResultPositive");

    if (indx === 0) {
        prev.style.visibility = "hidden";
    }

    //load individual profile
    const loadProfile = (profile) => {
        console.log(profile);

        //show or hide next & previous buttons
        if (indx + 1 === resumeList.length) {
            next.style.visibility = "hidden";
        }
        else {
            next.style.visibility = "visible";
        }

        if (indx === 0) {
            prev.style.visibility = "hidden";
        }
        else {
            prev.style.visibility = "visible";
        }

        //get all the elements
        const phone = document.querySelector(".phone");
        const email = document.querySelector(".email");
        const network = document.querySelector(".network");

        const skills = document.querySelector(".tech");

        const hobbies = document.querySelector(".hobbies");

        const name = document.querySelector(".candidateName");
        const appliedFor = document.querySelector(".appliedFor");

        const company = document.querySelector(".company");
        const position = document.querySelector(".position");
        const start = document.querySelector(".start");
        const end = document.querySelector(".end");
        const summary = document.querySelector(".summary");

        const projName = document.querySelector(".projName");
        const projDesc = document.querySelector(".projDesc");

        const ug = document.querySelector(".ug");
        const pu = document.querySelector(".pu");
        const school = document.querySelector(".school");

        const internCompany = document.querySelector(".internCompany");
        const internPosition = document.querySelector(".internPosition");
        const internStartDate = document.querySelector(".internStartDate");
        const internEndDate = document.querySelector(".internEndDate");
        const internSummary = document.querySelector(".internSummary");

        const achievements = document.querySelector(".achievements");

        //set the display text for all the elements
        phone.innerText = profile.basics.phone;
        email.innerText = profile.basics.email;
        network.innerText = profile.basics.profiles.network;
        network.href = profile.basics.profiles.url;

        let skillSet = profile.skills.keywords;
        skills.innerText = "";
        for (i = 0; i < skillSet.length; i++) {
            skills.innerHTML += "<p>" + skillSet[i] + "</p>";
        }

        let hobbyList = profile.interests.hobbies;
        hobbies.innerText = "";
        for (i = 0; i < hobbyList.length; i++) {
            hobbies.innerHTML += "<p>" + hobbyList[i] + "</p>";
        }

        name.innerText = profile.basics.name;
        appliedFor.innerText = `Applied For - ${profile.basics.AppliedFor}`;

        company.innerText = profile.work["Company Name"];
        position.innerText = profile.work.Position;
        start.innerText = profile.work["Start Date"];
        end.innerText = profile.work["End Date"];
        summary.innerText = profile.work.Summary;

        projName.innerText = profile.projects.name;
        projDesc.innerText = profile.projects.description;

        ug.innerHTML = `${profile.education.UG.institute}, ${profile.education.UG.course}, ${profile.education.UG['Start Date']}, ${profile.education.UG['End Date']}, ${profile.education.UG.cgpa}`;
        pu.innerText = `${profile.education["Senior Secondary"].institute}, ${profile.education["Senior Secondary"].cgpa}`;
        school.innerText = `${profile.education["High School"].institute}, ${profile.education["High School"].cgpa}`;

        internCompany.innerText = profile.Internship["Company Name"];
        internPosition.innerText = profile.Internship.Position;
        internStartDate.innerText = profile.Internship["Start Date"];
        internEndDate.innerText = profile.Internship["End Date"];
        internSummary.innerText = profile.Internship.Summary;

        achievements.innerText = profile.achievements.Summary;

    }

    //loads resumeList[] with fetchAPI / search result response
    const loadResumeList = (resumes) => {
        console.log("inside loadResumeList " + resumes);

        //if there is no search result, display no-result message
        if (resumes.length == 0) {
            next.style.visibility = "hidden";
            prev.style.visibility = "hidden";

            //hide the resume details div & show the no-result message div
            yesResult.style.display = "none";
            noResult.style.display = "flex";
            failImage = '<img src="https://i.postimg.cc/8kBP1nFB/face-sad-512.webp" alt="No Result Found" id="noResultImage" />';
            failMessage = '<label id="noResult"><b>No such result found.</b></label>';
            noResult.innerHTML = failImage + failMessage;

        }
        else {
            //show the resume details div & hide the no-result message div
            noResult.style.display = "none";
            yesResult.style.display = "inline";
            resumeList = resumes;
            indx = 0;
            let profile = resumeList.find((profile) => resumeList.indexOf(profile) === indx);
            loadProfile(profile);
        }
    }
    //pass the fetchAPI response to loadResumeList
    loadResumeList(apiResponseResumes);

    //adding eventListener to the search input
    searchWord.addEventListener("keypress", function (e) {
        if (e.keyCode == '13') {
            let searchResult = apiResponseResumes.filter(element =>
                element.basics.AppliedFor.toLowerCase().includes(searchWord.value.toLowerCase()));

            //pass the search result to loadResumeList
            loadResumeList(searchResult);
        }
    })

    //add click event to the previous button
    prev.addEventListener("click", function (e) {

        if (indx > 0) {
            indx--;
            console.log("index - " + indx);
            profile = resumeList.find((profile) => resumeList.indexOf(profile) === indx);
            console.log("Profile id -  " + profile.id);

            //pass the profile to be loaded to loadProfile()
            loadProfile(profile);
        }
    })

    //add click event to the next button
    next.addEventListener("click", function (e) {
        if (indx < resumeList.length) {
            indx++;
            console.log("index - " + indx);
            profile = resumeList.find((profile) => resumeList.indexOf(profile) === indx);
            console.log("Profile id -  " + profile.id);

            //pass the profile to be loaded to loadProfile()
            loadProfile(profile);
        }
    })

}

fetchResumes();





