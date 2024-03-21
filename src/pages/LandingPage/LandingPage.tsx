import React, { useRef, useState } from "react";
import { Header } from "../../components/Header";
import Nav from "../../components/Nav";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import Views from "../../components/Views";
import { Pricing } from "../../components/Pricing";
import Questions from "../../components/Questions";
import Optimize from "../../components/Optimize";
import Sidebar from "../../components/Sidebar";

function LandingPage() {
  const nav = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const scrollToView = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (!id) return;
    const element = document.querySelector(`#${id}`) as HTMLElement;
    const navHeight = nav.current?.getBoundingClientRect().height || 0;
    const fixedNav = nav.current?.classList.contains("sticky") || false;
    let position = element?.offsetTop - navHeight;
    if (!fixedNav) {
      position -= navHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Nav
        // nav={nav}
        onSidebarOpen={handleOpenSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Header />
      <Views />
      <Features />
      <Pricing />
      <Questions />
      <Optimize />
      <Footer />
      <Sidebar
        sidebarOpen={sidebarOpen}
        onSidebarClose={handleCloseSidebar}
        scrollToView={scrollToView}
      />
    </>
  );
}

export default LandingPage;
