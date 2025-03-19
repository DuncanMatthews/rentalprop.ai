"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { AccountTypeStep } from "@/components/steps/account-type-step";
import { EmailStep } from "@/components/steps/email-step";
import { BasicInfoStep } from "@/components/steps/basic-info-step";
import { SuccessStep } from "@/components/steps/success-step";
import { signup } from "@/app/actions";

export type AccountType =
  | "tenant"
  | "property-manager"
  | "service-pro"
  | "property-owner";

export type FormData = {
  accountType: AccountType | null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  numberOfUnits: number;
  password: string;
};

type ActionState = {
  success: boolean;
  message: string;
};

// Initial state with proper type
const initialState: ActionState = {
  success: false,
  message: "",
};

export function IntakeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    accountType: null,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    numberOfUnits: 1,
    password: "",
  });

  // Use useActionState instead of manual error handling
  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formDataObj: globalThis.FormData) => {
      try {
        await signup(initialState, formDataObj);
        return { ...prevState, success: true, message: "" };
      } catch (error) {
        return { 
          ...prevState, 
          success: false, 
          message: error instanceof Error ? error.message : "An error occurred" 
        };
      }
    },
    initialState
  );
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Prepare form data for submission
  const prepareFormSubmission = (formData: FormData) => {
    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append(
      "display_name",
      `${formData.firstName} ${formData.lastName}`
    );

    // Add additional user data that will be stored in the database
    formDataObj.append("account_type", formData.accountType || "");
    formDataObj.append("first_name", formData.firstName);
    formDataObj.append("last_name", formData.lastName);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("number_of_units", formData.numberOfUnits.toString());

    return formDataObj;
  };

  // Handle form submission
  const handleSubmitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = prepareFormSubmission(formData);
    
    // Wrap the formAction call in startTransition
    startTransition(() => {
      formAction(formDataObj);
    });
  };

  // If signup was successful, show success step
  // Fix: Move this to useEffect to avoid state updates during render
  useEffect(() => {
    if (state.success && step !== 4) {
      setStep(4);
    }
  }, [state.success, step]);

  // If signup was successful, show success step
  if (state.success && step !== 4) {
    setStep(4);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {state.message && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {state.message}
        </div>
      )}

      {step === 1 && (
        <AccountTypeStep
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <EmailStep
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <BasicInfoStep
          formData={formData}
          updateFormData={updateFormData}
          handleSubmit={handleSubmitSignup}
          prevStep={prevStep}
          isSubmitting={isPending}
        />
      )}
      {step === 4 && <SuccessStep formData={formData} />}
    </div>
  );
}
