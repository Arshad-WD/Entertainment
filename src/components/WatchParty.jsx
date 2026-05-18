import React, { useState, useEffect, useRef } from 'react';
import { FaUsers, FaPlay, FaVolumeMute, FaVolumeUp, FaPaperPlane, FaCrown, FaFilm } from 'react-icons/fa';
import Profile1 from '../assets/profile1.jpeg';
import Profile2 from '../assets/profile2.jpeg';
import Profile3 from '../assets/profile3.jpeg';
import Profile4 from '../assets/profile4.jpeg';
import Profile5 from '../assets/profile5.jpeg';
import Profile6 from '../assets/profile6.jpeg';

const WATCH_ROOMS = [
  {
    id: 'john-wick',
    title: 'John Wick: Chapter 4 Live screening',
    category: 'Cinema',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-42220-large.mp4',
    viewers: 1420,
    topic: 'Discussing stunt choreography and neon lighting design'
  },
  {
    id: 'witcher-showcase',
    title: 'The Witcher 3: Full Ray-Tracing Gameplay',
    category: 'Gaming',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-soldier-running-in-a-futuristic-city-43187-large.mp4',
    viewers: 890,
    topic: 'Unlocking raw 4K performance metrics and side-quest arcs'
  },
  {
    id: 'anime-lobby',
    title: 'Anime Legends Tribute & AMV Live',
    category: 'Series',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41764-large.mp4',
    viewers: 2110,
    topic: 'Streaming classic soundtracks and character design sweeps'
  }
];

const BOT_USERS = [
  { name: 'Monkey D. Luffy', avatar: Profile1, messages: ['GOMU GOMU NO! This movie is so peak!', 'Wait, where is the popcorn?', 'That combat is almost as fast as Second Gear!', 'Do you think Keanu wants to join my crew?'] },
  { name: 'Roronoa Zoro', avatar: Profile2, messages: ['I got lost on my way to the gaming tab, but this works.', 'The swordsmanship in this scene is average.', 'Chilling in LuxeVista VIP lobby. Nice gold crowns.', 'I should teach this guy three-sword style.'] },
  { name: 'Sukuna', avatar: Profile3, messages: ['Fascinating human entertainment. It amuses me.', 'I would dominate this arena in seconds.', 'The neon lighting is acceptable.', 'Whoever engineered this glass watch room has fine taste.'] },
  { name: 'Anime Princess', avatar: Profile4, messages: ['This visual aesthetic is absolutely perfect!', 'Is anyone watching this in Dolby Atmos?', 'LuxeVista VIP pass is so worth it.', 'OMGGG that transformation scene! ✨'] },
  { name: 'Itachi Uchiha', avatar: Profile5, messages: ['Your perception of this movie is merely an illusion.', 'Amaterasu could replicate these fire effects easily.', 'Observe the lighting. It reflects deep sharing.', 'Chilling in the shadow lobby.'] },
  { name: 'Mikasa Ackerman', avatar: Profile6, messages: ['The combat here is clean, but Eren is faster.', 'I will protect this screening room.', 'Very smooth 120fps video rendering.', 'Chilling with friends. Perfect watch party.'] }
];

