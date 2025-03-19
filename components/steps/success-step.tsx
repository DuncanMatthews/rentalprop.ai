import type { FormData } from "@/components/intake-form"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface SuccessStepProps {
  formData: FormData
}

export function SuccessStep({ formData }: SuccessStepProps) {
  const getAccountTypeLabel = () => {
    switch (formData.accountType) {
      case "tenant":
        return "Tenant"
      case "property-manager":
        return "Property Manager"
      case "service-pro":
        return "Service Professional"
      case "property-owner":
        return "Property Owner"
      default:
        return "User"
    }
  }

  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Registration Complete!</h1>
        <p className="text-lg text-gray-600">Thank you for registering as a {getAccountTypeLabel()}.</p>
      </div>

      <div className="space-y-2">
        <p className="text-gray-600">
          Weve sent a confirmation email to <span className="font-medium">{formData.email}</span>.
        </p>
        <p className="text-gray-600">Please check your inbox and follow the instructions to verify your account.</p>
      </div>

      <div className="pt-4">
        <Link href="/dashboard">
          <Button className="bg-green-600 hover:bg-green-700 text-white">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

