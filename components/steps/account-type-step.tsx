"use client"

import type { FormData, AccountType } from "@/components/intake-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HelpCircle, Users, Briefcase, Wrench } from "lucide-react"

interface AccountTypeStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
}

export function AccountTypeStep({ formData, updateFormData, nextStep }: AccountTypeStepProps) {
  const handleSelectAccountType = (type: AccountType) => {
    updateFormData({ accountType: type })
  }

  const handleNext = () => {
    if (formData.accountType) {
      nextStep()
    }
  }

  const accountTypes = [
    {
      id: "tenant",
      title: "I'm renting",
      subtitle: "Tenant",
      icon: <Users className="h-8 w-8 text-green-500" />,
      badge: "Free account",
    },
    {
      id: "property-manager",
      title: "I manage rentals",
      subtitle: "Property Manager",
      icon: <Briefcase className="h-8 w-8 text-green-500" />,
      badge: "Free 14-day trial",
    },
    {
      id: "service-pro",
      title: "I fix rentals",
      subtitle: "Service Pro",
      icon: <Wrench className="h-8 w-8 text-green-500" />,
      badge: "Free account",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Account type</h1>
        <p className="text-lg text-gray-600">Choose the user account type that suits your needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accountTypes.map((type) => (
          <Card
            key={type.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-md ${
              formData.accountType === type.id ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => handleSelectAccountType(type.id as AccountType)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">{type.icon}</div>
                <div className="absolute -top-2 -right-2">
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{type.title}</h3>
                <p className="text-gray-500">{type.subtitle}</p>
              </div>
              <div
                className={`text-sm ${type.id === "property-manager" ? "bg-green-500 text-white px-3 py-1 rounded-md" : "text-gray-500"}`}
              >
                {type.badge}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <p className="text-center text-gray-600 mb-6">
          Im a <span className="text-green-600 font-medium">Property Owner</span>. My properties are managed by
          Property Managers.
        </p>
        <Button
          onClick={handleNext}
          disabled={!formData.accountType}
          className="w-full md:w-auto md:min-w-[200px] mx-auto block bg-blue-100 hover:bg-blue-200 text-blue-800"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

