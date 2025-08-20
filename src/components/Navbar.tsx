"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useScroll, motion } from "framer-motion";
import { redirect, useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";

export default function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref });
  const router = useRouter();

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // redirect to home after login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div ref={ref}>
      <motion.div
        className="fixed top-4 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 transition-all"
        animate={{
          width: shrink ? "70%" : "90%",
          borderRadius: shrink ? "12px" : "0px",
          backgroundColor: shrink ? "rgba(255, 255, 255, 0.95)" : "transparent",
          boxShadow: shrink
            ? "0 10px 30px rgba(0,0,0,0.1)"
            : "0 0 0 rgba(0,0,0,0)",
          backdropFilter: shrink ? "blur(8px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <Navbar>
          {/* Desktop Nav */}
          <NavBody visible={shrink}>
            {/* Replaced existing logo component with Nexora text */}
            <div className="flex items-center gap-2 cursor-pointer select-none">
              {/* Logo Icon */}
              <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center shadow-md">
                <span className="text-white dark:text-slate-900 font-bold text-lg">
                  N
                </span>
              </div>

              {/* Logo Text */}
              <span className="text-1xl md:text-1xl font-semibold text-slate-900 dark:text-white">
                Nexora
              </span>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => redirect("/admin")}
                    className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-2xl hover:bg-blue-900 transition"
                  >
                    Admin
                  </button>

                  <NavbarButton onClick={handleLogout} variant="secondary">
                    Logout
                  </NavbarButton>
                </>
              ) : (
                <NavbarButton onClick={handleGoogleSignIn} variant="primary">
                  Continue with Google
                </NavbarButton>
              )}
            </div>
          </NavBody>

          {/* Mobile Nav */}
          <MobileNav visible={shrink}>
            <MobileNavHeader>
              {/* Mobile logo replaced with Nexora text */}
              <div className="text-xl font-bold text-slate-900 dark:text-white cursor-pointer">
                Nexora
              </div>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex w-full flex-col gap-2 mt-4">
                {user ? (
                  <>
                    <img
                      src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    />
                    <NavbarButton onClick={handleLogout} variant="secondary">
                      Logout
                    </NavbarButton>
                  </>
                ) : (
                  <NavbarButton onClick={handleGoogleSignIn} variant="primary">
                    Continue with Google
                  </NavbarButton>
                )}
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </motion.div>
    </div>
  );
}
