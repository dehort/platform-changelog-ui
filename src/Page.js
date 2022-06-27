import React from "react";
import {
  Nav,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  SkipToContent,
} from "@patternfly/react-core";
import AppHeader from "./Header";

import {Routes, Route, useLocation, Link} from "react-router-dom";

import Home from "Home";
import Service from "./Service";
import Services from "Services";
import Commits from "Commits";
import Deploys from "Deploys";
import Error from "Error";

function AppPage() {

    const active = useLocation().pathname;

    const PageNav = (
        <Nav aria-label="Nav">
            <NavList>
                <NavItem itemId={0} isActive={active === "/"}>
                    <Link to="/">Home</Link>
                </NavItem>
                <NavItem itemId={1} isActive={active === "/services"}>
                    <Link to="/services">Services</Link>
                </NavItem>
                <NavItem itemId={2} isActive={active === "/commits"}>
                    <Link to="/commits">Commits</Link>
                </NavItem>
                <NavItem itemId={3} isActive={active === "/deploys"}>
                    <Link to="/deploys">Deploys</Link>
                </NavItem>
            </NavList>
        </Nav>
    );

    const Sidebar = <PageSidebar nav={PageNav} />;
    const pageId = "main-content-page-layout-simple-nav";
    const PageSkipToContent = (
        <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>
    );

    return (
        <Page
            header={<AppHeader />}
            sidebar={Sidebar}
            isManagedSidebar
            skipToContent={PageSkipToContent}
            mainContainerId={pageId}
            className="myPageClass"
        >
            <Routes>
                <Route path="*" element={<Error error="Page not found"/>} />

                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/commits" element={<Commits />} />
                <Route path="/deploys" element={<Deploys />} />
                <Route path="/services/:name" element={<Service />} />
            </Routes>
        </Page>
    );
}

export default AppPage;

