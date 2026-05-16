import { Helmet } from 'react-helmet-async'
import { Code2, Globe, Smartphone, Database, Cloud, Shield, Cpu, Palette, ArrowRight, CheckCircle2, Zap, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'

const Services = () => {
  const services = [
    {
      icon: <Code2 size={50} />,
      title: "Custom Software Development",
      description: "Build tailored software solutions that perfectly align with your business processes and objectives.",
      features: [
        "Enterprise Application Development",
        "Legacy System Modernization",
        "API Development & Integration",
        "Microservices Architecture"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Globe size={50} />,
      title: "Web Development",
      description: "Create stunning, responsive websites that engage users and drive conversions.",
      features: [
        "React, Vue, Angular Development",
        "E-commerce Solutions",
        "Progressive Web Apps (PWA)",
        "CMS Development"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Smartphone size={50} />,
      title: "Mobile App Development",
      description: "Develop native and cross-platform mobile applications for iOS and Android.",
      features: [
        "Native iOS & Android Apps",
        "React Native Development",
        "Flutter Applications",
        "App Store Optimization"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Cloud size={50} />,
      title: "Cloud Solutions",
      description: "Leverage cloud technology for scalability, flexibility, and cost-efficiency.",
      features: [
        "AWS, Azure, Google Cloud",
        "Cloud Migration Services",
        "DevOps & CI/CD",
        "Serverless Architecture"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Database size={50} />,
      title: "Data & Analytics",
      description: "Transform your data into actionable insights with advanced analytics solutions.",
      features: [
        "Business Intelligence",
        "Data Warehousing",
        "Machine Learning Integration",
        "Real-time Analytics"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Shield size={50} />,
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security solutions.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance Management",
        "Security Monitoring"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Cpu size={50} />,
      title: "AI & Machine Learning",
      description: "Implement intelligent solutions that automate processes and enhance decision-making.",
      features: [
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics",
        "AI-powered Automation"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      icon: <Palette size={50} />,
      title: "UI/UX Design",
      description: "Craft beautiful, intuitive user interfaces that delight your customers.",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Design Systems",
        "Brand Identity Design"
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    }
  ]

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business needs, goals, and challenges through detailed consultation."
    },
    {
      step: "02",
      title: "Planning",
      description: "Define project scope, create roadmap, and establish timelines with clear milestones."
    },
    {
      step: "03",
      title: "Design",
      description: "Create wireframes, prototypes, and visual designs that align with your brand and user needs."
    },
    {
      step: "04",
      title: "Development",
      description: "Build robust, scalable solutions using agile methodology and best coding practices."
    },
    {
      step: "05",
      title: "Testing",
      description: "Rigorous quality assurance to ensure bug-free, performant, and secure software."
    },
    {
      step: "06",
      title: "Deployment",
      description: "Smooth launch with comprehensive support and training for your team."
    }
  ]

  const benefits = [
    {
      title: "Proven Expertise",
      description: "10+ years of experience delivering enterprise-grade solutions"
    },
    {
      title: "Agile Methodology",
      description: "Flexible approach that adapts to your changing requirements"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and code reviews ensure highest standards"
    },
    {
      title: "24/7 Support",
      description: "Dedicated team available round-the-clock for support"
    }
  ]

  const technologies = [
    { category: "Frontend", items: ["React", "Vue.js", "Angular", "TypeScript"] },
    { category: "Backend", items: ["Node.js", "Python", "Java", ".NET"] },
    { category: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
    { category: "Cloud", items: ["AWS", "Azure", "Google Cloud", "Docker"] }
  ]


  return (
    <div>
      <Helmet>
        <title>Our Services - CloudNet Softwares | Software Development & Solutions</title>
        <meta name="description" content="Explore CloudNet Softwares' comprehensive services including custom software development, web development, mobile apps, cloud solutions, data analytics, and cybersecurity." />
        <meta name="keywords" content="software development, web development, mobile apps, cloud solutions, data analytics, cybersecurity, IT services" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/services" />
        <meta property="og:title" content="Our Services - CloudNet Softwares" />
        <meta property="og:description" content="Professional software development and IT solutions for your business." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/services" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Complete <span className="text-primary">Software Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From custom development to cloud migration, we deliver comprehensive technology solutions 
                tailored to accelerate your business transformation and drive sustainable growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center">
                  Get Started Today
                </Link>
                <a href="#services" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-block text-center">
                  Explore Services
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop" 
                alt="Services illustration"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Why Choose <span className="text-primary">CloudNet Services?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Zap className="text-primary mt-1" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services with Left-Right Layout */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary">Core Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions for every stage of your digital journey
            </p>
          </div>

          {/* Featured Services */}
          <div className="space-y-20 mb-20">
            {services.slice(0, 4).map((service, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-primary mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 size={20} className="text-primary mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary-600 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-xl shadow-lg w-full h-96 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* All Services Grid */}
          <div className="mt-20 pt-20 border-t-2 border-gray-200">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Complete <span className="text-primary">Service Portfolio</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white border-2 border-gray-100 p-6 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <ArrowRight size={14} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Technology <span className="text-primary">Stack</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We work with the latest and most reliable technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-lg border-2 border-gray-100 hover:border-primary transition-all duration-300">
                <Layers className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-4">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700 flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Development <span className="text-primary">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures quality, transparency, and success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 pr-8">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your goals and accelerate growth.
          </p>
          <Link to="/contact" className="inline-flex items-center space-x-2 bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
            <span>Contact Our Team</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services
