import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from '@mui/icons-material/Folder';
import ContactIcon from '@mui/icons-material/ContactMail';
import AboutIcon from '@mui/icons-material/SystemSecurityUpdate';
import AboutPage from '@mui/icons-material/Info';
import CompanyIcon from '@mui/icons-material/Details';
import LogoIcon from '@mui/icons-material/LogoDev';
import HomeIcon from '@mui/icons-material/Home';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

import Service from "../../components/services/Index";
import Projects from "../../components/projects";
import AboutUs from "../../components/about-us/about-home";
import Partners from "../../components/partners/Partner-home/Index";
import Company from "../../components/company/company-home/Index";
import SocialMedia from "../../components/social-media/social-home";
import ContactUs from '../../components/contact-us/contact-home';
import AboutPages from '../../components/about-page/about-home/Index';
import Logo from '../../components/Logo/logo-home/index';
import "../../assets/pages/home.scss"
// Navigation Configuration
const NAVIGATION = [
  { kind: "header", title: "MyDashboard" },
  { segment: "services", title: "Services", icon: <FolderIcon /> },
  { segment: "projects", title: "Projects", icon: <DashboardIcon /> },
  { segment: "about-us", title: "About", icon: <AboutIcon /> },
  { segment: "partners", title: "Partners", icon: <DashboardIcon /> },
  { segment: "company", title: "Company", icon: <CompanyIcon /> },
  { segment: "social-media", title: "Social-media", icon: <DashboardIcon /> },
  { segment: "contact-us", title: "Contact Us", icon: <ContactIcon /> },
  { segment: "about-page", title: "AboutPage", icon: <AboutPage /> },
  { segment: "logos", title: "Logo", icon: <LogoIcon /> },
  { kind: "divider" },
];

// Styling to hide specific elements
const HiddenHeader = styled("div")(() => ({
  "h6.MuiTypography-root": {
    display: "none",
  },
  "div.css-yzjoij": {
    display: "none",
  },
  width: "100%",
  height: "100vh",
  overflow: "hidden",
}));

const DashboardContainer = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  backgroundImage: 'url("../../../../../it2/MindMap/assets/img/bg.gif")',  // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

// Demo Theme Configuration
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

// Custom Router Hook
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  // Update the pathname based on user navigation
  const navigate = (newPath) => {
    setPathname(newPath);
  };

  return React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    }),
    [pathname]
  );
}

// Main Component
export default function DashboardPage({ window }) {
  const router = useDemoRouter("/dashboard");
  const demoWindow = window?.();
  const currentRoute = router.pathname;

  // Handle route-based component rendering
  const routeComponents = {
    "/services": <Service />,
    "/projects": <Projects />,
    "/about-us": <AboutUs />,
    "/partners": <Partners />,
    "/company": <Company />,
    "/social-media": <SocialMedia />,
    "/contact-us": <ContactUs />,
    "/about-page": <AboutPages />,
    "/logos": <Logo />,
  };

  const renderContent = routeComponents[currentRoute] || <div className="bord">Welcome Dashboard</div>;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <HiddenHeader>
        <DashboardContainer>
          <DashboardLayout>{renderContent}</DashboardLayout>
        </DashboardContainer>
      </HiddenHeader>
    </AppProvider>
  );
}
