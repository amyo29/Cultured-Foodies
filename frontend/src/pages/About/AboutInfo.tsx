import AWSLogo from "./Images/Tools/AWSLogo.png";
import GitLabLogo from "./Images/Tools/GitLabLogo.png";
import PostmanLogo from "./Images/Tools/PostmanLogo.png";
import ReactLogo from "./Images/Tools/ReactLogo.png";
import BootStrapLogo from "./Images/Tools/BootstrapLogo.png";
import NameCheapLogo from "./Images/Tools/Namecheap.png";

import RestCountriesLogo from "./Images/APIs/RestCountriesLogo.png";
import EdamamLogo from "./Images/APIs/EdamamLogo.png";
import NewscatcherLogo from "./Images/APIs/NewscatcherLogo.png";

import AmyImg from "./Images/Members/AmyImg.jpg";
import JoshuaImg from "./Images/Members/JoshuaImg.jpg";
import LucindaImg from "./Images/Members/LucindaImg.jpg";
import SiddheshImg from "./Images/Members/SiddheshImg.png";
import TimImg from "./Images/Members/TimImg.jpg";
import VishalImg from "./Images/Members/VishalImg.jpg";

const apiInfo = [
	{
		name: "REST Countries",
		img: RestCountriesLogo,
		description: "Used to retrieve country information",
		link: "https://restcountries.eu/",
	},
	{
		name: "Edamam",
		img: EdamamLogo,
		description: "Used to find dishes",
		link: "https://developer.edamam.com/",
	},
	{
		name: "Newscatcher API",
		img: NewscatcherLogo,
		description: "Used to retrieve food related news content",
		link: "https://newscatcherapi.com/",
	}
]

const toolsInfo = [
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
];
const teamInfo = [
	{
		name: "Vishal Tak",
		username: "VishalTak14",
		email: "vishal.tak@shoplc.com",
		img: VishalImg,
		role: "Back-end",
		bio: "I'm a third year CS major at UT Austin. I'm from Austin, TX and in my free time I enjoy playing video games and watching movies.",
		linkedin: "https://www.linkedin.com/in/vishal-tak-898181163/",
		commits: 0,
		issues: 0,
		tests: 0,
	},
    {
		name: "Lucinda Nguyen",
		username: "lucinda",
		email: "lucinda.onguyen@gmail.com",
		img: LucindaImg,
		role: "Full-Stack",
		bio: "Bio description",
		linkedin: "",
		commits: 0,
		issues: 0,
		tests: 0,
	},
  {
		name: "Amy Ouyang",
		username: "amyo29",
		email: "yawen1999@gmail.com",
		img: AmyImg,
		role: "Full-Stack",
		bio: "I'm a 4th year CS Honors student at UT Austin. I love food.",
		linkedin: "https://www.linkedin.com/in/amy-o/",
		commits: 0,
		issues: 0,
		tests: 0,
	},
  {
		name: "Tim Nguyen",
		username: "Tim Nguyen",
		email: "nguyenmctim@gmail.com",
		img: TimImg,
		role: "Full-Stack",
		bio: "I'm a fourth year CS major at UT Austin. I'm from a small town called Palacios, TX and I enjoy playing video games and watching anime.",
		linkedin: "https://www.linkedin.com/in/nguyenmctim/",
		commits: 0,
		issues: 0,
		tests: 0,
	},
  {
		name: "Siddhesh Krishnan",
		username: "Siddhesh",
		email: "siddheshkrishnan1@gmail.com",
		img: SiddheshImg,
		role: "Full-Stack",
		bio: "Bio description",
		linkedin: "",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Joshua Andrew Arrojado",
		username: "jea2876",
		email: "joshuanms@gmail.com",
		img: JoshuaImg,
		role: "Full-Stack",
		bio: "I'm a fourth year CS student at UT Austin. I like to watch anime and kdramas in my sparetime. I also enjoy playing League!",
		linkedin: "https://www.linkedin.com/in/joshua-arrojado-803bb895/",
		commits: 0,
		issues: 0,
		tests: 0,
	},
];

export {apiInfo, toolsInfo, teamInfo};