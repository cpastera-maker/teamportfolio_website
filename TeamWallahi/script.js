document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})

const navbar = document.getElementById("navbar");
const navLink = document.getElementById("navLink");
const mobileMenu = document.getElementById("mobileMenu");

function openMenu() {
    mobileMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu() {
    mobileMenu.style.transform = 'translateX(0)';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/80', 'backdrop-blur-lg', 'py-3', 'shadow-sm', 'dark:bg-darkTheme/80');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('bg-white/80', 'backdrop-blur-lg', 'py-3', 'shadow-sm', 'dark:bg-darkTheme/80');
        navbar.classList.add('py-4');
    }
})


const projects = {
    'work-1': {
        title: 'POS and Inventory SYS',
        category: 'Application Development',
        description: 'A comprehensive POS and Inventory Management System with barcode scanning, automated receipts, and real-time stock tracking. Enhanced with sales analytics and data visualizations for smarter business decisions.',
        tech: ['VB.NET 2008', 'MySQL', 'Crystal Reports'],
        images: ['./assets/SYS.png', './assets/Screenshot (39).png', './assets/Screenshot (40).png', './assets/Screenshot (41).png', './assets/Screenshot (42).png', './assets/Screenshot (43).png'],
        video: './assets/SYSvid.mp4',
    },
    'work-2': {
        title: 'BrewTrack',
        category: 'Application Development',
        description: 'BrewTrack is a POS + Coffee shop management app that lets shop owners and staff handle orders, inventory, and sales. Originally a school project, it was built for a real client providing a seamless, practical, easy-to-use solution for daily operations.',
        tech: ['VB.NET 2008', 'MySQL', 'Windows Forms'],
        images: ['./assets/Brew.png', './assets/Brew3.png', './assets/brew2.png', './assets/Brew4.png', './assets/Brew5.png'],
        video: './assets/BrewTrack.mp4',
    },
    'work-3': {
        title: 'RAPHA Diagnostics',
        category: 'Information System',
        description: 'Designed to help RAPHA Diagnostics Laboratory efficiently manage patient records, track diagnostic tests, and generate accurate reports, making daily lab operations smoother and more organized.',
        tech: ['VB.NET 2008', 'MySQL',],
        images: ['./assets/IS1.png', './assets/IS2.png', './assets/IS3.png', './assets/IS4.png', './assets/IS5.png'],
        video: './assets/ISvid.mp4',
    },
    'work-4': {
        title: 'Quizzer Application with offline AI Flashcard Generation(Under Development)',
        category: 'Desktop Application',
        description: 'Quizzer is a desktop-based, AI-assisted study application developed using VB.NET 2019, MySQL Workbench, the Guna UI 2 Framework, and Llama 2 AI, designed to help students create and manage flashcards efficiently. The system supports offline functionality, allowing users to access and use its core features without an internet connection. Users can upload learning materials that are analyzed by the AI to automatically generate relevant flashcards, while also having the option to manually create and customize flashcards based on their study preferences. With a modern and user-friendly interface, Quizzer aims to enhance learning organization and knowledge retention through intelligent content processing and interactive study tools, and it is currently still under development with several features undergoing further refinement and completion.',
        tech: ['VB.NET 2019', 'MySQL Workbench', 'Guna UI Framework', 'Llama 2 AI'],
        images: ['./assets/quiz1.png', './assets/quiz3.png', './assets/quiz4.png', './assets/quiz5.png', './assets/quiz6.png', './assets/quiz7.png'],
        video: './assets/Quizzervid.mp4',
    }
};

let currentSlide = 0;
let totalSlides = 0;

function openProject(id) {
    const project = projects[id];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalCategory').innerText = project.category;
    document.getElementById('modalDescription').innerText = project.description;
    
    
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderDots = document.getElementById('sliderDots');
    sliderContainer.innerHTML = '';
    sliderDots.innerHTML = '';
    
    currentSlide = 0;
    totalSlides = project.images.length;
    
    project.images.forEach((imgSrc, index) => {
       
        const imgDiv = document.createElement('div');
        imgDiv.className = 'min-w-full h-full';
        imgDiv.innerHTML = `<img src="${imgSrc}" class="w-full h-full object-cover" alt="Screenshot ${index + 1}">`;
        sliderContainer.appendChild(imgDiv);
        
        
        const dot = document.createElement('button');
        dot.className = `slider-dot w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 transition-all duration-300 ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        sliderDots.appendChild(dot);
    });
    
    updateSlider();

    
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-xs font-medium';
        span.innerText = t;
        techContainer.appendChild(span);
    });

    
    const videoContainer = document.getElementById('modalVideo');
    if (project.video) {
       
        videoContainer.innerHTML = `
            <video controls class="w-full aspect-video bg-black" playsinline>
                <source src="${project.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        videoContainer.classList.remove('hidden');
    } else {
        videoContainer.innerHTML = `
            <div class="aspect-video bg-gray-100 dark:bg-white/5 flex flex-col items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p class="italic text-sm">Video showcase coming soon</p>
            </div>
        `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function updateSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
        video.src = "";
        video.load();
    }
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
