import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface RandomUser {
  name: { first: string; last: string };
  picture: { large: string };
  email: string;
  location: { city: string; country: string };
  login: { uuid: string };
}

interface TeamMember {
  id: string;
  name: string;
  photo: string;
  role: string;
  bio: string;
  location: string;
}

const ROLES = [
  "Chief Executive Officer",
  "Head of Product",
  "Lead Engineer",
  "UX Designer",
  "Marketing Manager",
  "Data Scientist",
  "Backend Developer",
  "Frontend Developer",
  "QA Engineer",
  "DevOps Engineer",
  "Business Analyst",
  "Customer Success Lead",
];

const BIO_TEMPLATES = [
  (name: string, city: string) =>
    `${name} brings years of industry experience and a passion for building world-class products. Based in ${city}, they lead with clarity and purpose.`,
  (name: string, city: string) =>
    `With a deep love for innovation, ${name} crafts elegant solutions to complex problems. They mentor junior teammates and champion quality from ${city}.`,
  (name: string, city: string) =>
    `${name} thrives at the intersection of creativity and technology. Their work from ${city} has shaped some of our most beloved features.`,
  (name: string, city: string) =>
    `A strategic thinker and team player, ${name} drives meaningful outcomes. Their expertise from ${city} keeps us ahead of the curve.`,
  (name: string, city: string) =>
    `${name} combines analytical rigor with a human-centered approach. Operating out of ${city}, they ensure every decision is data-informed.`,
  (name: string, city: string) =>
    `Passionate about growth and collaboration, ${name} connects people and ideas from ${city} to deliver exceptional results for our customers.`,
];

function mapToTeamMember(user: RandomUser, index: number): TeamMember {
  const fullName = `${user.name.first} ${user.name.last}`;
  const city = user.location.city;
  return {
    id: user.login.uuid,
    name: fullName,
    photo: user.picture.large,
    role: ROLES[index % ROLES.length],
    bio: BIO_TEMPLATES[index % BIO_TEMPLATES.length](fullName, city),
    location: `${city}, ${user.location.country}`,
  };
}

export default function TeamsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=12&nat=us,gb,au,ca")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch team data.");
        return res.json();
      })
      .then((data) => {
        setTeam(data.results.map(mapToTeamMember));
      })
      .catch(() => setError("Could not load team members. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#77100f] to-[#a31515] text-white text-center px-6 pt-20 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Meet Our Team
        </h1>
        <p className="text-lg max-w-xl mx-auto opacity-90 leading-relaxed">
          The passionate people behind Anomali Caffee — each bringing unique
          expertise to craft an exceptional experience for our customers
        </p>
      </section>

      {/* Team Grid */}
      <section className="max-w-6xl mx-auto px-10 py-16">
        {loading && (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-11 h-11 border-4 border-[#f0e0e0] border-t-[#77100f] rounded-full animate-spin" />
            <p className="text-base text-gray-500">Loading team members…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center py-20 gap-4">
            <p className="text-base text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-[220px] object-center block"
                />
                <div className="flex flex-col gap-2 flex-1 px-5 py-5">
                  <h3 className="text-[1.1rem] font-bold text-gray-900 m-0">
                    {member.name}
                  </h3>
                  <span className="inline-block self-start bg-[#fff1f1] text-[#77100f] rounded-full px-3 py-0.5 text-xs font-semibold">
                    {member.role}
                  </span>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mt-1">
                    {member.bio}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 m-0">
                    <span>📍</span>
                    {member.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}