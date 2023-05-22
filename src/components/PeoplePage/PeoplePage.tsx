import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const peopleAll = await getPeople();

        setPeople(peopleAll);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoad(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoad
            ? <Loader />
            : (
              <PeopleTable
                people={people}
                isError={isError}
                selectedSlug={slug}
              />
            )}
        </div>
      </div>
    </>
  );
};