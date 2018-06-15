class MapRenderer extends BehaviorComposant
{
	constructor()
	{
		super() ;

		// Declaration des attributs ici
		this.tileMap = [14, 23, 23, 23, 23, 23, 23, 23, 23, 13, 21, 32, 33, 33, 28, 33, 33, 33, 31, 20, 21, 34, 1, 1, 34, 18, 22, 17, 34, 20, 21, 34, 1, 1, 34, 16, 23, 19, 34, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 34, 1, 1, 34, 1, 1, 1, 34, 20, 21, 29, 33, 33, 26, 33, 33, 33, 30, 20, 11, 22, 22, 22, 22, 22, 22, 22, 22, 12]
		this.gridSize = Math.sqrt(this.tileMap.length);
		this.tileStartX = 0;
		this.tileStartY = 0;

		this.hoverTileX = -1;
		this.hoverTileY = -1;
		this.tiletype_empty = 0;
		this.tile_images = [];
		this.tile_quantity = 36;

		// generation de la map
		for(let i = 0; i < this.tile_quantity; ++i)
		{
			let img = new Image();
			if(i == 0) { img.src = ""; } else { img.src = "gameClient/assets/img/tiles/"+i+".png"; }
			this.tile_images.push(img);
		}
	}

	update()
	{
		// appel de update
		let tile_height = 48; // Magic Number
		let tile_width = 96;
		let mouse_y = mousePosition.y-this.actor.position.y;  // récupération la position de la souris
		let mouse_x = mousePosition.x-this.actor.position.x; // mouse_x ;

		this.hoverTileX = Math.floor((mouse_y / tile_height) + (mouse_x / tile_width)) -1;
		this.hoverTileY = Math.floor((-mouse_x / tile_width) + (mouse_y / tile_height));

	}
	updateAfterCalcul()
	{
		// update après que tous les actor on fait leurs update classique
	}	
	render()
	{
		// fonction de dessin elle sera appeler dans la boucle de rendu
		this.renderTiles(this.actor.position.x, this.actor.position.y) ;
	}
	renderTiles(x, y)
	{
		let tileWidth = 96;
		let tileHeight = 48;
		let tile_half_width = tileWidth / 2;
		let tile_half_height = tileHeight / 2;
		for (let tileX = 0; tileX < this.gridSize; ++tileX)
		{
			for (let tileY = 0; tileY < this.gridSize; ++tileY)
			{
				let renderX = x + (tileX - tileY) * tile_half_width;
				let renderY = y + (tileX + tileY) * tile_half_height;
				let tile = this.tileMap[tileY * this.gridSize + tileX];
				if(tile !== this.tiletype_empty) this.renderTexturedTile(this.tile_images[tile], renderX, renderY, 80);
				else renderTileBackground(renderX, renderY+48, tileWidth, tileHeight);
			}
		}

		if (this.hoverTileX >= 0 && this.hoverTileY >= 0 && this.hoverTileX < this.gridSize && this.hoverTileY < this.gridSize)
		{
			let renderX = x + (this.hoverTileX - this.hoverTileY) * tile_half_width;
			let renderY = y + (this.hoverTileX + this.hoverTileY) * tile_half_height;
			this.renderTileHover(renderX, renderY+48, tileWidth, tileHeight);
		}
	}

	renderTileBackground(x, y, width, height)
	{
		// Dessine arrière plan sur une casse vide
		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.strokeStyle = 'rgba(255,255,255,0.4)';
		ctx.fillStyle = 'rgba(25,34, 44,0.2)';
		ctx.lineWidth = 1;
		ctx.moveTo(x, y);
		ctx.lineTo(x + width/2, y-height/2);
		ctx.lineTo(x + width, y);
		ctx.lineTo(x + width/2, y + height/2);
		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.fill();
	}

    renderTexturedTile(imgSrc, x, y, tileHeight)
	{
		let offsetY = tileHeight - imgSrc.height;

		ctx.drawImage(imgSrc, x, y+offsetY);
	}
	// Pour modifier les couleurs du selecteur, c'est ici
	renderTileHover(x, y, width, height)
	{
		  ctx.beginPath();
		  ctx.setLineDash([]);
		  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
		  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
		  ctx.lineWidth = 2;
		  ctx.moveTo(x, y);
		  ctx.lineTo(x + width/2, y-height/2);
		  ctx.lineTo(x + width, y);
		  ctx.lineTo(x + width/2, y + height/2);
		  ctx.lineTo(x, y);
		  ctx.stroke();
		  ctx.fill();
	}
}
