import ProjectCard from "@/app/(portfolio)/projects/components/project-card";

const personalProjects = [
  {
    id: "1",
    year: "2024",
    name: "Uno",
    description: "A multiplayer Uno game built with React and Socket.io.",
    url: "https://jen-games.onrender.com",
  },
  {
    id: "2",
    year: "2023",
    name: "Bingo",
    description: "A fun bingo game to play with friends.",
    url: "https://bingo-app-k6et.onrender.com/",
  },
  {
    id: "3",
    year: "2022",
    name: "Type Racer",
    description:
      "A multiplayer typing speed test game to compete with friends.",
  },
  {
    id: "4",
    year: "2020",
    name: "Quizy",
    description:
      "Quizy is a platform/application for playing quiz in a group. User can create categories, questions and quizzes. Play quiz in a group. Pass question and have fun with audience.",
  },
  {
    id: "5",
    year: "2020",
    name: "Genshin fan web",
    description:
      "Website for displaying characters and weapons from the game Genshin impact. List of characters and weapons with details.",
    url: "https://genshinfanweb.netlify.app/characters",
  },
  {
    id: "7",
    year: "2020",
    name: "Covid 19 tracker",
    description:
      "All the data related to covid 19 cases in Nepal. Contains cases, hospitals and frequently asked questions related to covid.",
    url: "https://covid-19jdata.netlify.app/",
  },
  {
    id: "6",
    year: "2020",
    name: "Thoplo",
    description: "Website for drawing and sharing pixel art.",
  },
  {
    id: "8",
    year: "2019",
    name: "Khata",
    description: "A simple bootstrap UI for a grocery management system.",
  },
];

const professionalProjects = [
  {
    id: "6",
    year: "2025",
    name: "Grocery Management System",
    description:
      "A web application for managing grocery store. It allows users to manage inventory, sales, and customers.",
    url: "https://grocery.manishkarki.com",
  },
  {
    id: "5",
    year: "2024-2025",
    name: "12 deg",
    description:
      "A tool that automatically deploys new features, giving developers and project managers instant access to test and use them without manual setup on their machines.",
  },
  {
    id: "4",
    year: "2022-2024",
    name: "Hiboo",
    description:
      "Hiboo is a software that collects data from all your heavy equipment and utility vehicles in one place",
    url: "https://www.hiboo.io",
  },
  {
    id: "3",
    year: "2020",
    name: "Srijansil Nepali Samaj",
    description:
      "A website for Srijansil Nepali Samaj, a non-profit organization in Nepal. The website showcases their work, events, and photos.",
    url: "https://snscanada.ca/home",
  },
  {
    id: "2",
    year: "2020",
    name: "Urbi Astrologers",
    description:
      "A website for Astrologers, a team of professional astrologers in Nepal, providing users with easy access to astrology services, personalized readings, and expert guidance",
    // url: "https://astrourbi.com/",
  },
  {
    id: "1",
    year: "2020",
    name: "Sigma Auto Nepal",
    description:
      "An E-commerce platform for auto parts that allows users to browse, search, and purchase a wide range of vehicle components.",
    // url: "https://sigmaautonepal.com/",
  },
];

export default function Projects() {
  return (
    <div className="pb-10">
      <h1 className="mb-5 text-4xl">Projects</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 items-start">
        <li className="font-medium text-xl col-span-full">
          <p className="border-b-2 inline-block border-green-500">
            Professional Projects
          </p>
        </li>
        {professionalProjects.map((project) => (
          <ProjectCard
            key={project.id}
            year={project.year}
            name={project.name}
            description={project.description}
            url={project.url}
          />
        ))}
      </ul>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 items-start">
        <li className="font-medium text-xl col-span-full">
          <p className="border-b-2 inline-block border-green-500">
            Personal Projects
          </p>
        </li>
        {personalProjects.map((project) => (
          <ProjectCard
            key={project.id}
            year={project.year}
            name={project.name}
            description={project.description}
            url={project.url}
          />
        ))}
      </ul>
    </div>
  );
}
