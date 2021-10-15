window.addEventListener("load", function(){
    onReady(onReadyCallback);
    let scrollAmount;
    let innerHeight = window.innerHeight;
    let container = this.document.querySelector("#container");
    let page = 2;
    var isLoaded = false;
    loadImages();

    window.addEventListener("scroll", function()
    {
        scrollAmount = window.scrollY;
        // When scrollAmount is about 80% of container, call loadIamges..
        if(innerHeight + scrollAmount >= container.clientHeight * 0.8 && isLoaded === false)  
        {
            isLoaded = true;
            setVisible('.loading', true);
            onReady(onReadyCallback);
            loadImages(page, 30);
            page++;
        }
    })

    let btnThreeColumn = this.document.querySelector("#three__column");
    let btnOneColumn = this.document.querySelector("#one__column");

    btnOneColumn.addEventListener("click", changeView);
    btnThreeColumn.addEventListener("click", changeView);
    localStorage.getItem("saveLayout") !== null && localStorage.getItem("saveLayout") === "one" ? container.classList.add("grid--template-1") : false;


    // Functions
    function changeView()
    {
        if(this.id === "one__column")
        {
            localStorage.setItem("saveLayout","one");
            return container.classList.add("grid--template-1")
        }
        else
        {
            localStorage.setItem("saveLayout", "three");
            return container.classList.remove("grid--template-1");
        }
    }
    function addImg(data)
    {
        let row = document.querySelectorAll(".row");
        let classIndex = 0;
        let count = 0; //On every 10, I'll make new column
        for(let i = 0; i < data.length; i++) {
            data[i].alt_description === null ? data[i].alt_description = "Slika nema alt" : false;
            if(count === 10) {
                count = 0;
                classIndex++
            }
            count++;
            row[classIndex].innerHTML += `
            <div id="${data[i].user.id}" class="card">
                <div class="info d--flex align--items-center">
                    <img src="${data[i].user.profile_image.small}" alt="avatar" class="avatar"/>
                    <p>${data[i].user.username}</p>
                </div>
                <img src="${data[i].urls.regular}" alt="${data[i].alt_description}" class="img--card"/>
                <div class="information text--center">
                    ${data[i].user.portfolio_url === null ? "<a href='#' class='not--available'>Not available</a>" : `<a href='${data[i].user.portfolio_url}'>Portfolio</a>`}
                    
                    <div class="social__media d--flex justify--content-center">
                        <table>
                            <tr>
                                <td><i class="fa fa-twitter mr-5" aria-hidden="true"></i></td>
                                <td>${ data[i].user.twitter_username === null ? 
                                "<a href='#' class='not--available'>Not available</a>" :
                                `<a href="https://twitter.com/${data[i].user.twitter_username}/" target="_blank">${data[i].user.twitter_username}</a></td>`}
                                
                            </tr>
                            <tr>
                                <td><i class="fa fa-instagram mr-5"></i></td>
                                <td>${ data[i].user.instagram_username === null ? "<a href='#' class='not--available'>Not available</a>" : 
                                `<a href="https://instagram.com/${data[i].user.instagram_username}/" target="_blank">${data[i].user.instagram_username}</a>`}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="statistic d--flex align--items-center justify--content-around">
                        <div class="statistic__likes">
                            <i class="fa fa-thumbs-up text--green text--center"></i>
                            <p>${data[i].likes}</p>
                        </div>
                        <div class="statistic__download">
                            <i class="fa fa-download text--green text--center"></i>
                            <p>${data[i].user.total_likes}</p>
                        </div>
                    </div>
                </div>
            
            
            </div>`;
        }
    }

    function loadImages(page = 1, imgPerPage = 30)
    {
        let endpoint = `https://api.unsplash.com/photos/?client_id=DhiFZgzN2K4X2uDEbkJKknZNYgsd2OgHTjttpQHCLN4&page=${page}&per_page=${imgPerPage}`;
        return this.fetch(endpoint)
            .then((blob) => blob.json())
            .then((data) => addImg(data));
    }

    function openLightBox()
    {
        let img = this;
        let modal = document.querySelector("#modal");
        let body = document.querySelector("body");
        modal.innerHTML = ` <i id='close' class="fa fa-close close"></i><div class="img--container d--flex justify--content-center align--items-center">
        <img src="${img.src}" alt="${img.alt}"/>
        </div>`;
        addClass(body, modal, false);
        var close = document.querySelector("#close");
        close.addEventListener("click", function(){
            addClass(body, modal, true);
        });
    }

    function setVisible(selector, visible) {
        return document.querySelector(selector).style.display = visible ? 'block' : 'none';
    }
    function onReadyCallback()
    {
        isLoaded = false;
        let cards = this.document.querySelectorAll(".img--card");
        cards.forEach(card => {
            card.addEventListener("click", openLightBox);
        })
        setVisible('main', true);
        setVisible('.loading', false);
    }
    function onReady(callback) 
    {
        let intervalId = window.setInterval(function(){
        if (document.getElementsByTagName('body')[0] !== undefined){
            window.clearInterval(intervalId);
            callback.call(this);
        }}, 3000);
    }
    function addClass(body, modal, isOpened)
    {
        if(isOpened === false)
        {
            body.classList.add("overflow--hidden");
            modal.classList.add("modal", "d--block");
            modal.classList.remove("d--none");
        }
        else
        {
            body.classList.remove("overflow--hidden");
            modal.classList.remove("modal", "d--block");
            modal.classList.add("d--none");
        }
    }
});


