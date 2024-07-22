'use client';

import { useEffect, useState } from 'react';
import PersonCard from '@/components/template/PersonCard';

interface Person {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  role: string;
}

const roleData: string[] = [
  'Frontend Dev',
  'Backend Dev',
  'Mobile Dev',
  'Database Engineer',
  'QA Engineer',
  'DevOps Engineer',
  'UI/UX',
  'Marketing',
];

export default function Page() {
  const [team, setTeam] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=12');
        const data = await response.json();

        const teamWithRoles: Person[] = data.results.map((person: any) => ({
          ...person,
          role: roleData[Math.floor(Math.random() * roleData.length)],
        }));

        setTeam(teamWithRoles);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div id="teams-page" className="bg-gradient-main pg-responsive">
      <h2 className="mb-12 mt-6 text-center text-4xl font-bold">
        Meet Our Team
      </h2>
      <div className="mb-12 grid gap-8 rounded-3xl bg-white bg-opacity-50 px-10 py-12 shadow-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full text-center text-3xl font-bold text-gray-400">
            <p className="mb-3">Loading... Please wait</p>
          </div>
        ) : (
          team.map((person, index) => (
            <PersonCard key={index} person={person} />
          ))
        )}
      </div>
    </div>
  );
}
