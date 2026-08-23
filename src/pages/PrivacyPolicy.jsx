import { Helmet } from 'react-helmet-async'

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy - CloudNet Softwares</title>
        <meta
          name="description"
          content="Read CloudNet Softwares' privacy policy - it covers our website and every CloudNet software product and app, including Clario AI, NightPulse, ChefMate POS, CloudNet ERP, and CloudScreen."
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy - CloudNet Softwares" />
        <meta
          property="og:description"
          content="Learn how CloudNet Softwares collects, uses, and protects your personal information."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/privacy-policy" />
      </Helmet>

      <section className="pt-32 pb-14 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Privacy <span className="text-orange-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy matters to us. This policy explains how CloudNet Softwares collects, uses, and protects your information.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-sm text-gray-500">Last updated: August 23, 2026</p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                CloudNet Softwares ("we", "us", or "our") respects your privacy and is committed to protecting
                the personal information you share with us. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or use our products and services.
              </p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-100 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. This Policy Covers All CloudNet Software & Apps</h2>
              <p className="leading-relaxed mb-4">
                This is a single, unified Privacy Policy that applies to the CloudNet Softwares website and to
                every CloudNet software product and mobile app, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Clario AI</strong> - our AI business assistant app. Clario processes the text or voice questions you ask it (including microphone audio, when you use voice input) and your business data in order to answer your questions and run the automations you set up. On-device voices process speech locally; cloud voices (e.g. Nova, ElevenLabs) send audio to our AI service providers to generate a response. AI credit usage is tracked per account and is not shared between users.</li>
                <li><strong>NightPulse</strong> - POS app for cafes, restaurants, bars, clubs, and karaoke venues.</li>
                <li><strong>ChefMate / Restaurant POS</strong> - POS app for restaurants.</li>
                <li><strong>CloudNet ERP</strong> - business management platform.</li>
                <li><strong>CloudScreen</strong> - digital advertising and screen management platform.</li>
                <li><strong>Access Gate System</strong> - cloud access control platform (face recognition, RFID, and QR entry logs).</li>
                <li>Manager and POS companion apps, and other CloudNet software products released from time to time.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Wherever this policy refers to "our products" or "our software", it means all of the above, in
                addition to this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal details such as name, email address, phone number, and company information when you contact us or request a demo.</li>
                <li>Business information you provide while using our software products (e.g., POS, ERP, NightPulse).</li>
                <li>Technical data such as IP address, browser type, device information, and usage data collected automatically through cookies and analytics tools.</li>
                <li>Communications you send to us via email, WhatsApp, LINE, or contact forms.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, operate, and maintain our products and services.</li>
                <li>To respond to inquiries, schedule demos, and provide customer support.</li>
                <li>To improve our website, products, and services based on usage and feedback.</li>
                <li>To send important updates, service notices, and (with your consent) marketing communications.</li>
                <li>To comply with legal obligations and protect against fraud or misuse.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Sharing of Information</h2>
              <p className="leading-relaxed">
                We do not sell your personal information. We may share information with trusted third-party
                service providers who help us operate our business (such as hosting, payment processing, and
                communication tools), or when required by law, to protect our rights, or with your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Data Security</h2>
              <p className="leading-relaxed">
                We implement reasonable technical and organizational measures to protect your information from
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Cookies</h2>
              <p className="leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience,
                analyze site traffic, and understand where our visitors are coming from. You can choose to disable
                cookies through your browser settings, though this may affect site functionality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
              <p className="leading-relaxed">
                You may request access to, correction of, or deletion of your personal information by contacting
                us using the details below. We will respond to your request in accordance with applicable data
                protection laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for
                legal, operational, or regulatory reasons. The updated version will be posted on this page with
                a revised "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Email: <a href="mailto:info@cloudnetsoftwares.com" className="text-primary hover:underline">info@cloudnetsoftwares.com</a></li>
                <li>Phone / WhatsApp: +66-948712350</li>
                <li>Address: 109/19, Soi 14, Pattaya, Moo 10, Nong Prue, Banglamung, Chonburi, Thailand</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
