import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

function BreadcrumbProperty() {
  return (
    
    <div>
      <Breadcrumb className="p-3 ">
        <BreadcrumbList>
          <BreadcrumbItem >
            <BreadcrumbLink href="/" className="text-xs text-blue-600 hover:underline hover:text-blue-600">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components" className="text-xs text-blue-600 hover:underline hover:text-blue-600">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components" className="text-xs text-blue-600 hover:underline hover:text-blue-600">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components" className="text-xs text-blue-600 hover:underline hover:text-blue-600">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components" className="text-xs text-blue-600 hover:underline hover:text-blue-600">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components" className="text-xs text-blue-600 hover:underline hover:text-blue-600">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}


export default BreadcrumbProperty
