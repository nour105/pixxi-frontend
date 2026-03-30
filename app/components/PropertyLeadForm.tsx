"use client";

import { Speaker } from "lucide-react";
import { useState } from "react";


interface FloorPlan {
  id: string;
  title: string;
  area: number;
}

interface Props {
  propertyReference?: string;
  developer?: string | number;
  preferredLocation?: string;
  project_name?: string;
    floorPlans?: FloorPlan[]; // 👈 new prop

}



export default function PropertyLeadForm({
  propertyReference,
  developer,
  preferredLocation,
  project_name,
    floorPlans = [],

}: Props) {
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const normalizePhone = (value: string) => {
    let phone = value.replace(/\D/g, "");
    if (phone.startsWith("0")) phone = phone.slice(1);
    if (phone.startsWith("961")) phone = phone.slice(3);
    return "+961" + phone;
  };

  const sizeOptions = Array.from(
    new Map(
      floorPlans.map((plan) => [plan.area.toString(), plan.area])
    ).entries()
  ).map(([value, area]) => ({ value, label: `${area} sqft` }));
 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  const form = new FormData(e.target);

  // ✅ Read all UTM params from URL
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

  const utmData = {
    utm_source: params?.get("utm_source"),
    utm_medium: params?.get("utm_medium"),
    utm_campaign: params?.get("utm_campaign"),
    utm_term: params?.get("utm_term"),
    utm_content: params?.get("utm_content"),
  };

  const payload = {
  formId: "f2e71549-062f-4874-8584-009df4d7f850",
  propertyReference,
  name: form.get("name"),
  email: form.get("email"),
  phone: normalizePhone(String(form.get("phone"))),
  nationality: form.get("nationality"),
  budget: form.get("budget"),
  preferredSize: form.get("preferredSize"),
  propertyType: form.get("preferredPropertyType"),
  paymentMethod: String(form.get("paymentMethod") || "cash").toLowerCase(),
      furnishing: form.get("furnishing") || undefined,
  gender: String(form.get("gender"))?.toLowerCase(),
  buyerType: form.get("buyerType"),
bedrooms: String(form.get("bedrooms")) || undefined,  projectType: "off_plan",
  preferredDeveloper: developer,
  extraData: {
    project_name,
    locations: preferredLocation,
    decisionTime: form.get("decisionTime"),
    contact_method: form.get("contact_method"),
    spokenLanguages: form.get("spokenLanguages"),
    ...utmData,
  },
};

  await fetch("https://admin.bnan-realestate.com/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PIXXI-TOKEN": "FWD4fkbabKionq77p3jNuf0g3cU1ZvVZ",
    },
    body: JSON.stringify(payload),
  });

  setSuccess(true);
  setLoading(false);
  e.target.reset();
};

  const Line = ({ title, name, options }: any) => (
    <div className="flex flex-wrap items-center gap-4 text-sm border-b py-3">
      <span className="font-medium min-w-[260px]">{title}</span>
      {options.map((o: any) => (
        <label key={o.value} className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name={name} value={o.value} />
          {o.label}
        </label>
      ))}
    </div>
  );

  if (success) {
    return (
      <div className="p-6 text-center">
        <h3 className="font-semibold">Thank you! Our agent will contact you shortly.</h3>
      </div>
    );
  }

  return (
    
   <form
  onSubmit={handleSubmit}
  className="w-full  bg-white p-6 md:p-8 shadow-lg text-gray-800"
>
  <div className="text-center my-6">
  <h2 className="text-2xl md:text-3xl font-bold">Register Your Interest</h2>
  <p className="text-gray-500 mt-1">Fill out the form below to get updates on properties that match your needs.</p>
</div>
  {/* All Fields in Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {/* Dropdowns */}
    {[
      {
        title: "Purpose of purchase?",
        name: "buyerType",
        options: [
          { value: "investor", label: "Investment" },
          { value: "homebuyer", label: "Living" },
          { value: "exploring", label: "Exploring" },
        ],
      },
      {
        title: "Decision time?",
        name: "decisionTime",
        options: [
          { value: "asap", label: "ASAP" },
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
        ],
      },
      {
        title: "Investment size?",
        name: "bedrooms",
        options: [
          { value: "studio", label: "Studio" },
          { value: "1", label: "1BR" },
          { value: "2", label: "2BR" },
          { value: "3", label: "3BR" },
          { value: "4", label: "4BR" },
          { value: "5", label: "5BR" },
          { value: "6", label: "6BR" },
          { value: "7+", label: "7+ BR" },
        ],
      },
      {
        title: "Contact method?",
        name: "contact_method",
        options: [
          { value: "Call", label: "Call" },
          { value: "Whatsapp", label: "Whatsapp" },
          { value: "Meeting", label: "Meeting" },
        ],
      },
      {
        title: "Gender?",
        name: "gender",
        options: [
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ],
      },
      {
        title: "Preferred Property Type?",
        name: "preferredPropertyType",
        options: [
          { value: "Apartment", label: "Apartment" },
          { value: "Villa", label: "Villa" },
          { value: "Townhouse", label: "Townhouse" },
          { value: "Studio", label: "Studio" },
        ],
      },
      {
        title: "Payment Method?",
        name: "paymentMethod",
        options: [
          { value: "Cash", label: "Cash" },
          { value: "Mortgage", label: "Mortgage" },
          { value: "Installments", label: "Installments" },
        ],
      },
      {
        title: "Furnishing?",
        name: "furnishing",
        options: [
          { value: "furnished", label: "Furnished" },
          { value: "unfurnished", label: "Unfurnished" },
          { value: "any", label: "Any" },
        ],
      },
    ].map((field) => (
      <select
        key={field.name}
        name={field.name}
        required
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      >
        <option value="">{field.title}</option>
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ))}
  {/* Dynamic Preferred Size */}
        <select
          name="preferredSize"
          required
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          <option value="">Preferred Size (sqft)</option>
          {sizeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
    {/* Input Fields */}
    {[
      { name: "name", placeholder: "Full Name" },
      { name: "phone", placeholder: "Phone" },
      { name: "email", placeholder: "Email" },
      { name: "spokenLanguages", placeholder: "Spoken Languages" },
      { name: "nationality", placeholder: "Nationality" },
      { name: "budget", placeholder: "Budget in AED" },
    ].map((field) => (
      <input
        key={field.name}
        name={field.name}
        required
        placeholder={field.placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    ))}
   
  </div>
   {/* Submit Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-56 block cursor-pointer bg-black hover:bg-[#d8b564] text-center m-auto text-white py-3 rounded-lg font-semibold mt-6 transition"
  >
    {loading ? "Submitting..." : "Submit"}
  </button>

</form>
  );
}