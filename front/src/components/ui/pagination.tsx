import React from 'react'
import classes from './pagination.module.css'

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={classes.pagination}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// Определяем компонент PaginationContent с forwardRef
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={classes.paginationContent}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

// Определяем компонент PaginationItem с forwardRef
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={classes.paginationItem} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

// Определяем типы свойств для PaginationLink
type PaginationLinkProps = {
  isActive?: boolean;
  size?: 'small' | 'default' | 'large';
} & React.ComponentProps<"a">;

// Определяем компонент PaginationLink
const PaginationLink: React.FC<PaginationLinkProps> = ({
  className,
  isActive,
  size = "default",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={className}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

export { Pagination, PaginationContent, PaginationItem, PaginationLink };