"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight, Check, Database, ExternalLink, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import Image from "next/image"
import Link from "next/link"

// Filter options; each resource lists which of these it supports in `disciplines`
const ALL_DISCIPLINES: string[] = [
  "Biblical Studies",
  "Christian Theology",
  "Church History",
  "Religious Studies",
  "African Christianity",
  "Missions",
  "Ethics",
  "Philosophy",
]

const databases = [
  {
    id: 1,
    name: "JSTOR",
    category: "Multidisciplinary",
    disciplines: ALL_DISCIPLINES,
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
    id: 21,
    name: "Research4Life",
    category: "Sharia Law, Accounting, Treasury Management, Marketing, Taxation, Demography, Entrepreneurship and Innovation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    disciplines: ["Ethics", "Philosophy"],
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
      disciplines: ALL_DISCIPLINES,
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
    id: 24,
    name: "DOAB",
    category: "Open Access Books",
    disciplines: ALL_DISCIPLINES,
    description:
      "The Directory of Open Access Books (DOAB) is a discovery service for open access, peer-reviewed books across a wide range of academic subjects.",
    features: ["Free access", "Peer-reviewed books", "Multidisciplinary", "Search and browse tools"],
    subjects: ["Humanities", "Social Sciences", "Science", "Technology", "Medicine"],
    logo: "doab.png",
    url: "https://doabooks.org/",
    color: "from-pink-500 to-pink-900",
    stats: { books: "60,000+", publishers: "600+", subjects: "30+" },
  },
  {
    id: 25,
    name: "DOAJ",
    category: "Accounting, Marketing, Entrepreneurship and Innovation",
    disciplines: ALL_DISCIPLINES,
    description:
      "The Directory of Open Access Journals (DOAJ) is an online index that provides access to high-quality, peer-reviewed open access journals from around the world.",
    features: ["Free access", "Peer-reviewed journals", "Multidisciplinary", "Advanced search tools"],
    subjects: ["Science", "Technology", "Medicine", "Social Sciences", "Humanities"],
    logo: "DOAJ.png",
    url: "https://doaj.org/",
    color: "from-purple-600 to-pink-900",
    stats: { journals: "20,000+", countries: "130+", disciplines: "15+" },
  },
  {
    id: 20,
    name: "OAPEN",
    category: "Humanities & Social Sciences",
    disciplines: ALL_DISCIPLINES,
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
    id: 35,
    name: "CORE",
    category: "Multidisciplinary, Open Access Research",
    disciplines: ALL_DISCIPLINES,
    description:
      "The world's largest aggregator of open access research papers, harvesting full texts from thousands of institutional and subject repositories and journals worldwide.",
    features: ["Full-text open access papers", "Repository aggregation", "Advanced search", "Free API & datasets"],
    subjects: ["Theology & Religion", "Humanities", "Social Sciences", "Sciences", "Education"],
    logo: "core.png",
    url: "https://core.ac.uk/",
    color: "from-blue-500 to-indigo-600",
    stats: { papers: "300M+", fullTexts: "37M+", providers: "14,000+" },
  },
  {
    id: 36,
    name: "CCEL",
    category: "Theology & Religious Studies",
    disciplines: ["Biblical Studies", "Christian Theology", "Church History", "Missions", "Ethics", "Philosophy"],
    description:
      "The Christian Classics Ethereal Library offers free access to hundreds of classic Christian books, including works of the Church Fathers, reformers, theologians and devotional writers.",
    features: ["Classic Christian texts", "Church Fathers collection", "Multiple download formats", "Bible & commentary tools"],
    subjects: ["Theology", "Church History", "Biblical Studies", "Patristics", "Devotional Literature"],
    logo: "ccel.png",
    url: "https://www.ccel.org/",
    color: "from-amber-600 to-amber-800",
    stats: { books: "1,000+", authors: "500+", access: "Free" },
  },
  {
    id: 4,
    name: "HathiTrust Digital Library",
    category: "Humanities & Social Sciences",
    disciplines: ALL_DISCIPLINES,
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
    id: 37,
    name: "DTL Open Access",
    category: "Theology & Religious Studies",
    disciplines: ALL_DISCIPLINES,
    description:
      "The Digital Theological Library's open access collection, a curated guide to freely available scholarly resources in religion and theology, including e-books, journals and archives.",
    features: ["Curated open access content", "Theology-focused", "E-books & journals", "Subject research guides"],
    subjects: ["Theology", "Religious Studies", "Biblical Studies", "Church History", "Ministry"],
    logo: "dtl.png",
    url: "https://libguides.thedtl.org/oadtl",
    color: "from-indigo-600 to-purple-700",
    stats: { resources: "Thousands", focus: "Religion", access: "Free" },
  },
  {
    id: 38,
    name: "BASE",
    category: "Multidisciplinary, Academic Search Engine",
    disciplines: ALL_DISCIPLINES,
    description:
      "Bielefeld Academic Search Engine (BASE) is one of the world's largest search engines for academic web resources, indexing open access documents from thousands of content providers.",
    features: ["Open access filtering", "Advanced search", "Metadata from repositories", "Multilingual records"],
    subjects: ["Theology & Religion", "Humanities", "Social Sciences", "Sciences", "Education"],
    logo: "base.png",
    url: "https://www.base-search.net/",
    color: "from-sky-600 to-blue-800",
    stats: { documents: "400M+", providers: "11,000+", openAccess: "60%+" },
  },
  {
    id: 39,
    name: "Internet Archive",
    category: "Multidisciplinary, Digital Library",
    disciplines: ALL_DISCIPLINES,
    description:
      "A non-profit digital library offering free access to millions of books, texts, audio recordings, videos and archived web pages, including many historical religious and theological works.",
    features: ["Free book lending", "Historical texts", "Wayback Machine", "Audio & video collections"],
    subjects: ["Religion", "History", "Literature", "Humanities", "General Reference"],
    logo: "archive.png",
    url: "https://archive.org/",
    color: "from-gray-600 to-gray-800",
    stats: { books: "40M+", webPages: "900B+", media: "15M+" },
  },
  // ---- Remaining resources ----
  {
    id: 2,
    name: "Science.gov",
    category: "Multidisciplinary, Mechanical Engineering",
    disciplines: [],
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
    disciplines: [],
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
    id: 5,
    name: "arXiv",
    category: "Mechanical Engineering, Software Engineering, Cybersecurity",
    disciplines: [],
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
    disciplines: [],
    description:
      "A centralized gateway to statistical databases compiled by the United Nations and its agencies, covering demographics, economics, health, education, environment, and sustainable development worldwide.",
    features: ["International datasets", "Country profiles", "Time series data", "Visualizations", "Free access"],
    subjects: ["Demographics", "Economics", "Health", "Education", "Environment", "Development"],
    logo: "UNdata.png",
    url: "https://data.un.org",
    color: "from-indigo-700 to-blue-900",
    stats: { datasets: "60+", countries: "200+", indicators: "1,000+" },
  },
  {
    id: 8,
    name: "SSRN",
    category: "Sharia Law, Accounting, Treasury Management, Marketing, Taxation, Cybersecurity, Software Engineering, Nutrition, Optometry, Mechanical Engineering",
    disciplines: ["Religious Studies", "Ethics", "Philosophy"],
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
    disciplines: ALL_DISCIPLINES,
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
    disciplines: ["Ethics"],
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
    disciplines: [],
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
    disciplines: [],
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
    disciplines: ALL_DISCIPLINES,
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
    disciplines: [],
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
    disciplines: ["Religious Studies", "Ethics", "Philosophy"],
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
    disciplines: ["Biblical Studies", "Christian Theology", "Church History", "Religious Studies", "Ethics", "Philosophy"],
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
    disciplines: ["Church History"],
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
    disciplines: [],
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
    disciplines: [],
    description: "Preprint server for health sciences, providing early access to clinical and medical research papers.",
    features: ["Medical preprints", "Open access", "DOIs", "Updated versions"],
    subjects: ["Medicine", "Genetics", "Neuroscience", "Ecology", "Bioinformatics"],
    logo: "medR.png",
    url: "https://www.medrxiv.org",
    color: "from-red-500 to-pink-800",
    stats: { preprints: "40,000+", categories: "20+", updates: "Daily" },
  },
  {
      id: 23,
      name: "EBSCO",
      category: "Multidisciplinary",
      disciplines: ALL_DISCIPLINES,
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
    id: 26,
    name: "Dietetics Academy",
    category: "Nutrition / Dietetics Resource",
    disciplines: [],
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
    disciplines: [],
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
    disciplines: [],
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
    disciplines: ["Ethics"],
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
    disciplines: [],
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
    disciplines: [],
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
    disciplines: [],
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
    disciplines: ["Ethics", "Philosophy"],
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
      disciplines: ["Religious Studies", "Ethics", "Philosophy"],
      description:
          "Elsevier’s flagship platform for scientific, technical, and medical research — offering access to peer-reviewed journals, book chapters, and more across many disciplines.",
      features: ["Full-text journals & articles", "Book chapters & reference works", "Advanced search & filtering", "Research topic pages / insights"],
      subjects: ["Physical Sciences", "Engineering", "Life Sciences", "Health Sciences", "Social Sciences & Humanities"],
      logo: "sciD.PNG",
      url: "https://www.sciencedirect.com/",
      color: "from-green-500 to-green-600",
      stats: { articles: "18M+", journals: "4,000+", ebooks: "30,000+" }
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
]

const categories = ["All", ...ALL_DISCIPLINES]

type Resource = (typeof databases)[number]

const UNIVERSITY_WEBSITE = "https://www.immanuelcollege.edu.ng/"

const heroStats = [
  { value: "10M+", label: "Electronic volumes" },
  { value: "15,000+", label: "Academic journals" },
  { value: "500+", label: "Databases" },
  { value: "24/7", label: "Access available" },
]

// "subPerMonth" -> "sub per month"
const humanize = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()

export default function EResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const filteredDatabases = databases.filter((db) => {
    const term = searchTerm.toLowerCase()

    const matchesCategory = selectedCategory === "All" || (db.disciplines as string[]).includes(selectedCategory)

    const matchesSearch =
      db.name.toLowerCase().includes(term) ||
      db.description.toLowerCase().includes(term) ||
      db.subjects.some((subject) => subject.toLowerCase().includes(term))

    return matchesCategory && matchesSearch
  })

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold to-gold-300 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 min-w-0">
            <Image
              src="/logo/logo.png"
              alt="Immanuel College of Theology, Ibadan"
              width={867}
              height={174}
              priority
              className="h-9 sm:h-11 w-auto object-contain shrink-0"
            />
            <span className="hidden md:block h-8 w-px bg-white/20" aria-hidden />
            <span className="hidden md:block text-xs font-medium uppercase tracking-[0.18em] text-gold-300 whitespace-nowrap">
              Library · E-Resources
            </span>
          </Link>

          <a
            href={UNIVERSITY_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gold-100 transition-colors hover:bg-gold hover:text-navy hover:border-gold"
          >
            College Website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Campus photo, tinted navy so the text stays readable and the palette holds */}
        <Image
          src="/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-navy/60" aria-hidden />
        <div className="absolute inset-0 bg-dots" aria-hidden />
        <div className="absolute -top-40 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-gold/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-navy-500/40 blur-3xl" aria-hidden />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-24 md:pb-14">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Digital Collection
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Electronic <span className="text-gold">Resources</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-navy-100">
              Access over 10 million electronic volumes through our collection of academic databases, journals and
              digital libraries supporting research across all disciplines.
            </p>

            {/* Search */}
            <div className="mt-10 mx-auto max-w-2xl">
              <label htmlFor="resource-search" className="sr-only">
                Search databases
              </label>
              <div className="flex items-center gap-3 rounded-2xl bg-white p-2 pl-5 shadow-lift ring-1 ring-white/10 focus-within:ring-4 focus-within:ring-gold/40 transition-shadow">
                <Search className="h-5 w-5 shrink-0 text-navy-300" />
                <input
                  id="resource-search"
                  type="text"
                  placeholder="Search databases, subjects or keywords…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full min-w-0 bg-transparent text-base text-navy placeholder:text-navy-300 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-navy-400 hover:bg-surface hover:text-navy cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-navy/80 px-4 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-semibold text-gold">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-navy-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gold hairline between hero and content */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">Browse databases</h2>
              <p className="text-sm text-muted-foreground">Filter by discipline or search above</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-navy">{filteredDatabases.length}</span>{" "}
              {filteredDatabases.length === 1 ? "database" : "databases"}
              {selectedCategory !== "All" && (
                <>
                  {" "}
                  in <span className="font-semibold text-navy">{selectedCategory}</span>
                </>
              )}
              {searchTerm && (
                <>
                  {" "}
                  matching <span className="font-semibold text-gold-700">&ldquo;{searchTerm}&rdquo;</span>
                </>
              )}
            </p>
          </div>

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap py-1">
            {categories.map((category) => {
              const active = category === selectedCategory
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-navy text-white shadow-soft ring-1 ring-navy"
                      : "bg-white text-navy-700 ring-1 ring-border hover:ring-gold hover:text-navy"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDatabases.map((database, index) => (
            <DatabaseCard key={database.id} database={database} index={index} />
          ))}
        </div>

        {/* No results */}
        {filteredDatabases.length === 0 && (
          <motion.div
            className="mx-auto max-w-md rounded-2xl bg-white py-16 px-6 text-center shadow-soft ring-1 ring-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-navy-50">
              <Database className="h-7 w-7 text-navy-400" />
            </div>
            <h3 className="text-xl font-semibold text-navy mb-2">No databases found</h3>
            <p className="text-muted-foreground mb-6">Try a different search term or discipline.</p>
            <Button onClick={clearFilters} className="rounded-xl bg-navy px-5 hover:bg-navy-700 text-white">
              Clear filters
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

// Logo tile that shows a shimmer until the image has loaded (or failed)
function CardLogo({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // A cached image can finish loading before React attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface p-2 ring-1 ring-border">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`relative max-h-full max-w-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

function DatabaseCard({ database, index }: { database: Resource; index: number }) {
  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-gold/50"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-navy via-navy-600 to-gold" />

      <div className="flex flex-1 flex-col p-6">
        {/* Identity */}
        <div className="flex items-center gap-4">
          <CardLogo src={`/${database.logo}`} alt={`${database.name} logo`} />
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug text-navy">{database.name}</h3>
            <p className="mt-0.5 truncate text-xs font-semibold uppercase tracking-wider text-gold-700">
              {database.subjects.slice(0, 2).join(" · ")}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">{database.description}</p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-xl bg-surface py-3">
          {Object.entries(database.stats).map(([key, value]) => (
            <div key={key} className="px-2 text-center min-w-0">
              <div className="text-sm sm:text-base font-semibold text-navy break-words">{String(value)}</div>
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {humanize(key)}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-5">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-400">Key features</h4>
          <ul className="space-y-1.5">
            {database.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-navy-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Subjects */}
        <div className="mt-5">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-400">Subject areas</h4>
          <div className="flex flex-wrap gap-1.5">
            {database.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700 ring-1 ring-navy-100"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6">
          <a
            href={database.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            Access database
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
