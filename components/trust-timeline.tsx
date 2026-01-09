interface TrustTimelineProps {
  currentStep: number
}

const steps = ["Order Placed", "Processing", "Shipping", "On Your Feet"]

export function TrustTimeline({ currentStep }: TrustTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display tracking-wide">Your Journey</h3>

      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 right-0 h-px bg-border">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  index <= currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs text-center max-w-[80px] ${
                  index <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
