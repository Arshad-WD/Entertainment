import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaCheck, FaTimes, FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import { RiMovie2Line } from 'react-icons/ri';

const Prime = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (JSON.parse(storedUser).prime) {
        setIsUpgraded(true);
      }
    }
  }, []);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedUser = {
        ...(user || { name: "Demon King Sukuna", email: "sukuna@luxevista.com" }),
        prime: true
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsUpgraded(true);
      setShowCheckout(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCancelSubscription = () => {
    if (window.confirm("Are you sure you want to cancel your LuxeVista Pass?")) {
      const updatedUser = { ...user, prime: false };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsUpgraded(false);
    }
  };

  return (
    <div className="bg-zinc-950 flex justify-center items-center min-h-[calc(100vh-4rem)] relative overflow-hidden text-zinc-200 py-12">
      {/* Dynamic Gold Aura Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-6 animate-fade-in">
        
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="flex items-center justify-center bg-amber-500/10 border border-amber-500/30 p-3 rounded-full mb-4 animate-bounce">
            <FaCrown className="text-amber-400 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            LuxeVista <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">VIP Cinema Pass</span>
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl font-light mt-3 leading-relaxed">
            Elevate your entertainment experience. Unlock extreme cinematic privileges, ultra performance metrics, and exclusive access panels.
          </p>
        </div>

        {/* Upgrade Success Notification */}
        {isUpgraded ? (
          <div className="bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-amber-500/30 shadow-2xl text-center flex flex-col items-center max-w-xl mx-auto">
            <FaCheckCircle className="text-amber-400 text-6xl mb-6 animate-pulse" />
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">You Are LuxeVista VIP</h2>
            <p className="text-xs text-zinc-400 mt-2 tracking-wide uppercase">Active Pass Holder: {user?.name}</p>
            
            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl w-full my-6 text-left space-y-3">
              <div className="flex items-center space-x-2 text-xs">
                <FaCheck className="text-amber-400 text-xs" />
                <span className="text-zinc-300">Dolby Atmos Cinematic Sound enabled</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <FaCheck className="text-amber-400 text-xs" />
                <span className="text-zinc-300">Ultra High Definition 4K HDR playback enabled</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <FaCheck className="text-amber-400 text-xs" />
                <span className="text-zinc-300">Unlimited API query speed allocation unlocked</span>
              </div>
            </div>

            <div className="flex space-x-4 w-full">
              <button 
                onClick={() => navigate("/")}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
              >
                Go to Lobby
              </button>
              <button 
                onClick={handleCancelSubscription}
                className="px-6 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
              >
                Cancel Pass
              </button>
            </div>
          </div>
        ) : !showCheckout ? (
          /* Cards Grid pricing options */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Standard plan card */}
            <div className="bg-zinc-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Standard tier</span>
                <h3 className="text-xl font-bold text-white uppercase">Free Access</h3>
                <p className="text-xs text-zinc-400 font-light mt-1">Standard streaming and details catalogs.</p>
                <div className="my-6 border-t border-white/5 pt-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs text-zinc-400">
                    <FaCheck className="text-zinc-500 text-xs" />
                    <span>Live TMDB & RAWG listings</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-400">
                    <FaCheck className="text-zinc-500 text-xs" />
                    <span>Standard search query filters</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 line-through">
                    <FaTimes size={10} className="text-red-500/50" />
                    <span>Dolby Atmos audio stream</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 line-through">
                    <FaTimes size={10} className="text-red-500/50" />
                    <span>Ultra HD 4K playbacks</span>
                  </div>
                </div>
              </div>
              <button disabled className="w-full text-center py-3 text-xs font-black uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/5 rounded-xl">
                Current Plan
              </button>
            </div>

            {/* VIP Pass premium card */}
            <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-amber-500/10">
                RECOMMENDED
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest block mb-2">Cinema elite</span>
                <h3 className="text-xl font-bold text-white uppercase flex items-center justify-between">
                  <span>VIP Pass</span>
                  <span className="text-base text-amber-400 lowercase font-light">$9.99/mo</span>
                </h3>
                <p className="text-xs text-zinc-300 font-light mt-1">Unlock supreme entertainment privileges.</p>
                <div className="my-6 border-t border-white/5 pt-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <FaCheck className="text-amber-400 text-xs" />
                    <span>Everything in Standard plan</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <FaCheck className="text-amber-400 text-xs" />
                    <span>Dolby Atmos Digital surround enabled</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <FaCheck className="text-amber-400 text-xs" />
                    <span>Ultra HD 4K theatrical resolutions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-300">
                    <FaCheck className="text-amber-400 text-xs" />
                    <span>Exclusive VIP Badge and custom avatars</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full text-center py-3 text-xs font-black uppercase tracking-widest text-zinc-950 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10"
              >
                Upgrade to VIP
              </button>
            </div>

          </div>
        ) : (
          /* Billing Checkout Simulator */
          <div className="bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl max-w-md mx-auto">
            
            <div className="flex items-center space-x-2 mb-6 justify-center">
              <RiMovie2Line className="text-amber-400 text-2xl" />
              <h2 className="text-xl font-black uppercase tracking-wider text-white">LuxeVista checkout</h2>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div>
                <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Card Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <FaCreditCard className="text-xs" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950/80 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all text-xs text-center"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block mb-2">CVC Code</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                      <FaLock className="text-[10px]" />
                    </span>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  {isSubmitting ? "Authorizing..." : "Submit Pass Payment"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-5 border border-white/10 hover:bg-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Prime;
