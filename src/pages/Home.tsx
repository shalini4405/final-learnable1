import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to Learnable</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your personalized learning platform powered by AI. Get started today and unlock your potential.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg text-lg"
            >
              Sign Up
            </Button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Learnable?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                title="AI-Powered Learning"
                description="Get personalized recommendations based on your learning style and interests"
              />
              <FeatureCard
                title="Track Progress"
                description="Monitor your learning journey with detailed analytics and insights"
              />
              <FeatureCard
                title="Expert Content"
                description="Access high-quality learning materials curated by experts"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Home; 