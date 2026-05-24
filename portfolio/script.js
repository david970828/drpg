// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Scroll Animations =====
function createRevealObserver(selector, stagger = 100) {
    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const i = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, i * stagger);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        obs.observe(el);
    });
}

createRevealObserver('.impact-card', 120);
createRevealObserver('.case-card', 150);
createRevealObserver('.why-card', 100);
createRevealObserver('.contact-card', 100);

// ===== Particles =====
const particles = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (Math.random() * 4 + 4) + 's';
    const size = (Math.random() * 3 + 2) + 'px';
    p.style.width = size;
    p.style.height = size;
    particles.appendChild(p);
}

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
});


// ===== Language Toggle (i18n) =====
const translations = {
    en: {
        // Nav
        navImpact: 'Impact',
        navCases: 'Cases',
        navWhy: 'Why me',
        navContact: "Let's talk",
        // Hero
        heroBadge: '<i class="fab fa-aws"></i> AWS Certified Solutions Architect',
        heroTitle: 'I build solutions<br>that <span class="gradient-text">scale</span>',
        heroSubtitle: "I'm David Pardo. Software Engineer, Cloud Architect and tech lead with +11 years in technology. I've designed and built platforms that process +30M transactions per day, generate real savings and operate in different countries worldwide.",
        heroQuestion: 'I transform ideas into robust, scalable and cost-efficient technology products.',
        heroCta1: '<i class="fas fa-eye"></i> See what I\'ve built',
        heroCta2: '<i class="fas fa-paper-plane"></i> Let\'s talk',
        // Logos
        logosLabel: "I've built solutions for",
        // Impact
        impactTitle: 'The impact speaks',
        impactSubtitle: "It's not what I know how to do. It's what I've already done.",
        impactValue1: '+30M', impactLabel1: 'Transactions per day', impactContext1: 'Massive messaging architecture operating in different countries worldwide.',
        impactValue2: '-$30K', impactLabel2: 'USD/year in cloud', impactContext2: 'AWS architecture optimization that generated recurring savings from the redesign.',
        impactValue3: '1.4M', impactLabel3: 'Active digital users', impactContext3: 'BBVA Net, BBVA Mobile and Web Portal Colombia with 99% uptime under my leadership.',
        impactValue4: '+11', impactLabel4: 'Years in technology', impactContext4: '+40 people led. Teams of up to 10 in development, architecture and DevOps.',
        // Cases
        casesTitle: "What I've built",
        casesSubtitle: 'Each case is a real problem I solved with technology',
        caseChallenge: '<i class="fas fa-exclamation-circle"></i> The challenge',
        caseSolution: '<i class="fas fa-lightbulb"></i> What I did',
        caseResult: '<i class="fas fa-chart-line"></i> The result',
        // Case 1
        case1Cat: 'Startup · Fintech', case1Title: 'Building a fintech product from scratch',
        case1Challenge: 'Take a fintech idea from concept to a functional product: define architecture, build the platform, operate infrastructure and lead the entire technology.',
        case1Solution: 'As CTO, I designed the architecture built to scale from day 1. Full-stack development, DevOps, CI/CD and technical product decisions. All with a startup mindset: fast, efficient and cost-effective.',
        case1R1: 'Product running', case1R2: 'Scalable architecture', case1R3: 'Optimized costs',
        // Case 2
        case2Cat: 'Payments & Open Finance · Colombia', case2Title: "Credibanco's payment ecosystem architecture",
        case2Challenge: "Design robust architectures for Credibanco's core products — POS terminals, Bre-B, Open Finance and Open Data — optimizing costs without sacrificing performance. Bre-B aims to process 5M transactions/day short-term.",
        case2Solution: 'As Enterprise Architect, I led the design of scalable solutions aligned with strategic objectives. I identified optimization opportunities in AWS infrastructure that generated $30K USD/year in savings.',
        case2R1: '-$30K USD/year', case2R2: '5M Tx/day projected', case2R3: 'Open Finance',
        // Case 3
        case3Cat: 'Government · Data & Cloud', case3Title: 'Government Data Lake for Cundinamarca',
        case3Challenge: 'Connect +15 scattered government data sources into a single source of truth, and build accessible risk reporting tools for public entities.',
        case3Solution: "I designed and implemented the Data Lake architecture in Azure integrating +15 data sources. Led the construction of a web portal and WhatsApp chatbot for risk reporting in Cundinamarca's Public Enterprises.",
        case3R1: '+15 sources integrated', case3R2: 'Data Lake on Azure', case3R3: 'WhatsApp Chatbot',
        // Case 4
        case4Cat: 'Massive Messaging · Multi-country', case4Title: 'Messaging platform for different countries worldwide',
        case4Challenge: 'Scale a messaging platform (Email, SMS, OTP, Voice IP) to support growing demand from clients across multiple sectors and countries worldwide.',
        case4Solution: 'I led the technical team and designed the architecture that enabled messaging products to scale. Implemented TDD processes, continuous integration and architecture guidelines to sustain growth.',
        case4R1: '+30M Tx/day', case4R2: 'Multi-country', case4R3: 'High availability',
        // Case 5
        case5Cat: 'Digital Banking · Colombia', case5Title: "Technical leadership of BBVA Colombia's digital banking",
        case5Challenge: "Maintain, evolve and scale the bank's main digital applications — BBVA Net, BBVA Mobile and Web Portal — with +3M users and 1.4M active users on digital channels.",
        case5Solution: 'I led development teams under SCRUM. Designed and implemented AWS architectures, automated deployments with IaC and optimized cloud costs applying FinOps practices.',
        case5R1: '1.4M active users', case5R2: '99% uptime', case5R3: 'AWS optimized',
        // Case 6
        case6Cat: 'Migration · Brazil', case6Title: 'Corporate platform migration for Brazilian market',
        case6Challenge: 'Adapt and migrate a complete enterprise platform (Crescendo) to operate in the Brazilian market, with multiple modules and localization requirements.',
        case6Solution: 'I led frontend development, designed reusable components and adapted modules for treasury school, servers, organizational structure and knowledge management.',
        case6R1: 'Platform migrated', case6R2: 'Reusable components', case6R3: 'Brazil market',
        // Case 7
        case7Cat: 'SaaS · International', case7Title: 'SaaS time management product from scratch',
        case7Challenge: 'Build a complete application from scratch for a Spanish client: architecture, infrastructure, frontend, backend and operations — all with a single technical person.',
        case7Solution: 'I designed the architecture on AWS, implemented the CI/CD pipeline, developed the complete frontend and backend. Total ownership of the technical product.',
        case7R1: 'End-to-end product', case7R2: 'AWS + DevOps', case7R3: 'International client',
        // Why
        whyTitle: 'Why me?',
        whySubtitle: "What sets me apart isn't what I know — it's how I apply it to generate results",
        why1Title: 'I think business, I execute in code',
        why1Desc: "I don't just build what's asked. I understand the why behind the product and design solutions that generate ROI: less costs, more capacity, better experience.",
        why2Title: "I've operated at real scale",
        why2Desc: "+30M transactions/day, 1.4M active users in digital banking, national payment ecosystems. It's not theory — it's experience operating mission-critical systems with 99% uptime.",
        why3Title: 'Total product ownership',
        why3Desc: "Architecture, development, DevOps, team leadership. I can take a product from idea to production without depending on 5 different roles.",
        why4Title: 'Every dollar counts',
        why4Desc: "I've saved $30K USD/year in cloud with architecture optimizations. I design thinking about costs from day 1 — especially important in startups and new products.",
        why5Title: 'Multi-industry, multi-country',
        why5Desc: "Banking, fintech, government, messaging, SaaS. Colombia, Brazil, Spain, LATAM. Each industry gave me a perspective I apply to the next.",
        why6Title: 'Certified and up-to-date',
        why6Desc: "AWS Solutions Architect + Cloud Practitioner. Enterprise Architecture Specialist (Javeriana). I don't stay with what worked yesterday.",
        // Contact
        contactTitle: "Let's talk",
        contactSubtitle: "Have a product to build, an architecture to design or a team to lead? Let's chat.",
        contactEmail: 'Email', contactPhone: 'Phone', contactLinkedin: 'LinkedIn', contactLocation: 'Location',
        contactLinkedinText: "Let's connect",
        // Footer
        footerText: '© 2025 David Ricardo Pardo González'
    }
};

