"use client";

import {
  HeaderContainer,
  HeaderName,
  Header,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenuItem,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { UserAvatar } from "@carbon/icons-react";
import Link from "next/link";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

function HeaderCompo() {
  const router = useRouter();
  const wrapperRef = useRef();
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => {
        return (
          <Header aria-label="Carbon Tutorial">
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <Link href="/" passHref legacyBehavior>
              <div ref={wrapperRef}>
                <HeaderName prefix="Carbon">Admin Panel</HeaderName>
              </div>
            </Link>
            <HeaderNavigation aria-label="Carbon Tutoriall">
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
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Profile"
                tooltipAlignment="start"
                className="action-icons"
                onClick={() => router.push(`/login`)}
              >
                <UserAvatar size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        );
      }}
    />
  );
}

export default HeaderCompo;
