"use client";

import {
  HeaderContainer,
  HeaderName,
  Header,
  SkipToContent,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenuItem,
  HeaderNavigation,
} from "@carbon/react";
import Link from "next/link";
import React from "react";

function HeaderCompo() {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => {
        console.log("🚀 ~ HeaderCompo ~ isSideNavExpanded:", isSideNavExpanded);
        return (
          <Header aria-label="Carbon Tutorial">
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <Link href="/" passHref legacyBehavior>
              <HeaderName prefix="Carbon">Admin Panel</HeaderName>
            </Link>
            <HeaderNavigation aria-label="Carbon Tutorial">
              <Link href="/user-management" passHref legacyBehavior>
                <HeaderMenuItem>User Management</HeaderMenuItem>
              </Link>
            </HeaderNavigation>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <Link href="/user-management" passHref legacyBehavior>
                    <HeaderMenuItem>User Management</HeaderMenuItem>
                  </Link>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        );
      }}
    />
  );
}

export default HeaderCompo;
