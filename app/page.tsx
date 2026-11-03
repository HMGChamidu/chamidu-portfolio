'use client';

import Image from 'next/image';
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  visual: 'smart' | 'memo' | 'docker' | 'web' | 'solar';
  href?: string;
  linkLabel?: string;
};

const projects: Project[] = [
  {
    number: '01',
    name: 'SmartPresence',
    category: 'Attendance verification · Capstone',
    description:
      'A BLE-powered attendance platform designed around proximity validation, biometric device binding, and server-side verification.',
    technologies: ['Spring Boot', 'React Native', 'PostgreSQL', 'AWS', 'Terraform', 'Docker'],
    visual: 'smart',
  },
  {
    number: '02',
    name: 'MemoMap',
    category: 'iOS application',
    description:
      'A personal memory app for capturing moments with photos, location details, maps, and searchable content.',
    technologies: ['SwiftUI', 'Firebase', 'Firestore', 'MapKit', 'Vision'],
    visual: 'memo',
  },
  {
    number: '03',
    name: 'Containerized Web App',
    category: 'DevOps practice project',
    description:
      'A multi-container Node.js and MySQL application exploring Dockerfiles, Compose networking, environment configuration, and deployment workflows.',
    technologies: ['Node.js', 'Express', 'Docker', 'Compose', 'MySQL'],
    visual: 'docker',
    href: 'https://github.com/HMGChamidu/docker-node-mysql-app',
    linkLabel: 'View repository',
  },
  {
    number: '04',
    name: 'Wolf CS Sri Lanka',
    category: 'Responsive website',
    description:
      'A responsive web experience created to present products and provide a straightforward browsing experience across screen sizes.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    visual: 'web',
    href: 'https://github.com/HMGChamidu/MyFirstWebSite',
    linkLabel: 'View repository',
  },
  {
    number: '05',
    name: 'Solar Generation API',
    category: 'REST API · Coursework',
    description:
      'An API concept for organizing solar generation infrastructure and time-series readings across a geographic asset hierarchy.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    visual: 'solar',
  },
];

const skillGroups = [
  {
    title: 'Full-stack development',
    items: ['Java', 'JavaScript', 'TypeScript', 'Spring Boot', 'Node.js', 'Express', 'React', 'React Native'],
  },
  {
    title: 'DevOps & cloud',
    items: ['AWS', 'Docker', 'Docker Compose', 'Terraform', 'Linux', 'Git', 'GitHub'],
  },
  {
    title: 'Data & security',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs', 'JWT', 'OAuth2'],
  },
];

