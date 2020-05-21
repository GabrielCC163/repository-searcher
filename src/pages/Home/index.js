import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function Home(props) {
	const history = useHistory();
	const [ usuario, setUsuario ] = useState('');
	const [ erro, setErro ] = useState(false);

	const handlePesquisa = async () => {
		try {
			const response = await axios.get(`https://api.github.com/users/${usuario}/repos`);
			const repositoriesName = response.data.map((repository) => {
				return repository.name;
			});
			localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
			setErro(false);
			history.push('/repositories');
		} catch (err) {
			setErro(true);
		}
	};

	return (
		<S.HomeContainer>
			<h3>Buscador de repositórios</h3>
			<S.Content>
				<S.Input
					type="text"
					id="usuario"
					name="usuario"
					className="usuarioInput"
					placeholder="Usuário"
					value={usuario}
					onChange={(e) => setUsuario(e.target.value)}
				/>
				<S.Button type="button" onClick={handlePesquisa}>
					Pesquisar
				</S.Button>
			</S.Content>
			{erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''}
		</S.HomeContainer>
	);
}

export default Home;
