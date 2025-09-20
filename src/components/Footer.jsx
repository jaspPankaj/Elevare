import ScrollToTop from "./ui/ScrollToTop";

export const  Footer = () => {
  return (
    <div  className="relative flex flex-col items-center justify-center gap-4 px-4 p-8">
        
        {/* Brand / Logo */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600">Elevare</h2>
          <p className="text-sm text-blue-800">
            From skills to success, Smarter with AI.
          </p>
        </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Elevare. All rights reserved.
      </div>
    
    <ScrollToTop />

    </div>
  );
}
