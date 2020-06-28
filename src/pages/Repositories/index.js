import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

export default function Repositories() {
	const history = useHistory();
	const [ repositories, setRepositories ] = useState([]);

	useEffect(
		() => {
			const repositoriesName = JSON.parse(localStorage.getItem('repositoriesName'));
			if (repositoriesName !== null) {
				setRepositories(repositoriesName);
				localStorage.clear();
			} else {
				history.push('/');
			}
		},
		[ history ]
	);

	return (
		<S.Container>
			<S.Title>Repositórios</S.Title>
			<S.List>
				{repositories.map((repository) => {
					return <S.ListItem>Repositório: {repository}</S.ListItem>;
				})}
			</S.List>
			<S.LinkHome to="/">Voltar</S.LinkHome>
		</S.Container>
	);
}
