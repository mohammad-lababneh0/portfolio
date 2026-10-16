import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import ServiceCard from '../components/ServiceCard'
import ScrollToTop from '../components/ScrollToTop'
import ScrollReveal from '../components/ScrollReveal'
import AnimatedBackground from '../components/AnimatedBackground'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const location = useLocation()

    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 30,
    })

    const savedUser = (() => {
        try {
            return JSON.parse(
                localStorage.getItem('loggedInUser') || 'null'
            )
        } catch {
            return null
        }
    })()

    useEffect(() => {
        function handleMouseMove(event) {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 100,
                y: (event.clientY / window.innerHeight) * 100,
            })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }


    useEffect(() => {
    if (!location.hash) return

    const sectionId = location.hash.substring(1)

    requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    })
}, [location.pathname, location.hash])


    return (
        <>
            <Navbar />

            <main
                className="home"
                style={{
                    '--mouse-x': `${mousePosition.x}%`,
                    '--mouse-y': `${mousePosition.y}%`,
                }}
            >
                {}
                <AnimatedBackground />

                {}
                <section id="home" className="hero-section">
                    <p className="home-label">
                        WELCOME TO MY WORLD
                    </p>

                    <h1>
                        Hi,{' '}
                        <span className="gradient-text">
                            {savedUser?.fullName || 'Mohammad'}
                        </span>
                    </h1>

                    <h2>Web Developer & Graphic Designer</h2>

                    <p className="home-description">
                        I design and build modern websites, interactive interfaces,
                        and creative digital experiences that bring ideas to life.
                    </p>

                    <div className="hero-actions">
                        <a
                            href="#portfolio"
                            className="hero-button primary-button"
                        >
                            Explore My Work <span>↗</span>
                        </a>

                        <a
                            href="#contact"
                            className="hero-button secondary-button"
                        >
                            Let's Talk
                        </a>
                    </div>

                    <div className="hero-status">
                        <span className="status-dot" />
                        Available for opportunities
                    </div>

                    <div className="hero-decoration" aria-hidden="true">
                        <div className="orb orb-one" />
                        <div className="orb orb-two" />
                        <div className="orb orb-three" />

                        <div className="orbit-ring orbit-one" />
                        <div className="orbit-ring orbit-two" />

                        <span className="floating-code code-one">
                            &lt;React /&gt;
                        </span>

                        <span className="floating-code code-two">
                            {'{ Creative }'}
                        </span>

                        <span className="floating-code code-three">
                            Design × Code
                        </span>
                    </div>

                    <a href="#about" className="scroll-indicator">
                        <span className="scroll-line" />
                        Scroll to discover
                    </a>
                </section>

                {/* About Section */}
                <ScrollReveal>
                    <section id="about" className="about">
                        <p className="home-label">
                            01 / ABOUT ME
                        </p>

                        <h2>
                            Creativity meets{' '}
                            <span className="gradient-text">
                                technology.
                            </span>
                        </h2>

                        <p>
                            I'm Mohammad, a Web Developer and Graphic Designer.
                            I enjoy turning ideas into beautiful, responsive,
                            and interactive digital experiences. I combine visual
                            design with front-end development to create websites
                            that look great and work smoothly.
                        </p>

                        <div className="skills-row">
                            <span>React</span>
                            <span>JavaScript</span>
                            <span>HTML & CSS</span>
                            <span>Responsive Design</span>
                            <span>Graphic Design</span>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Services Section */}
                <ScrollReveal>
                    <section id="services" className="services">
                        <p className="home-label">
                            02 / WHAT I DO
                        </p>

                        <h2>
                            Services built for{' '}
                            <span className="gradient-text">
                                impact.
                            </span>
                        </h2>

                        <p className="services-description">
                            I combine development and design to create digital
                            experiences that make your brand stand out.
                        </p>

                        <div className="services-grid">
                            <ServiceCard
                                title="Web Development"
                                description="Building modern, responsive websites using React, JavaScript, and modern front-end technologies."
                            />

                            <ServiceCard
                                title="Frontend Development"
                                description="Creating interactive user interfaces with thoughtful details, smooth animations, and clean code."
                            />

                            <ServiceCard
                                title="Graphic Design"
                                description="Designing visual identities, digital content, and creative graphics that communicate your brand."
                            />
                        </div>
                    </section>
                </ScrollReveal>

                {/* Portfolio Section */}
                <ScrollReveal>
                    <section id="portfolio" className="portfolio">
                        <p className="home-label">
                            03 / SELECTED WORK
                        </p>

                        <h2>
                            Ideas turned into{' '}
                            <span className="gradient-text">
                                reality.
                            </span>
                        </h2>

                        <p className="portfolio-description">
                            A selection of work representing my interest in
                            development, digital experiences, and visual design.
                        </p>

                        <div className="portfolio-grid">
                            <article className="project-card">
                                <div className="project-image project-one">
                                    <span>01</span>
                                    <div className="project-glow" />
                                </div>

                                <div className="project-info">
                                    <p className="project-category">
                                        WEB DEVELOPMENT
                                    </p>

                                    <h3>Personal Portfolio</h3>

                                    <p>
                                        An interactive portfolio built to showcase
                                        projects, services, and creative work.
                                    </p>

                                    <span className="project-tag">
                                        React · JavaScript
                                    </span>
                                </div>
                            </article>

                            <article className="project-card">
                                <div className="project-image project-two">
                                    <span>02</span>
                                    <div className="project-glow" />
                                </div>

                                <div className="project-info">
                                    <p className="project-category">
                                        WEB DESIGN
                                    </p>

                                    <h3>Business Website</h3>

                                    <p>
                                        A responsive digital presence designed to
                                        present business services clearly.
                                    </p>

                                    <span className="project-tag">
                                        HTML · CSS
                                    </span>
                                </div>
                            </article>

                            <article className="project-card">
                                <div className="project-image project-three">
                                    <span>03</span>
                                    <div className="project-glow" />
                                </div>

                                <div className="project-info">
                                    <p className="project-category">
                                        VISUAL DESIGN
                                    </p>

                                    <h3>Creative Designs</h3>

                                    <p>
                                        Visual concepts combining creativity,
                                        typography, and modern branding.
                                    </p>

                                    <span className="project-tag">
                                        Graphic Design
                                    </span>
                                </div>
                            </article>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Contact Section */}
                <ScrollReveal>
                    <section id="contact" className="contact">
                        <p className="home-label">
                            04 / LET'S CONNECT
                        </p>

                        <h2>
                            Have an idea? Let's make it{' '}
                            <span className="gradient-text">
                                happen.
                            </span>
                        </h2>

                        <p className="contact-description">
                            Tell me about your project, your goals, or an opportunity.
                            I'd be happy to hear from you.
                        </p>

                        <form
                            className="contact-form"
                            onSubmit={(event) => {
                                event.preventDefault()
                                alert('Thanks for your message!')
                            }}
                        >
                            <label htmlFor="contact-name">
                                Your Name
                            </label>

                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                required
                            />

                            <label htmlFor="contact-email">
                                Your Email
                            </label>

                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                            />

                            <label htmlFor="contact-message">
                                Your Message
                            </label>

                            <textarea
                                id="contact-message"
                                name="message"
                                rows={5}
                                placeholder="Tell me about your project..."
                                required
                            />

                            <button type="submit">
                                Send Message <span>↗</span>
                            </button>
                        </form>
                    </section>
                </ScrollReveal>
            </main>

            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Home