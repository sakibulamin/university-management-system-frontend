const STEPS = [
  {
    step: "1",
    title: "Create an account",
    description: "Register with your name, email and password, and choose your role.",
  },
  {
    step: "2",
    title: "Verify your email",
    description:
      "Enter the verification code sent to your email to activate your account.",
  },
  {
    step: "3",
    title: "Sign in",
    description: "Log in and you're taken to the dashboard for your role.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, title, description }) => (
            <li key={step} className="text-center">
              <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step}
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
