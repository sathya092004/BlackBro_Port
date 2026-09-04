"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, ShoppingBag } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, cn } from "@/lib/utils";

type ShippingMethod = "standard" | "express";

const SHIPPING_METHODS: { id: ShippingMethod; label: string; eta: string; extra: number }[] = [
  { id: "standard", label: "Standard", eta: "5–7 business days", extra: 0 },
  { id: "express", label: "Express", eta: "1–2 business days", extra: 25 },
];

/**
 * Checkout UI — contact / shipping / payment form on the left, order
 * summary on the right. Placing an order clears the cart and swaps
 * to a confirmation state. There's no real payment processor behind
 * this (no backend in this project), so "Place order" is a UI-only
 * flow: it validates the required fields and simulates submission.
 */
export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const baseShipping = calculateShipping(totalPrice);
  const methodExtra = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.extra ?? 0;
  const shipping = baseShipping + methodExtra;
  const total = totalPrice + shipping;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const required = ["email", "firstName", "lastName", "address", "city", "zip", "cardNumber", "expiry", "cvc"];
    const nextErrors: Record<string, string> = {};
    for (const field of required) {
      const value = String(form.get(field) ?? "").trim();
      if (!value) nextErrors[field] = "Required";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    // Simulated order placement — no backend/payment processor wired up.
    window.setTimeout(() => {
      setOrderNumber(`BB-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
      setIsSubmitting(false);
    }, 700);
  }

  if (orderNumber) {
    return (
      <Container as="div" className="py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-md flex-col items-center gap-5 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper dark:bg-bone dark:text-void">
            <Check size={20} strokeWidth={2} />
          </span>
          <h1 className="font-display text-3xl sm:text-4xl">Order placed</h1>
          <p className="text-sm text-text-muted">
            Thank you — your order <span className="font-medium text-foreground">{orderNumber}</span> has
            been confirmed. A receipt has been sent to your email.
          </p>
          <Button size="lg" className="mt-2" onClick={() => router.push("/")}>
            Continue shopping
          </Button>
        </motion.div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container as="div" className="py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center">
            <ShoppingBag size={28} strokeWidth={1.25} className="text-text-muted" />
            <h1 className="font-display text-3xl sm:text-4xl">Nothing to check out</h1>
            <p className="max-w-sm text-sm text-text-muted">
              Your bag is empty — add something you love before checking out.
            </p>
            <Button size="lg" className="mt-2" onClick={() => router.push("/")}>
              Continue shopping
            </Button>
          </div>
        </Reveal>
      </Container>
    );
  }

  return (
    <Container as="div" className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl sm:text-4xl">Checkout</h1>
      </Reveal>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-10">
          <Reveal>
            <fieldset className="flex flex-col gap-4">
              <legend className="bb-eyebrow mb-1">Contact</legend>
              <Field name="email" label="Email" type="email" error={errors.email} />
            </fieldset>
          </Reveal>

          <Reveal delay={0.05}>
            <fieldset className="flex flex-col gap-4">
              <legend className="bb-eyebrow mb-1">Shipping address</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field name="firstName" label="First name" error={errors.firstName} />
                <Field name="lastName" label="Last name" error={errors.lastName} />
              </div>
              <Field name="address" label="Address" error={errors.address} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field name="city" label="City" error={errors.city} />
                <Field name="state" label="State / Province" />
                <Field name="zip" label="ZIP / Postal code" error={errors.zip} />
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.1}>
            <fieldset className="flex flex-col gap-3">
              <legend className="bb-eyebrow mb-1">Shipping method</legend>
              {SHIPPING_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border px-4 py-3 text-sm transition-colors",
                    shippingMethod === method.id
                      ? "border-ink dark:border-bone"
                      : "border-border-subtle hover:border-stone"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={shippingMethod === method.id}
                      onChange={() => setShippingMethod(method.id)}
                      className="accent-ink"
                    />
                    <span>
                      <span className="block">{method.label}</span>
                      <span className="block text-xs text-text-muted">{method.eta}</span>
                    </span>
                  </span>
                  <span className="text-text-muted">
                    {method.extra === 0
                      ? baseShipping === 0
                        ? "Free"
                        : formatPrice(baseShipping)
                      : formatPrice(baseShipping + method.extra)}
                  </span>
                </label>
              ))}
            </fieldset>
          </Reveal>

          <Reveal delay={0.15}>
            <fieldset className="flex flex-col gap-4">
              <legend className="bb-eyebrow mb-1 flex items-center gap-2">
                <Lock size={12} strokeWidth={1.75} />
                Payment
              </legend>
              <Field name="cardNumber" label="Card number" inputMode="numeric" error={errors.cardNumber} />
              <div className="grid grid-cols-2 gap-4">
                <Field name="expiry" label="Expiry (MM/YY)" error={errors.expiry} />
                <Field name="cvc" label="CVC" inputMode="numeric" error={errors.cvc} />
              </div>
            </fieldset>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <aside className="sticky top-24 flex flex-col gap-6 bg-surface-muted p-6">
            <h2 className="bb-eyebrow">Order Summary</h2>

            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.lineId} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-background">
                    <Image
                      src={item.product.image.url}
                      alt={item.product.image.alt}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-paper dark:bg-bone dark:text-void">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-xs">{item.product.name}</p>
                    {item.variantLabel && (
                      <p className="text-[11px] text-text-muted">{item.variantLabel}</p>
                    )}
                  </div>
                  <p className="text-xs">
                    {formatPrice(
                      item.product.price.amount * item.quantity,
                      item.product.price.currency
                    )}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 border-t border-border-subtle pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border-subtle pt-3 text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Placing order…" : `Place order — ${formatPrice(total)}`}
            </Button>

            <Link
              href="/cart"
              className="text-center text-xs text-text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Back to bag
            </Link>
          </aside>
        </Reveal>
      </form>
    </Container>
  );
}

function Field({
  name,
  label,
  type = "text",
  inputMode,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  inputMode?: "numeric" | "text" | "email";
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-text-muted">{label}</span>
      <input
        name={name}
        type={type}
        inputMode={inputMode}
        className={cn(
          "h-11 border bg-background px-3 text-sm outline-none transition-colors focus:border-ink dark:focus:border-bone",
          error ? "border-signal" : "border-border-subtle"
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] text-signal"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
