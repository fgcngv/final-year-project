"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Smartphone, Lock, Shield } from "lucide-react";

interface PaymentStepProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function PaymentStep({ onBack, onPlaceOrder }: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState("chapa");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "chapa",
      name: "Chapa",
      description: "Pay with Chapa - Mobile Money & Cards",
      icon: <Smartphone className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay with Visa, MasterCard, or American Express",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      description: "Pay when your coffee arrives",
      icon: <div className="h-6 w-6 text-center">💵</div>,
      color: "bg-green-100 text-green-800"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPlaceOrder();
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Lock className="h-6 w-6 text-green-600" />
          Payment Method
        </CardTitle>
        <p className="text-gray-600">Complete your purchase securely</p>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Payment Methods */}
          <div className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label
                    htmlFor={method.id}
                    className="flex-1 cursor-pointer p-4 border rounded-xl hover:border-green-500 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${method.color}`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">{method.name}</span>
                          {paymentMethod === method.id && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Chapa Payment Form */}
          {paymentMethod === "chapa" && (
            <div className="space-y-4 p-6 bg-purple-50 rounded-xl border border-purple-200 animate-in fade-in">
              <div className="flex items-center gap-2 text-purple-800">
                <Smartphone className="h-5 w-5" />
                <h3 className="font-semibold">Chapa Payment Details</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+251 91 234 5678" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="network">Network</Label>
                  <select 
                    id="network" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Select network</option>
                    <option value="telebirr">Telebirr</option>
                    <option value="cbe">CBE Birr</option>
                    <option value="amole">Amole</option>
                    <option value="hellocash">HelloCash</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Credit Card Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4 p-6 bg-blue-50 rounded-xl border border-blue-200 animate-in fade-in">
              <div className="flex items-center gap-2 text-blue-800">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-semibold">Card Details</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="1000" />
                </div>
              </div>
            </div>
          )}

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg border">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">
              Your payment is secured with 256-bit SSL encryption
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shipping
            </Button>
            
            <Button
              type="submit"
              size="lg"
              className="px-8 py-6 text-lg gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}