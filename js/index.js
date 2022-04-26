
    /* work */
    const workBtn = document.querySelector(".work__btn");
    const workContent = document.querySelector(".work__content");
    const workItems = document.querySelectorAll(".work__item");
    const categoryBtn = document.querySelectorAll(".category__btn");

    //workItems에 class 추가
    workItems.forEach((el)=>{
        el.addEventListener("mouseenter",()=>{
            el.classList.add("active");
        });
        el.addEventListener("mouseleave",()=>{
            workItems.forEach((e)=>{
                e.classList.remove("active");
            });
        });
    });
    
    //버튼에 class추가
    categoryBtn.forEach((el)=>{
        el.addEventListener("click",()=>{
            categoryBtn.forEach((e)=>{
                e.classList.remove("active");
            });
            el.classList.add("active");
        });
    });

    workBtn.addEventListener("click",(e)=>{
        const filter = e.target.dataset.filter;
        if(filter == null){
            return;
        }

        //animation 효과
        workContent.classList.add("anim-out");
        setTimeout(function(){
            //type비교해서 class 추가
            workItems.forEach((workItem)=>{
                if(filter === "*" || filter === workItem.dataset.type){
                    workItem.classList.remove("invisible");
                }else{
                    workItem.classList.add("invisible");
                }
            });
            workContent.classList.remove("anim-out");
        },300);
    });



    /* 숫자 카운트 */
    let numAnimation = document.querySelectorAll(".num__animation");
    let skillList = document.querySelectorAll(".skill__list");
    
    skillList.forEach(function(el,index){
        el.addEventListener("mouseenter",function(){
            skillList.forEach((el)=>{
                el.classList.remove("active");
            });
            el.classList.add("active");
            changeNum(index);
        });
        el.addEventListener("mouseleave",function(){
            skillList.forEach((el)=>{
                el.classList.remove("active");
            });
        });
    });

    //숫자 카운트 함수
    function changeNum(index){
        let num = 0;
        let targetNum = numAnimation[index].getAttribute("data-rate");
        let timer = setInterval(function(){
        ++num;
        numAnimation[index].innerText = num;
        if(num == targetNum){
                clearInterval(timer);
            }
        },10);
    }


    /* 메뉴 리스트 클릭시 해당 영역으로 이동 */
    const menuList = document.querySelectorAll(".menu__right ul li a");
    menuList.forEach((el)=>{
        el.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(el.getAttribute("href")).scrollIntoView({
                behavior:"smooth"
            })
        });
    });

    /* 네비 슬라이드 */
    let menuLine = document.getElementById("menu__line");
    let horizontalMenus = document.querySelectorAll(".menu__right ul li");
    function horizontaIndicator(e){
        menuLine.style.left = e.currentTarget.offsetLeft + "px";
        menuLine.style.width = e.currentTarget.offsetWidth + "px";
    }
    horizontalMenus.forEach((menu) => {
        menu.addEventListener("click",(e) =>{
            horizontaIndicator(e)
        });
    });

    /* 스크롤시 section에 active 클레스 추가 및 네비 슬라이드 이동 */
    window.addEventListener("scroll",scrollProgress);
    function scrollProgress(){
        let scrollTop = (window.pageYOffset || document.documentElement.scrollTop || window.scrollY) + window.innerHeight / 2;
        let contentItem = document.querySelectorAll(".content__item");
        contentItem.forEach((item,index)=>{
            if(scrollTop > item.offsetTop){
                setTimeout(() => {
                    //전부 active삭제
                    contentItem.forEach((el)=>{
                        el.classList.remove("active");
                    });
                    //해당하는 section만 active 추가
                    item.classList.add("active");
                },0);

                //스크롤시 메뉴 슬라이드가 해당하는 메뉴로 이동
                menuLine.style.left = horizontalMenus[index].offsetLeft + "px";
                menuLine.style.width = horizontalMenus[index].offsetWidth + "px";
            }
        });
    }