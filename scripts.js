document.addEventListener('DOMContentLoaded', function() {
    // This function ensures that audio can play after the first user click
    const initAudioContext = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        console.log("Audio is ready");
        document.body.removeEventListener('click', initAudioContext);
    };
    document.body.addEventListener('click', initAudioContext, { once: true });
    
    initTestimonialWall();
    initScrollAnimations();
    initPricingCarousel();
    initSoundEffects(); 
});

/**
 * Populates and animates the testimonial wall.
 */
function initTestimonialWall() {
     const testimonials = [ { name: 'Sarah K.', role: 'Restaurant Owner', stars: 5, text: "I was one of Adam's first beta students testing this method. The psychology principles increased my average check from $45 to $67 in 45 days. The results speak for themselves." }, { name: 'David L.', role: 'Boutique Hotel GM', stars: 5, text: "Our profit margin went from 15% to 31% in 90 days. The 'Peak-End Rule' lesson changed how we handle guest interactions forever." }, { name: 'Maria G.', role: 'Cafe Owner', stars: 4, text: "I was skeptical, but the social proof tactics are real. Highlighting 'customer favorites' increased sales of those items by 40%. It feels like cheating, but it's just good psychology." }, { name: 'Tom H.', role: 'Retail Store Manager', stars: 5, text: "Took us from a $2,500 average client value to $4,200. I can't believe how much money we were leaving on the floor, literally." }, { name: 'Jessica P.', role: 'Hairstylist', stars: 5, text: "Using the 'Liking' and 'Authority' principles has completely changed how I do consultations. My client retention is at an all-time high." }, { name: 'Ben C.', role: 'Bar Owner', stars: 4, text: "The decoy pricing strategy for our cocktail menu was brilliant. We're selling more high-margin drinks than ever before." }, { name: 'Emily R.', role: 'E-commerce Seller', stars: 5, text: "The digital psychology module helped me reduce cart abandonment by 20%. The tactics on scarcity and urgency are pure gold." }, { name: 'Michael B.', role: 'Consultant', stars: 5, text: "I used the authority-building frameworks to justify a price increase for the first time in 3 years. Not a single client batted an eye. Incredible." }, { name: 'Chloe T.', role: 'Event Planner', stars: 5, text: "This course gave me the confidence to stand by my pricing. Understanding the psychology of value has been transformative for my business." }, { name: 'Daniel S.', role: 'Gym Owner', stars: 3, text: "Some of the concepts took a while to implement, but the section on reducing friction in the sign-up process was very helpful." }, { name: 'Olivia M.', role: 'Spa Director', stars: 5, text: "The sensory marketing module was eye-opening. A simple change in scent and music has made our spa feel more luxurious and our package sales are up 30%." }, { name: 'James W.', role: 'Real Estate Agent', stars: 5, text: "The principles of influence apply perfectly to sales. Understanding reciprocity and commitment has made my client interactions so much more effective." }, ];
    function createStarRating(stars) { let html = '<div class="flex text-yellow-400">'; for(let i = 0; i < 5; i++) { html += i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'; } html += '</div>'; return html; }
    function createTestimonialCard(testimonial) { const initials = `${testimonial.name.charAt(0)}${testimonial.name.split(' ')[1].charAt(0)}`; const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'); return ` <div class="testimonial-card"> <div class="flex items-center mb-4"> <img src="https://placehold.co/64x64/${randomColor}/FFFFFF?text=${initials}" class="w-16 h-16 rounded-full mr-4" alt="${testimonial.name}" loading="lazy"> <div> <p class="font-bold text-white text-lg">${testimonial.name}</p> <p class="text-gray-400 text-sm">${testimonial.role}</p> </div> </div> ${createStarRating(testimonial.stars)} <p class="text-gray-300 italic mt-4">"${testimonial.text}"</p> </div> `; }
    const columns = [ document.getElementById('col1-content'), document.getElementById('col2-content'), document.getElementById('col3-content'), document.getElementById('col4-content') ];
    const clones = [ document.getElementById('col1-clone'), document.getElementById('col2-clone'), document.getElementById('col3-clone'), document.getElementById('col4-clone') ];
    testimonials.forEach((testimonial, index) => { const columnIndex = index % 4; if (columns[columnIndex]) { columns[columnIndex].innerHTML += createTestimonialCard(testimonial); } });
    clones.forEach((clone, index) => { if(clone && columns[index]){ clone.innerHTML = columns[index].innerHTML; } });
}

/**
 * Sets up the Intersection Observer to fade in sections as they become visible.
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');
    if (!sections.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); } });
    }, { threshold: 0.1 });
    sections.forEach(section => { observer.observe(section); });
}

/**
 * On mobile, scrolls the pricing carousel to center the "Popular" item.
 */
function initPricingCarousel() {
    const carousel = document.querySelector('.pricing-carousel');
    if (carousel && window.innerWidth < 1024) {
        const popularItem = carousel.querySelector('.pricing-card-popular')?.parentElement;
        if (!popularItem) return;
        const carouselWidth = carousel.offsetWidth;
        const itemWidth = popularItem.offsetWidth;
        const scrollPosition = popularItem.offsetLeft - (carouselWidth / 2) + (itemWidth / 2);
        carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
}

/**
 * Initializes sound effects for key interactive elements.
 */
function initSoundEffects() {
    let canPlay = true;

    // A dull thud for the less important pricing cards
    const dullThudSynth = new Tone.MembraneSynth({ pitchDecay: 0.01, octaves: 2, envelope: { attack: 0.001, decay: 0.2, sustain: 0 } }).toDestination();
    dullThudSynth.volume.value = -12;

    // A clean, high-pitched ping for general UI elements
    const pingSynth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.001, decay: 0.1, sustain: 0.1, release: 0.2 } }).toDestination();
    pingSynth.volume.value = -10;

    // An "addictive" arpeggio for the main pricing card
    const addictiveSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'fmtriangle', harmonicity: 1.2, modulationType: 'sine' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.4 }, }).toDestination();
    addictiveSynth.volume.value = -6;
    
    // A "swoosh" sound for card flips
    const flipSynth = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.001, decay: 0.1, sustain: 0 } }).toDestination();
    flipSynth.volume.value = -20;
    
    // A "whoosh" sound for the founder image
    const whooshSynth = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.3, sustain: 0 } }).toDestination();
    whooshSynth.volume.value = -15;

    // A "scroll open" sound for the FAQ
    const scrollSynth = new Tone.NoiseSynth({ noise: { type: 'brown', playbackRate: 0.8 }, envelope: { attack: 0.01, decay: 0.15, sustain: 0.05, release: 0.2 } }).toDestination();
    scrollSynth.volume.value = -18;

    const playSound = (synth, note, duration, cooldown = 200) => {
        if (canPlay && Tone.context.state === 'running') {
            if(Array.isArray(note)) {
                const now = Tone.now();
                note.forEach((n, i) => {
                    synth.triggerAttackRelease(n, duration, now + i * 0.08);
                })
            } else {
                 synth.triggerAttackRelease(note, duration);
            }
            canPlay = false;
            setTimeout(() => { canPlay = true; }, cooldown);
        }
    };
    
    document.querySelectorAll('.sound-thud').forEach(elem => {
        elem.addEventListener('mouseenter', () => playSound(dullThudSynth, "C1", "8n"));
    });

    document.querySelectorAll('.sound-dopamine').forEach(elem => {
        elem.addEventListener('mouseenter', () => playSound(addictiveSynth, ["C5", "E5", "G5"], "16n"));
    });

    document.querySelectorAll('.sound-ping').forEach(elem => {
        elem.addEventListener('mouseenter', () => playSound(pingSynth, "A5", "16n"));
    });
    
    document.querySelectorAll('.faq-button').forEach(button => {
        button.addEventListener('click', () => playSound(scrollSynth, "C2", "8n"));
    });
    
    document.querySelectorAll('.flip-card').forEach(card => {
        card.parentElement.addEventListener('mouseenter', () => playSound(flipSynth, 'C4', '8n'));
    });
    
    const founderImage = document.getElementById('founder-image');
    if(founderImage){
       founderImage.parentElement.addEventListener('mouseenter', () => playSound(whooshSynth, 'C2', '4n'));
    }
    
    // Generic sound for all other hoverable elements
    document.querySelectorAll('.sound-on-hover').forEach(elem => {
        elem.addEventListener('mouseenter', () => playSound(pingSynth, "G5", "32n"));
    });
}
