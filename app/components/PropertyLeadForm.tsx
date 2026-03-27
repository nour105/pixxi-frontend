"use client";

import { useState, useEffect } from "react";

interface Props {
  propertyReference?: string;
  developer?: string | number;
  project_location?: string | string[];
  project_name?: string | string[];
}

export default function PropertyLeadForm({
  propertyReference,
  developer,
  project_location,
  project_name,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Get UTM parameters from URL
  const getUTM = (key: string) => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || "";
  };

  // ✅ Normalize phone number to +961 format
  const normalizePhone = (value: string) => {
    let phone = value.replace(/\D/g, "");
    if (phone.startsWith("0")) phone = phone.slice(1);
    if (phone.startsWith("961")) phone = phone.slice(3);
    return "+961" + phone;
  };

  const toRange = (v: FormDataEntryValue | null) => {
    const val = String(v || "").trim();
    if (!val) return undefined;
    return val.includes("-") ? val : `${val}-${val}`;
  };

 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
  
    const payload = {
      formId: "f2e71549-062f-4874-8584-009df4d7f850",
      propertyReference: propertyReference || undefined,
      name: form.get("name"),
      email: form.get("email"),
      phone: normalizePhone(String(form.get("phone"))),
      nationality: form.get("nationality") || undefined,
      budget: toRange(form.get("budget")),
      preferredSize: toRange(form.get("preferredSize")),
      propertyType: form.get("propertyType") || undefined,
      bedrooms: form.get("bedrooms") || undefined,
      furnishing: form.get("furnishing") || undefined,
      gender: form.get("gender") || undefined,
      projectType: form.get("projectType") || "off_plan",
      buyerType: form.get("buyerType") || "investor",
      paymentMethod: form.get("paymentMethod") || "cash",
      "Spoken Languages": form.get("spokenLanguages") || "",
      preferredDeveloper: developer || undefined, // PIXXI uses ID
        project_location: project_location || "",
  "Project Location": project_location || "",

      extraData: {
        utm_source: getUTM("utm_source"),
        utm_medium: getUTM("utm_medium") || "",
        utm_campaign: getUTM("utm_campaign") || "",
        utm_term: getUTM("utm_term") || "",
        utm_content: getUTM("utm_content") || "",
  project_location: project_location || "",
    "Project Location": project_location || "",
locations: project_location || "",
project_name: project_name || "",
        "Source Of Lead": "Marketing Campaign",
        "Form Name": "off plan",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        projectName: project_name || "",
      },
    };

    try {
      const res = await fetch("https://admin.bnan-realestate.com/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PIXXI-TOKEN": "FWD4fkbabKionq77p3jNuf0g3cU1ZvVZ",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Lead submission response:", data);

      if (data.statusCode === 200) {
        setSuccess(true);
        e.target.reset();
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
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
      <div className="grid grid-cols-4 gap-3">
      <input
        name="name"
        required
        placeholder="Full Name"
        className="w-full border p-3"
      />
      <input
        name="email"
        required
        placeholder="Email"
        className="w-full border p-3"
      />
      <input
        name="phone"
        required
        placeholder="Phone"
        className="w-full border p-3"
      />
      <input
        name="nationality"
        placeholder="Nationality"
        className="w-full border p-3"
      />
</div>
<div className="grid grid-cols-4 gap-3">
      <input
        name="budget"
        placeholder="Budget (e.g. 5000-10000)"
        className="w-full border p-3"
      />
      <input
        name="preferredSize"
        placeholder="Preferred Size sqft (e.g. 500-1000)"
        className="w-full border p-3"
      />

      <select name="propertyType" className="w-full border p-3">
        <option value="">Property Type</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
      </select>

      <select name="bedrooms" className="w-full border p-3">
        <option value="">Bedrooms</option>
        <option value="studio">Studio</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
       <select name="furnishing" className="w-full border p-3">
        <option value="">Furnishing</option>
        <option value="furnished">Furnished</option>
        <option value="unfurnished">Unfurnished</option>
        <option value="any">Any</option>
      </select>
      
      <select name="gender" className="w-full border p-3">
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
         <select name="projectType" className="w-full border p-3">
        <option value="off_plan">Off Plan</option>
        <option value="secondary">Secondary</option>
      </select>


      <select name="buyerType" className="w-full border p-3">
        <option value="investor">Investor</option>
        <option value="homebuyer">Home Buyer</option>
      </select>

      <select name="paymentMethod" className="w-full border p-3">
        <option value="cash">Cash</option>
        <option value="mortgage">Mortgage</option>
        <option value="cheque">Cheque</option>
      </select>
             <button className="w-full bg-black text-white py-3">
        {loading ? "Submitting..." : "Submit"}
      </button>
          {/* <input
        name="spokenLanguages"
        placeholder="Spoken Languages"
        className="w-full border p-3"
      /> */}
</div> 
    </form>
  );
}