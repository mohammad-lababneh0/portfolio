
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('serviceCart') || '[]'
            )
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('serviceCart', JSON.stringify(cart))
    }, [cart])

    function addToCart(service) {
        const isLoggedIn =
            localStorage.getItem('isLoggedIn') === 'true'

        if (!isLoggedIn) {
            return false
        }

        setCart((currentCart) => {
            const exists = currentCart.some(
                (item) => item.id === service.id
            )

            if (exists) {
                return currentCart
            }

            return [...currentCart, service]
        })

        return true
    }

    function removeFromCart(serviceId) {
        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.id !== serviceId
            )
        )
    }

    function clearCart() {
        setCart([])
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error(
            'useCart must be used inside CartProvider'
        )
    }

    return context
}
