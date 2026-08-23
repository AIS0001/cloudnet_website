import { Helmet } from 'react-helmet-async'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, Target, Award, Lightbulb, Heart, Zap, Cpu, Globe2, Rocket, Building2 } from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'
import AnimatedCounter from '../components/animations/AnimatedCounter'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'

const iconPop = (i = 0, reduced = false) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -20 },
  whileInView: reduced ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: reduced ? 0.3 : 0.5, delay: reduced ? 0 : i * 0.1, ease: 'backOut' }
})

const About = () => {
  const prefersReducedMotion = useReducedMotion()

  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions."
    },
    {
      icon: <Heart size={32} />,
      title: "Client-Centric",
      description: "Your success is our success. We prioritize understanding and exceeding your expectations."
    },
    {
      icon: <Award size={32} />,
      title: "Quality",
      description: "We maintain the highest standards in code quality, testing, and delivery."
    },
    {
      icon: <Zap size={32} />,
      title: "Agility",
      description: "Fast-paced development with flexibility to adapt to changing requirements."
    }
  ]

  const parentHighlights = [
    { icon: Cpu, title: 'Technical Expertise', desc: 'Deep technical expertise across multiple technology stacks and platforms, giving CloudNet access to the best development practices.' },
    { icon: Award, title: 'Proven Track Record', desc: 'A decade of experience serving global clients has built a reputation for delivering high-quality, scalable software solutions.' },
    { icon: Globe2, title: 'Global Support', desc: "Axial IT Solutions' infrastructure enables CloudNet to provide reliable, 24/7 support across multiple time zones worldwide." },
    { icon: Rocket, title: 'Scalability', desc: "Backed by Axial IT Solutions' resources, CloudNet can scale rapidly to meet growing market demand without compromising quality." }
  ]

  return (
    <div>
      <Helmet>
        <title>About CloudNet Softwares - Company History & Team</title>
        <meta name="description" content="Learn about CloudNet Softwares, founded in 2025 and backed by Axial IT Solutions (2014). Discover our mission, values, and team dedicated to delivering innovative software solutions." />
        <meta name="keywords" content="about CloudNet, company history, software team, business solutions, Axial IT Solutions" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/about" />
        <meta property="og:title" content="About CloudNet Softwares" />
        <meta property="og:description" content="CloudNet Softwares - Your partner for innovative cloud-based business solutions." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/about" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-950 pt-20">
        <CloudNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
        <div className="container mx-auto px-4 relative py-20 text-center">
          <motion.span
            className="inline-flex items-center gap-2 bg-primary text-white text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Building2 size={14} />
            Founded 2025 &bull; Backed Since 2014
          </motion.span>
          <motion.h1
            className="text-white text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About <span className="text-primary">CloudNet Softwares</span>
          </motion.h1>
          <motion.p
            className="text-slate-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            CloudNet Softwares, established in 2025, is a specialized software solutions company backed
            by the expertise and resources of Axial IT Solutions, our parent company founded in 2014 and
            based in India. Together, we deliver innovative solutions to businesses worldwide.
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { value: '2025', label: 'CloudNet Founded' },
              { value: '2014', label: 'Parent Company Founded' },
              { value: '10', label: 'Years of Expertise', suffix: '+' },
              { value: '24', label: 'Hour Global Support', suffix: '/7' }
            ].map((stat) => (
              <div key={stat.label}>
                <AnimatedCounter value={`${stat.value}${stat.suffix || ''}`} className="block text-2xl md:text-3xl font-bold text-white" />
                <span className="block text-xs text-slate-400 mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <span className="text-primary text-sm font-bold uppercase tracking-wide">Our Story</span>
              <h2 className="section-title mt-2">
                Built on <span className="text-primary">Proven Expertise</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                CloudNet Softwares was founded in 2025 with a mission to provide cutting-edge restaurant
                POS systems and enterprise software solutions. We are proudly supported by Axial IT Solutions,
                our parent company established in 2014 and based in India, which brings over 10 years of
                software development expertise to our operations.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This powerful partnership combines CloudNet's specialized focus on restaurant technology
                and point-of-sale systems with Axial IT Solutions' deep technical expertise and proven
                track record in enterprise software development. Together, we deliver world-class solutions
                that leverage the latest technologies and best practices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction drives everything we do.
                With the backing of Axial IT Solutions' established infrastructure and expertise, we're
                positioned to grow rapidly while maintaining the highest standards of service and support.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop"
                  alt="Office environment"
                  className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-gray-50 to-blue-50 overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <motion.div className="bg-white p-8 rounded-xl shadow-lg h-full" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center mb-4">
                  <motion.div {...iconPop(0, prefersReducedMotion)} className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <Target size={28} className="text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To empower businesses with innovative software solutions that enhance efficiency,
                  drive growth, and create lasting value. We strive to be a trusted technology partner
                  that understands your challenges and delivers results that exceed expectations.
                </p>
              </motion.div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <motion.div className="bg-white p-8 rounded-xl shadow-lg h-full" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center mb-4">
                  <motion.div {...iconPop(1, prefersReducedMotion)} className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4">
                    <Users size={28} className="text-blue-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be recognized as a leading software development company that sets industry standards
                  for quality, innovation, and client satisfaction. We envision a future where technology
                  seamlessly integrates with business to unlock unlimited potential.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Parent Company Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Backed by <span className="text-primary">Axial IT Solutions</span>
              </h2>
              <p className="text-xl text-slate-400">
                Our parent company brings proven expertise and global reach to support CloudNet's growth
              </p>
            </ScrollReveal>

            <ScrollReveal className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
              <div className="grid sm:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="font-semibold text-slate-400 text-sm mb-1">Founded</p>
                  <p className="text-white font-bold text-lg">2014</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400 text-sm mb-1">Headquarters</p>
                  <p className="text-white font-bold text-lg">India</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400 text-sm mb-1">Expertise</p>
                  <p className="text-white font-bold text-sm">Enterprise Software, Custom Solutions, Web & Mobile</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400 text-sm mb-1">Focus</p>
                  <p className="text-white font-bold text-sm">10+ years serving global clients</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {parentHighlights.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.title} delay={i * 0.1}>
                    <motion.div
                      className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6 h-full"
                      whileHover={{ borderColor: 'rgba(249,115,22,0.5)', y: -4 }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.span {...iconPop(i, prefersReducedMotion)} className="w-11 h-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon size={20} />
                      </motion.span>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1.5">{item.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-10 -left-16 w-72 h-72 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="text-center mb-16">
            <h2 className="section-title">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="section-subtitle">
              The Principles That Guide Everything We Do
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center group bg-gray-50 rounded-2xl p-8 h-full"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    {...iconPop(index, prefersReducedMotion)}
                    className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
