
import { useCart } from '../context/CartContext'
import './Services.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const services = [
    {
        id: 1,
        title: 'Landing Page',
        description:
            'تصميم وتطوير صفحة هبوط عصرية ومتجاوبة لعرض منتجك أو خدمتك.',
        price: 50,
        category: 'WEB DEVELOPMENT',
        icon: '◈',
    },
    {
        id: 2,
        title: 'React Website',
        description:
            'تطوير واجهة موقع تفاعلي باستخدام React مع تصميم متجاوب.',
        price: 150,
        category: 'FRONTEND DEVELOPMENT',
        icon: '⌘',
    },
    {
        id: 3,
        title: 'Business Website',
        description:
            'موقع احترافي لعرض شركتك وخدماتك ومعلومات التواصل.',
        price: 120,
        category: 'WEB DESIGN',
        icon: '▧',
    },
    {
        id: 4,
        title: 'Graphic Design',
        description:
            'تصميم مواد بصرية إبداعية لهويتك التجارية ومحتواك الرقمي.',
        price: 25,
        category: 'GRAPHIC DESIGN',
        icon: '✳',
    },
]

function Services() {
    const { cart, addToCart } = useCart()
    const navigate = useNavigate()
    const [showLoginModal, setShowLoginModal] = useState(false)

    return (
        <>


            <Navbar />

            
            <main className="services-page">
                <div className="services-glow glow-one" />
                <div className="services-glow glow-two" />

                <header className="services-header">
                    <p className="services-label">
                        MY SERVICES / 01
                    </p>

                    <h1>
                        Turn your ideas into{' '}
                        <span>reality.</span>
                    </h1>

                    <p className="services-intro">
                        اختر الخدمة المناسبة لمشروعك، وأضفها إلى سلتك
                        لمراجعة طلبك قبل المتابعة.
                    </p>

                    <div className="services-header-info">
                        <span>CREATIVE SOLUTIONS</span>
                        <span>DESIGN × DEVELOPMENT</span>
                    </div>
                </header>

                <section className="services-list">
                    {services.map((service, index) => {
                        const isAdded = cart.some(
                            (item) => item.id === service.id
                        )

                        return (
                            <article
                                className="service-product"
                                key={service.id}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="service-product-top">
                                    <span className="service-product-icon">
                                        {service.icon}
                                    </span>

                                    <span className="service-product-number">
                                        0{index + 1}
                                    </span>
                                </div>

                                <p className="service-product-category">
                                    {service.category}
                                </p>

                                <h2>{service.title}</h2>

                                <p className="service-product-description">
                                    {service.description}
                                </p>

                                <div className="service-product-bottom">
                                    <div className="service-price">
                                        <span>Starting from</span>

                                        <strong>
                                            {service.price}
                                            <small> JOD</small>
                                        </strong>
                                    </div>

                                    <button
                                        className={`service-add-button ${isAdded ? 'added' : ''}`}
                                        onClick={() => {
                                            const isLoggedIn =
                                                localStorage.getItem('isLoggedIn') === 'true'

                                            if (!isLoggedIn) {
                                                setShowLoginModal(true)
                                                return
                                            }

                                            const added = addToCart(service)

                                            if (!added) {
                                                setShowLoginModal(true)
                                            }
                                        }}
                                        disabled={isAdded}
                                    >
                                        {isAdded ? 'Added ✓' : 'اطلب الخدمة +'}
                                    </button>
                                </div>
                            </article>
                        )
                    })}
                </section>

                <div className="services-bottom">
                    <p>HAVE A DIFFERENT PROJECT IN MIND?</p>
                    <a href="/home#contact">
                        Let's discuss your idea ↗
                    </a>
                </div>


                {showLoginModal && (
    <div
        className="login-modal-overlay"
        onClick={() => setShowLoginModal(false)}
    >
        <section
            className="login-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
        >
            <button
                type="button"
                className="login-modal-close"
                onClick={() => setShowLoginModal(false)}
                aria-label="إغلاق"
            >
                ×
            </button>

            <div className="login-modal-icon">
                <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <rect x="4" y="10" width="16" height="11" rx="3" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                </svg>
            </div>

            <p className="login-modal-label">ACCOUNT REQUIRED</p>

            <h2 id="login-modal-title">لحظة واحدة!</h2>

            <p className="login-modal-description">
                سجّل دخولك أولاً لتتمكن من إضافة الخدمات إلى سلتك
                والبدء بطلب خدماتك.
            </p>

            <div className="login-modal-actions">
                <button
                    type="button"
                    className="login-modal-primary"
                    onClick={() => navigate('/login')}
                >
                    تسجيل الدخول
                    <span>↗</span>
                </button>

                <button
                    type="button"
                    className="login-modal-secondary"
                    onClick={() => setShowLoginModal(false)}
                >
                    إلغاء
                </button>
            </div>

            <p className="login-modal-footer">
                ليس لديك حساب؟{' '}
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                >
                    أنشئ حسابًا جديدًا
                </button>
            </p>
        </section>
    </div>
)}
            </main>
        </>
    )
}

export default Services
