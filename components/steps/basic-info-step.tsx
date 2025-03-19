"use client"

import type React from "react"
import type { FormData } from "@/components/intake-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface BasicInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  handleSubmit: (e: React.FormEvent) => void
  prevStep: () => void
  isSubmitting: boolean
}

export function BasicInfoStep({
  formData,
  updateFormData,
  handleSubmit,
  prevStep,
  isSubmitting,
}: BasicInfoStepProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "numberOfUnits") {
      updateFormData({ [name]: Number.parseInt(value) || 0 })
    } else {
      updateFormData({ [name]: value })
    }

    // Clear error for this field
    setValidationErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.numberOfUnits <= 0) {
      newErrors.numberOfUnits = "Number of units must be greater than 0"
    }

    setValidationErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!validate()) {
      return
    }
    
    // Call the parent component's handleSubmit function
    handleSubmit(e)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Rest of the form remains unchanged */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Basic Information</h1>
        <p className="text-lg text-gray-600">Please provide your details to complete your registration.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className={validationErrors.firstName ? "border-red-500" : ""}
            />
            {validationErrors.firstName && <p className="text-sm text-red-500">{validationErrors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className={validationErrors.lastName ? "border-red-500" : ""}
            />
            {validationErrors.lastName && <p className="text-sm text-red-500">{validationErrors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className={validationErrors.phone ? "border-red-500" : ""}
          />
          {validationErrors.phone && <p className="text-sm text-red-500">{validationErrors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfUnits">Number of Units</Label>
          <Input
            id="numberOfUnits"
            name="numberOfUnits"
            type="number"
            min="1"
            value={formData.numberOfUnits}
            onChange={handleChange}
            className={validationErrors.numberOfUnits ? "border-red-500" : ""}
          />
          {validationErrors.numberOfUnits && <p className="text-sm text-red-500">{validationErrors.numberOfUnits}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={validationErrors.password ? "border-red-500" : ""}
          />
          {validationErrors.password && <p className="text-sm text-red-500">{validationErrors.password}</p>}
          <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" onClick={prevStep} variant="outline" disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" className="bg-blue-100 hover:bg-blue-200 text-blue-800" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  )
}