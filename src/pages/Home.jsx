import { Helmet } from 'react-helmet-async'
import HeroSlider from '../components/HeroSlider'
import { Code2, Globe, Smartphone, Database, Cloud, Shield, ArrowRight, CheckCircle2, Network } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/animations/ScrollReveal'
import AnimatedCounter from '../components/animations/AnimatedCounter'
import JourneyProgress from '../components/animations/JourneyProgress'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'
import EcosystemNetwork from '../components/cloudnet/EcosystemNetwork'
import DataFlowSection from '../components/cloudnet/DataFlowSection'
import AIEngineReveal from '../components/cloudnet/AIEngineReveal'
import JourneyPath from '../components/cloudnet/JourneyPath'

const SectionKicker = ({ stage, label }) => (
  <ScrollReveal direction="none" className="text-center mb-4">
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
      <Network size={14} />
      {stage}
    </span>
    {label && <p className="text-slate-500 text-xs mt-1 uppercase tracking-wide">{label}</p>}
  </ScrollReveal>
)

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
      {/* Scroll progress through the CloudNet journey */}
      <JourneyProgress />

      {/* Hero Slider */}
      <HeroSlider />

      {/* CloudNet Ecosystem Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <CloudNetworkBackground density="medium" />
        <div className="container mx-auto px-4 relative">
          <SectionKicker stage="Cloud" />
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              One Ecosystem. <span className="text-primary">Every Business Need.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every CloudNet application is connected - built on one platform, so your business runs as one
              connected system instead of scattered tools.
            </p>
          </ScrollReveal>
          <EcosystemNetwork />
        </div>
      </section>

      {/* About Our Work Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Software</span>
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
            </ScrollReveal>
            <ScrollReveal direction="right" className="relative">
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.08} className="text-white">
                <AnimatedCounter value={stat.number} className="block text-4xl md:text-5xl font-bold mb-2" />
                <p className="text-lg opacity-90">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <SectionKicker stage="Data" />
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Your Business Generates Data <span className="text-primary">Every Day</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              CloudNet brings it all together - sales, inventory, access, and customer activity, from every
              connected product, in one place.
            </p>
          </ScrollReveal>
          <DataFlowSection />
        </div>
      </section>

      {/* CloudNet AI Engine Reveal */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="/videos/clario-ai-reveal.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
        <div className="container mx-auto px-4 relative">
          <SectionKicker stage="AI" />
          <AIEngineReveal />
        </div>
      </section>

      {/* From Data to Decisions */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionKicker stage="Intelligence → Growth" />
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              From Data to <span className="text-primary">Decisions</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              This is how CloudNet turns everyday business activity into growth.
            </p>
          </ScrollReveal>
          <JourneyPath />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="section-title">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive Software Solutions for Every Need
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={(index % 3) * 0.1}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <ScrollReveal className="container mx-auto px-4 text-center">
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
        </ScrollReveal>
      </section>
    </div>
  )
}

export default Home
