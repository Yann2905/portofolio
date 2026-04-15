"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/store";
import type { Project, Skill } from "@/lib/types";
import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import ProjectDetailOverlay from "./ProjectDetailOverlay";
import HomeScreen from "./screens/HomeScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import SkillsScreen from "./screens/SkillsScreen";
import ContactScreen from "./screens/ContactScreen";

export default function PhoneShell({
  projects,
  skills,
}: {
  projects: Project[];
  skills: Skill[];
}) {
  const screen = useApp((s) => s.screen);
  const direction = useApp((s) => s.direction);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen />;
      case "projects":
        return <ProjectsScreen projects={projects} />;
      case "skills":
        return <SkillsScreen skills={skills} />;
      case "contact":
        return <ContactScreen />;
    }
  };

  return (
    <>
      {/* Desktop: framed phone */}
      <div className="relative hidden flex-shrink-0 md:block">
        <div className="relative h-[780px] w-[380px] rounded-[55px] border border-white/10 bg-bg-soft p-3 shadow-phone">
          <div className="absolute -left-1 top-32 h-16 w-1 rounded-l bg-white/10" />
          <div className="absolute -left-1 top-52 h-24 w-1 rounded-l bg-white/10" />
          <div className="absolute -right-1 top-40 h-20 w-1 rounded-r bg-white/10" />
          <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-bg">
            <StatusBar />
            <ScreenViewport screen={screen} direction={direction}>
              {renderScreen()}
            </ScreenViewport>
            <ProjectDetailOverlay projects={projects} />
            <BottomNav />
          </div>
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="relative h-full w-full overflow-hidden bg-bg md:hidden">
        <StatusBar />
        <ScreenViewport screen={screen} direction={direction}>
          {renderScreen()}
        </ScreenViewport>
        <ProjectDetailOverlay projects={projects} />
        <BottomNav />
      </div>
    </>
  );
}

function ScreenViewport({
  screen,
  direction,
  children,
}: {
  screen: string;
  direction: 1 | -1;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-x-0 top-8 bottom-[86px] overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={screen}
          custom={direction}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="phone-scroll absolute inset-0 overflow-y-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