let currentLang = 'es';
const langToggle = document.getElementById('lang-toggle');

function applyTranslations(lang) {
    if (lang === 'es') {
        location.reload();
        return;
    }
    const t = translations.en;
    // Nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks[0].textContent = t.navImpact;
    navLinks[1].textContent = t.navCases;
    navLinks[2].textContent = t.navWhy;
    navLinks[3].textContent = t.navContact;
    // Hero
    document.querySelector('.hero-badge').innerHTML = t.heroBadge;
    document.querySelector('.hero-text h1').innerHTML = t.heroTitle;
    document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
    document.querySelector('.hero-question').textContent = t.heroQuestion;
    const ctas = document.querySelectorAll('.hero-cta .btn');
    ctas[0].innerHTML = t.heroCta1;
    ctas[1].innerHTML = t.heroCta2;
    // Logos
    document.querySelector('.logos-label').textContent = t.logosLabel;
    // Impact
    document.querySelector('#impact .section-title').textContent = t.impactTitle;
    document.querySelector('#impact .section-subtitle').textContent = t.impactSubtitle;
    const impactCards = document.querySelectorAll('.impact-card');
    [1,2,3,4].forEach(i => {
        const card = impactCards[i-1];
        card.querySelector('.impact-value').textContent = t[`impactValue${i}`];
        card.querySelector('.impact-label').textContent = t[`impactLabel${i}`];
        card.querySelector('.impact-context').textContent = t[`impactContext${i}`];
    });
    // Cases
    document.querySelector('#cases .section-title').textContent = t.casesTitle;
    document.querySelector('#cases .section-subtitle').textContent = t.casesSubtitle;
    const cases = document.querySelectorAll('.case-card');
    cases.forEach((c, idx) => {
        const num = idx + 1;
        c.querySelector('.case-category').textContent = t[`case${num}Cat`];
        c.querySelector('.case-header h3').textContent = t[`case${num}Title`];
        c.querySelector('.case-challenge h4').innerHTML = t.caseChallenge;
        c.querySelector('.case-challenge p').textContent = t[`case${num}Challenge`];
        c.querySelector('.case-solution h4').innerHTML = t.caseSolution;
        c.querySelector('.case-solution p').textContent = t[`case${num}Solution`];
        c.querySelector('.case-result h4').innerHTML = t.caseResult;
        const metrics = c.querySelectorAll('.result-metric');
        metrics[0].textContent = t[`case${num}R1`];
        metrics[1].textContent = t[`case${num}R2`];
        metrics[2].textContent = t[`case${num}R3`];
    });
    // Why
    document.querySelector('#why .section-title').textContent = t.whyTitle;
    document.querySelector('#why .section-subtitle').textContent = t.whySubtitle;
    const whyCards = document.querySelectorAll('.why-card');
    whyCards.forEach((card, idx) => {
        const num = idx + 1;
        card.querySelector('h3').textContent = t[`why${num}Title`];
        card.querySelector('p').textContent = t[`why${num}Desc`];
    });
    // Contact
    document.querySelector('#contact .section-title').textContent = t.contactTitle;
    document.querySelector('#contact .section-subtitle').textContent = t.contactSubtitle;
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards[0].querySelector('h3').textContent = t.contactEmail;
    contactCards[1].querySelector('h3').textContent = t.contactPhone;
    contactCards[2].querySelector('h3').textContent = t.contactLinkedin;
    contactCards[2].querySelector('p').textContent = t.contactLinkedinText;
    contactCards[3].querySelector('h3').textContent = t.contactLocation;
    // Footer
    document.querySelector('.footer p').textContent = t.footerText;
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    const active = langToggle.querySelector('.lang-active');
    const inactive = langToggle.querySelector('.lang-inactive');
    active.classList.remove('lang-active');
    active.classList.add('lang-inactive');
    inactive.classList.remove('lang-inactive');
    inactive.classList.add('lang-active');

    if (currentLang === 'en') {
        applyTranslations('en');
        document.documentElement.lang = 'en';
    } else {
        // Reload to restore Spanish (original HTML)
        location.reload();
    }
});
