"use client";

import { createProperty } from "@/actions/property-actions";
import GeneralPropertyData from "./general-property-data";
import { Button } from "@/components/ui/button";
import PropertyTypeTab from "./property-type";

export default function AddPropertyForm() {
  return (
    <form action={createProperty} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
      <GeneralPropertyData />
        <PropertyTypeTab />
        {/* <PropertyImages /> */}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Property</Button>
      </div>
    </form>
  );
}