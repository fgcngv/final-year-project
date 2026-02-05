

// "use client";

import AddressStep from "@/components/checkout/AddressStep";
import SeePage from "./seepage/page";
import Header from "@/components/header";

// import { useState } from "react";
// // import CheckoutStepper from "@/components/checkout/CheckoutStepper";
// import AddressStep from "@/components/checkout/AddressStep";
// import PaymentStep from "@/components/checkout/PaymentStep";
// import OrderSummary from "@/components/checkout/OrderSummary";
// import OrderConfirmation from "@/components/checkout/OrderConfirmation";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Shield, Truck, CreditCard } from "lucide-react";
// import CheckoutStepper from "@/components/checkout/CheckoutStepper";

// export default function CheckoutPage() {
//   const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [orderId, setOrderId] = useState<string | null>(null);

//   // Mock cart data - replace with your actual data
//   const cartItems = [
//     {
//       id: "1",
//       name: "Yirgacheffe Grade 1",
//       price: 850,
//       quantity: 2,
//       image: "/coffee1.jpg",
//       farmer: "Tesfaye's Farm"
//     },
//     {
//       id: "2",
//       name: "Sidamo Natural",
//       price: 720,
//       quantity: 1,
//       image: "/coffee2.jpg",
//       farmer: "Sidamo Cooperative"
//     }
//   ];

//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shippingFee = 120;
//   const total = subtotal + shippingFee;

//   const handlePlaceOrder = () => {
//     // Simulate order placement
//     const newOrderId = `ORD-${Date.now().toString().slice(-8)}`;
//     setOrderId(newOrderId);
//     setOrderPlaced(true);
//   };

//   const steps = [
//     { number: 1, label: "Shipping", icon: <Truck className="h-4 w-4" /> },
//     { number: 2, label: "Payment", icon: <CreditCard className="h-4 w-4" /> },
//     { number: 3, label: "Confirmation", icon: <Shield className="h-4 w-4" /> },
//   ];

//   if (orderPlaced && orderId) {
//     return <OrderConfirmation orderId={orderId} />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       {/* Header */}
//       <div className="border-b bg-white">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => window.history.back()}
//               >
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Ethiopian Green Coffee
//               </h1>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Shield className="h-4 w-4 text-green-600" />
//               <span>Secure Checkout</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Stepper */}
//         <CheckoutStepper steps={steps} currentStep={currentStep} />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//           {/* Left Column - Checkout Form */}
//           <div className="lg:col-span-2 space-y-8">
//             {currentStep === 1 && (
//               <AddressStep onNext={() => setCurrentStep(2)} />
//             )}
            
//             {currentStep === 2 && (
//               <PaymentStep 
//                 onBack={() => setCurrentStep(1)} 
//                 onPlaceOrder={handlePlaceOrder}
//               />
//             )}
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:col-span-1">
//             {/* <OrderSummary 
//               items={cartItems}
//               subtotal={subtotal}
//               shippingFee={shippingFee}
//               total={total} */}
//             {/* /> */}
//           </div>
//         </div>
//       </div>

//       {/* Trust Badges */}
//       <div className="bg-gray-50 border-t mt-16 py-6">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
//             <div className="flex flex-col items-center">
//               <Truck className="h-8 w-8 text-green-600 mb-2" />
//               <span className="font-medium">Free Shipping</span>
//               <span className="text-xs">Over 5000 Birr</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <Shield className="h-8 w-8 text-green-600 mb-2" />
//               <span className="font-medium">Secure Payment</span>
//               <span className="text-xs">Chapa & Stripe</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="h-8 w-8 flex items-center justify-center text-green-600 mb-2">
//                 <span className="text-xl">☕</span>
//               </div>
//               <span className="font-medium">Fresh Coffee</span>
//               <span className="text-xs">Direct from Farmers</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="h-8 w-8 flex items-center justify-center text-green-600 mb-2">
//                 <span className="text-xl">🌱</span>
//               </div>
//               <span className="font-medium">Sustainable</span>
//               <span className="text-xs">Ethical Sourcing</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Header />
      <h1 className="text-3xl font-bold mb-6 mt-20 text-center md:text-left">
        Checkout
      </h1>

      <div className="md:flex md:gap-8 w-full">
        {/* Left Column - Address / Shipping */}
        <div className="md:w-2/3 mb-6 md:mb-0">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <AddressStep />
          </div>
        </div>

        {/* Right Column - Order Summary / Review */}
        <div className="md:w-1/3">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <SeePage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;