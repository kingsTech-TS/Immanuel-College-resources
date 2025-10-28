"use client"

import { useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Search, Filter, ExternalLink, BookOpen, Users, Globe, Database, Zap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const databases = [
  {
    id: 1,
    name: "JSTOR",
    category: "Multidisciplinary",
    description:
      "Digital library with thousands of academic journals, books, and primary sources across multiple disciplines including arts, sciences, and humanities.",
    features: ["Full-text articles", "Historical archives", "Primary sources", "Citation tools"],
    subjects: ["Arts & Humanities", "Social Sciences", "Science & Mathematics", "Business & Economics"],
    logo: "JSTOR.png",
    url: "https://www.jstor.org/",
    color: "from-purple-500 to-indigo-600",
    stats: { articles: "12M+", journals: "3,000+", books: "75,000+" },
  },

  {
    id: 2,
    name: "Science.gov",
    category: "Multidisciplinary, Mechanical Engineering",
    description:
      "A US government gateway offering one-stop access to 60+ scientific databases and over 2,200 portals across 13 federal science agencies, covering 200 million+ pages of research and technical information.",
    features: [
      "Federated real-time search",
      "Clustered results by topic/date",
      "Alerts & email notifications",
      "Advanced/Basic search filters",
      "Full-text & citation results",
    ],
    subjects: [
      "Science",
      "Technology",
      "Engineering",
      "Medicine",
      "Agriculture",
      "Environmental Sciences",
      "Energy",
      "Mathematics",
    ],
    logo: "sci_gov.png",
    url: "https://www.science.gov",
    color: "from-pink-500 to-indigo-600",
    stats: {
      databases: "60+",
      pages: "200M+",
      agencies: "13+",
    },
  },

  {
    id: 3,
    name: "ERIC",
    category: "Education",
    description:
      "Topics in education, from early childhood education to higher education and special education, and includes both scholarly and grey literature.",
    features: ["Peer-reviewed articles", "Grey literature", "Full-text PDFs", "Advanced search tools"],
    subjects: [
      "Early Childhood Education",
      "K-12 Education",
      "Higher Education",
      "Special Education",
      "Educational Policy",
    ],
    logo: "ERIC.png",
    url: "https://eric.ed.gov/",
    color: "from-indigo-500 to-indigo-600",
    stats: { articles: "1.6M+", journals: "500+", reports: "300k+" },
  },

  {
    id: 4,
    name: "HathiTrust Digital Library",
    category: "Humanities & Social Sciences",
    description:
      "A partnership of academic and research institutions, HathiTrust offers a collection of millions of titles digitized from libraries around the world, covering disciplines like history, literature, law, education, and more.",
    features: ["Full-text search", "Digitized books and journals", "Public domain access", "Scholarly content"],
    subjects: ["History", "Literature", "Law", "Arts", "Education", "Religion", "Social Sciences"],
    logo: "hatii.png",
    url: "https://www.hathitrust.org/",
    color: "from-purple-500 to-purple-700",
    stats: { books: "18M+", publicDomain: "7.5M+", partners: "80+" },
  },

  {
    id: 5,
    name: "arXiv",
    category: "Mechanical Engineering, Software Engineering, Cybersecurity",
    description:
      "An open-access archive for scholarly articles in physics, mathematics, computer science, quantitative biology, finance, and related fields, providing preprints freely available to the public before formal peer review.",
    features: ["Preprints", "Full-text access", "Daily updates", "Advanced search", "Open-access"],
    subjects: [
      "Physics",
      "Mathematics",
      "Computer Science",
      "Quantitative Biology",
      "Quantitative Finance",
      "Statistics",
      "Electrical Engineering",
    ],
    logo: "arX.png",
    url: "https://arxiv.org",
    color: "from-pink-500 to-indigo-600",
    stats: { articles: "2.3M+", categories: "8+", subPerMonth: "15,000+" },
  },

  {
    id: 6,
    name: "UNdata",
    category: "Global Statistics, Demography",
    description:
      "A centralized gateway to statistical databases compiled by the United Nations and its agencies, covering demographics, economics, health, education, environment, and sustainable development worldwide.",
    features: ["International datasets", "Country profiles", "Time series data", "Visualizations", "Free access"],
    subjects: ["Demographics", "Economics", "Health", "Education", "Environment", "Development"],
    logo: "UNdata.png",
    url: "https://data.un.org",
    color: "from-indigo-700 to-blue-900",
    stats: { datasets: "60+", countries: "200+", indicators: "1,000+" },
  },
  // {
  //     id: 7,
  //     name: "LawPavilion",  //     category: "Law & Legal Studies",
  //     description:
  //         "Nigeria's premier digital and offline legal research platform, offering access to a vast repository of case law, legislation, and legal analytics — trusted by courts, law firms, and institutions.",
  //     features: ["Offline access", "Judicial precedents", "Legal analytics", "Case citation tools"],
  //     subjects: ["Law", "Jurisprudence", "Constitutional Law", "Commercial Law", "Legal Practice"],
  //     logo: "lawP.png",
  //     url: "/restricted",
  //     color: "from-indigo-700 to-indigo-800",
  //     stats: { cases: "100k+", laws: "1,000+", courts: "Nigerian courts" },
  // },

  {
    id: 8,
    name: "SSRN",
    category: "Sharia Law, Accounting, Treasury Management, Marketing, Taxation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    description:
      "Repository of working papers and forthcoming articles in a wide range of disciplines including economics, law, and health sciences.",
    features: ["Preprints", "Early research", "Downloadable papers", "Author profiles"],
    subjects: ["Social Sciences", "Economics", "Law", "Business", "Political Science", "Humanities", "Health Sciences"],
    logo: "SSR.png",
    url: "https://www.ssrn.com/index.cfm/en/",
    color: "from-pink-600 to-pink-800",
    stats: { papers: "1M+", authors: "600K+", downloads: "150M+" },
  },
  {
    id: 9,
    name: "OAIster",
    category: "Sharia Law, Accounting, Treasury Management, Marketing, Taxation, Entrepreneurship and Innovation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    description:
      "Union catalog of millions of records representing open access resources worldwide, maintained by OCLC.",
    features: ["Open access", "Theses & dissertations", "Archival documents", "Multilingual records"],
    subjects: ["Arts", "Humanities", "Sciences", "Engineering", "Social Sciences"],
    logo: "OCLC.png",
    url: "https://www.oclc.org/en/oaister.html",
    color: "from-indigo-600 to-indigo-800",
    stats: { records: "50M+", institutions: "1,500+", countries: "100+" },
  },
  {
    id: 10,
    name: "Europe PMC",
    category: "Life Sciences, Physiotherapy, Nutrition, Optometry",
    description: "European-based repository for life sciences articles, books, patents, and clinical guidelines.",
    features: ["Full-text access", "PubMed linkage", "Grant info", "Preprints"],
    subjects: ["Life Sciences", "Biomedical Sciences", "Medicine"],
    logo: "PMC.png",
    url: "https://europepmc.org",
    color: "from-pink-500 to-indigo-600",
    stats: { articles: "42M+", grants: "800k+", preprints: "500k+" },
  },
  {
    id: 11,
    name: "EconBiz",
    category: "Accounting, Treasury Management, Marketing, Taxation, Demography, Entrepreneurship and Innovation,",
    description:
      "Academic search portal for economics and business studies, offering access to articles, working papers, and journals.",
    features: ["Research articles", "Open access", "Working papers", "Conference papers"],
    subjects: ["Economics", "Business Studies", "Management", "Marketing", "Finance"],
    logo: "Econ.png",
    url: "https://www.econbiz.de",
    color: "from-purple-700 to-blue-900",
    stats: { records: "1.1M+", institutions: "200+", countries: "50+" },
  },
  {
    id: 12,
    name: "CIA World Factbook",
    category: "Geopolitics & Statistics, Demography",
    description:
      "Comprehensive source of country data including geography, demographics, government, economy, and military.",
    features: ["Country profiles", "Statistical data", "Comparative rankings", "Interactive maps"],
    subjects: ["Geography", "Demographics", "Economy", "Military", "Government", "Infrastructure"],
    logo: "fact.png",
    url: "https://www.cia.gov/the-world-factbook",
    color: "from-pink-700 to-blue-900",
    stats: { countries: "260+", variables: "100+", updates: "Weekly" },
  },
  {
    id: 13,
    name: "OATD",
    category: "Sharia Law, Accounting, Taxation, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    description:
      "Index of graduate-level theses and dissertations freely available in full-text online from around the world.",
    features: ["Open access", "Graduate research", "Multilingual", "Global institutions"],
    subjects: ["Humanities", "Sciences", "Engineering", "Education", "Social Sciences"],
    logo: "Theses.png",
    url: "https://oatd.org",
    color: "from-teal-500 to-teal-700",
    stats: { records: "4.5M+", institutions: "1,100+", countries: "100+" },
  },
  {
    id: 14,
    name: "NASA ADS",
    category: "Astronomy & Astrophysics",
    description: "Digital library for research in astronomy, astrophysics, and related fields, maintained by NASA.",
    features: ["Full-text PDFs", "Citation indexing", "Bibliographic tools", "Preprints"],
    subjects: ["Astronomy", "Astrophysics", "Space Science"],
    logo: "astro.png",
    url: "https://ui.adsabs.harvard.edu",
    color: "from-blue-900 to-indigo-900",
    stats: { articles: "15M+", citations: "200M+", journals: "1,000+" },
  },
  {
    id: 15,
    name: "ScienceOpen",
    category: "Sharia Law, Entrepreneurship and Innovation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    description:
      "Research and publishing platform providing open access content and peer review across all areas of science.",
    features: ["Open access", "Peer review", "Research metrics", "Networking"],
    subjects: ["Astronomy", "Astrophysics", "Space Science", "Physics", "Geophysics"],
    logo: "sci_Open.png",
    url: "https://www.scienceopen.com",
    color: "from-pink-600 to-purple-700",
    stats: { articles: "90M+", authors: "25M+", journals: "30,000+" },
  },
  {
    id: 16,
    name: "Project Gutenberg",
    category: "Literature & Humanities",
    description:
      "Digital library of over 60,000 free eBooks, primarily consisting of classic literature, historical texts, and philosophy.",
    features: ["Free eBooks", "Classic literature", "Downloadable formats", "Public domain works"],
    subjects: ["Literature", "History", "Philosophy", "Religion", "Classic Texts"],
    logo: "Project.png",
    url: "https://www.gutenberg.org",
    color: "from-purple-700 to-orange-700",
    stats: { books: "60,000+", languages: "60+", formats: "Kindle, Plain Text" },
  },
  {
    id: 17,
    name: "Chronicling America",
    category: "History & Journalism",
    description:
      "Historic American newspapers archive from the Library of Congress, offering access to digitized newspapers from 1789–1963.",
    features: ["Historic newspapers", "Searchable pages", "Archival materials", "Free access"],
    subjects: ["History", "Journalism", "American Studies", "Social Issues"],
    logo: "Chronic.png",
    url: "https://chroniclingamerica.loc.gov",
    color: "from-blue-600 to-indigo-900",
    stats: { newspapers: "20M+ pages", years: "1789–1963", states: "40+" },
  },
  {
    id: 18,
    name: "BioRxiv",
    category: "Biological Sciences",
    description: "Preprint server for biology, offering early access to research papers before peer review.",
    features: ["Preprints", "Early access", "Downloadable PDFs", "DOIs"],
    subjects: ["Biology", "Genetics", "Neuroscience", "Ecology", "Bioinformatics"],
    logo: "Bio.png",
    url: "https://www.biorxiv.org",
    color: "from-pink-700 to-purple-900",
    stats: { preprints: "100,000+", subjects: "30+", downloads: "10M+" },
  },
  {
    id: 19,
    name: "MedRxiv",
    category: "Health & Medical Sciences",
    description: "Preprint server for health sciences, providing early access to clinical and medical research papers.",
    features: ["Medical preprints", "Open access", "DOIs", "Updated versions"],
    subjects: ["Medicine", "Genetics", "Neuroscience", "Ecology", "Bioinformatics"],
    logo: "medR.png",
    url: "https://www.medrxiv.org",
    color: "from-red-500 to-pink-800",
    stats: { preprints: "40,000+", categories: "20+", updates: "Daily" },
  },
  {
    id: 20,
    name: "OAPEN",
    category: "Humanities & Social Sciences",
    description:
      "Online library and publication platform for open access books, mainly in the fields of humanities and social sciences.",
    features: ["Open access books", "Peer-reviewed", "Searchable catalog", "Multilingual content"],
    subjects: ["Humanities", "Social Sciences", "Arts", "Cultural Studies", "History"],
    logo: "open_Acc.png",
    url: "https://oapen.org/",
    color: "from-purple-600 to-purple-800",
    stats: { books: "25,000+", publishers: "300+", languages: "15+" },
  },
  {
    id: 21,
    name: "Research4Life",
    category: "Sharia Law, Accounting, Treasury Management, Marketing, Taxation, Demography, Entrepreneurship and Innovation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    description:
      "Provides access to five research programs (HINARI, AGORA, OARE, ARDI, and GOALI) supporting research in health, agriculture, environmental science, development, innovation, and law in developing countries.",
    features: [
      "Access to peer-reviewed journals",
      "Global research collaboration",
      "Thematic portals",
      "Free/low-cost access for eligible institutions",
    ],
    subjects: ["Health", "Agriculture", "Environment", "Innovation", "Law"],
    logo: "research.png",
    url: "https://login.research4life.org/tacgw/login.cshtml",
    color: "from-green-600 to-green-700",
    stats: { programs: 5, institutions: "10,000+", countries: "120+" },
  },
  {
      id: 22,
      name: "Ajol",
      category: "African Journals",
      description:
          "African Journals Online (AJOL) hosts peer-reviewed academic journals from Africa, focused on African research across a wide range of disciplines.",
      features: ["Open access journals", "African-focused content", "Health and social sciences", "Search and browse tools"],
      subjects: ["Health", "Agriculture", "Social Sciences", "African Studies"],
      logo: "AJOL.png",
      url: "https://www.ajol.info/index.php/ajol",
      color: "from-yellow-600 to-yellow-700",
      stats: { journals: "500+", countries: "30+", disciplines: "10+" }
  },
  {
      id: 23,
      name: "EBSCO",
      category: "Multidisciplinary",
      description:
          "A comprehensive research platform offering access to academic journals, magazines, books, and other resources across disciplines like biology, chemistry, engineering, physics, psychology, and religion.",
      features: ["Full-text journals", "Searchable databases", "Academic ebooks", "Research alerts"],
      subjects: ["Biology", "Chemistry", "Engineering", "Physics", "Psychology", "Religion"],
      logo: "EBSCO.png",
      url: "https://www.ebsco.com/",
      color: "from-blue-500 to-blue-600",
      stats: { articles: "15M+", journals: "2,000+", ebooks: "300k+" }
  },
  {
    id: 24,
    name: "DOAB",
    category: "Open Access Books",
    description:
      "The Directory of Open Access Books (DOAB) is a discovery service for open access, peer-reviewed books across a wide range of academic subjects.",
    features: ["Free access", "Peer-reviewed books", "Multidisciplinary", "Search and browse tools"],
    subjects: ["Humanities", "Social Sciences", "Science", "Technology", "Medicine"],
    logo: "doab.png",
    url: "http://www.doabooks.org",
    color: "from-pink-500 to-pink-900",
    stats: { books: "60,000+", publishers: "600+", subjects: "30+" },
  },
  {
    id: 25,
    name: "DOAJ",
    category: "Accounting, Marketing, Entrepreneurship and Innovation",
    description:
      "The Directory of Open Access Journals (DOAJ) is an online index that provides access to high-quality, peer-reviewed open access journals from around the world.",
    features: ["Free access", "Peer-reviewed journals", "Multidisciplinary", "Advanced search tools"],
    subjects: ["Science", "Technology", "Medicine", "Social Sciences", "Humanities"],
    logo: "DOAJ.png",
    url: "http://www.doaj.org",
    color: "from-purple-600 to-pink-900",
    stats: { journals: "20,000+", countries: "130+", disciplines: "15+" },
  },
  {
  id: 26,
  name: "Dietetics Academy",
  category: "Nutrition / Dietetics Resource",
  description:
    "Dietetics Academy offers a comprehensive, topic-wise collection of dietetics notes and resources across core nutrition, food science, public & clinical nutrition, and related subjects.",
  features: [
    "Topic-wise dietetics notes",
    "Searchable content",
    "Wide subject coverage (nutrition, food safety, research, etc.)",
    "Free educational resource"
  ],
  subjects: [
    "Nutritional Biochemistry",
    "Food Science & Safety",
    "Public & Clinical Nutrition",
    "Research in Dietetics"
  ],
  logo: "Diet.PNG",
  url: "https://dietetics.academy/",
  color: "from-green-500 to-green-600",
  stats: {
    articles: "800+",
    subjects: "9+",
     books: "N/A",
  }
},
{
  id: 27,
  name: "Socio Health",
  category: "Health / Social Health Resource",
  description:
    "Socio Health is a platform focused on social determinants of health, equity, and related social-health issues.",
  features: [
    "Content on social determinants of health",
    "Social health & equity focus",
    "Articles / policy / research content",
    "Resource on social & health intersection"
  ],
  subjects: [
    "Social Determinants of Health",
    "Health Equity",
    "Public Health",
    "Social Policy"
  ],
  logo: "Soc.PNG",
  url: "https://socio.health/",
  color: "from-blue-400 to-blue-600",
  stats: {
    articles: "1272",
    subjects: "10",
    courses: "37+"
  }
},
{
  id: 28,
  name: "Free Medical Journals",
  category: "Open Access Journal Aggregator",
  description:
    "Free Medical Journals (by Amedeo) provides free access / listings to over 4,000 medical journals, with alerts and journal updates.",
  features: [
    "Free access / listings to many medical journals",
    "Daily updates on new journals",
    "Journal alert / subscription service",
    "Aggregated indexing"
  ],
  subjects: [
    "Medicine",
    "Clinical Health",
    "Medical Research",
    "Biomedical Sciences"
  ],
  logo: "free+.png",
  url: "http://www.freemedicaljournals.com/",
  color: "from-red-500 to-red-600",
  stats: {
    journals: "4000+",
    updateFrequency: "Daily",
    contentType: "Aggregator"
  }
},
{
  id: 29,
  name: "HINARI",
  category: "Accounting, Treasury Management, Marketing, Taxation, Demography, Entrepreneurship and Innovation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering, Physiotherapy",
  description:
    "HINARI (Health InterNetwork Access to Research Initiative) provides access to thousands of journals, books, and databases in biomedical and health sciences for institutions in low- and middle-income countries.",
  features: [
    "Access to thousands of health journals and e-books",
    "Covers biomedical, nursing, and related sciences",
    "Supports health institutions in developing countries",
    "Part of the Research4Life partnership"
  ],
  subjects: [
    "Medicine",
    "Public Health",
    "Biomedical Sciences",
    "Clinical Research"
  ],
  logo: "Hin.PNG",
  url: "https://www.research4life.org/about/programs/hinari/",
  color: "from-teal-500 to-teal-600",
  stats: {
    journals: "16,000+",
    books: "63,000+",
    contentType: "Health"
  }
},
{
  id: 30,
  name: "AGORA",
  category: "Sharia Law, Accounting, Treasury Management, Marketing, Taxation, Demography, Entrepreneurship and Innovation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering, Physiotherapy",
  description:
    "AGORA (Access to Global Online Research in Agriculture) provides access to scientific research in agriculture, food, nutrition, environment, and related biological and social sciences for developing countries.",
  features: [
    "Thousands of journals and e-books in agriculture and food science",
    "Supports agricultural and environmental research",
    "FAO-managed under Research4Life",
    "Access for developing country institutions"
  ],
  subjects: [
    "Agriculture",
    "Food Science",
    "Environmental Science",
    "Nutrition"
  ],
  logo: "Goa.PNG",
  url: "https://www.fao.org/agora/",
  color: "from-green-500 to-green-600",
  stats: {
    journals: "Thousands",
    books: "Thousands",
    contentType: "Agricultural"
  }
},
{
  id: 31,
  name: "OARE",
  category: "Environmental Research Access Program",
  description:
    "OARE (Online Access to Research in the Environment) offers access to research literature in environmental sciences and related disciplines, supporting sustainable development and environmental management.",
  features: [
    "Over 30,000 environmental journals",
    "Access to scientific databases and reference works",
    "Supports environmental and sustainability research",
    "Part of the Research4Life initiative"
  ],
  subjects: [
    "Environmental Science",
    "Ecology",
    "Sustainability",
    "Earth Science",
  ],
  logo: "Oar.PNG",
  url: "https://www.unep.org/topics/environment-under-review/digital-library/online-access-research-environment-oare",
  color: "from-blue-500 to-blue-600",
  stats: {
    journals: "30,000+",
    books: "130K+",
    database: "20"
  }
},
{
  id: 32,
  name: "ARDI",
  category: "Science & Technology Research Access Program",
  description:
    "ARDI (Access to Research for Development and Innovation) provides access to scientific and technical literature to support research and innovation in developing countries, focusing on applied sciences and engineering.",
  features: [
    "Access to scientific and technical research journals",
    "Supports innovation and development",
    "Managed by WIPO under Research4Life",
    "Focuses on applied science and technology"
  ],
  subjects: [
    "Engineering",
    "Technology",
    "Applied Sciences",
    "Innovation"
  ],
  logo: "Ard.PNG",
  url: "https://www.wipo.int/en/web/ardi",
  color: "from-orange-500 to-orange-600",
  stats: {
    journals: "1,000+",
    books: "N/A",
    publishers: "12"
  }
},
{
  id: 33,
  name: "GOALI",
  category: "Legal & Social Science Research Access Program",
  description:
    "GOALI (Global Online Access to Legal Information) provides access to academic legal information and research in law, social sciences, economics, and related disciplines for developing countries.",
  features: [
    "Access to legal and social science journals",
    "Covers law, politics, economics, and philosophy",
    "Supports education and justice sectors",
    "Part of the Research4Life partnership"
  ],
  subjects: [
    "Law",
    "Social Sciences",
    "Economics",
    "Political Science",
    "Accounting"
  ],
  logo: "Goali.PNG",
  url: "https://www.research4life.org/goali/",
  color: "from-purple-500 to-purple-600",
  stats: {
    journals: "2,000+",
    books: "N/A",
    contentType: "Legal"
  }
},

{
    id: 34,
    name: "ScienceDirect",
    category: "Accounting, Treasury Management, Marketing, Taxation, Demography, Cybersecurity, Software Engineering, Nutrition, Optometry, Physiotherapy",
    description:
        "Elsevier’s flagship platform for scientific, technical, and medical research — offering access to peer-reviewed journals, book chapters, and more across many disciplines.",
    features: ["Full-text journals & articles", "Book chapters & reference works", "Advanced search & filtering", "Research topic pages / insights"],
    subjects: ["Physical Sciences", "Engineering", "Life Sciences", "Health Sciences", "Social Sciences & Humanities"],
    logo: "sciD.PNG",
    url: "https://www.sciencedirect.com/",
    color: "from-green-500 to-green-600",
    stats: { articles: "18M+", journals: "4,000+", ebooks: "30,000+" }
}




]

const categories = [
  "All",
  "Accounting",
  "Treasury Management",
  "Criminology",
  "Marketing",
  "Taxation",
  "Sharia Law",
  "Demography",
  "Entrepreneurship and Innovation",
  "Physiotherapy",
  "Cybersecurity",
  "Software Engineering",
  "Nutrition",
  "Optometry",
  "Mechanical",
]

export default function EResourcesPage() {
    const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

 const filteredDatabases = databases.filter((db) => {
  const matchesCategory =
    selectedCategory === "All" ||
    db.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
    db.subjects.some((subject) =>
      subject.toLowerCase().includes(selectedCategory.toLowerCase())
    )

  const matchesSearch =
    db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.subjects.some((subject) =>
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return matchesCategory && matchesSearch
})



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 origin-left z-50"
        style={{ scaleX }}
      />
      

    <motion.header
      className="bg-green-900/90 backdrop-blur-md border-b border-emerald-500/50 sticky top-0 z-40 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo and University Name */}
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="/logo/udusok.png"
              alt="Logo"
              className="h-12 object-contain drop-shadow-lg"
            />
          </motion.div>

          <span className="text-lg font-semibold text-white">
            Usmanu Danfodiyo University, Sokoto
          </span>
        </Link>

        {/* Dropdown Button */}
        <div className="relative">
          <Button
            onClick={() => setOpen(!open)}
            className="text-xs sm:text-sm italic tracking-wide
                       bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg 
                       shadow-sm hover:bg-green-700 transition-colors w-fit"
          >
            Quick Links
          </Button>

          {/* Dropdown Menu */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-green-800 border border-emerald-500/50 
                         rounded-lg shadow-lg z-50"
            >
              {[
                { name: "University Website", link: "https://www.udusok.edu.ng/" },
                { name: "Library Website", link: "/" },
                { name: "IR", link: "https://ir.sternhost.com/" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >


          <h1 className="text-5xl md:text-7xl font-bold text-green-900 mb-6 tracking-tight">
            Electronic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
              Resources
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-green-700 max-w-4xl mx-auto leading-relaxed">
            Access over 10 million electronic volumes through our comprehensive collection of academic databases,
            journals, and digital libraries supporting research across all disciplines
          </p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">10M+</div>
              <div className="text-sm text-green-600">Electronic Volumes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15,000+</div>
              <div className="text-sm text-green-600">Academic Journals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">500+</div>
              <div className="text-sm text-green-600">Databases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-700">24/7</div>
              <div className="text-sm text-green-600">Access Available</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-200 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search databases, subjects, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-center">
              Showing <span className="font-semibold text-emerald-600">{filteredDatabases.length}</span> databases
              {selectedCategory !== "All" && (
                <span>
                  {" "}
                  in <span className="font-semibold">{selectedCategory}</span>
                </span>
              )}
              {searchTerm && (
                <span>
                  {" "}
                  matching "<span className="font-semibold text-green-700">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Databases Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {filteredDatabases.map((database, index) => (
            <DatabaseCard key={database.id} database={database} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredDatabases.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">No databases found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-emerald-600 hover:bg-green-700 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function DatabaseCard({ database, index }: { database: any; index: number }) {
  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Header with Logo and Category */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-800 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <img src={database.logo || "/placeholder.svg"} alt={`${database.name} logo`} className="h-12 w-auto" />
            </div>
            {/* <span className="bg-emerald-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {database.category}
            </span> */}
          </div>
          <h3 className="text-2xl font-bold mb-2 text-emerald-200">{database.name}</h3>
          <p className="text-white/90 leading-relaxed">{database.description}</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(database.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{value as string}</div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-emerald-600" />
            Key Features
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {database.features.map((feature: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-center text-sm text-gray-700"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-green-600" />
            Subject Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {database.subjects.map((subject: string, i: number) => (
              <motion.span
                key={i}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {subject}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Access Button */}
        <motion.a
          href={database.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-90 cursor-pointer text-white shadow-lg group">
            <span>Access Database</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.a>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400 transition-colors duration-300 pointer-events-none"></div>

      {/* Small logo at bottom right */}
      <img src="/logo/udusok.png" alt="udusok logo" className="absolute bottom-3 right-3 w-10 h-10 opacity-70" />
    </motion.div>
  )
}
