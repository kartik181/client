export const PricingPlans = [
    {
      name: "Basic",
      price: 9,
      description: "For personal use",
      items: [
        "5 PDF per Day",
        "Standard processing speed",
        "Email Support",
        "Contains ADs",
      ],
      id: "basic",
      paymentLink:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_9AQ5kO0JHgyxcVibII"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1R3rE0L1gnW8sXuHaGRJaf9Q"
          : "",
    },
    {
      name: "Pro",
      price: 19,
      description: "For professionals and teams",
      items: [
        "Unlimited PDF Summaries",
        "Priority processing",
        "24/7 priority support",
        "Markdown Export",
      ],
      id: "pro",
      paymentLink:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_00g5kObolgyx3kI6op"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1R3rFoL1gnW8sXuH9zJwGQsz"
          : "",
    },
  ];