const getPopular = async () => {
	return fetch('https://api.opencritic.com/api/game/popular')
		.then((response) => response.json())
		.then((json) => {
			return json.movies;
		});
};

export default getPopular;
