import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';

const Experience = () => {
  const workExperience = [
    {
      id: 1,
      role: "AI Project Intern",
      company: "Infosys",
      duration: "Nov 2024 - Jan 2025",
      description: "Worked on AI-powered data analytics solutions at Infosys, focusing on dashboard development and business intelligence for enterprise decision-making.",
      achievements: [
        "Designed and developed an interactive analytics dashboard using Streamlit and Python",
        "Performed end-to-end data analysis on large business datasets to extract actionable insights",
        "Implemented data visualization features using Matplotlib and Seaborn, improving report clarity by 35%",
        "Enhanced dashboard performance and UI/UX, resulting in a 30% increase in user engagement"
      ],
      link: "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_0142543826353602560/1-836b13ef-e702-47fc-a807-5f77eae86dcb.pdf"
    },
  ];

  const education = [
    {
      id: 1,
      degree: "Bachelor of Engineering in Computer Science (Artificial Intelligence & Machine Learning)",
      institution: "MJCET-Osmania University",
      duration: "2021 - 2025",
      description: "Specialized in machine learning and deep learning. Research focused on transformer architectures for NLP tasks."
    },
    {
      id: 2,
      degree: "Maths, Physics, Chemistry(11 & 12)",
      institution: "Narayana Junior College",
      duration: "2019 - 2021",
      description: "Completed with a focus on mathematics and physics, laying the foundation for engineering studies."
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Applied Machine Learning",
      issuer: "Alberta Machine Intelligence Institute-Coursera",
      date: "2025",
      link: "https://coursera.org/share/867452144e118c240760292bd2c6a0ba"
    },
    {
      id: 2,
      name: "AI/ML/DL FDP",
      issuer: "NIT-Warangal",
      date: "2021",
      link: "https://drive.google.com/file/d/1PPixzCFswYQdb5t2w0BVquD1ARzlLk75/view?usp=sharing"
    },
    {
      id: 3,
      name: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "2022",
      link: "https://www.freecodecamp.org/certification/syedabdulkareemahmed/data-analysis-with-python-v7"
    },
    {
      id: 4,
      name: "Data Analytics and Visualization",
      issuer: "Accenture",
      date: "2023",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_7kniCxBTiamSHxMqs_1715968004395_completion_certificate.pdf"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            My professional journey and academic background that have shaped my expertise in AI and software development.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Work Experience */}
          <div className="lg:w-1/2">
            <div className="flex items-center mb-8">
              <Briefcase className="text-indigo-400 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-pink-500">
              {workExperience.map((job, index) => (
                <div key={job.id} className="relative pl-8">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border-2 border-indigo-500 shadow">
                    <span className="text-indigo-400 font-bold">{index + 1}</span>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 shadow hover:shadow-indigo-500/10 transition-all">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                      <h4 className="text-xl font-semibold text-white">{job.role}</h4>
                      <span className="text-indigo-400 text-sm font-medium bg-indigo-400/10 px-3 py-1 rounded-full">
                        {job.duration}
                      </span>
                    </div>
                    
                    <h5 className="text-gray-300 font-medium mb-3">{job.company}</h5>
                    <p className="text-gray-400 mb-4">{job.description}</p>
                    
                    <h6 className="text-gray-300 font-medium mb-2">Key Achievements:</h6>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>

                    {job.link && (
                      <div className="mt-4">
                        <a 
                          href={job.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:underline flex items-center"
                        >
                          <span>View Internship Certificate</span>
                          <Download size={14} className="ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education & Certifications */}
          <div className="lg:w-1/2">
            <div>
              <div className="flex items-center mb-8">
                <GraduationCap className="text-purple-400 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              
              <div className="space-y-8 mb-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-pink-500">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative pl-8">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border-2 border-purple-500 shadow">
                      <span className="text-purple-400 font-bold">{index + 1}</span>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-6 shadow hover:shadow-purple-500/10 transition-all">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                        <span className="text-purple-400 text-sm font-medium bg-purple-400/10 px-3 py-1 rounded-full">
                          {edu.duration}
                        </span>
                      </div>
                      
                      <h5 className="text-gray-300 font-medium mb-3">{edu.institution}</h5>
                      <p className="text-gray-400">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-8">
                <Award className="text-pink-400 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {certifications.map(cert => (
                  <a 
                    key={cert.id} 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 rounded-xl p-5 flex flex-col hover:shadow-pink-500/10 hover:scale-105 transition-all"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                    <div className="flex items-center text-gray-400 mb-1">
                      <span className="text-sm">{cert.issuer}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{cert.date}</span>
                    </div>
                    <div className="mt-auto pt-2 text-pink-400 text-sm flex items-center">
                      <span>View Certificate</span>
                      <Download size={14} className="ml-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;