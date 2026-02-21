"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Tag,
  Building2,
  HardHat,
  ClipboardCheck,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const services = [
  { id: "pre-purchase", label: "Pre-Purchase Property Inspection", icon: ShieldCheck },
  { id: "pre-sale", label: "Pre-Sale Inspection", icon: Tag },
  { id: "building", label: "Building Inspection", icon: Building2 },
  { id: "new-build", label: "New Build Inspection", icon: HardHat },
  { id: "handover", label: "Handover Inspection", icon: ClipboardCheck },
  { id: "dilapidation", label: "Dilapidation Report", icon: FileText },
];

const step2Schema = z.object({
  address: z.string().min(5, "Please enter the property address"),
  propertyType: z.enum(["residential", "commercial", "industrial"]),
  message: z.string().optional(),
});

const step3Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  preferredDate: z.string().optional(),
});

type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const STEPS = ["Service", "Details", "Your Info", "Done"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background:
                  i < current
                    ? "linear-gradient(135deg, #F97316, #EA580C)"
                    : i === current
                    ? "rgba(249,115,22,0.1)"
                    : "#F3F4F6",
                border: i <= current ? "1px solid #F97316" : "1px solid #E8EAED",
                color: i <= current ? (i < current ? "#fff" : "#F97316") : "#9CA3AF",
              }}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className="text-xs hidden sm:block"
              style={{ color: i === current ? "#F97316" : "#9CA3AF" }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-px mb-4 w-8 md:w-16"
              style={{
                background:
                  i < current
                    ? "linear-gradient(90deg, #F97316, rgba(249,115,22,0.4))"
                    : "#E8EAED",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
      {message}
    </p>
  );
}

function inputStyle(hasError?: boolean) {
  return {
    background: "#FFFFFF",
    border: `1px solid ${hasError ? "#EF444460" : "#E8EAED"}`,
    color: "#1B2E5C",
    borderRadius: "0.75rem",
    padding: "0.875rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;
}

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema) });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema) });

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  function next(d = 1) {
    setDirection(d);
    setStep((s) => s + d);
  }
  function back() {
    next(-1);
  }

  async function handleFinalSubmit(data: Step3Data) {
    setSubmitting(true);
    try {
      const serviceLabel =
        services.find((s) => s.id === selectedService)?.label ?? selectedService ?? "";
      await fetch("/api/send-quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          preferredDate: data.preferredDate,
          service: serviceLabel,
          address: step2Data?.address ?? "",
          propertyType: step2Data?.propertyType ?? "",
          message: step2Data?.message,
        }),
      });
    } catch {
      // Don't block the user if email fails — log silently
    } finally {
      setSubmitting(false);
      setDirection(1);
      setStep(3);
    }
  }

  return (
    <div
      className="rounded-2xl p-8 md:p-10"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8EAED",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <StepIndicator current={step} />

      <div style={{ overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1 — Service Select */}
          {step === 0 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" as const }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: "#1B2E5C" }}>
                Which inspection do you need?
              </h3>
              <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                Select the service that best fits your requirement.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {services.map((s) => {
                  const Icon = s.icon;
                  const selected = selectedService === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: selected ? "rgba(249,115,22,0.06)" : "#F9FAFB",
                        border: selected
                          ? "1px solid rgba(249,115,22,0.4)"
                          : "1px solid #E8EAED",
                        boxShadow: selected ? "0 2px 12px rgba(249,115,22,0.1)" : "none",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: selected ? "rgba(249,115,22,0.12)" : "#F3F4F6" }}
                      >
                        <Icon size={17} style={{ color: selected ? "#F97316" : "#9CA3AF" }} />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: selected ? "#1B2E5C" : "#6B7280" }}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => selectedService && next()}
                disabled={!selectedService}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, #F97316, #EA580C)",
                  boxShadow: selectedService ? "0 0 24px rgba(249,115,22,0.25)" : "none",
                }}
              >
                Continue <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {/* Step 2 — Project Details */}
          {step === 1 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" as const }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: "#1B2E5C" }}>
                Tell us about the property
              </h3>
              <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                So we can provide the most accurate quote.
              </p>
              <form
                onSubmit={step2Form.handleSubmit((data) => {
                  setStep2Data(data);
                  next();
                })}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                    Property Address *
                  </label>
                  <input
                    {...step2Form.register("address")}
                    placeholder="e.g. 12 Builder St, Newcastle NSW 2300"
                    style={inputStyle(!!step2Form.formState.errors.address)}
                  />
                  <FieldError message={step2Form.formState.errors.address?.message} />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                    Property Type *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["residential", "commercial", "industrial"] as const).map((type) => (
                      <label
                        key={type}
                        className="flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium cursor-pointer transition-all"
                        style={{
                          background:
                            step2Form.watch("propertyType") === type
                              ? "rgba(249,115,22,0.06)"
                              : "#F9FAFB",
                          border:
                            step2Form.watch("propertyType") === type
                              ? "1px solid rgba(249,115,22,0.35)"
                              : "1px solid #E8EAED",
                          color:
                            step2Form.watch("propertyType") === type ? "#1B2E5C" : "#6B7280",
                        }}
                      >
                        <input
                          {...step2Form.register("propertyType")}
                          type="radio"
                          value={type}
                          className="sr-only"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                  <FieldError message={step2Form.formState.errors.propertyType?.message} />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                    Additional Notes (optional)
                  </label>
                  <textarea
                    {...step2Form.register("message")}
                    rows={3}
                    placeholder="Any specific concerns or areas you'd like us to focus on?"
                    style={{ ...inputStyle(), resize: "none" }}
                  />
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={back}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: "#6B7280",
                      background: "#F3F4F6",
                      border: "1px solid #E8EAED",
                    }}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #F97316, #EA580C)",
                      boxShadow: "0 0 24px rgba(249,115,22,0.2)",
                    }}
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3 — Contact Info */}
          {step === 2 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" as const }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: "#1B2E5C" }}>
                Your contact details
              </h3>
              <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                We&apos;ll send your quote to the details below.
              </p>
              <form
                onSubmit={step3Form.handleSubmit(handleFinalSubmit)}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                      Full Name *
                    </label>
                    <input
                      {...step3Form.register("name")}
                      placeholder="James Smith"
                      style={inputStyle(!!step3Form.formState.errors.name)}
                    />
                    <FieldError message={step3Form.formState.errors.name?.message} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                      Phone *
                    </label>
                    <input
                      {...step3Form.register("phone")}
                      placeholder="04XX XXX XXX"
                      style={inputStyle(!!step3Form.formState.errors.phone)}
                    />
                    <FieldError message={step3Form.formState.errors.phone?.message} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                    Email Address *
                  </label>
                  <input
                    {...step3Form.register("email")}
                    type="email"
                    placeholder="you@example.com"
                    style={inputStyle(!!step3Form.formState.errors.email)}
                  />
                  <FieldError message={step3Form.formState.errors.email?.message} />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#6B7280" }}>
                    Preferred Inspection Date (optional)
                  </label>
                  <input
                    {...step3Form.register("preferredDate")}
                    type="date"
                    style={inputStyle()}
                  />
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={back}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: "#6B7280",
                      background: "#F3F4F6",
                      border: "1px solid #E8EAED",
                    }}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                    style={{
                      background: "linear-gradient(135deg, #F97316, #EA580C)",
                      boxShadow: "0 0 24px rgba(249,115,22,0.2)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Submit Quote Request <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 4 — Success */}
          {step === 3 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" as const }}
              className="flex flex-col items-center text-center py-8 gap-5"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              >
                <CheckCircle2 size={32} style={{ color: "#F97316" }} />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: "#1B2E5C" }}>
                Quote request received!
              </h3>
              <p className="max-w-sm text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                We&apos;ll review your details and get back to you within 4 business hours with a tailored quote.
              </p>
              <div
                className="w-full rounded-xl p-5 text-left"
                style={{
                  background: "rgba(249,115,22,0.04)",
                  border: "1px solid rgba(249,115,22,0.15)",
                }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: "#EA580C" }}>
                  What happens next
                </p>
                {[
                  "We review your inspection requirements",
                  "Our team prepares a tailored quote",
                  "You receive it via email within 4 hours",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5">
                    <span
                      className="w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(249,115,22,0.1)", color: "#F97316" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
