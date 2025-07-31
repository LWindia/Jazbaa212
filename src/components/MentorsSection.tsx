import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const mentors = [
  {
    name: 'Abhayjeet Singh',
    image: '/assets/mentors/abhayjeet-singh.jpg',
    description: 'Co-Founder at ImaginXP | Chief Academic Officer at CollegeDekho | Leading Higher Education Innovation and Growth | Public Speaker | Startup Mentor | Innovation Leadership Awardee 2024 by World Innovation Congress'
  },
  {
    name: 'Abid MatoO',
    image: '/assets/mentors/abid-matoo.jpg',
    description: 'Senior Partner Sales Manager at Redhat (GLS)'
  },
  {
    name: 'Dr. Ajay Khunteta',
    image: '/assets/mentors/ajay-khunteta.jpg',
    description: 'Professor at Poornima University'
  },
  {
    name: 'Bhavesh Kothari',
    image: '/assets/mentors/bhavesh-kothari.jpg',
    description: 'Entrepreneur | Startup Mentor | Author-Eves Against The Odds | Ecosystem Builder | Rated as top 1% influencer by LinkedIn 2017/18/19. Building a Global Investment Platform for Women Entrepreneurs via Billennium Divas!'
  },
  {
    name: 'Deepesh Chandran',
    image: '/assets/mentors/deepesh-chandran.jpg',
    description: 'Business Storytelling Coach | Professional Storyteller'
  },
  {
    name: 'Dr Pramod Sadarjoshi',
    image: '/assets/mentors/pramod-sadarjoshi.jpg',
    description: 'Managing Partner - Cornerstone International Group - India'
  },
  {
    name: 'Gaurav Sharma',
    image: '/assets/mentors/gaurav-sharma.jpg',
    description: 'Social Entrepreneur | Recycling, Sustainability, Impact | 3*CEO, 3*TEDx Speaker, Patrika 40 under 40, Rajeev Circle Fellow, Climate Reality Leader, Startup Mentor, Podcast Host, Former Curator at Global Shapers Jaipur'
  },
  {
    name: 'Kalpan Desai',
    image: '/assets/mentors/kalpan-desai.jpg',
    description: 'CHRO | Purpose-Driven, People-Centric, Business-Focused | Architect of High-Performing Teams | Trusted C-Suite Advisor | Emerging HR Leader - ETHR | XLRI | SHRL | MHRD'
  },
  {
    name: 'Mahavir Pratap Sharma',
    image: '/assets/mentors/mahavir-pratap-sharma.jpg',
    description: 'General Partner, Swishin Ventures; Past Chair, TiE Global Board of Trustees; Co-Founder and Chair, RAIN (Rajasthan Angels) and Founding Chair, TiE India Angels.'
  },
  {
    name: 'Namrata Thakker',
    image: '/assets/mentors/namrata-thakker.jpg',
    description: 'Entrepreneur Excel | Happy Soul | CapSavvy | Cap70 Angels | Independent Director | IIM Bangalore | Stanford Seed Spark'
  },
  {
    name: 'Nayan Bheda',
    image: '/assets/mentors/nayan-bheda.jpg',
    description: 'Award-winning Business Accelerator | Investor | Speaker | Serial Entrepreneur'
  },
  {
    name: 'Nikhil Samar',
    image: '/assets/mentors/nikhil-samar.jpg',
    description: 'Entrepreneur | Angel Investor | Startup Advisor'
  },
  {
    name: 'Paresh Gupta',
    image: '/assets/mentors/paresh-gupta.jpg',
    description: '8 times TEDx Speaker | Founder -GCEC | CUET pro |Business Mentor, Advisor and Motivator'
  },
  {
    name: 'Prateek Mathur',
    image: '/assets/mentors/prateek-mathur.jpg',
    description: 'Founder : Saaskart | CuriousAI'
  },
  {
    name: 'Puja Agarwal',
    image: '/assets/mentors/puja-agarwal.jpg',
    description: 'Vice President, Arya Group of Colleges-Jaipur'
  },
  {
    name: 'Puneet Datta',
    image: '/assets/mentors/puneet-datta.jpg',
    description: 'Solving for Scale @ SysB | Seeding the Future @ All About Startups | Startup Life: All In, All Ways'
  },
  {
    name: 'Rahul Singhi',
    image: '/assets/mentors/rahul-singhi.jpg',
    description: 'Co-Founder @ Poornima University, Jaipur & Director at JIET Group of Institutions, Jodhpur'
  },
  {
    name: 'Ramesh Padmanabhan',
    image: '/assets/mentors/ramesh-padmanabhan.jpg',
    description: 'Sr. Vice President, NIIT StackRoute'
  },
  {
    name: 'Reetesh Gautam',
    image: '/assets/mentors/reetesh-gautam.jpg',
    description: 'Training & Placement Officer, Head Corporate Affairs B K Birla Institute of Engineering & Technology, Pilani || Building BKBIET, Pilani'
  },
  {
    name: 'Rishabh Nag',
    image: '/assets/mentors/rishabh-nag.jpg',
    description: 'Transforming BI to AI | Founder Humanli.AI | Empowering Data-Driven Decisions for Fortune 2000 | IIMC Alum | McKinsey | GOI Think Tank'
  },
  {
    name: 'Sumit Srivastawa',
    image: '/assets/mentors/sumit-srivastawa.jpg',
    description: 'Founder & CEO, Startup Chaupal®'
  },
  {
    name: 'Dr. Tanuj Manglani',
    image: '/assets/mentors/tanuj-manglani.jpg',
    description: 'Director, Training and Placements | Arya College of Engineering Jaipur'
  },
  {
    name: 'Vibhuti Sharma',
    image: '/assets/mentors/vibhuti-sharma.jpg',
    description: 'Leadership Coach | Management Consultant'
  },
  {
    name: 'Wamiq Siddiqui',
    image: '/assets/mentors/wamiq-siddiqui.jpg',
    description: 'DevOps Architect/Consultant | Agile Delivery Manager | Digital Transformation Leader | FINTECH | DevSecOps | AIOps | MLOps | Explorer | Mentor | Learner | Community Builder | ITIL | CSM® | CSPO® | DevOps Leader (DOL)®'
  }
];

const MentorsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="mentors" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#543ef7]/10 to-[#9cecd5]/10"></div>
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Investors & Mentors Wall
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Backed by industry leaders, supported by visionary investors, and guided by 
            experienced mentors who believe in the power of student innovation.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              className={`group text-center cursor-pointer`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: activeIndex === index ? 1.12 : 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              whileTap={{ scale: 1.08 }}
            >
              <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 h-80 w-full flex flex-col justify-center ${activeIndex === index ? 'ring-4 ring-[#e86888]/40 scale-110 z-10' : 'group-hover:scale-110 group-hover:ring-4 group-hover:ring-[#e86888]/40'}`}>
                                 <div className="w-40 h-40 mx-auto mb-6 rounded-xl overflow-hidden border-4 border-gradient-to-r from-[#e86888] to-[#7d7eed] flex items-center justify-center bg-gradient-to-r from-[#e86888] to-[#7d7eed]">
                   <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                 </div>
                <h3 className="text-white font-semibold mb-2 text-lg">{mentor.name}</h3>
                <p className="text-white/70 text-sm">{mentor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection; 