const WatchParty = () => {
  const [activeRoom, setActiveRoom] = useState(WATCH_ROOMS[0]);
  const [user, setUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const chatEndRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Read session user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Set initial mock messages
    setChatMessages([
      { id: 1, sender: 'Monkey D. Luffy', avatar: Profile1, text: 'Hello everyone! Watch party lobby is finally live!', isPrime: false },
      { id: 2, sender: 'Anime Princess', avatar: Profile4, text: 'OMG this subway neon lighting scene is stunning! 💖', isPrime: true },
      { id: 3, sender: 'Roronoa Zoro', avatar: Profile2, text: 'Im just here because I got lost, but the video quality is incredible.', isPrime: false }
    ]);
  }, [activeRoom]);

  // Handle auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Periodic bot message simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const randomBot = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
      const randomText = randomBot.messages[Math.floor(Math.random() * randomBot.messages.length)];
      
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: randomBot.name,
          avatar: randomBot.avatar,
          text: randomText,
          isPrime: Math.random() > 0.4
        }
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: user?.name || 'Luxe Guest',
      avatar: user?.profilePhoto || Profile3,
      text: typedMessage,
      isPrime: user?.prime || false
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const currentTyped = typedMessage.toLowerCase();
    setTypedMessage('');

    // Simulated responsive reply after 2 seconds
    setTimeout(() => {
      const responder = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
      let replyText = `Wait, did ${userMessage.sender.split(" ")[0]} just say that? That's so true!`;
      
      if (currentTyped.includes("prime") || currentTyped.includes("crown") || currentTyped.includes("vip")) {
        replyText = `Whoa! Look at the glowing gold crown next to ${userMessage.sender.split(" ")[0]}! You upgraded to VIP pass? SICK! 🔥`;
      } else if (currentTyped.includes("hello") || currentTyped.includes("hey") || currentTyped.includes("hi")) {
        replyText = `Welcome to the watch party ${userMessage.sender.split(" ")[0]}! Grab some popcorn 🍿`;
      } else if (currentTyped.includes("cool") || currentTyped.includes("awesome") || currentTyped.includes("love")) {
        replyText = `Totally agree with you, ${userMessage.sender.split(" ")[0]}! LuxeVista UI is beautiful.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: responder.name,
          avatar: responder.avatar,
          text: replyText,
          isPrime: Math.random() > 0.5
        }
      ]);
    }, 2000);
  };

  const handleRoomSelect = (room) => {
    setActiveRoom(room);
    if (videoRef.current) {
      videoRef.current.load();
      if (!isVideoMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-4rem)] text-zinc-100 flex flex-col lg:flex-row relative overflow-hidden">
      
      {/* Dynamic Purple/Cyan Ambilight Aura Backdrop */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* LEFT: Lobby Rooms Grid & Main Video Player */}
      <div className="flex-1 p-6 md:p-8 flex flex-col space-y-6 relative z-10 lg:max-w-[70%]">
        
        {/* Screening Rooms List Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WATCH_ROOMS.map((room) => {
            const isActive = room.id === activeRoom.id;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-purple-500/50 shadow-lg shadow-purple-500/5' 
                    : 'bg-zinc-900/50 border-white/5 hover:border-white/10 hover:bg-zinc-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                    room.category === 'Cinema' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    room.category === 'Gaming' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                    'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {room.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 flex items-center space-x-1 font-bold">
                    <FaUsers className="text-zinc-500 text-xs" />
                    <span>{room.viewers} watching</span>
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase truncate tracking-wide">{room.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Video Player Frame with Glowing Ambilight */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-zinc-950 aspect-video group holo-border-glow">
          
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            src={activeRoom.videoUrl}
            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
          />

          {/* Hover Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
            
            <div className="flex items-center space-x-2">
              <FaFilm className="text-purple-400 text-sm animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">LUXEVISTA SIMULATOR</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all focus:outline-none"
                >
                  {isVideoMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase truncate tracking-wide">{activeRoom.title}</span>
                  <span className="text-[9px] text-zinc-400 font-light mt-0.5">{activeRoom.topic}</span>
                </div>
              </div>
              
              <span className="text-[9px] font-black uppercase tracking-widest bg-red-600 border border-red-500/50 px-2.5 py-1 rounded shadow-lg shadow-red-600/30 animate-pulse text-white">
                LIVE BROADCAST
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT: Glassmorphic Live Chat Lobby */}
      <div className="w-full lg:w-[30%] bg-zinc-950/80 backdrop-blur-3xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between relative z-10 h-[calc(100vh-4rem)]">
        
        {/* Chat Header */}
        <div className="p-5 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white">Watch Chat Room</h3>
              <p className="text-[9px] text-zinc-400 mt-0.5 uppercase tracking-widest">Active Sim Network</p>
            </div>
          </div>
          <div className="bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded text-[9px] font-black text-purple-400 uppercase tracking-widest">
            {activeRoom.category} FEED
          </div>
        </div>

        {/* Chat Messages Scrolling Pane */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scroll-smooth bg-zinc-950/30">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3 animate-card-fade">
              <img 
                src={msg.avatar} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full border border-white/10 object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-zinc-300 uppercase tracking-wide flex items-center space-x-1">
                    <span>{msg.sender}</span>
                    {msg.isPrime && <FaCrown className="text-amber-400 text-[10px] animate-pulse" />}
                  </span>
                  <span className="text-[8px] text-zinc-500">Live</span>
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Send message text box form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-zinc-900/20">
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Enter message (mention VIP or Prime to trigger bot)..."
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              className="w-full bg-zinc-950 rounded-full pl-5 pr-12 py-3.5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-purple-600/20"
            >
              <FaPaperPlane className="text-xs ml-0.5" />
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};

export default WatchParty;
