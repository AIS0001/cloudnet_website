import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Github } from 'lucide-react'
import logoWhite from '../assets/img/logowhite.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img
                src={logoWhite}
                alt="CloudNet Softwares"
                className="h-12 md:h-14 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Delivering innovative software solutions that transform businesses and drive digital excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/freelancer-reseller-program" className="text-gray-400 hover:text-primary transition-colors">Freelancer Reseller Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-primary mt-1" />
                <span className="text-gray-400">info@cloudnetsoftwares.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-primary mt-1" />
                <span className="text-gray-400">+66-948712350</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1" />
                <span className="text-gray-400">109/19, Soi 14, Pattaya, Moo 10, Nong Prue, Banglamung, Chonburi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} CloudNet Softwares. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
