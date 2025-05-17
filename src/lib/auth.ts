import { toast } from "@/hooks/use-toast";

// Mock Google OAuth response type
interface GoogleAuthResponse {
  user: {
    email: string;
    name: string;
    picture?: string;
  };
  credential: string;
}

export const handleGoogleLogin = async (): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> => {
  try {
    // Simulate Google OAuth login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful Google login
    const mockGoogleResponse: GoogleAuthResponse = {
      user: {
        email: "user@gmail.com",
        name: "Google User",
        picture: "https://api.dicebear.com/7.x/avatars/svg?seed=user@gmail.com"
      },
      credential: "mock_google_credential"
    };

    // Create user object from Google response
    const user = {
      id: `google-${Math.random().toString(36).substr(2, 9)}`,
      name: mockGoogleResponse.user.name,
      email: mockGoogleResponse.user.email,
      avatar: mockGoogleResponse.user.picture,
      points: 0,
      streak: 0,
      lastActive: new Date().toISOString(),
      isLoggedIn: true,
      coursesEnrolled: [],
      completedLevels: [],
      hasCompletedCustomization: false
    };

    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Google login error:", error);
    return {
      success: false,
      error: "Failed to login with Google. Please try again."
    };
  }
};

export const handleEmailLogin = async (email: string, password: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, validate credentials against backend
    if (email && password) {
      const user = {
        id: `email-${Math.random().toString(36).substr(2, 9)}`,
        name: email.split("@")[0],
        email,
        points: 0,
        streak: 0,
        lastActive: new Date().toISOString(),
        isLoggedIn: true,
        coursesEnrolled: [],
        completedLevels: [],
        hasCompletedCustomization: false
      };

      return {
        success: true,
        user
      };
    }

    return {
      success: false,
      error: "Invalid credentials"
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Failed to login. Please try again."
    };
  }
};

export const handleEmailSignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, validate and create user in backend
    const user = {
      id: `email-${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      points: 0,
      streak: 0,
      lastActive: new Date().toISOString(),
      isLoggedIn: true,
      coursesEnrolled: [],
      completedLevels: [],
      hasCompletedCustomization: false
    };

    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "Failed to create account. Please try again."
    };
  }
}; 