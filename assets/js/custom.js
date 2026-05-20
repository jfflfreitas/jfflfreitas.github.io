document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================
     1. NAVIGATION SCROLL EFFECT
     ========================================== */
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  /* ==========================================
     2. MOBILE NAVIGATION DRAWER
     ========================================== */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ==========================================
     3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinksArr = Array.from(navLinks);
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies center of viewport
    threshold: 0
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksArr.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  /* ==========================================
     4. INTERACTIVE AI CLI WIDGET
     ========================================== */
  const cliBody = document.getElementById('cli-body');
  const cliButtons = document.querySelectorAll('.cli-btn');
  let isTyping = false;
  
  // Custom command databases
  const commands = {
    '/experience': `**TECHNICAL LEAD DATA & ANALYTICS @ EDP RENEWABLES (by Decskill)**
- September 2025 - Present | Lisbon, Portugal
- Leading high-impact initiatives transforming data into strategic insights for renewable energy systems.
- Designing and implementing modern, scalable architectures for large volumes of data using Azure, Apache Spark, Scala, Python, and PySpark.
- Managing multiple active projects simultaneously and leading technical squads (up to 30 people).

**TECH LEAD DATA & ANALYTICS @ DECSKILL / EDP**
- April 2023 - October 2025 | Lisbon, Portugal
- Led teams of up to 12 members and managed up to 10 active projects simultaneously.
- Covered hybrid roles such as Product Owner and Scrum Master to ensure seamless agile delivery.
- Integrated critical data from SAP, energy hubs, and operations pipelines.

**LEAD DATA SCIENTIST @ HUMANIT DIGITAL CONSULTING**
- November 2022 - April 2023
- Led technical machine learning projects and developed internal platforms using Java Springboot, Postgres, and Angular.

**LEAD DATA ENGINEER & SCIENTIST @ NTT DATA**
- November 2019 - November 2022
- Engineered advanced NLP & Computer Vision systems and led Cloudera Spark/Scala pipelines.

**R&D SPECIALIST @ CAPGEMINI**
- September 2017 - August 2018 | São Paulo, Brazil
- Built technical AI, Cognitive Computing (Watson NLU), and DevOps automation labs.

**HISTORIC ROLES (2011 - 2017):**
- Web Developer @ Plasac Plano De Saude (2017)
- Full Stack Developer @ Agência Moustache (2017)
- Business Project Manager @ MidStage Ventures (2015 - 2017)
- Web & Mobile Developer @ Único, Fivecom, IT Extreme (2013 - 2015)
- Trainee Programmer / Intern @ Aevo, IDAF, Banestes (2011 - 2013)`,
    
    '/skills': `**TECHNICAL PROJECT LEADERSHIP:**
- Agile methodologies (Scrum Master & PO hybrid roles)
- Team management (leading teams of up to 30 people)
- Managing up to 10 active projects simultaneously

**CLOUD & BIG DATA ARCHITECTURE:**
- Azure, Databricks, Delta Lake
- Apache Spark, PySpark, Scala, Hive, Impala
- SQL, Python, SAP integration

**LANGUAGES:**
- Portuguese (Native) | English (Full Professional)
- Spanish (Limited Working) | German (Elementary)`,
    
    '/ai-projects': `**HIGHLIGHTED PROJECTS:**
- **Visual Recognition Server:** Node.js/Python server using computer vision for high-speed automated image classification.
- **Cognitive QA & Log Analyzer:** Intelligent Python tool utilizing NLP to parse complex system error logs and auto-categorize tickets in Jira.
- **Sentimental Analysis Engine:** Multi-platform real-time opinion classifier leveraging Watson API, NodeJS, and Python.
- **Breast Cancer Classifier:** Jupyter Notebook training a Naive Bayes model with optimized statistical scores.`,
    
    '/about': `**JOHN FRANKLIN F. L. FREITAS**
- **Location:** Lisbon Metropolitan Area, Portugal
- **Role:** Technical Lead Data & Analytics @ EDP Renewables (by Decskill)
- **Summary:** Highly versatile professional with over 10 years of experience bridging the gap between business needs and complex technical execution. Passionate about designing scalable data architectures in cloud environments and fostering continuous improvement and innovation.`
  };
  
  // Simulated terminal typing effect
  const typeText = (text, parentElement, callback) => {
    isTyping = true;
    let index = 0;
    const speed = 6; // Milliseconds per character for typing
    
    // Replace newlines with <br> and bold indicators
    const formattedText = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/-\s/g, '• ');
      
    // Element to put text in
    const span = document.createElement('div');
    span.className = 'cli-response';
    parentElement.appendChild(span);
    
    // Typing loop
    const timer = setInterval(() => {
      if (index < formattedText.length) {
        if (formattedText.substring(index, index + 4) === '<br>') {
          span.innerHTML += '<br>';
          index += 4;
        } else if (formattedText.substring(index, index + 8) === '<strong>') {
          // Find end tag
          const endIdx = formattedText.indexOf('</strong>', index);
          if (endIdx !== -1) {
            span.innerHTML += formattedText.substring(index, endIdx + 9);
            index = endIdx + 9;
          } else {
            span.innerHTML += formattedText[index];
            index++;
          }
        } else {
          span.innerHTML += formattedText[index];
          index++;
        }
        cliBody.scrollTop = cliBody.scrollHeight;
      } else {
        clearInterval(timer);
        isTyping = false;
        if (callback) callback();
      }
    }, speed);
  };
  
  // Handler for running a terminal command
  const executeCommand = (commandName) => {
    if (isTyping) return;
    
    // 1. Append user input line
    const inputLine = document.createElement('div');
    inputLine.className = 'cli-line';
    inputLine.innerHTML = `<div class="cli-input-line"><span>${commandName}</span></div>`;
    cliBody.appendChild(inputLine);
    
    // 2. Append response
    if (commandName === '/clear') {
      cliBody.innerHTML = '';
      const promptLine = document.createElement('div');
      promptLine.className = 'cli-line';
      promptLine.innerHTML = `<div class="cli-input-line"><span class="cli-cursor"></span></div>`;
      cliBody.appendChild(promptLine);
      return;
    }
    
    const responseText = commands[commandName] || `Command not found. Try /about, /experience, /skills, or /ai-projects.`;
    
    // Temporary loading indicator
    const loadingLine = document.createElement('div');
    loadingLine.className = 'cli-response';
    loadingLine.innerHTML = `<span style="color: var(--text-muted)">Querying agent...</span>`;
    cliBody.appendChild(loadingLine);
    cliBody.scrollTop = cliBody.scrollHeight;
    
    setTimeout(() => {
      loadingLine.remove();
      typeText(responseText, cliBody, () => {
        // Add prompt cursor at bottom
        cliBody.scrollTop = cliBody.scrollHeight;
      });
    }, 400);
  };
  
  // Attach button click events
  cliButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cmd = e.target.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
  
  // Initial terminal prompt typing
  const welcomeText = `**Welcome User!**
I am the AI Profile Assistant for John Franklin Freitas. 
How can I assist you today? Click any of the prompt commands below to analyze my profile!`;
  
  typeText(welcomeText, cliBody);

  /* ==========================================
     5. PORTFOLIO GRID FILTERING
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Add animation effects
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        if (filterValue === 'all' || itemCategory.split(' ').includes(filterValue)) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  /* ==========================================
     6. TESTIMONIALS CAROUSEL
     ========================================== */
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  
  let currentSlideIdx = 0;
  const slideCount = slides.length;
  
  // Create dots dynamically
  slides.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.testimonial-dot');
  
  const updateSlidePosition = () => {
    track.style.transform = `translateX(-${currentSlideIdx * 100}%)`;
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIdx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };
  
  const goToSlide = (idx) => {
    currentSlideIdx = idx;
    updateSlidePosition();
  };
  
  const nextSlide = () => {
    currentSlideIdx = (currentSlideIdx + 1) % slideCount;
    updateSlidePosition();
  };
  
  const prevSlide = () => {
    currentSlideIdx = (currentSlideIdx - 1 + slideCount) % slideCount;
    updateSlidePosition();
  };
  
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  }
  
  // Auto-slide every 8 seconds
  let autoSlideTimer = setInterval(nextSlide, 8000);
  
  // Reset auto-slide timer when manually clicking buttons
  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 8000);
  };
  
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', resetAutoSlide);
    prevBtn.addEventListener('click', resetAutoSlide);
  }
  dots.forEach(dot => dot.addEventListener('click', resetAutoSlide));

  /* ==========================================
     7. SKILL BARS ANIMATION ON SCROLL
     ========================================== */
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPercent = bar.getAttribute('data-percent');
        bar.style.width = `${targetPercent}%`;
        observer.unobserve(bar); // Stop observing after animation triggers
      }
    });
  };
  
  const skillsObserverOptions = {
    threshold: 0.1
  };
  
  const skillsObserver = new IntersectionObserver(animateSkills, skillsObserverOptions);
  skillBars.forEach(bar => skillsObserver.observe(bar));

  /* ==========================================
     8. EXPANDABLE TIMELINE TOGGLE
     ========================================== */
  const toggleBtn = document.getElementById('toggle-experience-btn');
  const hiddenWrapper = document.getElementById('hidden-experience-wrapper');
  
  if (toggleBtn && hiddenWrapper) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = hiddenWrapper.classList.toggle('expanded');
      
      if (isExpanded) {
        toggleBtn.innerHTML = `Show Less <i class="fa-solid fa-chevron-up"></i>`;
      } else {
        toggleBtn.innerHTML = `Show Older Experience <i class="fa-solid fa-chevron-down"></i>`;
        
        // Scroll back to the toggle button position after collapsing to maintain user focus
        toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
});