function ArrowUpRight() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'smart') {
    return (
      <div className="visual visual-smart" aria-label="Abstract SmartPresence project illustration">
        <div className="smart-top"><span>SMARTPRESENCE</span><span className="live-dot">SYSTEM ACTIVE</span></div>
        <div className="smart-center">
          <div className="radar-ring ring-one" /><div className="radar-ring ring-two" />
          <div className="radar-core"><span>BLE</span><small>NEARBY</small></div>
          <i className="radar-point point-a" /><i className="radar-point point-b" /><i className="radar-point point-c" />
        </div>
        <div className="smart-bottom"><span>DEVICE VERIFIED</span><span>08-STEP VALIDATION</span></div>
      </div>
    );
  }
  if (type === 'memo') {
    return (
      <div className="visual visual-memo" aria-label="Abstract MemoMap project illustration">
        <div className="memo-map-grid" />
        <div className="memo-map-path" />
        <div className="memo-pin pin-one">✦</div><div className="memo-pin pin-two">✦</div>
        <div className="memo-card"><span className="memo-card-label">A MEMORY, SAVED</span><strong>Somewhere<br />worth remembering.</strong><small>LOCATION SAVED</small></div>
        <div className="memo-date">JOURNAL / 2026</div>
      </div>
    );
  }
  if (type === 'docker') {
    return (
      <div className="visual visual-docker" aria-label="Abstract Docker project illustration">
        <div className="terminal-bar"><i /><i /><i /><span>compose.yaml</span></div>
        <div className="terminal-code"><span className="code-muted">services:</span><br /><b>  web:</b><br /><em>    build: .</em><br /><em>    ports: [8081:3000]</em><br /><b>  db:</b><br /><em>    image: mysql:8.0</em><br /><span className="code-ok">✓ containers running</span></div>
        <div className="container-stack"><span>WEB</span><span>DB</span></div>
      </div>
    );
  }
  if (type === 'web') {
    return (
      <div className="visual visual-web" aria-label="Abstract responsive website illustration">
        <div className="web-window"><div className="web-window-top"><span /><span /><span /></div><div className="web-layout"><div className="web-copy"><i /><b /><b /><small /></div><div className="web-product"><div /></div></div><div className="web-foot"><i /><i /><i /></div></div>
        <div className="web-caption">WOLF CS / WEB EXPERIENCE</div>
      </div>
    );
  }
  return (
    <div className="visual visual-solar" aria-label="Abstract solar generation API illustration">
      <div className="solar-sun" /><div className="solar-horizon" />
      <div className="solar-panel panel-left" /><div className="solar-panel panel-right" />
      <div className="solar-data"><span>GENERATION / LIVE</span><strong>kWh</strong><small>TIME-SERIES DATA</small></div>
    </div>
  );
}

function handleProjectPointerMove(event: ReactPointerEvent<HTMLElement>) {
  // Keep the tilt subtle and limit it to mouse/trackpad pointers.
  if (event.pointerType !== 'mouse') return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  const rotateX = (0.5 - y) * 4;
  const rotateY = (x - 0.5) * 5;

  event.currentTarget.style.setProperty('--card-rotate-x', `${rotateX.toFixed(2)}deg`);
  event.currentTarget.style.setProperty('--card-rotate-y', `${rotateY.toFixed(2)}deg`);
}

function resetProjectPointer(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--card-rotate-x', '0deg');
  event.currentTarget.style.setProperty('--card-rotate-y', '0deg');
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={`project-card ${featured ? 'project-featured' : ''}`}
      onPointerMove={handleProjectPointerMove}
      onPointerLeave={resetProjectPointer}
    >
      <div className="project-visual-wrap"><ProjectVisual type={project.visual} /><span className="project-number">{project.number} / 05</span></div>
      <div className="project-info">
        <div className="project-heading"><div><p className="eyebrow">{project.category}</p><h3>{project.name}</h3></div>{project.href ? <a className="round-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel} for ${project.name}`}><ArrowUpRight /></a> : <span className="round-link round-link-muted" aria-hidden="true">↗</span>}</div>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">{project.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
        {project.href && <a className="text-link" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight /></a>}
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);



  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Cursor lighting is enabled only on devices with a precise hover pointer.
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
   
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
  let animationFrame = 0;

  const updateScrollUI = () => {
    if (animationFrame) return;

    animationFrame = window.requestAnimationFrame(() => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));

      const activationPoint =
        window.scrollY + window.innerHeight * 0.35;

      const sectionIds = ['work', 'about', 'experience', 'contact'];

      let currentSection: string | null = null;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (
          section &&
          section.getBoundingClientRect().top + window.scrollY <= activationPoint
        ) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
      animationFrame = 0;
    });
  };

  updateScrollUI();

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI);

  return () => {
    window.removeEventListener('scroll', updateScrollUI);
    window.removeEventListener('resize', updateScrollUI);

    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
  };
}, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true">
  <span
    className="scroll-progress-fill"
    style={{ transform: `scaleX(${scrollProgress / 100})` }}
  />
</div>
      <div className="cursor-glow" aria-hidden="true" />
      <header className="site-header">
        <a
  href="#top"
  className="brand"
  onClick={closeMenu}
  aria-label="Chamidu Sandeepa home"
