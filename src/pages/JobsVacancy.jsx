import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, Users, Smartphone, TrendingUp, Banknote } from 'lucide-react'

const JobsVacancy = () => {
  const openings = [
    {
      title: 'Sales Marketing (Field Job)',
      location: 'Bangkok / Phuket / Pattaya',
      type: 'Full-time',
      salary: '฿ Salary as per experience + incentives',
      icon: <TrendingUp size={26} />,
      summary:
        'Drive business growth by finding new customers in the market through online and offline channels while supporting existing clients.',
      responsibilities: [
        'Generate new leads from online and offline market channels',
        'Visit prospects, present company solutions, and close opportunities',
        'Build long-term customer relationships and provide post-sales support',
        'Coordinate with internal teams to deliver excellent service quality',
        'Maintain lead pipeline reports and weekly market activity updates'
      ],
      requirements: [
        'Strong communication and negotiation skills',
        'Experience in B2B sales/marketing is preferred',
        'Comfortable with field visits and client meetings',
        'Basic understanding of software/POS solutions is a plus',
        'Motivated, target-driven, and customer-focused approach'
      ]
    },
    {
      title: 'Android / iOS Developer',
      location: 'Thailand (On-site / Hybrid based on project)',
      type: 'Full-time',
      salary: '฿ Salary as per experience',
      icon: <Smartphone size={26} />,
      summary:
        'Build and maintain mobile applications for business operations, POS integrations, and customer-facing digital solutions.',
      responsibilities: [
        'Develop, test, and deploy Android and/or iOS applications',
        'Integrate mobile apps with APIs, cloud services, and backend systems',
        'Optimize app performance, reliability, and UX',
        'Collaborate with product, design, and QA teams',
        'Troubleshoot production issues and release updates regularly'
      ],
      requirements: [
        'Hands-on app development experience in Android or iOS',
        'Strong understanding of API integration and mobile app architecture',
        'Knowledge of version control tools and collaborative workflows',
        'Ability to write clean, maintainable, and scalable code',
        'Experience with POS, payment, or business apps is a plus'
      ]
    }
  ]

  return (
    <div>
      <Helmet>
        <title>Jobs / Vacancy - CloudNet Softwares</title>
        <meta
          name="description"
          content="Explore current vacancies at CloudNet Softwares. We are hiring Sales Marketing field staff and Android/iOS developers."
        />
        <meta
          name="keywords"
          content="jobs, vacancy, sales marketing jobs, android developer, ios developer, cloudnet careers"
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/jobs-vacancy" />
        <meta property="og:title" content="Jobs / Vacancy - CloudNet Softwares" />
        <meta
          property="og:description"
          content="Join CloudNet Softwares. Current openings for Sales Marketing and Android/iOS Developers."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/jobs-vacancy" />
      </Helmet>

      <section className="pt-32 pb-14 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Jobs <span className="text-orange-600">/ Vacancy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your career with CloudNet Softwares and work on real business growth and product innovation.
          </p>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {openings.map((job, index) => (
              <article key={index} className="rounded-2xl border-2 border-gray-200 overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                      <p className="text-orange-100">{job.summary}</p>
                    </div>
                    <div className="bg-white/15 rounded-lg p-3">{job.icon}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-orange-600" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Briefcase size={16} className="text-orange-600" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 sm:col-span-2">
                      <Banknote size={16} className="text-orange-600" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Users size={18} className="text-orange-600" />
                      Job Role & Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((item, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested to <span className="text-orange-600">Apply?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Send your CV and portfolio to our team. We are always looking for talented people ready to grow with us.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            <Briefcase size={18} />
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default JobsVacancy
