import { ChangeEvent, useEffect, useState } from 'react';
import { Character, ICharacterFilter } from '../../interface/Interface';
import { CharacterArray } from '../../interface/Interface';
import CardCharacter from './cardCharacter';
import styles from './paginationCharacter.module.css';

function paginationCharacter({ filter, nameFilter }: ICharacterFilter) {
  const [page, setPage] = useState<number>(0);
  const [numPage, setNumPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<CharacterArray>([]);
  const handleClickScroll = () => {
    const element = document.body;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const numPage: number = Math.ceil(filter?.length / 20);
    setPage(numPage);
    const paginatedData: CharacterArray = [];
    for (let i = 1; i <= numPage; i++) {
      const startIdx: number = (i - 1) * 20;
      const endIdx: number = i * 20;
      const pageData: Character[] = filter.slice(startIdx, endIdx);
      paginatedData.push(pageData);
    }

    setCurrentPage(paginatedData);
  }, [filter]);

  const changePage = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (parseInt(value) < 1 || parseInt(value) > page) return;
    setNumPage(parseInt(value));
    handleClickScroll();
  };

  const input = document.querySelector("input[type='number']");

  input?.addEventListener('wheel', (event) => {
    event.preventDefault();
  });
  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        {currentPage.length > 0 ? (
          currentPage[numPage - 1]?.map((character: Character) => (
            <CardCharacter key={character.id} character={character} />
          ))
        ) : (
          <>
            {nameFilter.all === false && (
              <div className={styles.NaN}>
                {' '}
                <p>There are no results</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.containerButton}>
        <button
          onClick={() => {
            numPage > 1 && setNumPage(numPage - 1);
            handleClickScroll();
          }}>
          Prev
        </button>
        <div className={styles.containerPage}>
          <input type='number' value={numPage} onChange={changePage} />
          <p>/</p>
          <span>{page}</span>
        </div>
        <button
          onClick={() => {
            numPage < page && setNumPage(numPage + 1);
            handleClickScroll();
          }}>
          Next
        </button>
      </div>
    </div>
  );
}
export default paginationCharacter;
