import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import Link from "next/link";
import React from "react";

const CommonBreadCrumb = ({ breadCrumbsData = [] }) => {
  return (
    <Breadcrumb>
      {breadCrumbsData.map((breadCrumb) => {
        if (breadCrumb.hasLink) {
          return (
            <BreadcrumbItem key={breadCrumb.id}>
              <Link href={breadCrumb.link} passHref>
                {breadCrumb.name}
              </Link>
            </BreadcrumbItem>
          );
        } else {
          return (
            <BreadcrumbItem
              key={breadCrumb.id}
              isCurrentPage={breadCrumb.isCurrentPage}
            >
              {breadCrumb.name}
            </BreadcrumbItem>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default CommonBreadCrumb;
