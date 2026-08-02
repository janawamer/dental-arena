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
  return <LegalPage title="Refund & Return Policy">
    <Section title="1. Eligibility for Returns">
      <p className="mb-3">Customers may request a return or refund within <strong>3 days</strong> of receiving their order.</p>
      <p className="mb-2">To be eligible for a return, the product must:</p>
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        <li>Be unused and in its original condition.</li>
        <li>Be returned with the original packaging and all included accessories.</li>
        <li>Have all factory seals intact. Products with broken or removed seals are not eligible for return.</li>
      </ul>
    </Section>

    <Section title="2. Non-Eligible Items">
      <p className="mb-2">Returns and refunds will not be accepted for products that:</p>
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        <li>Have been used or damaged by the customer.</li>
        <li>Are missing the original packaging or accessories.</li>
        <li>Have broken or removed factory seals.</li>
        <li>Are not in their original condition.</li>
      </ul>
    </Section>

    <Section title="3. Damaged or Incorrect Items">
      If you receive a damaged or incorrect product, please contact our Customer Support team within <strong>48 hours</strong> of delivery and provide clear photos of the product and packaging.
    </Section>

    <Section title="4. Refund Processing">
      Once the returned product has been received, inspected, and approved, the refund will be processed within <strong>3 business days</strong> using the original payment method whenever possible.
    </Section>

    <Section title="5. Shipping Costs">
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        <li>If the return is due to an error on our part (such as an incorrect or damaged item), Dental Arena will cover all shipping costs.</li>
        <li>If the customer requests a return for personal reasons, the customer will be responsible for the shipping cost.</li>
      </ul>
    </Section>

    <Section title="6. Order Cancellation">
      Orders may be canceled within <strong>24 hours</strong> of placement. If the cancellation request is made after 24 hours, the customer will be responsible for any applicable shipping charges if the order has already been processed or shipped.
    </Section>

    <Section title="7. Inspection & Approval">
      All returned items are subject to inspection upon receipt. Refunds will only be processed after our team confirms that the returned product meets the eligibility requirements stated in this policy.
    </Section>

    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-arena-blue">
      For return requests, contact us at{' '}
      <a href="mailto:Dentalarenastore@gmail.com" className="font-semibold hover:underline">Dentalarenastore@gmail.com</a>
      {' '}or WhatsApp{' '}
      <a href="https://wa.me/201141129291" className="font-semibold hover:underline">+20 114 112 9291</a>.
    </div>
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
