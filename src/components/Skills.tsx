import { useState } from 'react';
import { Brain, Server, Code, Globe, Database, Cpu, LineChart, Settings, GitMerge,  Eye, BarChart, Bot, Cloud, Terminal } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
  projects?: string[]; // Optional property
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const tabs = [
    { id: 'technical', label: 'Technical Skills' },
    { id: 'soft', label: 'Soft Skills' },
    { id: 'projects', label: 'Project Highlights' }
  ];

  const technicalSkills: { category: string; icon: JSX.Element; skills: Skill[] }[] = [
    {
      category: "Artificial Intelligence",
      icon: <Brain className="text-indigo-400 mr-2" size={24} />,
      skills: [
        { name: "Machine Learning", proficiency: 90, projects: [" Lead Scoring","HealthAI"] },
        { name: "Deep Learning ", proficiency: 90, projects: ["Anemia Detection System(ResNet50)"] },
        { name: "Computer Vision (OpenCV)", proficiency: 85, projects: ["AeroGesture"] },
        { name: "Generative AI ", proficiency: 80, projects: ["Anemia Detection Chatbot"] },
        { name: "NLP", proficiency: 75 },
        { name: "ML Pipeline Development", proficiency: 85, projects: ["All AI Projects"] }
      ]
    },
    {
      category: "Full Stack Development",
      icon: <Code className="text-purple-400 mr-2" size={24} />,
      skills: [
        { name: "Python", proficiency: 95, projects: ["All AI Projects"] },
        { name: "Flask", proficiency: 95, projects: ["Anemia Detection Backend"] },
        { name: "React.js (TypeScript)", proficiency: 90, projects: ["Anemia Detection Frontend"] },
        { name: "Streamlit", proficiency: 85, projects: ["Infosys Analytics Dashboard"] },
        { name: "HTML/CSS/Tailwind", proficiency: 85, projects: ["All Web Projects"] },
      ]
    },
    {
      category: "Data & Cloud",
      icon: <Database className="text-blue-400 mr-2" size={24} />,
      skills: [
        { name: "SQL", proficiency: 75, projects: ["Subject Labs, Lead Scoring"] },
        { name: "Microsoft Azure", proficiency: 80, projects: ["Anemia Detection Deployment","Portfolio Website Deployment"] },
        { name: "Data Analysis", proficiency: 95, projects: ["Lead Scoring System"] },
        { name: "Data Visualization", proficiency: 85, projects: ["Infosys Dashboard"] },
        { name: "Google Cloud", proficiency: 75, projects: ["Gemini API Integration"] }
      ]
    },
    {
      category: "Tools & Libraries",
      icon: <Terminal className="text-green-400 mr-2" size={24} />,
      skills: [
        { name: "Git/GitHub", proficiency: 90, projects: ["All Projects"] },
        { name: "VS Code", proficiency: 95, projects: ["All Projects"] },
        { name: "Pandas/Numpy", proficiency: 95, projects: ["Data Analysis"] },
        { name: "Matplotlib/Seaborn", proficiency: 85, projects: ["Data Visualization"] },
        { name: "Jupyter Notebooks", proficiency: 90, projects: ["ML Development"] }
      ]
    },
    {
      category: "AI Tools",
      icon: <Bot className="text-blue-300 mr-2" size={31} />,
      skills: [
        { name: "ChatGPT", proficiency: 90, projects: ["All Projects"] },
        { name: "Gemini", proficiency: 95, projects: ["All Projects, API used for ChatBots"] },
        { name: "Bard", proficiency: 85 },
        { name: "GitHub Copilot", proficiency: 90 },
        { name: "Claude", proficiency: 95},
        { name: "Cursor AI", proficiency: 85, projects: ["For Vibe coding"] },
        { name: "Bolt", proficiency: 90, projects: ["Web Development"] }
      ]
    }
  ];

  const softSkills: { category: string; icon: JSX.Element; skills: Skill[] }[] = [
    {
      category: "Problem Solving",
      icon: <Cpu className="text-indigo-400 mr-2" size={24} />,
      skills: [
        { name: "Analytical Thinking", proficiency: 95 },
        { name: "Algorithm Design", proficiency: 90 },
        { name: "Optimization", proficiency: 85 }
      ]
    },
    {
      category: "Collaboration",
      icon: <GitMerge className="text-purple-400 mr-2" size={24} />,
      skills: [
        { name: "Cross-functional Teamwork", proficiency: 90 },
        { name: "Stakeholder Communication", proficiency: 85 },
        { name: "Technical Documentation", proficiency: 90 }
      ]
    },
    {
      category: "Project Execution",
      icon: <BarChart className="text-blue-400 mr-2" size={24} />,
      skills: [
        { name: "End-to-end Development", proficiency: 90 },
        { name: "Data-Driven Decisions", proficiency: 95 },
        { name: "Performance Metrics", proficiency: 85 }
      ]
    }
  ];

  const projectHighlights = [
    {
      title: "AI-Driven B2B Lead Scoring",
      icon: <Bot className="text-indigo-400 mr-2" size={24} />,
      description: "ML pipeline for lead scoring system with 89% true positive rate",
      technologies: ["Python", "Machine Learning", "Streamlit", "Data Analysis"],
      link: "#"
    },
    {
      title: "Anemia Detection System",
      icon: <Eye className="text-purple-400 mr-2" size={24} />,
      description: "97% accurate diagnostic tool using eye/nail images with React+Flask",
      technologies: ["Deep Learning", "ResNet50", "React.js", "Flask", "Azure"],
      link: "#"
    },
    {
      title: "AeroGesture",
      icon: <Globe className="text-blue-400 mr-2" size={24} />,
      description: "Eye gesture controlled virtual mouse with 30% improved accuracy",
      technologies: ["Computer Vision", "OpenCV", "Dlib", "Python"],
      link: "#"
    },
    {
      title: "Anemia Detection Chatbot",
      icon: <Cloud className="text-green-400 mr-2" size={24} />,
      description: "GenAI powered assistant using Google Gemini API",
      technologies: ["Generative AI", "LLMs", "Gemini API", "Python"],
      link: "#"
    }
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section id="skills" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            My diverse skill set spans AI/ML, full-stack development, and data engineering, demonstrated through impactful projects.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="inline-flex bg-gray-800 rounded-full p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab !== 'projects' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {(activeTab === 'technical' ? technicalSkills : softSkills).map((skillGroup, index) => (
              <div 
                key={index} 
                className={`bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-indigo-900/20 transition-all p-6 cursor-pointer ${expandedCategory === skillGroup.category ? 'ring-2 ring-indigo-500' : ''}`}
                onClick={() => toggleCategory(skillGroup.category)}
              >
                <div className="flex items-center mb-6">
                  {skillGroup.icon}
                  <h3 className="text-xl font-bold text-white">{skillGroup.category}</h3>
                </div>
                <div className="space-y-5">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      {expandedCategory === skillGroup.category && skill.projects && (
                        <div className="mt-1 text-xs text-gray-400">
                          Applied in: {skill.projects.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projectHighlights.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-indigo-900/20 transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {project.icon}
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-xs bg-gray-800 text-indigo-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm"
                  >
                    View project details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Cloud */}
        {activeTab === 'technical' && (
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-white mb-6">Skills Cloud</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {technicalSkills.flatMap(group => 
                group.skills.map(skill => (
                  <div 
                    key={skill.name}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{
                      backgroundColor: `rgba(99, 102, 241, ${skill.proficiency / 100})`,
                      transform: `scale(${0.9 + (skill.proficiency / 100) * 0.3})`
                    }}
                  >
                    {skill.name}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;