"use client";

import { useState } from "react";
import Nav from "./navigasi";
import AllView from "./components/views/AllView";
import UIUXView from "./components/views/UIUXView";
import FullStackView from "./components/views/FullStackView";
import WritingView from "./components/views/WritingView";
import CreativeWorksView from "./components/views/CreativeWorksView";

import BinderHolesTop from "./components/ui/BinderHolesTop";
import AchievementsSection from "./components/sections/AchievementsSection";
import SkillsSection from "./components/sections/SkillsSection";
import CertificatesSection from "./components/sections/CertificatesSection";
import FooterSection from "./components/sections/FooterSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <main className="min-h-screen bg-grid-blue relative border-t-2 border-blue-200/50 shadow-[0_-12px_24px_rgba(0,0,0,0.02)]">
      {/* Top Loose-Leaf Notebook Binder Holes Bar */}
      <BinderHolesTop />

      {/* Navigation Bar (All, Creative Works, UI/UX Design, Fullstack Developer, Writing) */}
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Main Content Based on Active Category Tab */}
      {activeTab === "All" && (
        <AllView onSelectCategory={(cat) => setActiveTab(cat)} />
      )}
      {activeTab === "UI/UX Design" && <UIUXView />}
      {activeTab === "Fullstack Developer" && <FullStackView />}
      {activeTab === "Writing" && <WritingView />}
      {activeTab === "Creative Works" && <CreativeWorksView />}

      {/* Shared Global Sections (Achievements, Skill, Sertifikat, Footer - Stay Visible Across All Tabs) */}
      <div className="mt-16 space-y-12">
        <AchievementsSection />
        <SkillsSection />
        <CertificatesSection />
        <FooterSection />
      </div>
    </main>
  );
}