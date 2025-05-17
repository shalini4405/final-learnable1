
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Lock, RefreshCw } from "lucide-react";

interface PaymentPromptProps {
  level: string;
  price: number;
  onAccessGranted: () => void;
}

const PaymentPrompt = ({ level, price, onAccessGranted }: PaymentPromptProps) => {
  const { initiatePayment, levelStatus } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const isPaid = levelStatus[level.toLowerCase()]?.paid;

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(false);
    
    const success = await initiatePayment(level.toLowerCase(), price);
    
    setIsProcessing(false);
    if (success) {
      onAccessGranted();
    } else {
      setPaymentError(true);
    }
  };

  if (isPaid) {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <h3 className="font-medium text-lg">Level Unlocked</h3>
            <p className="text-sm text-gray-600">
              You have already paid for this {level} level.
            </p>
          </div>
        </div>
        <Button 
          className="mt-4 w-full bg-green-600 hover:bg-green-700" 
          onClick={onAccessGranted}
        >
          Continue Learning
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-2 border-amber-200">
      <div className="flex flex-col items-center text-center mb-4">
        <Lock className="h-12 w-12 text-amber-500 mb-2" />
        <h3 className="text-xl font-semibold mb-1">Unlock {level} Level</h3>
        <p className="mb-3 text-gray-600">
          Continue your learning journey by unlocking the {level} level.
        </p>
        <Badge className="bg-amber-100 text-amber-800 font-bold text-lg py-1 px-3 mb-4">
          ₹{price}
        </Badge>
        
        {paymentError && (
          <div className="bg-red-50 p-3 rounded-md flex items-center space-x-2 mb-4 w-full">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-700 text-sm">Payment failed. Please try again.</p>
          </div>
        )}
      </div>
      
      <Button 
        className="w-full" 
        onClick={handlePayment} 
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
            Processing...
          </>
        ) : (
          <>Pay ₹{price} & Unlock</>
        )}
      </Button>
      
      <p className="text-xs text-center mt-4 text-gray-500">
        *One-time payment for lifetime access to this level
      </p>
    </Card>
  );
};

export default PaymentPrompt;
