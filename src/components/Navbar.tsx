"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useScroll, motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
            <NavbarLogo />
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <img
                    src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full "
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
          </NavBody>

          {/* Mobile Nav */}
          <MobileNav visible={shrink}>
            <MobileNavHeader>
              <NavbarLogo />
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
