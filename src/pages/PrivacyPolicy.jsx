import { Helmet } from 'react-helmet-async'

const LAST_UPDATED = 'September 24, 2026'

const PRODUCTS = [
  {
    name: 'Clario AI',
    desc: 'our AI business assistant app. Clario processes the text or voice questions you ask it (including microphone audio, when you use voice input) and your business data in order to answer your questions and run the automations you set up. On-device voices process speech locally; cloud voices (e.g. Nova, ElevenLabs) send audio to our AI service providers to generate a response. AI credit usage is tracked per account and is not shared between users.'
  },
  {
    name: 'NightPulse',
    desc: 'POS and venue management app for cafes, restaurants, bars, clubs, and karaoke venues, including the Manager, POS, Cashier, Waiter, Chef, and Store Manager apps. It stores sales, bills, tables and rooms, inventory, staff, commission, and advance booking records (including the customer name, contact details, and guest count you enter for a booking).'
  },
  {
    name: 'Navigo',
    desc: 'travel agent software for agencies and tour operators, including the web back office, the B2B agent and corporate portal, the B2C online storefront, and the Navigo mobile app. It stores quotations, itineraries, bookings, payments, trip expenses, and invoices, together with the traveller, agent, and corporate customer details you or your customers enter.'
  },
  {
    name: 'ChefMate / Restaurant POS',
    desc: 'POS app for restaurants, including ordering, KOT, billing, and kitchen display.'
  },
  {
    name: 'CloudNet ERP',
    desc: 'business management platform for inventory, finance, and operations.'
  },
  {
    name: 'CloudEye',
    desc: 'AI people and vehicle counting from the camera streams you connect. CloudEye analyses video to produce counts and traffic reports; it is designed to count, not to identify individuals.'
  },
  {
    name: 'CloudScreen',
    desc: 'digital advertising and screen management platform.'
  },
  {
    name: 'Access Gate System',
    desc: 'cloud access control platform (face recognition, RFID, and QR entry logs). Face templates are used only to grant or deny entry at the venue that enrolled them.'
  }
]

const APP_PERMISSIONS = [
  ['Internet / network', 'Required to sync your data with our cloud servers.'],
  ['Notifications', 'To show booking reminders, new orders, stock alerts, payment updates, and other in-app notifications.'],
  ['Bluetooth', 'To find and connect to receipt and kitchen (KOT) printers. We do not use Bluetooth to track your location.'],
  ['Background sync / foreground service', 'To keep printing and syncing working reliably while the app is in the background.'],
  ['Photos, media & files', 'Only when you choose to upload an image or file, such as a menu item photo, logo, or attachment.'],
  ['Camera', 'Only when you choose to take a photo or scan a QR code or barcode.'],
  ['Microphone', 'Only in apps with voice features (such as Clario AI), and only while you are using voice input.'],
  ['Location', 'Only in features that need it (for example, location-based suggestions), and only if you allow it. You can turn it off at any time in your device settings.']
]

