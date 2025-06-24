import React,{useRef, useState} from 'react'
import { axiosInstance } from '../../../../utils/axios.js'
import toast from 'react-hot-toast'
import {useDispatch} from "redux-toolkit"

const OTPvalidation = ({ isOpen,onClose, formData }) => {

    if (!isOpen) return null

    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isResending, setIsResending] = useState(false)
    const inputRefs = useRef([]);


    const handleInputChange = (index, value) => {
        if (value.length > 1) return 

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError("")

        if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i]
      }
    }

    setOtp(newOtp)
    setError("")

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const otpString = otp.join("")
        if (otpString.length !== 6) {
            setError("Please enter a complete 6-digit code")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const email=formData.email
            const res=await axiosInstance.post('/user/verify',{email,otp:otpString})
            console.log("Verifying OTP:", res.data.user)

            if(res.data.success){
                toast.success("OTP verified successfully!")
                onClose
            }
            else{
                toast.error(res.data.message)
            }
            
        } catch (err) {
            toast.error({error})
            setError("Invalid verification code. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        setIsResending(true)
        setError("")

        try {
        // Simulate resend API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert("New verification code sent!")
        } catch (err) {
        setError("Failed to resend code. Please try again.")
        } finally {
        setIsResending(false)
        }
    }

    const isComplete = otp.every((digit) => digit !== "")

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
                {/* Header */}
                <div className="text-center p-6 pb-4">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                    <p className="text-gray-600 text-sm">
                        We've sent a 6-digit verification code to {formData.email} . Enter the code below to continue.
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 text-center block">Verification Code</label>
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                                        aria-label={`Digit ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex">
                                    <svg
                                        className="h-5 w-5 text-red-400 mr-2 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !isComplete}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Verifying...
                                </div>
                            ) : (
                                "Verify Code"
                            )}
                        </button>
                    </form>

                    <div className="text-center space-y-2 mt-6">
                        <p className="text-sm text-gray-600">{"Didn't receive the code?"}</p>
                        <button
                            onClick={handleResend}
                            disabled={isResending}
                            className="text-green-600 hover:text-green-700 disabled:text-gray-400 text-sm font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
                        >
                            {isResending ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                "Resend Code"
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors focus:outline-none focus:underline">
                            Change phone number
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPvalidation
