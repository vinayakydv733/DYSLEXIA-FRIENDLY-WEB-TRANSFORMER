export const config = {
  CHROME_STORE_URL: "/install", // Points to the visual installation guide
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  SUPPORT_EMAIL: "support@dyslexiawebtransformer.com",
  features: {
    subscriptions: true,
    educationPlan: false,
    familyPlan: false,
    waitlist: false // Set to true for "Join Early Access" mode
  },
  pricing: {
    free: {
      name: "Free",
      price: "₹0",
      features: [
        "Bionic Reading",
        "Dyslexia-friendly fonts",
        "Font size & Line spacing",
        "Reading ruler & Color modes",
        "Basic Text-to-Speech",
        "Basic translation",
        "Limited AI access"
      ]
    },
    premium: {
      name: "Premium",
      price: "₹299/mo",
      features: [
        "Higher AI usage",
        "AI Simplify & AI Explain",
        "AI Summarize",
        "Advanced reading levels",
        "Long-content assistance",
        "Advanced TTS voices",
        "Personalized reading profiles"
      ]
    }
  }
};
