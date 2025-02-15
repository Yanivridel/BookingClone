import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

interface BreadcrumbItem {
  label?: string | null;
  onClick?: () => void; // If no href, it means it's the current page
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function BreadcrumbCard({ items }: BreadcrumbProps) {
  items = items.filter(item => item.label);
  return (
    <div>
      <Breadcrumb className="pb-2">
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.onClick ? (
                  <BreadcrumbLink
                    onClick={item.onClick}
                    className="text-blue-600 hover:underline hover:text-blue-600 text-xs cursor-pointer"
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className='text-xs'>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbCard
