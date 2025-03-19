"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Add this type definition
type ActionState = {
  success: boolean;
  message: string;
};
export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// Update the signup function to handle the state parameter
export async function signup(prevState: ActionState, formData: FormData) {
  const supabase = await createClient();

  // Extract auth data
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Map account type to UserRole
  const accountTypeToRole = {
    tenant: "TENANT",
    "property-manager": "MANAGER",
    "service-pro": "MAINTENANCE",
    "property-owner": "OWNER",
  };

  const accountType = formData.get("account_type") as string;
  const role =
    accountTypeToRole[accountType as keyof typeof accountTypeToRole] ||
    "TENANT";

  // Sign up the user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp(data);

  if (authError) {
    console.error("Authentication error:", authError);
    return {
      success: false,
      message: authError.message,
    };
  }

  // If authentication was successful and we have a user
  if (authData.user) {
    try {
      // Create a user record in your database using Prisma
      const { error: dbError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: authData.user.email,
        firstName: formData.get("first_name") as string,
        lastName: formData.get("last_name") as string,
        phone: formData.get("phone") as string,
        numberOfUnits: parseInt(formData.get("number_of_units") as string) || 1,
        displayName: formData.get("display_name") as string,
        role: role,
        accountType: accountType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Database error:", dbError);
        return {
          success: false,
          message: dbError.message,
        };
      }
    } catch (error) {
      console.error("Error creating user record:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }

  // Return success state instead of redirecting
  return {
    success: true,
    message: "Account created successfully!",
  };
}
