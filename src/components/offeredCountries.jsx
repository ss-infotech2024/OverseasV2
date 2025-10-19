
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export const countries = [
  {
    name: "United States",
    flag: "https://flagcdn.com/us.svg",
    capital: "Washington, D.C.",
    language: "English",
    currency: "USD ($)",
    details: "Home to world-renowned universities offering diverse programs and excellent research opportunities with state-of-the-art facilities and global recognition.",
    rank: "Top Ranked Globally",
    programs: "5000+ Programs",
    topRanked: "25",
    students: "1.2M+",
    programsCount: "5000+",
    universities: [
      {
        name: "Harvard University",
        rank: "3",
        location: "Cambridge, MA",
        type: "Private Ivy League",
        acceptanceRate: "5%",
        fees: "$55,000",
        internationalStudents: "22%",
        scholarships: "Generous Available",
        founded: "1636",
        totalStudents: "22,000",
        campus: "Urban",
        language: "English",
        motto: "Veritas (Truth)",
        programs: [
          "Computer Science",
          "Business Administration (MBA)",
          "Law (JD)",
          "Medicine (MD)",
          "Engineering & Applied Sciences",
          "Political Science",
          "Economics",
          "Psychology"
        ],
        detailedDescription: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States and among the most prestigious in the world.",
        popularPrograms: "Law, Business, Medicine, Computer Science",
        employmentRate: "95%",
        studentFacultyRatio: "7:1",
        notableAlumni: "Barack Obama, Mark Zuckerberg, Bill Gates"
      },
      {
        name: "Stanford University",
        rank: "5",
        location: "Stanford, CA",
        type: "Private Research",
        acceptanceRate: "4%",
        fees: "$58,000",
        internationalStudents: "24%",
        scholarships: "Need-based",
        founded: "1885",
        totalStudents: "17,000",
        campus: "Suburban",
        language: "English",
        motto: "Die Luft der Freiheit weht (The wind of freedom blows)",
        programs: [
          "Computer Science",
          "Electrical Engineering",
          "Business Management",
          "Mechanical Engineering",
          "Bioengineering",
          "Design Thinking",
          "Artificial Intelligence"
        ],
        detailedDescription: "Stanford University is a private research university known for its entrepreneurial character and proximity to Silicon Valley.",
        popularPrograms: "Engineering, Computer Science, Business",
        employmentRate: "94%",
        studentFacultyRatio: "5:1",
        notableAlumni: "Larry Page, Sergey Brin, Elon Musk"
      },
      {
        name: "MIT",
        rank: "1",
        location: "Cambridge, MA",
        type: "Private Research",
        acceptanceRate: "7%",
        fees: "$59,000",
        internationalStudents: "29%",
        scholarships: "Merit-based",
        founded: "1861",
        totalStudents: "11,000",
        campus: "Urban",
        language: "English",
        motto: "Mens et Manus (Mind and Hand)",
        programs: [
          "Computer Science & Engineering",
          "Mechanical Engineering",
          "Physics",
          "Mathematics",
          "Architecture",
          "Business Analytics",
          "Robotics"
        ],
        detailedDescription: "The Massachusetts Institute of Technology is a private land-grant research university known for its strong emphasis on scientific and technological research.",
        popularPrograms: "Engineering, Computer Science, Physics",
        employmentRate: "96%",
        studentFacultyRatio: "3:1",
        notableAlumni: "Buzz Aldrin, Kofi Annan, Richard Feynman"
      },
      {
        name: "California Institute of Technology",
        rank: "6",
        location: "Pasadena, CA",
        type: "Private Research",
        acceptanceRate: "6%",
        fees: "$60,000",
        internationalStudents: "33%",
        scholarships: "Available",
        founded: "1891",
        totalStudents: "2,200",
        campus: "Suburban",
        language: "English",
        motto: "The truth shall make you free",
        programs: [
          "Physics",
          "Chemistry",
          "Biology",
          "Engineering",
          "Mathematics",
          "Astronomy",
          "Geological Sciences"
        ],
        detailedDescription: "Caltech is a world-renowned science and engineering institute that marshals some of the world's brightest minds and most innovative tools.",
        popularPrograms: "Physics, Engineering, Chemistry",
        employmentRate: "93%",
        studentFacultyRatio: "3:1",
        notableAlumni: "Gordon Moore, Frank Capra, Harrison Schmitt"
      }
    ]
  },
  {
    name: "United Kingdom",
    flag: "https://flagcdn.com/gb.svg",
    capital: "London",
    language: "English",
    currency: "GBP (£)",
    details: "Renowned for its historic universities and rigorous academic standards, the UK offers world-class education with strong international connections and research opportunities.",
    rank: "Top 10 Globally",
    programs: "3000+ Programs",
    topRanked: "18",
    students: "600K+",
    programsCount: "3500+",
    universities: [
      {
        name: "University of Oxford",
        rank: "2",
        location: "Oxford, England",
        type: "Public Research",
        acceptanceRate: "17%",
        fees: "£32,000",
        internationalStudents: "43%",
        scholarships: "Rhodes & Others",
        founded: "1096",
        totalStudents: "24,000",
        campus: "Collegiate",
        language: "English",
        motto: "Dominus illuminatio mea (The Lord is my light)",
        programs: [
          "PPE (Philosophy, Politics, Economics)",
          "Medicine",
          "Law",
          "Computer Science",
          "History",
          "English Literature",
          "Mathematics"
        ],
        detailedDescription: "The University of Oxford is a collegiate research university in Oxford, England, the oldest university in the English-speaking world.",
        popularPrograms: "PPE, Law, Medicine, Humanities",
        employmentRate: "92%",
        studentFacultyRatio: "11:1",
        notableAlumni: "Stephen Hawking, Margaret Thatcher, Bill Clinton"
      },
      {
        name: "University of Cambridge",
        rank: "4",
        location: "Cambridge, England",
        type: "Public Research",
        acceptanceRate: "21%",
        fees: "£33,000",
        internationalStudents: "37%",
        scholarships: "Gates Cambridge",
        founded: "1209",
        totalStudents: "20,000",
        campus: "Collegiate",
        language: "English",
        motto: "Hinc lucem et pocula sacra (From here, light and sacred draughts)",
        programs: [
          "Natural Sciences",
          "Engineering",
          "Mathematics",
          "Medicine",
          "Computer Science",
          "Economics",
          "Architecture"
        ],
        detailedDescription: "The University of Cambridge is a collegiate research university known for its exceptional teaching and research across sciences and humanities.",
        popularPrograms: "Natural Sciences, Engineering, Mathematics",
        employmentRate: "94%",
        studentFacultyRatio: "11:1",
        notableAlumni: "Isaac Newton, Charles Darwin, Stephen Fry"
      },
      {
        name: "Imperial College London",
        rank: "8",
        location: "London, England",
        type: "Public Research",
        acceptanceRate: "14%",
        fees: "£35,000",
        internationalStudents: "60%",
        scholarships: "President's Scholarships",
        founded: "1907",
        totalStudents: "19,000",
        campus: "Urban",
        language: "English",
        motto: "Scientia imperii decus et tutamen",
        programs: [
          "Mechanical Engineering",
          "Medicine",
          "Computing",
          "Business",
          "Aeronautics",
          "Bioengineering",
          "Chemistry"
        ],
        detailedDescription: "Imperial College London is a world-class university with a mission to benefit society through excellence in science, engineering, medicine and business.",
        popularPrograms: "Engineering, Medicine, Business",
        employmentRate: "95%",
        studentFacultyRatio: "11:1",
        notableAlumni: "Alexander Fleming, H.G. Wells, Brian May"
      },
      {
        name: "London School of Economics",
        rank: "45",
        location: "London, England",
        type: "Public Research",
        acceptanceRate: "9%",
        fees: "£27,000",
        internationalStudents: "70%",
        scholarships: "Available",
        founded: "1895",
        totalStudents: "11,000",
        campus: "Urban",
        language: "English",
        motto: "Rerum cognoscere causas (To understand the causes of things)",
        programs: [
          "Economics",
          "International Relations",
          "Law",
          "Management",
          "Finance",
          "Political Science",
          "Sociology"
        ],
        detailedDescription: "LSE is a world-leading social science university specializing in a wide range of social science disciplines.",
        popularPrograms: "Economics, Politics, Law",
        employmentRate: "91%",
        studentFacultyRatio: "12:1",
        notableAlumni: "John F. Kennedy, George Soros, Mick Jagger"
      }
    ]
  },
  {
    name: "Canada",
    flag: "https://flagcdn.com/ca.svg",
    capital: "Ottawa",
    language: "English, French",
    currency: "CAD ($)",
    details: "Canada offers high-quality education with affordable tuition fees and excellent post-study work opportunities in a multicultural and welcoming environment.",
    rank: "Top 15 Globally",
    programs: "2500+ Programs",
    topRanked: "12",
    students: "450K+",
    programsCount: "2800+",
    universities: [
      {
        name: "University of Toronto",
        rank: "21",
        location: "Toronto, Ontario",
        type: "Public Research",
        acceptanceRate: "43%",
        fees: "CA$45,000",
        internationalStudents: "25%",
        scholarships: "Lester B. Pearson",
        founded: "1827",
        totalStudents: "90,000",
        campus: "Urban",
        language: "English",
        motto: "Velut arbor ævo (As a tree through the ages)",
        programs: [
          "Computer Science",
          "Engineering",
          "Medicine",
          "Business",
          "Humanities",
          "Social Sciences",
          "Life Sciences"
        ],
        detailedDescription: "The University of Toronto is a global leader in research and teaching, consistently ranked among the top 20 universities in the world.",
        popularPrograms: "Computer Science, Engineering, Medicine",
        employmentRate: "89%",
        studentFacultyRatio: "25:1",
        notableAlumni: "Lester B. Pearson, Margaret Atwood, Frederick Banting"
      },
      {
        name: "University of British Columbia",
        rank: "34",
        location: "Vancouver, British Columbia",
        type: "Public Research",
        acceptanceRate: "52%",
        fees: "CA$42,000",
        internationalStudents: "30%",
        scholarships: "International Scholars",
        founded: "1908",
        totalStudents: "66,000",
        campus: "Urban & Suburban",
        language: "English",
        motto: "Tuum est (It is yours)",
        programs: [
          "Business",
          "Engineering",
          "Forestry",
          "Computer Science",
          "Marine Biology",
          "International Relations",
          "Environmental Science"
        ],
        detailedDescription: "UBC is a global centre for research and teaching, consistently ranked among the top 20 public universities in the world.",
        popularPrograms: "Business, Engineering, Environmental Science",
        employmentRate: "90%",
        studentFacultyRatio: "18:1",
        notableAlumni: "Justin Trudeau, Michael Smith, Robert Mundell"
      },
      {
        name: "McGill University",
        rank: "30",
        location: "Montreal, Quebec",
        type: "Public Research",
        acceptanceRate: "46%",
        fees: "CA$29,000",
        internationalStudents: "32%",
        scholarships: "Entrance Scholarships",
        founded: "1821",
        totalStudents: "40,000",
        campus: "Urban",
        language: "English",
        motto: "Grandescunt aucta labore (By work, all things increase and grow)",
        programs: [
          "Medicine",
          "Law",
          "Engineering",
          "Management",
          "Arts",
          "Science",
          "Music"
        ],
        detailedDescription: "McGill University is one of Canada's best-known institutions of higher learning and one of the leading universities in the world.",
        popularPrograms: "Medicine, Law, Engineering",
        employmentRate: "92%",
        studentFacultyRatio: "16:1",
        notableAlumni: "William Shatner, Leonard Cohen, John Abbott"
      }
    ]
  },
  {
    name: "Australia",
    flag: "https://flagcdn.com/au.svg",
    capital: "Canberra",
    language: "English",
    currency: "AUD ($)",
    details: "Australia offers world-class education with excellent research facilities and a high quality of life, making it a popular destination for international students.",
    rank: "Top 20 Globally",
    programs: "1800+ Programs",
    topRanked: "15",
    students: "700K+",
    programsCount: "2000+",
    universities: [
      {
        name: "University of Melbourne",
        rank: "33",
        location: "Melbourne, Victoria",
        type: "Public Research",
        acceptanceRate: "70%",
        fees: "A$40,000",
        internationalStudents: "42%",
        scholarships: "Melbourne Scholarships",
        founded: "1853",
        totalStudents: "52,000",
        campus: "Urban",
        language: "English",
        motto: "Postera crescam laude",
        programs: [
          "Business",
          "Medicine",
          "Law",
          "Engineering",
          "Arts",
          "Science",
          "Architecture"
        ],
        detailedDescription: "The University of Melbourne is a public research university located in Melbourne, Australia, the oldest in Victoria.",
        popularPrograms: "Business, Medicine, Law",
        employmentRate: "88%",
        studentFacultyRatio: "12:1",
        notableAlumni: "Julia Gillard, Peter Doherty, Germaine Greer"
      },
      {
        name: "Australian National University",
        rank: "38",
        location: "Canberra, ACT",
        type: "Public Research",
        acceptanceRate: "35%",
        fees: "A$36,000",
        internationalStudents: "37%",
        scholarships: "ANU Chancellor's",
        founded: "1946",
        totalStudents: "20,000",
        campus: "Urban",
        language: "English",
        motto: "Naturam primum cognoscere rerum",
        programs: [
          "Political Science",
          "International Relations",
          "Science",
          "Engineering",
          "Business",
          "Law",
          "Arts"
        ],
        detailedDescription: "ANU is a world-leading university in Australia's capital city, Canberra.",
        popularPrograms: "Political Science, International Relations, Science",
        employmentRate: "90%",
        studentFacultyRatio: "15:1",
        notableAlumni: "Kevin Rudd, Bob Hawke, Brian Schmidt"
      },
      {
        name: "University of Sydney",
        rank: "41",
        location: "Sydney, New South Wales",
        type: "Public Research",
        acceptanceRate: "30%",
        fees: "A$42,000",
        internationalStudents: "43%",
        scholarships: "Sydney Scholars",
        founded: "1850",
        totalStudents: "61,000",
        campus: "Urban",
        language: "English",
        motto: "Sidere mens eadem mutato",
        programs: [
          "Medicine",
          "Law",
          "Engineering",
          "Business",
          "Arts & Social Sciences",
          "Science",
          "Architecture"
        ],
        detailedDescription: "The University of Sydney is a public research university in Sydney, Australia, the first university in Australia.",
        popularPrograms: "Medicine, Law, Engineering",
        employmentRate: "87%",
        studentFacultyRatio: "14:1",
        notableAlumni: "Malcolm Turnbull, John H. Howard, Dame Marie Bashir"
      }
    ]
  },
  {
    name: "Germany",
    flag: "https://flagcdn.com/de.svg",
    capital: "Berlin",
    language: "German",
    currency: "EUR (€)",
    details: "Germany offers tuition-free or low-cost high-quality education at public universities with strong emphasis on research and engineering programs.",
    rank: "Top 25 Globally",
    programs: "2200+ Programs",
    topRanked: "22",
    students: "400K+",
    programsCount: "2400+",
    universities: [
      {
        name: "Technical University of Munich",
        rank: "37",
        location: "Munich, Bavaria",
        type: "Public Research",
        acceptanceRate: "8%",
        fees: "€0-€3,000",
        internationalStudents: "34%",
        scholarships: "DAAD, TUM Scholarships",
        founded: "1868",
        totalStudents: "42,000",
        campus: "Urban",
        language: "German, English",
        motto: "The Entrepreneurial University",
        programs: [
          "Mechanical Engineering",
          "Computer Science",
          "Electrical Engineering",
          "Physics",
          "Chemistry",
          "Mathematics",
          "Architecture"
        ],
        detailedDescription: "The Technical University of Munich is a research university with a focus on engineering, technology, medicine, and the applied and natural sciences.",
        popularPrograms: "Engineering, Computer Science, Natural Sciences",
        employmentRate: "93%",
        studentFacultyRatio: "20:1",
        notableAlumni: "Rudolf Diesel, Carl von Linde, Ernst Otto Fischer"
      },
      {
        name: "Ludwig Maximilian University of Munich",
        rank: "59",
        location: "Munich, Bavaria",
        type: "Public Research",
        acceptanceRate: "10%",
        fees: "€0-€3,000",
        internationalStudents: "17%",
        scholarships: "LMU Scholarships",
        founded: "1472",
        totalStudents: "51,000",
        campus: "Urban",
        language: "German, English",
        motto: "Universitas Ludovico-Maximilianea Monacensis",
        programs: [
          "Medicine",
          "Physics",
          "Business",
          "Law",
          "Psychology",
          "Biology",
          "Philosophy"
        ],
        detailedDescription: "LMU Munich is a leading research university in Europe with more than 500 years of tradition.",
        popularPrograms: "Medicine, Physics, Business",
        employmentRate: "89%",
        studentFacultyRatio: "22:1",
        notableAlumni: "Max Planck, Werner Heisenberg, Thomas Mann"
      },
      {
        name: "Heidelberg University",
        rank: "65",
        location: "Heidelberg, Baden-Württemberg",
        type: "Public Research",
        acceptanceRate: "16%",
        fees: "€0-€3,000",
        internationalStudents: "20%",
        scholarships: "Germany Scholarships",
        founded: "1386",
        totalStudents: "30,000",
        campus: "Urban",
        language: "German, English",
        motto: "Semper apertus (Always open)",
        programs: [
          "Medicine",
          "Law",
          "Physics",
          "Chemistry",
          "Biology",
          "Humanities",
          "Social Sciences"
        ],
        detailedDescription: "Heidelberg University is a public research university in Heidelberg, Germany, the oldest university in Germany.",
        popularPrograms: "Medicine, Law, Natural Sciences",
        employmentRate: "91%",
        studentFacultyRatio: "18:1",
        notableAlumni: "Hannah Arendt, Max Weber, Robert Bunsen"
      }
    ]
  },
  {
    name: "Japan",
    flag: "https://flagcdn.com/jp.svg",
    capital: "Tokyo",
    language: "Japanese",
    currency: "JPY (¥)",
    details: "Japan combines cutting-edge technology with rich cultural heritage, offering unique educational experiences in advanced research and innovation.",
    rank: "Top 30 Globally",
    programs: "1500+ Programs",
    topRanked: "10",
    students: "300K+",
    programsCount: "1800+",
    universities: [
      {
        name: "University of Tokyo",
        rank: "28",
        location: "Tokyo",
        type: "Public Research",
        acceptanceRate: "21%",
        fees: "¥535,800",
        internationalStudents: "12%",
        scholarships: "MEXT Scholarships",
        founded: "1877",
        totalStudents: "28,000",
        campus: "Urban",
        language: "Japanese, English",
        motto: "None officially",
        programs: [
          "Engineering",
          "Medicine",
          "Law",
          "Science",
          "Agriculture",
          "Economics",
          "Arts and Sciences"
        ],
        detailedDescription: "The University of Tokyo is a public research university located in Tokyo, Japan, considered the most selective and prestigious university in Japan.",
        popularPrograms: "Engineering, Medicine, Law",
        employmentRate: "95%",
        studentFacultyRatio: "9:1",
        notableAlumni: "Yukio Hatoyama, Kenzaburō Ōe, Leo Esaki"
      },
      {
        name: "Kyoto University",
        rank: "46",
        location: "Kyoto",
        type: "Public Research",
        acceptanceRate: "30%",
        fees: "¥535,800",
        internationalStudents: "9%",
        scholarships: "MEXT, Kyoto University",
        founded: "1897",
        totalStudents: "22,000",
        campus: "Urban",
        language: "Japanese, English",
        motto: "Freedom of academic culture",
        programs: [
          "Engineering",
          "Medicine",
          "Science",
          "Law",
          "Economics",
          "Agriculture",
          "Humanities"
        ],
        detailedDescription: "Kyoto University is a national university in Kyoto, Japan, one of the top universities in Asia.",
        popularPrograms: "Engineering, Science, Medicine",
        employmentRate: "92%",
        studentFacultyRatio: "8:1",
        notableAlumni: "Hideki Yukawa, Shinichiro Tomonaga, Tasuku Honjo"
      },
      {
        name: "Tokyo Institute of Technology",
        rank: "55",
        location: "Tokyo",
        type: "Public Research",
        acceptanceRate: "15%",
        fees: "¥535,800",
        internationalStudents: "16%",
        scholarships: "MEXT, Tokyo Tech",
        founded: "1881",
        totalStudents: "10,000",
        campus: "Urban",
        language: "Japanese, English",
        motto: "Jikyu gakujutsu wo tsurugi to nashi",
        programs: [
          "Mechanical Engineering",
          "Electrical Engineering",
          "Computer Science",
          "Chemistry",
          "Physics",
          "Mathematics",
          "Bioscience"
        ],
        detailedDescription: "Tokyo Institute of Technology is a national research university located in Tokyo, Japan, dedicated to science and technology.",
        popularPrograms: "Engineering, Computer Science, Natural Sciences",
        employmentRate: "96%",
        studentFacultyRatio: "7:1",
        notableAlumni: "Hideki Shirakawa, Noritaka Tatehana, Takashi Kubota"
      }
    ]
  }
];

