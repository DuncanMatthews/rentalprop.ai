
'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function GeneralPropertyData() {
    const supabase = createClient();
    const [userId, setUserId] = useState("");
    
    useEffect(() => {
      async function fetchSession() {
        const { data } = await supabase.auth.getSession();
        setUserId(data.session?.user?.id || "");
      }
      
      fetchSession();
    }, [supabase]);
    
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>General Property Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Property Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter property name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Street address"
            required
          />
        </div>

        {/* City, State, and Zip in one row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="City" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" placeholder="State" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              placeholder="Zip code"
              required
            />
          </div>
        </div>

        {/* Year Built and Total Units in one row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input
              id="yearBuilt"
              name="yearBuilt"
              type="number"
              placeholder="Year built"
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* Hidden field to automatically assign property to current user */}
          <input type="hidden" name="ownerId" value={userId} />
        </div>
      </CardContent>
    </Card>
  );
}
