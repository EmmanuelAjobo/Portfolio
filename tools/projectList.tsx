import type { ProjectCardProps } from "@/tools/types";

export const projectList: ProjectCardProps[] = [
    {
        id: "1",
        title: "Fast API",
        description: "A production-style FastAPI backend implementing full CRUD operations, JWT-based authentication, and a voting system, with database migrations handled via Alembic.",
        href: "https://github.com/EmmanuelAjobo/FastAPI-CRUD",
        src: "/assets/images/img1.jpg",
        techstack: ["Python", "FastAPI", "Alembic", "JWT", "uv"]
    },
    {
        id: "2",
        title: "YieldVault",
        description: "A production-grade ERC-4626 tokenized vault built in Solidity, with a full test suite in Foundry covering deposits, withdrawals, and yield accounting.",
        href: "https://sepolia.etherscan.io/address/0xf3fbb444abe41f43a8833332fcdff7443c8640f6",
        src: "/assets/images/img2.jpg",
        techstack: ["Solidity", "Foundry", "EVM", "EtherScan"]
    },
    {
        id: "3",
        title: "Banker Expert",
        description: "A fullstack blockchain finance app where I diagnosed and fixed broken backend API integrations, restoring reliable data flow between the frontend, database, and external price feeds.",
        href: "https://github.com/EmmanuelAjobo/Bankers_Expert_Fullstack_Blockchain",
        src: "/assets/images/img3.jpg",
        techstack: ["Node.JS", "MongoDB", "Tinyllama", "CoinGecko API", "Jest", "React"]
    },
    {
        id: "4",
        title: "AccountAbstraction",
        description: "An implementation of ERC-4337 account abstraction in Solidity, exploring smart contract wallets, user operations, and gasless transaction flows on the EVM.",
        href: "https://github.com/EmmanuelAjobo/AccountAbstraction",
        src: "/assets/images/img4.jpg",
        techstack: ["Solidity", "ERC 4337", "EVM"]
    },
    {
        id: "5",
        title: "foundry_fund_me",
        description: "My first Foundry project: a crowdfunding smart contract built and deployed using Solidity, covering testing, scripting, and deployment workflows in Foundry.",
        href: "https://github.com/EmmanuelAjobo/foundry_fund_me",
        src: "/assets/images/img5.jpg",
        techstack: ["Solidity", "Foundry", "EVM"]
    },
    {
        id: "6",
        title: "Portfolio",
        description: "My personal portfolio site, designed and built from the ground up with smooth animations and a modern, responsive UI.",
        href: "#proj",
        src: "/assets/images/img6.jpg",
        techstack: ["Next JS", "UI/UX", "GSAP", "Shad Cn", "Tailwind CSS"]
    },
    // {
    //     id: "7",
    //     title: "title seven",
    //     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    //     href: "#proj",
    //     src: "/assets/images/img7.jpg",
    //     techstack: ["Figma", "UI/UX"]
    // },
    // {
    //     id: "8",
    //     title: "title eight",
    //     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    //     href: "#proj",
    //     src: "/assets/images/img8.jpg",
    //     techstack: ["Figma", "UI/UX"]
    // },
    // {
    //     id: "9",
    //     title: "title nine",
    //     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    //     href: "#proj",
    //     src: "/assets/images/img9.jpg",
    //     techstack: ["Figma", "UI/UX"]
    // },
    // {
    //     id: "10",
    //     title: "title ten",
    //     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    //     href: "#proj",
    //     src: "/assets/images/img10.jpg",
    //     techstack: ["Figma", "UI/UX"]
    // },
];



export const skills = [
  {
    index: "01",
    category: "Smart Contracts",
    tags: ["Solidity", "Foundry", "Hardhat", "OpenZeppelin", "ERC-4337", "ERC-4626"],
    note: "Building & testing on the EVM.",
  },
  {
    index: "02",
    category: "Security",
    tags: ["Slither", "Invariant Testing", "PoC Writing", "Audit Reports"],
    note: "Breaking contracts before mainnet does.",
  },
  {
    index: "03",
    category: "Backend",
    tags: ["Node.js", "FastAPI", "TypeScript", "Python", "MongoDB", "PostgreSQL"],
    note: "APIs, auth, and data layers.",
  },
  {
    index: "04",
    category: "Frontend & Tooling",
    tags: ["React", "Next.js", "Tailwind CSS", "ethers.js", "viem", "Postman"],
    note: "Shipping the full stack.",
  },
];