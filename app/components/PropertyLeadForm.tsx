"use client";

import { useState } from "react";

interface Props {
  propertyReference?: string;
  developerId?: string; // single developer ID as string, Pixxi expects comma-separated string
  projectName?: string;
}

export default function PropertyLeadForm({
  propertyReference,
  developerId,
  projectName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Helper to get UTM params
  const getUTM = (key: string) => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    // Format phone safely
    let phone = String(form.get("phone") || "").replace(/\D/g, "");
    if (phone.startsWith("0")) phone = phone.slice(1);
    if (phone.startsWith("961")) phone = phone.slice(3);
    phone = "+961" + phone;

    // Build payload
    const payload: any = {
      formId: "f2e71549-062f-4874-8584-009df4d7f850",
      name: form.get("name"),
      email: form.get("email"),
      phone,
      extraData: {
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        projectName: projectName || "",
        utm_source: getUTM("utm_source"),
        utm_medium: getUTM("utm_medium"),
        utm_campaign: getUTM("utm_campaign"),
        utm_term: getUTM("utm_term"),
        utm_content: getUTM("utm_content"),
      },
    };

    // Optional fields
    const optionalFields: Record<string, any> = {
      propertyReference,
      nationality: form.get("nationality"),
      budget: form.get("budget")
        ? `${form.get("budget")}-${Number(form.get("budget")) + 5000}`
        : undefined,
      propertyType: form.get("propertyType"),
      bedrooms: form.get("bedrooms"),
      projectType: form.get("projectType"),
      buyerType: form.get("buyerType"),
      paymentMethod: form.get("paymentMethod"),
    };

    Object.entries(optionalFields).forEach(([key, value]) => {
      if (value) payload[key] = value;
    });

    // Add developer ID as comma-separated string if provided
    if (developerId) payload.preferredDeveloper = String(developerId);

    try {
      const res = await fetch("https://admin.bnan-realestate.com/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Pixxi payload:", payload);
      console.log("Pixxi response:", data);

      setLoading(false);

      if (data.statusCode === 200) {
        setSuccess(true);
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-green-700">
          Thank you! Our agent will contact you shortly.
        </h3>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-6 space-y-4"
    >
      <h3 className="text-xl font-semibold">Request More Information</h3>

      <input
        name="name"
        required
        placeholder="Full Name"
        className="w-full border rounded-lg p-3"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        className="w-full border rounded-lg p-3"
      />
      <input
        name="phone"
        required
        placeholder="Phone Number"
        className="w-full border rounded-lg p-3"
      />
      <input
        name="nationality"
        placeholder="Nationality"
        className="w-full border rounded-lg p-3"
      />

      <select name="propertyType" className="w-full border rounded-lg p-3">
        <option value="">Property Type</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Penthouse">Penthouse</option>
      </select>

      <select name="bedrooms" className="w-full border rounded-lg p-3">
        <option value="">Bedrooms</option>
        <option value="studio">Studio</option>
        <option value="1">1 Bedroom</option>
        <option value="2">2 Bedrooms</option>
        <option value="3">3 Bedrooms</option>
        <option value="4">4 Bedrooms</option>
      </select>

      <input
        name="budget"
        placeholder="Budget (example 500000)"
        className="w-full border rounded-lg p-3"
      />

      <select name="projectType" className="w-full border rounded-lg p-3">
        <option value="">Project Type</option>
        <option value="off_plan">Off Plan</option>
        <option value="secondary">Secondary</option>
      </select>

      <select name="buyerType" className="w-full border rounded-lg p-3">
        <option value="">Buyer Type</option>
        <option value="investor">Investor</option>
        <option value="homebuyer">Home Buyer</option>
      </select>

      <select name="paymentMethod" className="w-full border rounded-lg p-3">
        <option value="">Payment Method</option>
        <option value="cash">Cash</option>
        <option value="mortgage">Mortgage</option>
        <option value="cheque">Cheque</option>
      </select>

      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
      >
        {loading ? "Submitting..." : "Submit Lead"}
      </button>
    </form>
  );
}