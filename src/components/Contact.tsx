import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential collaborations? Feel free to reach out to me!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-300 mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="I'm interested in collaborating on..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium transition-all text-white ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/20'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send size={18} className="ml-2" />
                  </span>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 bg-green-500/20 text-green-400 p-3 rounded-lg text-center">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 bg-red-500/20 text-red-400 p-3 rounded-lg text-center">
                  There was an error sending your message. Please try again later.
                </div>
              )}
            </form>
          </div>

<div className="lg:w-1/2">
  <div className="bg-gray-800 rounded-xl p-8 shadow-lg h-full">
    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
    
    <div className="space-y-6">
      {/* Email */}
      <div className="flex items-start">
        <a 
          href="mailto:syedabdulkareemahmed@gmail.com" 
          className="flex items-start group"
        >
          <div className="mt-1 bg-indigo-500/20 p-3 rounded-full group-hover:bg-indigo-500/30 transition-colors">
            <Mail className="text-indigo-400 group-hover:text-indigo-300" size={20} />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-white mb-1">Email</h4>
            <p className="text-gray-300 group-hover:text-indigo-300 transition-colors">
              syedabdulkareemahmed@gmail.com
            </p>
          </div>
        </a>
      </div>
      
      {/* LinkedIn */}
      <div className="flex items-start">
        <a 
          href="https://www.linkedin.com/in/92kareem/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start group"
        >
          <div className="mt-1 bg-blue-500/20 p-3 rounded-full group-hover:bg-blue-500/30 transition-colors">
            <Linkedin className="text-blue-400 group-hover:text-blue-300" size={20} />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-white mb-1">LinkedIn</h4>
            <p className="text-gray-300 group-hover:text-blue-300 transition-colors">
              linkedin.com/in/92kareem
            </p>
          </div>
        </a>
      </div>
      
      {/* GitHub */}
      <div className="flex items-start">
        <a 
          href="https://github.com/92kareeem" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start group"
        >
          <div className="mt-1 bg-gray-700 p-3 rounded-full group-hover:bg-gray-600 transition-colors">
            <Github className="text-gray-300 group-hover:text-white" size={20} />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-white mb-1">GitHub</h4>
            <p className="text-gray-300 group-hover:text-white transition-colors">
              github.com/92kareeem
            </p>
          </div>
        </a>
      </div>
      
      {/* Location */}
      <div className="flex items-start">
        <div className="mt-1 bg-pink-500/20 p-3 rounded-full">
          <MapPin className="text-pink-400" size={20} />
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-medium text-white mb-1">Location</h4>
          <p className="text-gray-300">Hyderabad, India</p>
          <p className="text-gray-400 text-sm">Available for remote work globally</p>
        </div>
      </div>
    </div>
              
              <div className="mt-8 border-t border-gray-700 pt-8">
                <h4 className="text-lg font-medium text-white mb-4">Available For</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium">
                    Freelance Projects
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                    Full-time Positions
                  </span>
                  <span className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium">
                    Remote Work
                  </span>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    Tech Talks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;