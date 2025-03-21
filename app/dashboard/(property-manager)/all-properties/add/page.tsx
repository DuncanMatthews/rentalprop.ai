import { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import AddPropertyForm from "@/components/property/add-property-form";

export const metadata: Metadata = {
  title: "Add Property",
  description: "Add a new property to your portfolio",
};

export default function AddPropertyPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="Add New Property"
        description="Fill in the details below to add a new property to your portfolio."
      />

      <div className="">
        <AddPropertyForm />
      </div>
    </div>
  );
}