const Section = ({ number, title, children }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-3">{number}. {title}</h2>
    {children}
  </div>
)

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy - CloudNet Softwares</title>
        <meta
          name="description"
          content="Read CloudNet Softwares' privacy policy - it covers our website and every CloudNet software product and mobile app, including Clario AI, NightPulse, Navigo, ChefMate POS, CloudNet ERP, CloudEye, CloudScreen, and Access Gate System."
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy - CloudNet Softwares" />
        <meta
          property="og:description"
          content="Learn how CloudNet Softwares collects, uses, and protects your personal information across our website, software, and mobile apps."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/privacy-policy" />
      </Helmet>

      <section className="pt-32 pb-14 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Privacy <span className="text-orange-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy matters to us. This policy explains how CloudNet Softwares collects, uses, and protects
            your information across our website, software, and mobile apps.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

            <Section number={1} title="Introduction">
              <p className="leading-relaxed">
                CloudNet Softwares Co., Ltd. ("CloudNet", "we", "us", or "our") respects your privacy and is
                committed to protecting the personal information you share with us. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website or use
                our software products and mobile apps. We process personal data in line with Thailand's Personal
                Data Protection Act B.E. 2562 (2019) ("PDPA") and other applicable laws.
              </p>
            </Section>

            <div className="bg-orange-50 border-2 border-orange-100 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. This Policy Covers All CloudNet Software & Apps</h2>
              <p className="leading-relaxed mb-4">
                This is a single, unified Privacy Policy that applies to the CloudNet Softwares website and to
                every CloudNet software product and mobile app (Android, iOS, and web), including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                {PRODUCTS.map((product) => (
                  <li key={product.name}><strong>{product.name}</strong> - {product.desc}</li>
                ))}
                <li>Companion apps, customer-facing portals, and other CloudNet software products released from time to time.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Wherever this policy refers to "our products", "our apps", or "our software", it means all of the
                above, in addition to this website.
              </p>
            </div>

            <Section number={3} title="Our Role: Your Business Data">
              <p className="leading-relaxed mb-3">
                Most of our products are used by businesses (our "customers") to manage their own operations. When
                a business uses our software to store information about its staff, guests, travellers, agents, or
                customers, that business decides what data is collected and why - it is the <strong>data
                controller</strong>, and CloudNet acts as its <strong>data processor</strong>, processing that data
                only to provide the service.
              </p>
              <p className="leading-relaxed">
                If you are a guest, traveller, or customer of a business that uses CloudNet software and you have a
                question about your data, please contact that business first. We will help them respond to your request.
              </p>
            </Section>

            <Section number={4} title="Information We Collect">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account information</strong> - name, email address, phone number, username, password (stored only in encrypted/hashed form), role, and the business or shop you belong to.</li>
                <li><strong>Business data you enter</strong> - for example sales, bills, menu items, inventory, bookings, quotations, itineraries, invoices, expenses, and reports.</li>
                <li><strong>Customer and guest details entered by a business</strong> - such as names, contact details, company names, guest counts, booking dates, and notes.</li>
                <li><strong>Payment and subscription information</strong> - your plan, billing history, and payment status. Card payments are processed by our payment provider (Stripe); we do not store your full card number.</li>
                <li><strong>Device and technical data</strong> - device model, operating system, app version, IP address, browser type, crash and error logs, and usage data.</li>
                <li><strong>Voice, camera, and media</strong> - only when you use a feature that needs them (see Section 5).</li>
                <li><strong>Communications</strong> - messages you send us via email, WhatsApp, LINE, contact forms, or demo requests.</li>
              </ul>
            </Section>

            <Section number={5} title="Mobile App Permissions">
              <p className="leading-relaxed mb-4">
                Our apps only ask for the permissions a feature needs. Depending on the app and the features you
                use, these may include:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Permission</th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Why we use it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {APP_PERMISSIONS.map(([permission, reason]) => (
                      <tr key={permission} className="border-b border-gray-100 last:border-0">
                        <td className="p-3 font-medium text-gray-900 align-top whitespace-nowrap">{permission}</td>
                        <td className="p-3 align-top">{reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="leading-relaxed mt-4">
                You can allow or deny permissions at any time in your device settings. Denying a permission only
                turns off the feature that needs it.
              </p>
            </Section>

            <Section number={6} title="How We Use Your Information">
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, operate, and maintain our products and services, including syncing your data across devices.</li>
                <li>To send notifications and reminders you or your business have set up (for example booking reminders by in-app notification or WhatsApp).</li>
                <li>To process subscriptions and payments.</li>
                <li>To respond to inquiries, schedule demos, and provide customer support.</li>
                <li>To keep our services secure, detect fraud or misuse, and keep audit logs of account activity.</li>
                <li>To improve our website, products, and services based on usage, error reports, and feedback.</li>
                <li>To send important service notices and, with your consent, marketing communications.</li>
                <li>To comply with legal, tax, and accounting obligations.</li>
              </ul>
            </Section>

            <Section number={7} title="Sharing of Information">
              <p className="leading-relaxed mb-3">
                <strong>We do not sell your personal information</strong>, and we do not use your business data for
                advertising. We share information only with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service providers</strong> who help us run our services, such as cloud hosting, payment processing (Stripe), messaging (e.g. WhatsApp Business / Meta, LINE, email), AI and voice providers for Clario AI, and app stores (Google Play, Apple App Store).</li>
                <li><strong>The business you use our software with</strong> - for example, a venue or travel agency can see the bookings and records in its own account.</li>
                <li><strong>Authorities</strong> when required by law, or to protect our rights, users, or the public.</li>
                <li><strong>A successor</strong> in the event of a merger, acquisition, or sale of assets, under this same policy.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Service providers may only use your information to provide their service to us, and must protect it.
              </p>
            </Section>

            <Section number={8} title="Data Storage & International Transfers">
              <p className="leading-relaxed">
                Your data is stored on secure cloud servers. Some of our service providers may process data outside
                Thailand. When this happens, we take steps to make sure your data receives a level of protection
                consistent with the PDPA.
              </p>
            </Section>

            <Section number={9} title="Data Retention">
              <p className="leading-relaxed">
                We keep your information for as long as your account is active and as needed to provide our
                services. After an account is closed, we delete or anonymise its data within a reasonable period,
                except where we must keep certain records (such as invoices and payment records) to meet legal,
                tax, or accounting requirements, or to resolve disputes.
              </p>
            </Section>

            <Section number={10} title="Data Security">
              <p className="leading-relaxed">
                We use reasonable technical and organisational measures to protect your information, including
                encrypted connections (HTTPS), hashed passwords, per-business data separation, role-based access
                permissions, and audit logs. However, no method of transmission over the internet or electronic
                storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </Section>

            <Section number={11} title="Cookies">
              <p className="leading-relaxed">
                Our website may use cookies and similar technologies to remember your preferences (such as language),
                keep you signed in, analyse site traffic, and understand where our visitors come from. You can
                disable cookies in your browser settings, though some features may not work as a result.
              </p>
            </Section>

            <Section number={12} title="Your Rights">
              <p className="leading-relaxed mb-3">Under the PDPA and other applicable laws, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and get a copy of your personal data.</li>
                <li>Correct inaccurate or incomplete data.</li>
                <li>Request deletion or anonymisation of your data.</li>
                <li>Object to or restrict certain processing, and withdraw consent at any time.</li>
                <li>Request that your data be transferred to another service (data portability).</li>
                <li>Complain to Thailand's Personal Data Protection Committee (PDPC).</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise any of these rights, contact us using the details in Section 16. We may need to verify
                your identity before acting on your request.
              </p>
            </Section>

            <div className="bg-orange-50 border-2 border-orange-100 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">13. Account & Data Deletion</h2>
              <p className="leading-relaxed mb-3">
                You can ask us to delete your account and associated data for any CloudNet app at any time:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Email <a href="mailto:info@cloudnetsoftwares.com?subject=Account%20deletion%20request" className="text-primary hover:underline">info@cloudnetsoftwares.com</a> with
                  the subject "Account deletion request", or message us on WhatsApp at +66-948712350.
                </li>
                <li>Tell us the app name (e.g. NightPulse, Navigo, Clario AI) and the email or phone number on your account.</li>
                <li>We will confirm your request and delete your account and personal data within 30 days.</li>
              </ol>
              <p className="leading-relaxed mt-3">
                If you are a staff user of a business account, the business owner or admin can also remove your
                user account. Records that we must keep by law (such as issued invoices) are kept only for the
                required period and then deleted.
              </p>
            </div>

            <Section number={14} title="Children's Privacy">
              <p className="leading-relaxed">
                Our products are designed for businesses and are not intended for children under 13 (or the minimum
                age in your country). We do not knowingly collect personal data from children. If you believe a
                child has provided us with personal data, please contact us and we will delete it.
              </p>
            </Section>

            <Section number={15} title="Changes to This Policy">
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our products, practices,
                or legal requirements. The updated version will be posted on this page with a revised "Last updated"
                date. For significant changes, we will also notify you in the app or by email.
              </p>
            </Section>

            <Section number={16} title="Contact Us">
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Company: CloudNet Softwares Co., Ltd.</li>
                <li>Email: <a href="mailto:info@cloudnetsoftwares.com" className="text-primary hover:underline">info@cloudnetsoftwares.com</a></li>
                <li>Phone / WhatsApp: +66-948712350 (English), +66-952477020 (Thai)</li>
                <li>LINE: @cloudnetsoftwares</li>
                <li>Address: 109/19, Soi 14, Pattaya, Moo 10, Nong Prue, Banglamung, Chonburi, Thailand</li>
              </ul>
            </Section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
