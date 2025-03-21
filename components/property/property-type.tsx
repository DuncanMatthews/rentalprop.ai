"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Enums
enum PropertyTypeEnum {
  SINGLE_UNIT = "SINGLE_UNIT",
  MULTI_UNIT = "MULTI_UNIT",
}

enum UnitTypeEnum {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  CONDO = "CONDO",
  TOWNHOUSE = "TOWNHOUSE",
}

enum UnitStatus {
  VACANT = "VACANT",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
}

// Unit interface based on the model
interface Unit {
  id?: string
  unitNumber: string
  unitType: UnitTypeEnum
  propertyId?: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  rent: number
  status: UnitStatus
  createdAt?: Date
  updatedAt?: Date
}

export default function PropertyTypeTab() {
  const [propertyType, setPropertyType] = useState<PropertyTypeEnum>(PropertyTypeEnum.SINGLE_UNIT)
  const [singleUnit, setSingleUnit] = useState<Unit>(getEmptyUnit())
  const [multiUnits, setMultiUnits] = useState<Unit[]>([getEmptyUnit()])

  function getEmptyUnit(): Unit {
    return {
      unitNumber: "",
      unitType: UnitTypeEnum.APARTMENT,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 0,
      rent: 0,
      status: UnitStatus.VACANT,
    }
  }

  function handleTabChange(value: string) {
    setPropertyType(value as PropertyTypeEnum)
  }

  function handleSingleUnitChange(field: keyof Unit, value: string | number | UnitTypeEnum | UnitStatus) {
    setSingleUnit({ ...singleUnit, [field]: value })
  }


  function handleAddMultiUnit() {
    setMultiUnits([...multiUnits, getEmptyUnit()])
  }

  function handleRemoveMultiUnit(index: number) {
    const newUnits = [...multiUnits]
    newUnits.splice(index, 1)
    setMultiUnits(newUnits)
  }

 // Also fix these functions
 function handleMultiUnitChange(index: number, field: keyof Unit, value: string | number | UnitTypeEnum | UnitStatus) {
    const newUnits = [...multiUnits]
    newUnits[index] = { ...newUnits[index], [field]: value }
    setMultiUnits(newUnits)
  }

  // Create a JSON string of the units data for the hidden input
  const unitsData =
    propertyType === PropertyTypeEnum.SINGLE_UNIT ? JSON.stringify([singleUnit]) : JSON.stringify(multiUnits)

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hidden inputs to store the data for form submission */}
          <input type="hidden" name="propertyType" value={propertyType} />
          <input type="hidden" name="unitsData" value={unitsData} />

          <Tabs value={propertyType} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={PropertyTypeEnum.SINGLE_UNIT}>Single Unit</TabsTrigger>
              <TabsTrigger value={PropertyTypeEnum.MULTI_UNIT}>Multi Unit</TabsTrigger>
            </TabsList>

            <TabsContent value={PropertyTypeEnum.SINGLE_UNIT} className="mt-6">
              <Card className="border border-muted">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Unit Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="single-unit-number">Unit Number</Label>
                    <Input
                      id="single-unit-number"
                      value={singleUnit.unitNumber}
                      onChange={(e) => handleSingleUnitChange("unitNumber", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="single-unit-type">Unit Type</Label>
                    <Select
                      value={singleUnit.unitType}
                      onValueChange={(value) => handleSingleUnitChange("unitType", value)}
                    >
                      <SelectTrigger id="single-unit-type">
                        <SelectValue placeholder="Select unit type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UnitTypeEnum).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0) + type.slice(1).toLowerCase().replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="single-bedrooms">Bedrooms</Label>
                    <Input
                      id="single-bedrooms"
                      type="number"
                      min="0"
                      value={singleUnit.bedrooms}
                      onChange={(e) => handleSingleUnitChange("bedrooms", Number.parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="single-bathrooms">Bathrooms</Label>
                    <Input
                      id="single-bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      value={singleUnit.bathrooms}
                      onChange={(e) => handleSingleUnitChange("bathrooms", Number.parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="single-square-feet">Square Feet</Label>
                    <Input
                      id="single-square-feet"
                      type="number"
                      min="0"
                      value={singleUnit.squareFeet}
                      onChange={(e) => handleSingleUnitChange("squareFeet", Number.parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="single-rent">Rent</Label>
                    <Input
                      id="single-rent"
                      type="number"
                      min="0"
                      step="0.01"
                      value={singleUnit.rent}
                      onChange={(e) => handleSingleUnitChange("rent", Number.parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>

              
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={PropertyTypeEnum.MULTI_UNIT} className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Units</h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMultiUnit}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Unit
                  </Button>
                </div>

                {multiUnits.map((unit, index) => (
                  <Card key={index} className="border border-muted">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Unit {index + 1}</CardTitle>
                        {multiUnits.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMultiUnit(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`multi-unit-number-${index}`}>Unit Number</Label>
                        <Input
                          id={`multi-unit-number-${index}`}
                          value={unit.unitNumber}
                          onChange={(e) => handleMultiUnitChange(index, "unitNumber", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`multi-unit-type-${index}`}>Unit Type</Label>
                        <Select
                          value={unit.unitType}
                          onValueChange={(value) => handleMultiUnitChange(index, "unitType", value)}
                        >
                          <SelectTrigger id={`multi-unit-type-${index}`}>
                            <SelectValue placeholder="Select unit type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(UnitTypeEnum).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0) + type.slice(1).toLowerCase().replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`multi-bedrooms-${index}`}>Bedrooms</Label>
                        <Input
                          id={`multi-bedrooms-${index}`}
                          type="number"
                          min="0"
                          value={unit.bedrooms}
                          onChange={(e) =>
                            handleMultiUnitChange(index, "bedrooms", Number.parseInt(e.target.value) || 0)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`multi-bathrooms-${index}`}>Bathrooms</Label>
                        <Input
                          id={`multi-bathrooms-${index}`}
                          type="number"
                          min="0"
                          step="0.5"
                          value={unit.bathrooms}
                          onChange={(e) =>
                            handleMultiUnitChange(index, "bathrooms", Number.parseFloat(e.target.value) || 0)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`multi-square-feet-${index}`}>Square Feet</Label>
                        <Input
                          id={`multi-square-feet-${index}`}
                          type="number"
                          min="0"
                          value={unit.squareFeet}
                          onChange={(e) =>
                            handleMultiUnitChange(index, "squareFeet", Number.parseInt(e.target.value) || 0)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`multi-rent-${index}`}>Rent</Label>
                        <Input
                          id={`multi-rent-${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={unit.rent}
                          onChange={(e) => handleMultiUnitChange(index, "rent", Number.parseFloat(e.target.value) || 0)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`multi-status-${index}`}>Status</Label>
                        <Select
                          value={unit.status}
                          onValueChange={(value) => handleMultiUnitChange(index, "status", value)}
                        >
                          <SelectTrigger id={`multi-status-${index}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(UnitStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0) + status.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

