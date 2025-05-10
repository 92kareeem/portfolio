import { useEffect, useState } from 'react';
import { ArrowDown, Github as GitHub, Linkedin, Mail } from 'lucide-react';
import { HashLink as Link } from 'react-router-hash-link'; // Import HashLink

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "AI Engineer ";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 179);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 z-10 text-center md:text-left flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 md:pr-8">
          <div className="flex flex-col items-center md:items-start mb-8">
            <p className="text-indigo-450 mb-2">Hello, I'm</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Syed Abdul Kareem Ahmed
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-gray-300 h-8">
              {typedText}
              <span className="animate-blink ml-1">|</span>
            </h2>
          </div>
          
          <p className="text-gray-300 mb-8 max-w-2xl">
            Passionate about leveraging AI to solve complex problems. 
            Specializing in building intelligent applications that bridge 
            the gap between cutting-edge AI research and practical solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8">
            <Link 
              to="#contact"
              smooth
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Contact Me
            </Link>
            <Link 
              to="#projects-section"
              smooth
              className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white font-medium transition-all border border-gray-700"
            >
              View My Work
            </Link>
            <a 
              href="https://drive.google.com/file/d/your-resume-id/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to--600 hover:from-purple-600 hover:to-black-700 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Download Resume
            </a>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-4">
            <a 
              href="https://github.com/92kareeem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GitHub />
            </a>
            <a 
              href="https://www.linkedin.com/in/92kareem/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
            <a 
              href="mailto:syedabdulkareemahmed@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail />
            </a>
          </div>
        </div>
        
        <div className="md:w-1/3 mt-12 md:mt-0 relative">
          <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse-slow"></div>
            <img 
              src="https://media.licdn.com/dms/image/v2/D5603AQGf9v8HMsalOw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1674837506647?e=2147483647&v=beta&t=CXm-HwjW1yQqGxhqU6U30I6bwE9h2tmp_FrUhGaenJM" 
              alt="Syed Abdul Kareem Ahmed" 
              className="rounded-full w-full h-full object-cover border-4 border-gray-800 relative"
            />
          </div>
        </div>
      </div>
      
      <Link 
        to="#about" 
        smooth
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </Link>
    </div>
  );
};

export default Hero;