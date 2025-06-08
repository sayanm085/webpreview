import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FiMenu, FiX } from 'react-icons/fi';

const mobileNavVariants = {
  closed: { x: '100%' },
  open: { x: 0 }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full z-[9999] flex justify-center pointer-events-none px-4 sm:px-6 md:px-8 pt-6`}
      >
        <div 
          className={`
            pointer-events-auto
            transition-all duration-300 ease-in-out
            bg-black/80 backdrop-blur-sm
            rounded-md
            max-w-3xl w-full py-3`}
        >
          <div className="flex items-center justify-between px-4">
            {/* Hamburger for Mobile */}
            <div className="lg:hidden flex items-center">
              <button
                aria-label="Open menu"
                className="text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FiMenu size={20} />
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center mx-auto lg:mx-0 lg:ml-8">
              <h1 className="text-xl font-light text-white tracking-wider">SUFI PALACE</h1>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <nav className="flex items-center gap-8 text-white text-sm">
                <Link to="/Menu" className="uppercase hover:text-gray-300 transition-colors tracking-wide">Menu</Link>
                <Link to="/Feedback" className="uppercase hover:text-gray-300 transition-colors tracking-wide">Feedback</Link>
                <Link to="/Contact" className="uppercase hover:text-gray-300 transition-colors tracking-wide">Contact</Link>
                <Link to="/About" className="uppercase hover:text-gray-300 transition-colors tracking-wide">About</Link>


              </nav>
            </div>

            {/* Book a Table Button */}
            <div className="hidden lg:block">
              <Button 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors uppercase text-xs px-5 py-1.5 rounded-sm"
              >
                Book a Table
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileNavVariants}
            transition={{ type: "spring", stiffness: 330, damping: 30 }}
            className="fixed top-0 right-0 z-[9999] w-[85vw] max-w-xs h-screen bg-black/95 shadow-2xl flex flex-col py-8 px-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="text-xl font-light text-white uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>
                SUFI PALACE
              </Link>
              <button
                aria-label="Close menu"
                className="p-2 text-white rounded-md focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-4 pt-4 text-white">
              <Link to="/Menu" className="py-2 uppercase text-sm" onClick={() => setMobileMenuOpen(false)}>
                Menu
              </Link>
              <Link to="/Feedback" className="py-2 uppercase text-sm" onClick={() => setMobileMenuOpen(false)}>
                Feedback
              </Link>
              <Link to="/Contact" className="py-2 uppercase text-sm" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/About" className="py-2 uppercase text-sm" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <div className="mt-8">
                <Button 
                  className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors uppercase text-xs px-5 py-1.5 rounded-none"
                >
                  Book a Table
                </Button>
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;