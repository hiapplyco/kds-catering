import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, unoptimized, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        return ({
          children,
          ...props
        }: {
          children?: React.ReactNode;
          [key: string]: unknown;
        }) => {
          const { initial, animate, exit, transition, whileInView, viewport, layout, ...domProps } = props;
          const Tag = String(prop) as keyof JSX.IntrinsicElements;
          return <Tag {...(domProps as Record<string, unknown>)}>{children}</Tag>;
        };
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock firebase
vi.mock("@/lib/firebase", () => ({
  db: {},
  storage: {},
  auth: {},
}));
