import TrustBadges from '../components/TrustBadges'

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  )
}

export function Terms() {
  return <LegalPage title="Terms & Conditions">
    <Section title="1. Acceptance of Terms">By accessing and using Dental Arena, you accept and agree to be bound by these Terms. If you do not agree, please do not use our platform.</Section>
    <Section title="2. Use of the Platform">Dental Arena is intended for licensed dental professionals, students, and authorized distributors. You agree to use the platform only for lawful purposes.</Section>
    <Section title="3. Account Registration">You must provide accurate information when registering. You are responsible for maintaining the confidentiality of your account credentials.</Section>
    <Section title="4. Products and Pricing">We make every effort to display products and prices accurately. We reserve the right to correct errors and change prices without prior notice. All prices are in Egyptian Pounds (EGP).</Section>
    <Section title="5. Orders and Payment">By placing an order, you offer to purchase the product at the listed price. Payment is accepted via credit/debit card, bank transfer, or cash on delivery.</Section>
    <Section title="6. Marketplace Listings">Dental Arena provides a platform for users to buy and sell used dental equipment. We are not responsible for transactions between buyers and sellers. All users must provide accurate item descriptions.</Section>
    <Section title="7. Intellectual Property">All content on this website is the property of Dental Arena and protected by Egyptian and international copyright laws.</Section>
    <Section title="8. Limitation of Liability">Dental Arena shall not be liable for any indirect or consequential damages. Our total liability shall not exceed the amount paid for the product in question.</Section>
    <Section title="9. Changes to Terms">We reserve the right to modify these terms at any time. Your continued use constitutes acceptance of new terms.</Section>
    <Section title="10. Contact">For questions about these Terms, contact us at <a href="mailto:Dentalarenastore@gmail.com" className="text-arena-blue hover:underline">Dentalarenastore@gmail.com</a>.</Section>
  </LegalPage>
}

export function Privacy() {
  return <LegalPage title="Privacy Policy">
    <Section title="1. Information We Collect">We collect information you provide when registering, placing orders, or contacting us — including your name, email, phone number, and delivery address. We also collect usage data automatically.</Section>
    <Section title="2. How We Use Your Information">We use your information to process orders, communicate about your account, send promotional offers (with consent), improve our platform, and prevent fraud.</Section>
    <Section title="3. Information Sharing">We do not sell or rent your personal information to third parties. We may share data with trusted service providers under strict confidentiality agreements.</Section>
    <Section title="4. Cookies">We use cookies to enhance your experience and analyze traffic. You can control cookie settings through your browser.</Section>
    <Section title="5. Data Security">We implement industry-standard security measures including SSL encryption and secure payment gateways to protect your information.</Section>
    <Section title="6. Your Rights">You can access, correct, or delete your personal data by contacting us at <a href="mailto:Dentalarenastore@gmail.com" className="text-arena-blue hover:underline">Dentalarenastore@gmail.com</a>.</Section>
    <Section title="7. Data Retention">We retain your information for as long as your account is active. Order records are kept for 7 years as required by Egyptian law.</Section>
    <Section title="8. Changes">We may update this policy and will notify you of significant changes by email or by posting a notice on our website.</Section>
  </LegalPage>
}

export function Refund() {
  return <LegalPage title="Refund Policy">
    <div className="grid grid-cols-3 gap-4 mb-8">
      {[['📅','14-Day Returns','Return unopened items within 14 days'],['↩️','Easy Process','Contact us and we arrange a hassle-free return'],['💸','Fast Refunds','Processed within 5–7 business days']].map(([e,t,d]) => (
        <div key={t} className={`rounded-xl p-4 text-center text-sm border border-gray-100 bg-gray-50`}>
          <div className="text-2xl mb-2">{e}</div>
          <div className="font-bold text-gray-900 mb-1">{t}</div>
          <div className="text-gray-500 text-xs">{d}</div>
        </div>
      ))}
    </div>
    <Section title="1. Return Eligibility">Items must be returned within 14 days of delivery, in original unopened packaging, and not be sterile/single-use or near-expiry clearance products.</Section>
    <Section title="2. Non-Returnable Items">Sterile single-use items once opened, clearance Hot Deals items, digital products, items damaged by misuse, and marketplace used equipment purchases.</Section>
    <Section title="3. Defective or Wrong Items">Contact us within 48 hours of delivery with photos. We'll arrange a free replacement or full refund.</Section>
    <Section title="4. How to Initiate a Return">Email <a href="mailto:Dentalarenastore@gmail.com" className="text-arena-blue hover:underline">Dentalarenastore@gmail.com</a> or WhatsApp +20 123 456 7890 with your order number and reason for return.</Section>
    <Section title="5. Refund Process">Approved refunds are processed within 5–7 business days to your original payment method. COD orders receive bank transfers.</Section>
    <Section title="6. Shipping Costs">Return shipping is the customer's responsibility unless the return is due to our error. Original shipping fees are non-refundable.</Section>
  </LegalPage>
}

function LegalPage({ title, children }) {
  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-black text-gray-900">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">Last updated: January 1, 2024</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">{children}</div>
      <TrustBadges />
    </div>
  )
}
