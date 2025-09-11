import * as React from "react"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    let variantClasses = ""
    let sizeClasses = ""

    // Variants
    switch (variant) {
      case "destructive":
        variantClasses = "bg-red-600 text-white hover:bg-red-700"
        break
      case "outline":
        variantClasses = "border border-gray-300 bg-white hover:bg-gray-100"
        break
      case "secondary":
        variantClasses = "bg-gray-200 text-gray-900 hover:bg-gray-300"
        break
      case "ghost":
        variantClasses = "bg-transparent hover:bg-gray-100"
        break
      case "link":
        variantClasses = "text-blue-600 underline-offset-4 hover:underline"
        break
      default:
        variantClasses = "bg-blue-600 text-white hover:bg-blue-700"
    }

    // Sizes
    switch (size) {
      case "sm":
        sizeClasses = "h-9 px-3 text-sm"
        break
      case "lg":
        sizeClasses = "h-11 px-8 text-lg"
        break
      case "icon":
        sizeClasses = "h-10 w-10 flex items-center justify-center"
        break
      default:
        sizeClasses = "h-10 px-4 text-sm"
    }

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
