import AWSLogo from "../../static_resources/about/tools/AWSLogo.png"
import GitLabLogo from "../../static_resources/about/tools/GitLabLogo.png";
import PostmanLogo from "../../static_resources/about/tools/PostmanLogo.png";
import ReactLogo from "../../static_resources/about/tools/ReactLogo.png";
import BootStrapLogo from "../../static_resources/about/tools/BootstrapLogo.jpg";
import NameCheapLogo from "../../static_resources/about/tools/Namecheap.png";
import PostgreSQL from "../../static_resources/about/tools/PostgreSQL.png";
import MaterialUI from "../../static_resources/about/tools/MaterialUI.png";
import AlgoliaLogo from "../../static_resources/about/tools/AlgoliaLogo.png";

import RestCountriesLogo from "../../static_resources/about/apis/RestCountriesLogo.png";
import ZomatoLogo from "../../static_resources/about/apis/zomato.png";
import WorldFoodLogo from "../../static_resources/about/apis/WorldFood.png";
import TeleportLogo from "../../static_resources/about/apis/teleportAPI.png"
import GoogleMapsLogo from "../../static_resources/about/apis/GoogleMapsLogo.jpeg"
import GooglePlaceLogo from "../../static_resources/about/apis/GooglePlaceLogo.png"

import AmyImg from "../../static_resources/about/members/AmyImg.jpg";
import JoshuaImg from "../../static_resources/about/members/JoshuaImg.jpg";
import LucindaImg from "../../static_resources/about/members/LucindaImg.jpg";
import SiddheshImg from "../../static_resources/about/members/SiddheshImg.png";
import TimImg from "../../static_resources/about/members/TimImg.jpg";
import VishalImg from "../../static_resources/about/members/VishalImg.jpg";

const API_INFO = [
  {
    name: "REST Countries",
    img: RestCountriesLogo,
    description: "Used to retrieve country information",
    link: "https://restcountries.eu/",
  },
  {
    name: "Zomato API",
    img: ZomatoLogo,
    description: "Used to find restaurant data.",
    link: "https://rapidapi.com/blog/how-to-use-zomato-api/",
  },
  {
    name: "WorldFood API",
    img: WorldFoodLogo,
    description: "Used to retrieve cuisine and dishes data.",
    link: "https://worldfood.guide/api/",
  },
  {
    name: "Google Maps Embed API",
    img: GoogleMapsLogo,
    description: "Used to show the map location of a country",
    link: "https://developers.google.com/maps/documentation/embed/get-started",
  },
  {
    name: "Google Places Photos API",
    img: GooglePlaceLogo,
    description: "Used to retrieve images of restaurants.",
    link: "https://developers.google.com/maps/documentation/places/web-service/photos",
  },
  {
    name: "Teleport API",
    img: TeleportLogo,
    description: "Used to retrieve city data.",
    link: "https://developers.teleport.org/api/",
  }
];

const TOOLS_INFO = [
  {
    title: "AWS",
    img: AWSLogo,
    description: "Cloud hosting platform",
    link: "https://aws.amazon.com/",
  },
  {
    title: "GitLab",
    img: GitLabLogo,
    description: "GitLab Repository and CI/CD platform",
    link: "https://gitlab.com/",
  },
  {
    title: "Postman",
    img: PostmanLogo,
    description: "API and streamline collaboration platform",
    link: "https://www.postman.com/",
  },
  {
    title: "React",
    img: ReactLogo,
    description: "A JavaScript library for building user interfaces",
    link: "https://reactjs.org/",
  },
  {
    title: "BootStrap",
    img: BootStrapLogo,
    description:
      "A free and open-source CSS framework directed at responsive, mobile-first front-end web development",
    link: "https://getbootstrap.com/",
  },
  {
    title: "NameCheap",
    img: NameCheapLogo,
    description: "Domain name registrar",
    link: "https://www.namecheap.com/",
  },
  {
    title: "PostgreSQL",
    img: PostgreSQL,
    description: "Open-source relational database management system.",
    link: "https://postgresql.org",
  },
  {
    title: "Algolia",
    img: AlgoliaLogo,
    description: "Used to implement site-wide search.",
    link: "https://www.algolia.com/",
  },
  {
    title: "Material UI",
    img: MaterialUI,
    description: "UI library for mobile-first front-end web development.",
    link: "https://material-ui.com/",
  }
];

const TEAM_INFO = [
  {
    name: "Vishal Tak",
    username: "VishalTak14",
    email: "vishal.tak@shoplc.com",
    img: VishalImg,
    role: "Full-Stack",
    bio:
      "I'm a third year CS major at UT Austin. I'm from Austin, TX and in my free time I enjoy playing video games and watching movies. All of my commits were done by these two smarties, Kiwi and Grape. 🦜",
    linkedin: "https://www.linkedin.com/in/vishal-tak-898181163/",
    commits: 0,
    issues: 0,
    tests: 37,
  },
  {
    name: "Lucinda Nguyen",
    username: "lucinda",
    email: "lucinda.onguyen@gmail.com",
    img: LucindaImg,
    role: "Full-Stack | Phase I Project Leader",
    bio: "I'm a fourth year CS major at UT Austin from Dallas, TX. I enjoy reading manga and webtoons.",
    linkedin: "https://www.linkedin.com/in/lucindanguyen/",
    commits: 0,
    issues: 0,
    tests: 3,
  },
  {
    name: "Amy Ouyang",
    username: "amyo29",
    email: "yawen1999@gmail.com",
    img: AmyImg,
    role: "Full-Stack | Phase IV Project Leader",
    bio: "I'm a 4th year CS Honors student at UT Austin. In my free time, I enjoy dancing and watching movies. I also love trying out new foods and exploring the world!",
    linkedin: "https://www.linkedin.com/in/amy-o/",
    commits: 0,
    issues: 0,
    tests: 10,
  },
  {
    name: "Tim Nguyen",
    username: "Tim Nguyen",
    email: "nguyenmctim@gmail.com",
    img: TimImg,
    role: "Full-Stack | Phase III Project Leader",
    bio:
      "I'm a fourth year CS major at UT Austin. I'm from a small town called Palacios, TX and I enjoy playing video games and watching anime!",
    linkedin: "https://www.linkedin.com/in/nguyenmctim/",
    commits: 0,
    issues: 0,
    tests: 10,
  },
  {
    name: "Siddhesh Krishnan",
    username: "siddheshkrishnan1",
    email: "siddheshkrishnan1@gmail.com",
    img: SiddheshImg,
    role: "Full-Stack | Phase II Project Leader",
    bio:
      "I'm a third year CS student at UT Austin. I'm from Austin, TX and enjoy going on bike rides in my free time.",
    linkedin: "https://www.linkedin.com/in/sidkrishlink/",
    commits: 0,
    issues: 0,
    tests: 21,
  },
  {
    name: "Joshua Arrojado",
    username: "josharrojado",
    email: "joshuanms@gmail.com",
    img: JoshuaImg,
    role: "Full-Stack",
    bio:
      "I'm a fourth year CS student at UT Austin. I like to watch anime and kdramas in my sparetime. I also enjoy playing League!",
    linkedin: "https://www.linkedin.com/in/joshua-arrojado/",
    commits: 0,
    issues: 0,
    tests: 9,
  },
];

export { API_INFO, TOOLS_INFO, TEAM_INFO };
