"use client";
import React from "react";
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
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-2xl border border-black/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
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
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent bg-white shadow-input flex justify-center space-x-4 px-8 py-6 "
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
      <img
        src={src}
        width={80}
        height={50}
        alt={title}
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
                  className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] shadow-xl min-w-[250px]"
                >
                <motion.div layout className="w-max h-full p-4">
                  <div className="space-y-2">
                    {subItems.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
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
