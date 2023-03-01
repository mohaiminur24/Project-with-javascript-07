async function catagoryLoad(){
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const catagorys = data.data.news_category;

// Display catagory name
    const catagoryParent = document.getElementById('allCatagory');
    catagorys.forEach(element => {
        const catagory = document.createElement('div');
        catagory.innerHTML = `<button onclick="catagoryID('${element.category_id}','${element.category_name}')"> ${element.category_name}</button>`;
        catagoryParent.appendChild(catagory);
    });
};

// fetch data by id
async function fetchDataByid (news_id){
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id} `);
    const datas = await res.json();
    return datas.data;
};


const postParentDiv = document.getElementById('postParent');
const catagoryID = async(data='08', name='All news') =>{
    progress(true);
    postParentDiv.innerHTML = '';
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${data}`);
    const newsBycatagory = await res.json();
    if(newsBycatagory.data.length<=0){
        document.getElementById('notdataFound').classList.remove('hidden');
    }else{
        document.getElementById('notdataFound').classList.add('hidden');
    };
    const lengthByCatagory = (newsBycatagory.data).length;
    document.getElementById('catagoryLenght').innerText = lengthByCatagory;
    document.getElementById('catagoryname').innerText = name;
    newsBycatagory.data.forEach(element =>{
        const rest = element.details.length>=600? element.details.slice(0,600): element.details;
        
        const post = document.createElement('div');
        post.innerHTML = `
        <div class="grid lg:grid-cols-5 gap-5 rounded-md shadow-md border p-5 my-5 grid-cols-1 ">
            <div class='col-span-2'>
                <img class="w-full h-96 rounded-md" src="${element.image_url}" alt="">
            </div>

            <div class="w-full md:h-96 h-64 lg:h-full col-span-3 p-5 relative">
                <h1 class="text-lg font-bold font-serif text-slate-700 mb-5">${element.title}</h1>
                <p class = "hidden md:block">${rest}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 justify-between items-center mt-10 py-5 absolute bottom-0 left-0 right-0  p-5">
                    <!-- author -->
                    <div class="author flex items-center">
                        <div class="mr-2">
                            <img class="w-10 h-10 rounded-full border p-1" src="${element.author.img}" alt="">
                        </div>
                        <div class="text-xs text-gray-500">
                            <h1>${element.author.name}</h1>
                            <p>${element.author.published_date}</p>
                        </div>
                    </div>
                    <!-- view -->
                    <div>
                        <i class="fa-regular fa-eye"></i>
                        <span>${element.total_view}</span>
                    </div>
                    <!-- rating section -->
                    <div class="text-slate-700">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <!-- modal section -->
                    <button onclick='modalOpen("${element._id}")'><label for="my-modal-3"><i class="fa-solid fa-arrow-right text-blue-500"></i></label></button>
                </div>
            </div>
        </div>
        `;
        postParentDiv.appendChild(post);
    });
    progress(false);
};
const modalParent = document.getElementById('modalParent');
async function modalOpen(data){
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${data} `);
    const datas = await res.json();
    const {name,published_date,img} = datas.data[0].author;
    modalParent.innerHTML = '';
    const modal = document.createElement('div');
    modal.innerHTML = 
    `
        <div>
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <img class='w-full my-3 rounded-md h-72' src="${img}" alt="">
            <h3 class="text-lg font-bold">Name : ${name}</h3>
            <p class="">Post Published Date : ${published_date}</p>
        </div>
    
    `;


    modalParent.appendChild(modal);

};

const todaysPick = async() =>{
    progress(true);
    const res = await fetch('https://openapi.programming-hero.com/api/news/category/08');
    const data = await res.json();
    postParentDiv.innerHTML = '';
    data.data.forEach(element =>{
        console.log(element.others_info.is_todays_pick);
        if(element.others_info.is_todays_pick === true){
            const rest = element.details.length>=600? element.details.slice(0,600): element.details;
            const post = document.createElement('div');
        post.innerHTML = `
        <div class="grid lg:grid-cols-5 gap-5 rounded-md shadow-md border p-5 my-5 grid-cols-1 ">
            <div class='col-span-2'>
                <img class="w-full h-96 rounded-md" src="${element.image_url}" alt="">
            </div>

            <div class="w-full md:h-96 h-64 lg:h-full col-span-3 p-5 relative">
                <h1 class="text-lg font-bold font-serif text-slate-700 mb-5">${element.title}</h1>
                <p class = "hidden md:block">${rest}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 justify-between items-center mt-10 py-5 absolute bottom-0 left-0 right-0  p-5">
                    <!-- author -->
                    <div class="author flex items-center">
                        <div class="mr-2">
                            <img class="w-10 h-10 rounded-full border p-1" src="${element.author.img}" alt="">
                        </div>
                        <div class="text-xs text-gray-500">
                            <h1>${element.author.name}</h1>
                            <p>${element.author.published_date}</p>
                        </div>
                    </div>
                    <!-- view -->
                    <div>
                        <i class="fa-regular fa-eye"></i>
                        <span>${element.total_view}</span>
                    </div>
                    <!-- rating section -->
                    <div class="text-slate-700">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <!-- modal section -->
                    <button onclick='modalOpen("${element._id}")'><label for="my-modal-3"><i class="fa-solid fa-arrow-right text-blue-500"></i></label></button>
                </div>
            </div>
        </div>
        `;
        postParentDiv.appendChild(post);
        };
    });
    progress(false);
};

const trending =async () => {
    progress(true);
    const res = await fetch('https://openapi.programming-hero.com/api/news/category/08');
    const data = await res.json();
    postParentDiv.innerHTML = '';
    data.data.forEach(element =>{
        if(element.others_info.is_trending){
            console.log(element);
            const rest = element.details.length>=601? element.details.slice(0,600): element.details;
            const post = document.createElement('div');
        post.innerHTML = `
        <div class="grid lg:grid-cols-5 gap-5 rounded-md shadow-md border p-5 my-5 grid-cols-1 ">
            <div class='col-span-2'>
                <img class="w-full h-96 rounded-md" src="${element.image_url}" alt="">
            </div>

            <div class="w-full md:h-96 h-64 lg:h-full col-span-3 p-5 relative">
                <h1 class="text-lg font-bold font-serif text-slate-700 mb-5">${element.title}</h1>
                <p class = "hidden md:block">${rest}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 justify-between items-center mt-10 py-5 absolute bottom-0 left-0 right-0  p-5">
                    <!-- author -->
                    <div class="author flex items-center">
                        <div class="mr-2">
                            <img class="w-full h-10 rounded-full border p-1" src="${element.author.img}" alt="">
                        </div>
                        <div class="text-xs text-gray-500">
                            <h1>${element.author.name}</h1>
                            <p>${element.author.published_date}</p>
                        </div>
                    </div>
                    <!-- view -->
                    <div>
                        <i class="fa-regular fa-eye"></i>
                        <span>${element.total_view}</span>
                    </div>
                    <!-- rating section -->
                    <div class="text-slate-700">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <!-- modal section -->
                    <button onclick='modalOpen("${element._id}")'><label for="my-modal-3"><i class="fa-solid fa-arrow-right text-blue-500"></i></label></button>
                </div>
            </div>
        </div>
        `;
        postParentDiv.appendChild(post);
        };
    });
    progress(false);
};


// proccessing bar function
const progress = value => {

    if(value){
        document.getElementById('websiteBody').classList.add('hidden');
        document.getElementById('websiteProgress').classList.remove('hidden');
    }else{
        document.getElementById('websiteBody').classList.remove('hidden');
        document.getElementById('websiteProgress').classList.add('hidden');
    }
};