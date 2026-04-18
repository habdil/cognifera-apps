"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative h-full flex items-center">
      <motion.p
        transition={{ duration: 0.2 }}
        className={`cursor-pointer text-sm tracking-wide px-4 h-full flex items-center border-b-2 transition-colors ${
          active === item
            ? "text-black border-primary"
            : "text-gray-600 hover:text-black border-transparent"
        }`}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {active === item && (
            <div className="absolute top-full left-0 pt-0">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white border border-gray-200 shadow-lg"
              >
                <motion.div layout className="w-max h-full p-5 min-w-[180px]">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center space-x-1 h-16"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
      <Image
        src={src}
        width={80}
        height={50}
        alt={title}
        quality={70}
        sizes="80px"
        className="shrink-0 object-cover"
      />
      <div className="flex-1">
        <h4 className="text-base font-semibold mb-1 text-black">
          {title}
        </h4>
        <p className="text-neutral-600 text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};

// Context for managing secondary menu state
const SecondaryMenuContext = React.createContext<{
  activeSecondary: string | null;
  setActiveSecondary: (item: string | null) => void;
} | null>(null);

export const HoveredLink = ({ 
  children, 
  subItems,
  ...rest 
}: {
  children: React.ReactNode;
  subItems?: { title: string; href: string; description?: string }[];
  [key: string]: any;
}) => {
  // Use context if available, otherwise fall back to local state
  const context = React.useContext(SecondaryMenuContext);
  const [localActiveSecondary, setLocalActiveSecondary] = React.useState<string | null>(null);
  
  const activeSecondary = context?.activeSecondary ?? localActiveSecondary;
  const setActiveSecondary = context?.setActiveSecondary ?? setLocalActiveSecondary;

  const linkKey = String(children); // Use children as unique key

  if (!subItems || subItems.length === 0) {
    // Original behavior for items without subItems
    return (
      <a
        {...rest}
        className="text-neutral-700 hover:text-black"
      >
        {children}
      </a>
    );
  }

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setActiveSecondary(linkKey)}
      onMouseLeave={() => setActiveSecondary(null)}
    >
      <a
        {...rest}
        className="text-neutral-700 hover:text-black flex items-center justify-between w-full"
      >
        <span>{children}</span>
        <svg 
          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
      
        {activeSecondary !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={transition}
          >
            {activeSecondary === linkKey && (
              <div className="absolute left-full ml-2 -translate-y-20 z-[9999]">
                <motion.div
                  transition={transition}
                  layoutId="activeSecondary"
                  className="bg-white border border-gray-200 shadow-lg min-w-[250px]"
                >
                <motion.div layout className="w-max h-full p-4">
                  <div className="space-y-2">
                    {subItems.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-3 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-sm text-black">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-neutral-600 mt-1">{item.description}</div>
                        )}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// Wrapper component to provide secondary menu context
export const SecondaryMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSecondary, setActiveSecondary] = React.useState<string | null>(null);
  
  return (
    <SecondaryMenuContext.Provider value={{ activeSecondary, setActiveSecondary }}>
      {children}
    </SecondaryMenuContext.Provider>
  );
};