>
  <span className="brand-name">
    <span>C</span>hamidu <span>S</span>andeepa<span>.</span>
  </span>

  <span className="brand-role">
    DEVOPS ENGINEER <i>×</i> FULL-STACK DEVELOPER
  </span>
</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          <a
  href="#work"
  onClick={closeMenu}
  className={activeSection === 'work' ? 'nav-active' : ''}
>
  Work <span>01</span>
</a>

<a
  href="#about"
  onClick={closeMenu}
  className={activeSection === 'about' ? 'nav-active' : ''}
>
  About <span>02</span>
</a>

<a
  href="#experience"
  onClick={closeMenu}
  className={activeSection === 'experience' ? 'nav-active' : ''}
>
  Experience <span>03</span>
</a>

<a
  href="#contact"
  onClick={closeMenu}
  className={`nav-contact ${
    activeSection === 'contact' ? 'nav-active' : ''
  }`}
>
  Let&apos;s talk <ArrowUpRight />
</a>
        </nav>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-main">
          <p className="hero-kicker"><span className="status-dot" /> COMPUTING & INFORMATION SYSTEMS UNDERGRADUATE</p>
          <h1>Engineering<br /><span>with intention.</span></h1>
          <div className="hero-bottom">
            <p className="hero-description">I build web applications, backend systems, and cloud-based solutions — connecting thoughtful engineering with real-world needs.</p>
            <div className="hero-actions"><a href="#work" className="button button-primary">Explore my work <ArrowUpRight /></a><a href="#contact" className="button button-text">Get in touch <ArrowUpRight /></a></div>
          </div>
        </div>
        <div className="hero-art" aria-label="Portrait surrounded by rotating technology rings">
          <div className="art-orbit orbit-outer" />
          <div className="art-orbit orbit-inner" />
          <div className="art-photo">
            <Image
              src="/chamidu-portrait.png"
              alt="Portrait of Chamidu Sandeepa"
              fill
              priority
              sizes="(max-width: 760px) 46vw, (max-width: 1050px) 42vw, 272px"
              className="art-photo-image"
            />
          </div>
          <div className="art-cross cross-one" /><div className="art-cross cross-two" />
          <div className="art-node node-one"><i /> API</div><div className="art-node node-two"><i /> CLOUD</div><div className="art-node node-three"><i /> CODE</div>
          <span className="art-coordinate">MATARA<br />SRI LANKA</span>
          <span className="art-index">FIG. 001 / SYSTEMS THINKING</span>
        </div>
        <div className="hero-foot"><span>BASED IN MATARA, SRI LANKA</span><span>SCROLL TO EXPLORE <b>↓</b></span><span>AVAILABLE FOR INTERNSHIPS <i className="status-dot" /></span></div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>DEVOPS ENGINEERING</span><b>✳</b><span>FULL-STACK DEVELOPMENT</span><b>✳</b><span>CLOUD SYSTEMS</span><b>✳</b><span>DEVOPS ENGINEERING</span><b>✳</b><span>FULL-STACK DEVELOPMENT</span><b>✳</b><span>CLOUD SYSTEMS</span><b>✳</b></div></div>

      <section className="work section-shell section-space" id="work">
        <div className="section-heading" data-reveal><div><p className="section-index">01 / SELECTED WORK</p><h2>Ideas into<br /><span>implementations.</span></h2></div><p className="section-note">A selection of projects, experiments, and engineering work that reflect what I enjoy building.</p></div>
        <div className="featured-grid" data-reveal><ProjectCard project={projects[0]} featured /></div>
        <div className="project-grid" data-reveal>{projects.slice(1, 3).map((project) => <ProjectCard key={project.number} project={project} />)}</div>
        <div className="project-grid project-grid-lower" data-reveal>{projects.slice(3).map((project) => <ProjectCard key={project.number} project={project} />)}</div>
      </section>

      <section className="about section-shell section-space" id="about">
        <div className="section-heading" data-reveal><div><p className="section-index">02 / A LITTLE ABOUT ME</p><h2>Curious about systems.<br /><span>Focused on solutions.</span></h2></div><p className="section-note">A student of computing, a builder by practice, and always learning.</p></div>
        <div className="about-layout" data-reveal>
          <div className="about-statement"><span className="about-quote">“</span><p>I enjoy working across the software lifecycle — from designing backend systems and building user interfaces to exploring cloud infrastructure and deployment workflows.</p><div className="signature-line"><span>CHAMIDU SANDEEPA</span><span>MATARA, SRI LANKA</span></div></div>
          <div className="about-copy"><p>I’m an undergraduate in Computing and Information Systems at Sabaragamuwa University of Sri Lanka. My interests sit at the intersection of DevOps engineering and full-stack development.</p><p>I like understanding how the pieces fit together: how an application is designed, how its services communicate, how data is managed, and how the whole system can be deployed reliably.</p><p>Every project is an opportunity to learn, experiment, and become a better engineer.</p><a className="text-link" href="https://github.com/HMGChamidu" target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight /></a></div>
        </div>
        <div className="skills-area" data-reveal><div className="skills-title"><p className="section-index">THE TOOLKIT</p><h3>Technologies I work with.</h3></div><div className="skills-groups">{skillGroups.map((group) => <div className="skill-group" key={group.title}><h4>{group.title}</h4><div className="tag-list">{group.items.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></div>)}</div></div>
      </section>

      <section className="experience section-shell section-space" id="experience">
        <div className="section-heading" data-reveal><div><p className="section-index">03 / EXPERIENCE & EDUCATION</p><h2>Learning through<br /><span>doing.</span></h2></div><p className="section-note">Where I’m developing my engineering practice and building a foundation for what comes next.</p></div>
        <div className="timeline" data-reveal>
          <article className="timeline-item"><div className="timeline-date">AXCETRO</div><div className="timeline-content"><p className="eyebrow">EXPERIENCE</p><h3>DevOps Engineering &<br />Full-Stack Development</h3><p>My Axcetro experience has involved DevOps engineering and full-stack development, building my understanding of application development and software delivery.</p><div className="tag-list"><span className="tag">Full-stack development</span><span className="tag">DevOps engineering</span></div></div><span className="timeline-mark" /></article>
          <article className="timeline-item"><div className="timeline-date">EXPECTED 2028</div><div className="timeline-content"><p className="eyebrow">EDUCATION</p><h3>BSc (Hons) Computing &<br />Information Systems</h3><p>Sabaragamuwa University of Sri Lanka</p><div className="tag-list"><span className="tag">Computing</span><span className="tag">Information Systems</span></div></div><span className="timeline-mark" /></article>
        </div>
      </section>

      <section className="contact section-shell" id="contact" data-reveal>
        <div className="contact-top"><p className="section-index">04 / YOUR NEXT MOVE</p><span className="contact-orbit">✳</span></div>
        <h2>Let&apos;s build<br /><span>something meaningful.</span></h2>
        <div className="contact-bottom"><p>Open to internship opportunities, collaborations, and interesting projects. Have an idea or opportunity? Let’s connect.</p><a href="mailto:chamindusandeepa339@gmail.com" className="button button-dark">Start a conversation <ArrowUpRight /></a></div>
        <div className="contact-links"><a href="mailto:chamindusandeepa339@gmail.com">EMAIL <ArrowUpRight /></a><a href="https://www.linkedin.com/in/chamidu-sandeepa-431025311" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight /></a><a href="https://github.com/HMGChamidu" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight /></a></div>
      </section>

      <footer className="site-footer section-shell"><a href="#top" className="brand"><span>CS</span><i>.</i></a><span>© 2026 CHAMIDU SANDEEPA</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
