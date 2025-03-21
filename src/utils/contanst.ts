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
          : "https://buy.stripe.com/test_8wM28C3VT9656wUdQS",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1R3rE0L1gnW8sXuHaGRJaf9Q"
          : "price_1R56mmL1gnW8sXuHaMZHFYTe",
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
          : "https://buy.stripe.com/test_4gwaF89gdgyxg7ucMP",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1R3rFoL1gnW8sXuH9zJwGQsz"
          : "price_1R56n6L1gnW8sXuHRs97Fxgh",
    },
  ];

  export const containerVaraints = {
    hidden: {opacity: 0},
    visible:{
      opacity: 1,
      transition:{
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  }

  export const itemVariants = {
    hidden: {opacity: 0, y:20},
    visible:{
      opacity: 1,
      transition:{
        type: 'spring',
        damping: 50,
        stiffness: 50,
        duration:0.8
      }
    }
  }

  export const isDev = process.env.NODE_ENV === 'development'

export const ORIGIN_URL = isDev ? 'http://localhost:3000' : ''