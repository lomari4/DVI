function cargarImagen(url) {
	return new Promise(
		resolve => {
		const imagen = new Image();
		imagen.addEventListener('load', () => resolve(imagen));
		imagen.src = url;
	}
	);
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

cargarImagen('assets/tiles/snow_middle.png').then(
	imagen => { 
		for (let i = 0; i < 40; i++) { 
			context.drawImage(imagen, 0, 0, 32, 32 , i * 32, 608, 32, 32);
		}
	}
);

/*cargarImagen('assets/tiles/sheetFont.png').then(
	imagen => { 
		for (let i = 0; i < 40; i++) {
			for(let j = 0; j < 19; j++) 
			context.drawImage(imagen, 0, 0, 32, 32 , i * 32, j * 32, 32, 32);
		}
	}
);*/