import React from "react";
import Nav from "@/components/decoded/Nav";
import Hero from "@/components/decoded/Hero";
import Stats from "@/components/decoded/Stats";
import DocumentCard from "@/components/decoded/DocumentCard";
import Features from "@/components/decoded/Features";
import SocialProof from "@/components/decoded/SocialProof";
import Ticker from "@/components/decoded/Ticker";
import Footer from "@/components/decoded/Footer";

export default function Landing() {
  const scrollToSignup = () => {
    const el = document.getElementById("signup");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="paper-texture min-h-screen relative overflow-x-hidden">
      <Nav onRequestAccess={scrollToSignup} />
      <main>
        <Hero onCTAClick={scrollToSignup} />
        <Stats />
        <DocumentCard />
        <Features />
        <SocialProof />
        <Ticker />
      </main>
      <Footer />
    </div>
  );
}
