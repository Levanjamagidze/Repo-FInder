

const user_img = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const followers_ = document.querySelector(".followers_ span");
const follow_ = document.querySelector(".follow_ span");
const repos_details = document.querySelector(".repos_details");
const btn_submit = document.querySelector(".btn_submit");

let user_name='';

//when user write user name in text box
function inputFunction(){
    let input_user =document.querySelector(".input_user").value.trim();

    if(input_user.length<=0){
        alert("please enter github user name");
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
        return false;
    }else{
        user_name = input_user.split("").join("");
        
        fetchUser();
        document.querySelector(".input_user").value="";
        document.querySelector(".input_user").focus();
    }
};

btn_submit.addEventListener("click", function(){
    inputFunction()
});

document.querySelector(".input_user").addEventListener("keyup", function(e){
    if(e.keyCode === 13){
        inputFunction()
    }
});

function fetchUser(){
    fetch(`https://api.github.com/users/${user_name}`)
    .then(response => response.json())
    .then(function(data){
        //console.log(data);
        if(data.message === "Not Found"){
            alert("user not found");
            return false;
        }else{
            user_img.innerHTML=`<img src="${data.avatar_url}">`;
            userName.innerHTML= data.login;
            followers_.innerHTML= data.followers;
            follow_.innerHTML= data.following;
        }
    })

    fetch(`https://api.github.com/users/${user_name}/repos`)
    .then(response => response.json())
    .then(function(repo_data){
        console.log(repo_data);
        
        if(repo_data.length <= 0){
            repos_details.innerHTML =`
            
            <div class="item_">
                <div class="repo_name">No Repo Found</div>
            </div>
            
            
            `
        } else {
            
            if(repo_data.message === "Not Found"){
                repos_details.innerHTML=`
                        <div class="item_">
                            <div class="repo_name">devAmit</div>
                            <div class="repo_details_">
                            <div class="info_star">
                                <i class="fa fa-star-o"></i>10
                            </div>
                            <div class="info_fork">
                                <p><i class="fa fa-code-fork"></i>30</p>
                            </div>
                            <div class="info_size">
                                <p><i class="fa fa-file"></i>3000kb</p>
                            </div>
                            <div class="button">
										<a href="${repo.html_url}" target="_blank" class="btn btn-default badge-secondary">Repo Page</a>
									</div>
                        </div>
                        </div>
                        `
                user_img.innerHTML=`<img src="https://pngimg.com/uploads/github/github_PNG58.png">`;
                userName.innerHTML= `devAmit`;
                followers_.innerHTML= "500";
                follow_.innerHTML= "50";
            }else{
                let repo_Data = repo_data.map(item =>{
                    console.log(item);
                    return(
                        `
                        <div class="item_">
                            <div class="repo_name">${item.name}</div>
                            <div class="repo_details_">
                            <div class="info_star">
                                <i class="fa fa-star-o"></i>
                                ${item.watchers}
                            </div>
                            <div class="info_fork">
                                <p><i class="fa fa-code-fork"></i>
                                ${item.forks}
                                </p>
                            </div>
                            <div class="info_size">
                                <p><i class="fa fa-file"></i>
                                ${item.size}kb
                                </p>
                            </div>
                            <div class="button">
										<a href="${item.html_url}" target="_blank">Repo Page</a>
									</div>
                        </div>
                    </div>
                        `
                    );
                })
                repos_details.innerHTML= repo_Data.slice(0,3).join("");
            }
        
        }  
    });
}