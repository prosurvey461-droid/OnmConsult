import { SiteData } from '../types';

export const defaultSiteData: SiteData = {
  settings: {
    companyName: "omsconsults",
    tagline: "Engineering Excellence for Sustainable Solutions",
    establishedYear: "2021",
    address: "New Baneshwor, Kathmandu",
    city: "Kathmandu",
    country: "Nepal",
    primaryPhone: "9851124710",
    secondaryPhone: "9851332210",
    email: "info@omsconsults.com",
    supportEmail: "support@omsconsults.com",
    workingHours: "Sunday - Friday: 9:00 AM - 6:00 PM (NPT)",
    header: {
      topBarVisible: true,
      topBarNotice: "Sunday - Friday: 9:00 AM - 6:00 PM (NPT)",
      logoTitle: "omsconsults",
      logoSubtitle: "Pvt. Ltd.",
      tagline: "Engineering & Supervision",
      logoImageUrl: "",
      enquireButtonText: "ENQUIRE",
      enquireButtonLink: "#contact"
    },
    footer: {
      aboutDescription: "omsconsults, Kathmandu, Nepal. Engineering consultancy, pre-feasibility, detailed design, hydraulic studies, and FIDIC construction supervision since 2021.",
      registrationText: "Govt. Regd. Engineering Consultancy Firm | Kathmandu, Nepal",
      emergencyHotline: "9851124710",
      officeHours: "Sunday - Friday: 9:00 AM - 6:00 PM",
      copyrightText: "© 2026 OMSCONSULTS. KATHMANDU, NEPAL. ALL RIGHTS RESERVED."
    },
    whatsapp: {
      enabled: true,
      phoneNumber: "9779805671898",
      recipientName: "Bigyan",
      customIntro: "Hello Bigyan!",
      autoOpenOnSubmit: true
    },
    mdMessage: {
      name: "Ashok Bista",
      role: "Managing Director",
      quote: "Committed to excellence in design and consulting services, delivering results that exceed expectations.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
    },
    socialLinks: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com"
    },
    stats: {
      projectsCompleted: 35,
      totalCapacityMW: 120,
      expertEngineers: 15,
      clientSatisfactionRate: 99
    }
  },
  heroSlides: [
    {
      id: "slide-1",
      title: "Engineering Excellence for Sustainable Solutions",
      description: "omsconsults blends creativity with technical expertise to deliver innovative engineering design and construction supervision services that meet your project's unique needs.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1600",
      badge: "Sustainable Engineering"
    },
    {
      id: "slide-2",
      title: "Your Partner in Hydropower and Solar Projects",
      description: "From hydropower design to solar PV system implementation, we provide end-to-end solutions to ensure efficiency, safety, and compliance with industry standards.",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1600",
      badge: "Renewable Energy Focus"
    },
    {
      id: "slide-3",
      title: "Precision in Every Project",
      description: "Our team of seasoned engineers ensures meticulous design, supervision, and tender documentation to bring your vision to life with unmatched quality.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
      badge: "Proven Track Record"
    }
  ],
  aboutCards: [
    {
      id: "about-1",
      icon: "Target",
      title: "Our Mission",
      description: "Blending creativity with technical expertise to build a future where design meets purpose and engineering empowers communities.",
      linkText: "Learn More",
      linkHref: "#services"
    },
    {
      id: "about-2",
      icon: "BookOpen",
      title: "Our Story",
      description: "Since 2021, omsconsults has grown into a trusted name in engineering design and construction supervision in Kathmandu, Nepal.",
      linkText: "Meet Our Team",
      linkHref: "#team"
    },
    {
      id: "about-3",
      icon: "Handshake",
      title: "Our Commitment",
      description: "We deliver innovative, sustainable, and high-quality solutions tailored to meet the unique needs and regulatory compliance of every project.",
      linkText: "View Projects",
      linkHref: "#projects"
    },
    {
      id: "about-4",
      icon: "MessageSquare",
      title: "Message from MD",
      description: "\"Committed to excellence in design and consulting services, delivering results that exceed expectations.\" — Ashok Bista, Managing Director",
      linkText: "Contact Us",
      linkHref: "#contact"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Pikhuwa Khola Small Hydropower",
      capacity: "5 MW",
      category: "Hydropower",
      description: "Comprehensive engineering design for a 5 MW hydropower project, ensuring efficiency, hydraulic optimization, and environmental sustainability.",
      details: "Full feasibility study, hydro-mechanical layout, penstock design, turbine selection, and structural blueprints implemented in Eastern Nepal.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800",
      client: "Pikhuwa Hydro Power Ltd.",
      year: "2022",
      location: "Bhojpur, Nepal",
      status: "Completed",
      featured: true
    },
    {
      id: "proj-2",
      title: "Super Mai-A Hydropower",
      capacity: "9.99 MW",
      category: "Hydropower",
      description: "Design and engineering for a 9.99 MW hydropower project, blending hydraulic innovation with rigorous structural precision.",
      details: "Detailed headworks design, sand settling basin design, tunnel and surface penstock stress analysis, and grid interconnection synchronization.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      client: "Mai Valley Energy Pvt. Ltd.",
      year: "2023",
      location: "Ilam, Nepal",
      status: "Completed",
      featured: true
    },
    {
      id: "proj-3",
      title: "Pikhuwa Super Mai Hydropower",
      capacity: "7.8 MW",
      category: "Hydropower",
      description: "Advanced hydro-mechanical design solutions for a 7.8 MW hydropower project, meeting stringent client specifications and NEA grid code.",
      details: "Hydrological analysis, sediment transport simulation, transmission line route optimization, and electro-mechanical equipment tendering.",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800",
      client: "Super Mai Hydro Energy Ltd.",
      year: "2023",
      location: "Ilam / Bhojpur, Nepal",
      status: "Completed"
    },
    {
      id: "proj-4",
      title: "Tallo Khare Khola Hydropower",
      capacity: "11 MW",
      category: "Hydropower",
      description: "End-to-end engineering design for an 11 MW run-of-the-river hydropower project, ensuring quality assurance and regulatory compliance.",
      details: "Complete design package including weir, intake, de-sander, surge tank, power house architecture, and automated SCADA control systems.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      client: "Khare Khola Hydropower Pvt. Ltd.",
      year: "2024",
      location: "Dolakha, Nepal",
      status: "Ongoing",
      featured: true
    },
    {
      id: "proj-5",
      title: "Singhati Hydroelectric Project",
      capacity: "25 MW",
      category: "Hydropower",
      description: "Comprehensive design and verification of hydro-mechanical components, penstock manifold, and bifurcation for a 25 MW project.",
      details: "Finite Element Analysis (FEA) of bifurcation trifurcation components, radial gates, stoplogs, and heavy turbine runner alignments.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      client: "Singhati Hydro Energy Ltd.",
      year: "2022",
      location: "Dolakha, Nepal",
      status: "Completed"
    },
    {
      id: "proj-6",
      title: "Solar PV System for 130 Schools",
      capacity: "920.4 kWp",
      category: "Solar",
      description: "Design and construction supervision of rooftop & ground-mounted solar PV systems for 130 public schools, funded by the Asian Development Bank (ADB).",
      details: "Solar irradiance mapping, inverter sizing, battery energy storage system (BESS) integration, lightning protection, and remote telemetry monitoring.",
      image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&q=80&w=800",
      client: "Ministry of Education / ADB",
      year: "2023",
      location: "Bagmati & Gandaki Provinces, Nepal",
      status: "Completed",
      featured: true
    },
    {
      id: "proj-7",
      title: "Upper Modi A Hydro Electric Project",
      capacity: "42 MW",
      category: "Hydropower",
      description: "Design review, geological risk assessment, and construction supervision consulting for a major 42 MW hydroelectric development.",
      details: "Tunnel lining inspection, underground cavern monitoring, power generation optimization, and environmental monitoring.",
      image: "https://images.unsplash.com/photo-1574684061405-b0402b17a5bc?auto=format&fit=crop&q=80&w=800",
      client: "Nepal Electricity Authority (NEA) Partner",
      year: "2024",
      location: "Kaski, Nepal",
      status: "Ongoing"
    },
    {
      id: "proj-8",
      title: "Lodo Khola Small Hydropower Project",
      capacity: "1.6 MW",
      category: "Hydropower",
      description: "Comprehensive engineering design for a 1.6 MW small hydropower project, emphasizing maximum cost-efficiency and high system reliability.",
      details: "Low-head Pelton/Francis hydraulic configuration, modular powerhouse layout, and simplified construction methodology for steep mountainous terrain.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
      client: "Lodo Khola Energy Consortium",
      year: "2023",
      location: "Taplejung, Nepal",
      status: "Completed"
    },
    {
      id: "proj-9",
      title: "Ranijamara Kulariya Irrigation Project",
      capacity: "Irrigation Network",
      category: "Irrigation",
      description: "Design and supervision of modern irrigation hydraulic structures to support regional agricultural development and systematic water distribution.",
      details: "Canal intake gates, feeder canal flow regulation, sediment excluder designs, and automated water discharge monitoring stations.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
      client: "Department of Water Resources and Irrigation",
      year: "2023",
      location: "Kailali, Nepal",
      status: "Completed"
    }
  ],
  team: [
    {
      id: "team-1",
      name: "Ashok Bista",
      title: "Senior Mechanical Engineer & Managing Director",
      experience: "10+ Years Experience",
      education: "Masters in Mechanical Engineering",
      description: "Over a decade of leadership in hydropower design, hydro-mechanical systems, pipeline hydraulics, and construction supervision across Nepal.",
      icon: "UserCog",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
      email: "ashok.bista@omsconsults.com",
      phone: "+977 9851124710",
      linkedin: "https://linkedin.com"
    },
    {
      id: "team-2",
      name: "Dadi Ram Dahal, Ph.D",
      title: "Senior Mechanical Engineer & Technical Advisor",
      experience: "10+ Years Expertise",
      education: "Ph.D & Masters in Mechanical Engineering",
      description: "Renowned expert in hydro-mechanical equipment design, computational fluid dynamics (CFD), structural stress modeling, and project peer reviews.",
      icon: "UserCheck",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      email: "dr.dahal@omsconsults.com",
      phone: "+977 9851332210",
      linkedin: "https://linkedin.com"
    },
    {
      id: "team-3",
      name: "Anup Raj Pandey",
      title: "Senior Electrical Engineer",
      experience: "11+ Years Experience",
      education: "B.E. & M.Sc. in Electrical Power Engineering",
      description: "Specializes in high-voltage substation design, protection schemes, grid synchronization, transmission lines, and solar power integration.",
      icon: "ShieldCheck",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      email: "anup.pandey@omsconsults.com",
      phone: "+977 9841000000",
      linkedin: "https://linkedin.com"
    },
    {
      id: "team-4",
      name: "Roshan Chhetri",
      title: "Mechanical & Energy Engineer",
      experience: "5+ Years Experience",
      education: "Bachelor in Mechanical Engineering",
      description: "Focuses on Solar PV system engineering, HVAC design, renewable energy feasibility audits, and construction site supervision.",
      icon: "Wrench",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      email: "roshan.chhetri@omsconsults.com",
      phone: "+977 9842000000",
      linkedin: "https://linkedin.com"
    },
    {
      id: "team-5",
      name: "Nishan Neupane",
      title: "Geomatics Engineer & GIS Specialist",
      experience: "5+ Years Experience",
      education: "Bachelor in Geomatics Engineering",
      description: "Expert in topographical surveying, LiDAR & drone mapping, GIS modeling, road alignment, and digital terrain mapping for hydro projects.",
      icon: "Compass",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
      email: "nishan.neupane@omsconsults.com",
      phone: "+977 9843000000",
      linkedin: "https://linkedin.com"
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Engineering Design",
      description: "Complete hydraulic, structural, mechanical, and electrical detailed engineering designs for hydropower, solar, and infrastructure projects.",
      icon: "Compass",
      details: [
        "Hydraulic & Hydrological Modeling",
        "Hydro-mechanical & Penstock Design",
        "Finite Element Analysis (FEA)",
        "Solar PV Array & Grid Integration Layout",
        "3D CAD & BIM Modeling"
      ],
      deliverables: "Comprehensive detailed design reports, CAD drawings, BOQ, and calculation sheets."
    },
    {
      id: "srv-2",
      title: "Construction Supervision",
      description: "On-site quality assurance, material testing verification, schedule tracking, and strict adherence to technical specifications.",
      icon: "HardHat",
      details: [
        "Day-to-day On-site Quality Auditing",
        "Contractor Milestone Verification",
        "Health, Safety & Environmental (HSE) Compliance",
        "Material Testing & Non-Conformance Reports",
        "As-Built Drawings Verification"
      ],
      deliverables: "Weekly/Monthly supervision reports, compliance certificates, and progress trackers."
    },
    {
      id: "srv-3",
      title: "Tender Document Preparation",
      description: "Development of robust procurement packages, employer requirements, technical specifications, and FIDIC-compliant contract documents.",
      icon: "FileText",
      details: [
        "FIDIC Red/Yellow/Silver Book Contracts",
        "Technical Specifications & Equipment Data Sheets",
        "Bill of Quantities (BOQ) Preparation",
        "Bid Evaluation Criteria & Contractor Screening",
        "Contract Negotiation Support"
      ],
      deliverables: "Ready-to-float tender packages, contractor evaluation sheets, and contract drafts."
    },
    {
      id: "srv-4",
      title: "Design Review & Third-Party Audit",
      description: "Independent peer review of existing engineering designs, structural safety verification, and value engineering recommendations.",
      icon: "Search",
      details: [
        "Hydraulic & Structural Peer Review",
        "Value Engineering & Cost Optimization",
        "Geological Hazard Re-assessment",
        "Dam Safety & Stability Verification",
        "NEA Grid Code Compliance Verification"
      ],
      deliverables: "Design review audit reports with risk mitigation recommendations."
    },
    {
      id: "srv-5",
      title: "Project Management",
      description: "End-to-end planning, risk management, financial forecasting, and coordination between stakeholders, contractors, and authorities.",
      icon: "Cpu",
      details: [
        "Master Scheduling (Critical Path Method)",
        "Budget Monitoring & Cash Flow Forecasting",
        "Regulatory Approvals & Statutory Liaison",
        "Risk Identification & Mitigation Matrix",
        "Stakeholder Coordination"
      ],
      deliverables: "Project execution plans, risk logs, and milestone dashboards."
    },
    {
      id: "srv-6",
      title: "Operation & Maintenance (O&M)",
      description: "Asset management, efficiency audits, preventive maintenance protocols, and overhaul supervision for operating renewable plants.",
      icon: "Wrench",
      details: [
        "Plant Performance Testing & Efficiency Audits",
        "Vibration Analysis & Equipment Diagnostics",
        "Preventive Maintenance Manuals (SOPs)",
        "Overhaul & Rehabilitation Supervision",
        "Staff Training & Plant Safety Drills"
      ],
      deliverables: "O&M manuals, overhaul inspection reports, and diagnostic logs."
    }
  ],
  skills: [
    {
      id: "skill-1",
      name: "Mechanical & Hydro-Mechanical Engineering",
      percentage: 90,
      description: "Gates, penstocks, turbines, valves, and FEA stress calculations."
    },
    {
      id: "skill-2",
      name: "Electrical & Substation Engineering",
      percentage: 85,
      description: "High voltage transformers, protection panels, and solar inverters."
    },
    {
      id: "skill-3",
      name: "Geomatics & Drone GIS Surveying",
      percentage: 80,
      description: "Total station, DGPS, UAV photogrammetry, and 3D terrain modeling."
    },
    {
      id: "skill-4",
      name: "Construction Supervision & Quality Control",
      percentage: 95,
      description: "Stringent site auditing, contractor oversight, and safety adherence."
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What types of engineering design services do you offer?",
      answer: "We provide comprehensive mechanical, electrical, and geomatics design services, including hydro-mechanical parts design, high-pressure penstock pipe design, finite element analysis (FEA), solar PV plant layout, and full 3D modeling for hydropower, solar, and irrigation projects.",
      category: "Engineering Services"
    },
    {
      id: "faq-2",
      question: "How do you ensure quality during construction supervision?",
      answer: "Our seasoned engineers are stationed on-site to supervise every phase of civil, hydro-mechanical, and electrical construction. We enforce strict compliance with international engineering codes, environmental guidelines, safety protocols, and client specifications through rigorous inspection and testing regimes.",
      category: "Supervision & QA"
    },
    {
      id: "faq-3",
      question: "Can you assist with tender document preparation and procurement?",
      answer: "Yes, we specialize in preparing comprehensive, dispute-resistant tender documents conforming to FIDIC guidelines and Public Procurement Directives, including detailed equipment specifications, bill of quantities (BOQ), and construction contract terms.",
      category: "Tendering & Contracts"
    },
    {
      id: "faq-4",
      question: "What is your track record and experience with hydropower projects?",
      answer: "Since 2021, our team has designed, reviewed, and supervised multiple successful hydropower projects across Nepal, including Pikhuwa Khola (5 MW), Super Mai-A (9.99 MW), Pikhuwa Super Mai (7.8 MW), Tallo Khare Khola (11 MW), Singhati (25 MW), and Upper Modi A (42 MW).",
      category: "Project Portfolio"
    }
  ]
};
