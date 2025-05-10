import { Coffee, Code, BookOpen, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 absolute top-4 left-4 opacity-30"></div>
              <img
                src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg"
                alt="Syed Abdul Kareem working"
                className="rounded-2xl w-full relative z-10 shadow-xl"
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <p className="text-gray-300 mb-6 text-lg">
              I'm Syed Abdul Kareem Ahmed, an AI Engineer with a passion for creating intelligent systems that solve real-world problems. With expertise in machine learning, deep learning, and software development, I bring a comprehensive approach to building AI-powered applications.
            </p>
            
            <p className="text-gray-300 mb-8 text-lg">
              My journey in technology has been driven by curiosity and a relentless pursuit of knowledge. I specialize in developing intelligent applications that bridge the gap between cutting-edge AI research and practical solutions. Whether it's implementing sophisticated machine learning algorithms or building intuitive user interfaces, I strive for excellence in every project.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-5 rounded-lg shadow-md transition-all hover:shadow-indigo-500/20 hover:shadow-lg">
                <Coffee className="text-indigo-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold mb-2">Problem Solver</h3>
                <p className="text-gray-400">I enjoy tackling complex challenges with creative solutions.</p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg shadow-md transition-all hover:shadow-purple-500/20 hover:shadow-lg">
                <Code className="text-purple-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold mb-2">Tech Enthusiast</h3>
                <p className="text-gray-400">Always exploring and learning new technologies and frameworks.</p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg shadow-md transition-all hover:shadow-pink-500/20 hover:shadow-lg">
                <BookOpen className="text-pink-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold mb-2">Continuous Learner</h3>
                <p className="text-gray-400">Committed to staying at the forefront of AI advancements.</p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg shadow-md transition-all hover:shadow-blue-500/20 hover:shadow-lg">
                <Rocket className="text-blue-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold mb-2">Result-Oriented</h3>
                <p className="text-gray-400">Focused on delivering high-quality solutions that make an impact.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;