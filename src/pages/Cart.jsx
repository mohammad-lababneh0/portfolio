
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'
import Navbar from '../components/Navbar'

function Cart() {
    const { cart, total, removeFromCart } = useCart()
    const navigate = useNavigate()

    function handleCheckout() {
        const isLoggedIn =
            localStorage.getItem('isLoggedIn') === 'true'

        if (!isLoggedIn) {
            alert('يرجى تسجيل الدخول أولاً لإكمال طلبك.')
            navigate('/login')
            return
        }

        alert(
            'السلة جاهزة. سنضيف صفحة إتمام الطلب والدفع في الخطوة التالية.'
        )
    }

    return (
        <>
            <Navbar />

            <main className="cart-page">
                <header className="cart-header">
                    <p className="cart-label">YOUR SELECTION / 02</p>

                    <h1>
                        Your <span>Cart.</span>
                    </h1>

                    <p>
                        راجع الخدمات التي اخترتها قبل إتمام طلبك.
                    </p>
                </header>

                {cart.length === 0 ? (
                    <section className="cart-empty">
                        <div className="cart-empty-icon">◇</div>

                        <h2>سلتك فارغة حاليًا</h2>

                        <p>
                            تصفح الخدمات واختر ما يناسب مشروعك.
                        </p>

                        <Link
                            to="/services"
                            className="cart-primary-button"
                        >
                            استكشف الخدمات ↗
                        </Link>
                    </section>
                ) : (
                    <section className="cart-layout">
                        <div className="cart-items">
                            {cart.map((item) => (
                                <article
                                    className="cart-item"
                                    key={item.id}
                                >
                                    <div className="cart-item-icon">
                                        {item.icon}
                                    </div>

                                    <div className="cart-item-info">
                                        <h2>{item.title}</h2>

                                        <p>{item.description}</p>

                                        <button
                                            type="button"
                                            className="cart-remove"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                        >
                                            حذف الخدمة
                                        </button>
                                    </div>

                                    <strong className="cart-item-price">
                                        {item.price} JOD
                                    </strong>
                                </article>
                            ))}

                            <Link
                                to="/services"
                                className="cart-back-link"
                            >
                                ← متابعة تصفح الخدمات
                            </Link>
                        </div>

                        <aside className="cart-summary">
                            <p className="cart-label">
                                ORDER SUMMARY
                            </p>

                            <h2>ملخص الطلب</h2>

                            <div className="cart-summary-row">
                                <span>عدد الخدمات</span>
                                <span>{cart.length}</span>
                            </div>

                            <div className="cart-summary-row">
                                <span>المجموع</span>
                                <strong>
                                    {total.toFixed(2)} JOD
                                </strong>
                            </div>

                            <div className="cart-summary-total">
                                <span>الإجمالي المبدئي</span>
                                <strong>
                                    {total.toFixed(2)} JOD
                                </strong>
                            </div>

                            <button
                                type="button"
                                className="cart-checkout-button"
                                onClick={handleCheckout}
                            >
                                المتابعة لإتمام الطلب ↗
                            </button>

                            <p className="cart-secure-note">
                                الدفع الإلكتروني لم يتم تفعيله بعد.
                            </p>
                        </aside>
                    </section>
                )}
            </main>
        </>
    )
}

export default Cart
