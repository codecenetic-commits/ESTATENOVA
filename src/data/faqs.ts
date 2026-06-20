export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    question: 'What is the step-by-step process of purchasing a luxury property through EstateNova?',
    answer: 'Our process begins with an in-depth private lifestyle consultation. Once we establish your requirements, we present a curated portfolio of public and off-market properties. We coordinate private viewings (or virtual 3D tours). Upon selection, our in-house legal team drafts letters of intent, manages the escrow process, facilitates structural inspections, and guides you through closing with complete discretion.',
    category: 'Buying'
  },
  {
    question: 'Does EstateNova offer access to off-market or pocket listings?',
    answer: 'Yes, a significant portion of our ultra-luxury portfolio consists of off-market pocket listings. Due to privacy and security requirements, these estates are not advertised publicly. Qualified buyers gain access to these listings after executing a non-disclosure agreement and verifying proof of funds.',
    category: 'Off-Market'
  },
  {
    question: 'How do you handle transactions for international buyers or investors?',
    answer: 'We have a dedicated international client services wing. We assist with foreign capital verification, multi-currency escrow accounts, corporate registration (LLCs/Trusts for property holding), power of attorney services, and coordinates with tax advisors specializing in cross-border real estate acquisitions.',
    category: 'International'
  },
  {
    question: 'Can I schedule virtual tours or private drone walk-throughs?',
    answer: 'Absolutely. We provide high-fidelity 4K video walk-throughs, custom drone fly-overs, and immersive 3D virtual tours (Matterport) for all estates. Upon request, an agent can host a private live video walk-through to inspect finer architectural details, views, and structural elements.',
    category: 'Virtual Tours'
  },
  {
    question: 'What financing options are available for estates valued over $10 Million?',
    answer: 'We maintain direct relationships with elite private banks and wealth management firms that offer customized portfolio lending, interest-only jumbo loans, and asset-backed financing tailored to high-net-worth individuals and corporate investment consortiums.',
    category: 'Financing'
  }
];
