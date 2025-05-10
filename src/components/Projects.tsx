import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';
import { Code, ExternalLink, Eye, Github, Star, GitFork, Users, Search, X } from 'lucide-react';

// Types
interface TechStackItem {
  name: string;
  icon: string;
}

interface ProjectStats {
  stars: number;
  forks: number;
  contributors: number;
}

interface ProjectType {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  stats: ProjectStats;
  techStack: TechStackItem[];
}

type FilterOption = {
  id: string;
  label: string;
};

type ProjectsContextType = {
  selectedProject: ProjectType | null;
  setSelectedProject: (project: ProjectType | null) => void;
  isModalOpen: boolean;
  openModal: (project: ProjectType) => void;
  closeModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
};

// Project Data
const projectsData: ProjectType[] = [
  {
    id: 1,
    title: "Lead Scoring & ABM Optimization System",
    description: "An AI-powered system for optimizing account-based marketing strategies, featuring lead scoring, segmentation, and personalized campaign recommendations.",
    longDescription: "Our Lead Scoring & ABM Optimization System leverages advanced machine learning algorithms to analyze customer data and behavior patterns. The system automatically scores leads based on engagement metrics, demographic data, and behavioral signals, enabling marketing teams to prioritize high-value prospects. The account-based marketing module provides detailed insights for targeted campaigns, with personalized content recommendations for each account segment.",
    image: "https://www.leadfuze.com/wp-content/uploads/2021/04/lead-scoring-model.png",
    tags: ["Machine Learning", "Python", "Data Analytics", "Streamlit", "Data Visualization"],
    github: "https://github.com/92kareeem/Lead-Scoring-and-ABM-Optimization-System-using-AI",
    demo: "https://ai-lead-scoring.streamlit.app/",
    featured: true,
    stats: {
      stars: 184,
      forks: 42,
      contributors: 7
    },
    techStack: [
      { name: "Python", icon: "python" },
      { name: "Machine Learning", icon: "ML" },
      { name: "Data Analytics", icon: "data analysis" },
      { name: "Data Visualization", icon: "visualization" },
      { name: "Streamlit", icon: "Streamlit" }
    ]
  },
  {
    id: 2,
    title: "AeroGesture",
    description: "A computer vision system for disabled users to control mouse cursor using eye gestures, enabling intuitive human-computer interaction using eye movements.",
    longDescription: "AeroGesture is a revolutionary computer vision system designed for touchless interaction in virtual reality environments. Using deep learning models trained on thousands of hand gestures, the system can accurately detect and interpret hand movements in real-time. The technology enables users to navigate virtual spaces and interact with digital objects without physical controllers, creating a more natural and immersive experience. The system includes a custom-built neural network architecture optimized for low-latency processing on consumer hardware.",
    image: "https://media.licdn.com/dms/image/v2/D4D12AQEabn3yk4HDsA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705754086193?e=2147483647&v=beta&t=Dfe3x0f3SIwFTWG7W89pN7hxb47kP6putx14DTNsCho",
    tags: ["Computer Vision", "Dlib", "Python", "OpenCV", "TensorFlow","PyTorch"],
    github: "https://github.com/92kareeem/AeroGesture",
    demo: "https://aerogesture-demo.vercel.app",
    featured: true,
    stats: {
      stars: 1,
      forks: 65,
      contributors: 9
    },
    techStack: [
      { name: "Python", icon: "python" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "OpenCV", icon: "opencv" },
      { name: "React", icon: "react" },
      { name: "Dlib", icon: "dlib" }
    ]
  },
  {
    id: 3,
    title: "Anemia Detection using Deep Learning",
    description: "A deep learning solution for detecting anemia from medical images, designed to assist healthcare professionals in rapid diagnosis.",
    longDescription: "This healthcare innovation uses convolutional neural networks to analyze microscopic blood smear images for detecting anemia. The system can identify characteristics of anemic blood cells with over 95% accuracy, helping medical professionals make faster diagnoses, especially in resource-limited settings. The solution includes a user-friendly interface for healthcare providers to upload images and receive instant analysis results. The deep learning model was trained on a diverse dataset of over 10,000 blood smear images, ensuring reliability across different patient demographics.",
    image: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    tags: ["Python","Deep Learning", "Healthcare", "React", "TypeScript", "Flask"],
    github: "https://github.com/92kareeem/Anemia-Detection-using-Deep-Learning-TypeScript-React-Flask",
    demo: "https://anemia-detection.vercel.app",
    featured: true,
    stats: {
      stars: 203,
      forks: 37,
      contributors: 5
    },
    techStack: [
      { name: "Python", icon: "python" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Flask", icon: "flask" },
      { name: "TailwindCSS", icon: "tailwind" }
    ]
  }
];

// Context
const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const useProjectsContext = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjectsContext must be used within a ProjectsProvider');
  }
  return context;
};

// ProjectsProvider Component
interface ProjectsProviderProps {
  children: ReactNode;
}

