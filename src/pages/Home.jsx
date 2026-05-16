import { Helmet } from 'react-helmet-async'
import HeroSlider from '../components/HeroSlider'
import { Code2, Globe, Smartphone, Database, Cloud, Shield, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const services = [
    {
      icon: <Code2 size={40} />,
      title: "Custom Software Development",
      description: "Tailored solutions built to meet your specific business needs"
    },
    {
      icon: <Globe size={40} />,
      title: "Web Development",
      description: "Modern, responsive websites that engage and convert"
    },
    {
      icon: <Smartphone size={40} />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications"
    },
    {
      icon: <Cloud size={40} />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services"
    },
    {
      icon: <Database size={40} />,
      title: "Data Analytics",
      description: "Transform your data into actionable insights"
    },
    {
      icon: <Shield size={40} />,
      title: "Cybersecurity",
      description: "Protect your digital assets with robust security"
    }
  ]

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "30+", label: "Team Members" }
  ]

  const features = [
    "Agile Development Methodology",
    "24/7 Technical Support",
    "Scalable Architecture",
    "Clean & Maintainable Code",
    "Performance Optimization",
    "Regular Updates & Maintenance"
  ]

  return (
    <div>
      <Helmet>
        <title>CloudNet Softwares - POS & ERP Solutions | Business Software</title>
        <meta name="description" content="CloudNet Softwares offers cloud-based POS systems, ERP solutions, and business management software for restaurants, retail, and enterprises worldwide." />
        <meta name="keywords" content="POS system, ERP software, cloud-based solutions, restaurant management, business software" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/" />
        <meta property="og:title" content="CloudNet Softwares - POS & ERP Solutions" />
        <meta property="og:description" content="Professional cloud-based business software solutions including POS and ERP systems." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Slider */}
      <HeroSlider />

      {/* About Our Work Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">
                About Our <span className="text-primary">Work</span>
              </h2>
              <p className="section-subtitle">
                Delivering Excellence Through Innovation
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At CloudNet Softwares, we're passionate about creating innovative software solutions that 
                drive business growth. Our team of expert developers, designers, and strategists work 
                collaboratively to transform your ideas into powerful digital products.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We combine cutting-edge technology with industry best practices to deliver solutions 
                that are not only functional but also scalable, secure, and user-friendly. Our commitment 
                to quality and client satisfaction sets us apart in the software development industry.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary inline-flex items-center space-x-2">
                <span>Learn More About Us</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                  alt="Team Collaboration"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">100%</p>
                    <p className="text-gray-600">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive Software Solutions for Every Need
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/services" className="text-primary font-medium inline-flex items-center space-x-2 hover:space-x-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-primary">Project?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with cutting-edge technology and expert development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link to="/portfolio" className="btn-outline">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
