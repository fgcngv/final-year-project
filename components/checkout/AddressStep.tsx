

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Home, Building, Plus, Check } from "lucide-react";

interface AddressStepProps {
  onNext: () => void;
}

export default function AddressStep({ onNext }: AddressStepProps) {
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [showNewAddress, setShowNewAddress] = useState(false);

  const savedAddresses = [
    {
      id: "home",
      type: "Home",
      name: "Tesfaye Lemma",
      address: "Bole, Addis Ababa, Ethiopia",
      phone: "+251 91 234 5678",
      icon: <Home className="h-5 w-5" />
    },
    {
      id: "office",
      type: "Office",
      name: "Tesfaye Lemma",
      address: "Mexico Square, Kirkos, Addis Ababa",
      phone: "+251 92 345 6789",
      icon: <Building className="h-5 w-5" />
    }
  ];

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="h-6 w-6 text-green-600" />
          Shipping Address
        </CardTitle>
        <p className="text-gray-600">Where should we deliver your coffee?</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Saved Addresses */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Select an address</h3>
          <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
            {savedAddresses.map((addr) => (
              <div key={addr.id} className="flex items-center space-x-3">
                <RadioGroupItem value={addr.id} id={addr.id} />
                <Label
                  htmlFor={addr.id}
                  className="flex-1 cursor-pointer p-4 border rounded-lg hover:border-green-500 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      {addr.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{addr.type}</span>
                        {selectedAddress === addr.id && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            <Check className="h-3 w-3" />
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="font-medium">{addr.name}</p>
                      <p className="text-gray-600">{addr.address}</p>
                      <p className="text-gray-500 text-sm">{addr.phone}</p>
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Add New Address Toggle */}
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-2 border-dashed"
          onClick={() => setShowNewAddress(!showNewAddress)}
        >
          <Plus className="h-4 w-4" />
          {showNewAddress ? "Cancel new address" : "Add new address"}
        </Button>

        {/* New Address Form */}
        {showNewAddress && (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50 animate-in fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Tesfaye Lemma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+251 91 234 5678" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="Bole, Addis Ababa" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Addis Ababa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input id="region" placeholder="Oromia" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="1000" />
              </div>
            </div>

            <Button type="button" className="w-full">
              Save Address
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end pt-6 border-t">
          <Button
            onClick={onNext}
            size="lg"
            className="px-8 py-6 text-lg"
          >
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}