const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const openModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  const value = {
    selectedProject,
    setSelectedProject,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

// ProjectCard Component
interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { openModal } = useProjectsContext();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('a')) return;
    openModal(project);
  };
  
  return (
    <div 
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-500 transform perspective-1000 cursor-pointer"
      style={{
        transform: isHovered ? 'translateY(-8px) rotateX(2deg) rotateY(-2deg)' : 'translateY(0) rotateX(0) rotateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-60"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center">
          <div className="flex space-x-4 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-900/90 rounded-full text-white hover:bg-indigo-500 transition-colors"
                aria-label="GitHub repository"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-900/90 rounded-full text-white hover:bg-purple-500 transition-colors"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={20} />
              </a>
            )}
          </div>
        </div>
        
        {project.featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-700 text-xs font-medium text-gray-300 rounded-full group-hover:bg-indigo-900/30 group-hover:text-indigo-300 transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-xs font-medium text-gray-300 rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ProjectFilters Component
const ProjectFilters: React.FC = () => {
  const { filter, setFilter, searchQuery, setSearchQuery } = useProjectsContext();
  const [isSticky, setIsSticky] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  useEffect(() => {
    const extractTags = (): string[] => {
      const allTags = projectsData.flatMap(project => project.tags);
      return [...new Set(allTags)];
    };

    setAllTags(extractTags());
    
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    ...allTags.map(tag => ({ id: tag, label: tag }))
  ];
  
  return (
    <div className={`transition-all duration-300 ${
      isSticky 
        ? 'sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md py-4 shadow-lg' 
        : 'py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="relative mb-6 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-400 transition-all duration-200"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto pb-4 justify-center scrollbar-hide">
          <div className="flex space-x-2">
            {filterOptions.map(option => (
              <button 
                key={option.id} 
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 transform ${
                  filter === option.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105 shadow-lg shadow-indigo-500/20' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
                }`}
                onClick={() => setFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ProjectModal Component
const ProjectModal: React.FC = () => {
  const { selectedProject, isModalOpen, closeModal } = useProjectsContext();
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, closeModal]);
  
  if (!selectedProject) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300 ${
        isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        ref={modalRef}
        className={`bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 ${
          isModalOpen 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-10 scale-95'
        }`}
      >
        <div className="relative">
          <div className="h-64 md:h-80 overflow-hidden">
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-gray-900/30 to-gray-900"></div>
          </div>
          
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-gray-800/80 text-white rounded-full p-2 hover:bg-gray-700 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          {selectedProject.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h2>
            
            <div className="flex items-center space-x-4">
              {selectedProject.github && (
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Github size={18} className="mr-2" />
                  <span>Repository</span>
                </a>
              )}
              
              {selectedProject.demo && (
                <a 
                  href={selectedProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={18} className="mr-2" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {selectedProject.techStack.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center px-3 py-2 bg-gray-800 rounded-lg"
                >
                  <span className="font-medium text-gray-200">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800 text-sm font-medium text-indigo-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-200">Project Stats</h3>
              <div className="flex space-x-6">
                <div className="flex items-center text-gray-300">
                  <Star size={16} className="text-yellow-500 mr-2" />
                  <span>{selectedProject.stats.stars}</span>
                  <span className="ml-1 text-gray-500">stars</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <GitFork size={16} className="text-blue-500 mr-2" />
                  <span>{selectedProject.stats.forks}</span>
                  <span className="ml-1 text-gray-500">forks</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users size={16} className="text-green-500 mr-2" />
                  <span>{selectedProject.stats.contributors}</span>
                  <span className="ml-1 text-gray-500">contributors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProjectsLayout Component
const ProjectsLayout: React.FC = () => {
  const { filter, searchQuery } = useProjectsContext();
  const [visibleProjects, setVisibleProjects] = useState(projectsData);
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = projectsData.filter(project => {
        const categoryMatch = 
          filter === 'all' ? true :
          filter === 'featured' ? project.featured :
          project.tags.includes(filter);
        
        const search = searchQuery.toLowerCase();
        const searchMatch = 
          search === '' ? true :
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.tags.some(tag => tag.toLowerCase().includes(search));
        
        return categoryMatch && searchMatch;
      });
      
      setVisibleProjects(filtered);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [filter, searchQuery]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('projects-section');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);
  
  const getStaggeredDelay = (index: number) => {
    return `${100 + (index * 50)}ms`;
  };
  
  return (
    <section id="projects-section" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          animated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Here are some of the projects I've worked on, showcasing my expertise in AI, machine learning, and software development.
          </p>
        </div>
        
        <ProjectFilters />
        
        {visibleProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-800 rounded-full p-6 mb-4">
              <Search className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-gray-400 text-center">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ${
                  animated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}
                style={{ transitionDelay: getStaggeredDelay(index) }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <ProjectModal />
    </section>
  );
};

// Main Projects Component
const Projects: React.FC = () => {
  return (
    <ProjectsProvider>
      <ProjectsLayout />
    </ProjectsProvider>
  );
};

export default Projects;