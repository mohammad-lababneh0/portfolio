
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cropper from 'react-easy-crop'

function Register() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [message, setMessage] = useState('')

    const [imageToCrop, setImageToCrop] = useState('')
    const [cropModalOpen, setCropModalOpen] = useState(false)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const navigate = useNavigate()

    function handleImageChange(event) {
        const file = event.target.files?.[0]
        event.target.value = ''

        if (!file) return

        if (!file.type.startsWith('image/')) {
            setMessage('Please select a valid image.')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage('Image size must be less than 5MB.')
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            setImageToCrop(reader.result)
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setCropModalOpen(true)
            setMessage('')
        }

        reader.onerror = () => {
            setMessage('Could not read this image. Please try again.')
        }

        reader.readAsDataURL(file)
    }

    function onCropComplete(_, croppedPixels) {
        setCroppedAreaPixels(croppedPixels)
    }

    function createCroppedImage() {
        return new Promise((resolve, reject) => {
            if (!imageToCrop || !croppedAreaPixels) {
                reject(new Error('Please select the crop area.'))
                return
            }

            const image = new Image()

            image.onload = () => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')

                if (!context) {
                    reject(new Error('Could not process this image.'))
                    return
                }

                const size = 400
                canvas.width = size
                canvas.height = size

                context.drawImage(
                    image,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    size,
                    size
                )

                resolve(canvas.toDataURL('image/jpeg', 0.85))
            }

            image.onerror = () => reject(new Error('Could not load this image.'))
            image.src = imageToCrop
        })
    }

    async function handleSaveCrop() {
        try {
            const croppedImage = await createCroppedImage()
            setProfileImage(croppedImage)
            setCropModalOpen(false)
            setImageToCrop('')
            setMessage('')
        } catch {
            setMessage('Could not crop the image. Please try again.')
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        setMessage('')

        if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
            setMessage('Please fill in all required fields.')
            return
        }

        if (password.length < 8) {
            setMessage('Password must be at least 8 characters.')
            return
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }

        const user = {
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            profileImage,
        }

        try {
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/login')
        } catch {
            setMessage('Unable to save your account. Try a smaller image.')
        }
    }

    return (
        <main className="login-container">
            <section className="login-card">
                <h1>Create Account</h1>
                <p>Create your portfolio account</p>

                <form onSubmit={handleSubmit}>
                    <div className="profile-upload">
                        <label htmlFor="profileImage" className="profile-image-label">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile preview"
                                    className="profile-image-preview"
                                />
                            ) : (
                                <div className="profile-image-placeholder">
                                    <span>+</span>
                                    <small>Add Photo</small>
                                </div>
                            )}
                        </label>

                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <p>
                            {profileImage
                                ? 'Click the photo to change or edit it'
                                : 'Upload a photo (optional)'}
                        </p>
                    </div>

                    <label htmlFor="fullName">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Enter your full name"
                    />

                    <label htmlFor="registerEmail">Email</label>
                    <input
                        id="registerEmail"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                    />

                    <label htmlFor="registerPassword">Password</label>
                    <input
                        id="registerPassword"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="At least 8 characters"
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm your password"
                    />

                    <button type="submit">Create Account</button>
                </form>

                <p className="login-message">{message}</p>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </section>

            {cropModalOpen && (
                <div className="crop-modal-overlay">
                    <section
                        className="crop-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="crop-title"
                    >
                        <h2 id="crop-title">Adjust Your Photo</h2>
                        <p>Drag the photo and zoom until it fits perfectly.</p>

                        <div className="cropper-container">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <div className="crop-zoom-control">
                            <label htmlFor="photoZoom">Zoom</label>
                            <input
                                id="photoZoom"
                                type="range"
                                min={1}
                                max={3}
                                step={0.05}
                                value={zoom}
                                onChange={(event) => setZoom(Number(event.target.value))}
                            />
                        </div>

                        <div className="crop-modal-actions">
                            <button
                                type="button"
                                className="crop-cancel-button"
                                onClick={() => {
                                    setCropModalOpen(false)
                                    setImageToCrop('')
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="crop-save-button"
                                onClick={handleSaveCrop}
                            >
                                Save Photo
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    )
}

export default Register
