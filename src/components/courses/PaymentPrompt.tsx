import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard } from "lucide-react";

interface PaymentPromptProps {
  onPaymentComplete: () => void;
  onCancel: () => void;
}

const PaymentPrompt: React.FC<PaymentPromptProps> = ({ onPaymentComplete, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Unlock More Lessons
          </CardTitle>
          <CardDescription>
            Continue your learning journey by unlocking the next set of lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">₹49</div>
            <div className="text-sm text-gray-600">
              One-time payment for the next set of lessons
            </div>
            <ul className="text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Access to all remaining lessons
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Downloadable resources
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Certificate upon completion
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            onClick={handlePayment} 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹49 to Continue
              </>
            )}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="w-full"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentPrompt;