const OfferedCountriesSection = () => {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      const marquee = marqueeRef.current;
      if (!marquee) return;

      const totalWidth = marquee.scrollWidth / 2;

      tweenRef.current = gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 40,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => {
              const modX = parseFloat(x) % totalWidth;
              return `${modX}px`;
            },
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0.3,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const scrollingCountries = [...countries, ...countries];

  return (
    <section 
      ref={sectionRef}
      className="py-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50"
    >
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-purple-900">
          Countries We Offer
        </h1>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed">
          We provide comprehensive educational guidance for students across these premier destinations and more.
        </p>
      </div>

      <div
        className="relative w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-500 py-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div ref={marqueeRef} className="flex w-max gap-4 sm:gap-6 px-4">
          {scrollingCountries.map((country, i) => (
            <Link
              key={i}
              to={`/universities/${encodeURIComponent(country.name)}`}
              className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center p-5 sm:p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 min-w-[240px] sm:min-w-[280px] lg:min-w-[320px] border border-gray-100 cursor-pointer group hover:border-purple-300">
                <div className="flex items-center gap-3 w-full mb-4">
                  <div className="w-14 h-10 sm:w-16 sm:h-12 overflow-hidden rounded-lg bg-white shadow-sm group-hover:shadow-purple-200 transition-all duration-300">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 group-hover:text-purple-700 transition-colors duration-300 truncate">
                      {country.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {country.capital}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full mb-4">
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-purple-600">{country.universities.length}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Unis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-blue-600">{country.topRanked}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Top 100</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-green-600">{country.students}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Students</div>
                  </div>
                </div>

                <div className="w-full mb-4">
                  <p className="text-sm font-semibold text-purple-800 mb-2 text-left">Top Universities:</p>
                  <div className="space-y-2">
                    {country.universities.slice(0, 2).map((uni, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                        <span className="truncate" title={uni.name}>
                          {uni.name}
                        </span>
                      </div>
                    ))}
                    {country.universities.length > 2 && (
                      <div className="text-sm text-purple-600 font-medium mt-2 text-left">
                        +{country.universities.length - 2} more universities
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform group-hover:translate-y-[-1px] shadow-sm hover:shadow-md">
                  Explore Universities
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center max-w-3xl">
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Can't find your preferred destination? We work with hundreds of universities across 30+ countries worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-700 border border-purple-300 py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base">
            Contact Our Advisors
          </button>
          <button className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base">
            View All Countries
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfferedCountriesSection;
