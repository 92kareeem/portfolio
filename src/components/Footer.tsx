import { Mail, Github, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 inline-block">
              Syed Abdul Kareem
            </Link>
            <p className="text-gray-400 mb-4">
              AI/ML Engineer and Softwar Developer specializing in developing intelligent applications that solve real-world problems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/92kareeem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/92kareem/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:syedabdulkareemahmed@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-400 hover:text-indigo-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/#projects" className="text-gray-400 hover:text-indigo-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/#experience" className="text-gray-400 hover:text-indigo-400 transition-colors">Experience</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-indigo-400 transition-colors">Tech Updates-AI News</Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">News Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog?category=AI Research" className="text-gray-400 hover:text-indigo-400 transition-colors">AI Research</Link>
              </li>
              <li>
                <Link to="/blog?category=AI Development" className="text-gray-400 hover:text-indigo-400 transition-colors">AI Development</Link>
              </li>
              <li>
                <Link to="/blog?category=AI Ethics" className="text-gray-400 hover:text-indigo-400 transition-colors">AI Ethics</Link>
              </li>
              <li>
                <Link to="/blog?tag=Machine Learning" className="text-gray-400 hover:text-indigo-400 transition-colors">Machine Learning</Link>
              </li>
              <li>
                <Link to="/blog?tag=Deep Learning" className="text-gray-400 hover:text-indigo-400 transition-colors">Deep Learning</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-gray-400 mr-3 mt-1" size={16} />
                <a 
                  href="mailto:syedabdulkareemahmed@gmail.com" 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  syedabdulkareemahmed@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Linkedin className="text-gray-400 mr-3 mt-1" size={16} />
                <a 
                  href="https://www.linkedin.com/in/92kareem/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  linkedin.com/in/92kareem
                </a>
              </li>
              <li className="flex items-start">
                <Github className="text-gray-400 mr-3 mt-1" size={16} />
                <a 
                  href="https://github.com/92kareeem" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  github.com/92kareeem
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            © {currentYear} Syed Abdul Kareem Ahmed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;