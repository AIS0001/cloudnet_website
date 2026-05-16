import { Helmet } from 'react-helmet-async'
import { Users, Target, Award, Lightbulb, Heart, Zap } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Lightbulb size={40} />,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions."
    },
    {
      icon: <Heart size={40} />,
      title: "Client-Centric",
      description: "Your success is our success. We prioritize understanding and exceeding your expectations."
    },
    {
      icon: <Award size={40} />,
      title: "Quality",
      description: "We maintain the highest standards in code quality, testing, and delivery."
    },
    {
      icon: <Zap size={40} />,
      title: "Agility",
      description: "Fast-paced development with flexibility to adapt to changing requirements."
    }
  ]

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Emily Davis",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop"
    }
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
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">CloudNet Softwares</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              CloudNet Softwares, established in 2025, is a specialized software solutions company 
              backed by the expertise and resources of Axial IT Solutions, our parent company founded 
              in 2014 and based in India. Together, we deliver innovative solutions to businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop" 
                alt="Team collaboration"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop" 
                alt="Office environment"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <Target size={40} className="text-primary mr-4" />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with innovative software solutions that enhance efficiency, 
                drive growth, and create lasting value. We strive to be a trusted technology partner 
                that understands your challenges and delivers results that exceed expectations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <Users size={40} className="text-primary mr-4" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as a leading software development company that sets industry standards 
                for quality, innovation, and client satisfaction. We envision a future where technology 
                seamlessly integrates with business to unlock unlimited potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Company Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Backed by <span className="text-primary">Axial IT Solutions</span>
              </h2>
              <p className="text-xl text-gray-600">
                Our parent company brings proven expertise and global reach to support CloudNet's growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-primary/10 to-orange-100 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-primary">Axial IT Solutions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800">Founded</p>
                    <p className="text-gray-600">2014</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Headquarters</p>
                    <p className="text-gray-600">India</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Expertise</p>
                    <p className="text-gray-600">Enterprise Software Development, Custom Solutions, Web & Mobile Applications</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Focus</p>
                    <p className="text-gray-600">10+ years of delivering quality software solutions to global clients</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-primary p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Technical Expertise</h4>
                  <p className="text-gray-600">Axial IT Solutions brings deep technical expertise across multiple technology stacks and platforms, ensuring CloudNet has access to the best development practices.</p>
                </div>
                <div className="bg-white border-l-4 border-primary p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Proven Track Record</h4>
                  <p className="text-gray-600">With a decade of experience serving global clients, Axial IT Solutions has established a reputation for delivering high-quality, scalable software solutions.</p>
                </div>
                <div className="bg-white border-l-4 border-primary p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Global Support</h4>
                  <p className="text-gray-600">Our parent company's infrastructure enables CloudNet to provide reliable, 24/7 support to clients across multiple time zones worldwide.</p>
                </div>
                <div className="bg-white border-l-4 border-primary p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Scalability</h4>
                  <p className="text-gray-600">Backed by Axial IT Solutions' resources and expertise, CloudNet can scale rapidly to meet growing market demands without compromising quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="section-subtitle">
              The Principles That Guide Everything We Do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="section-subtitle">
              The People Behind Our Success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-primary text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
