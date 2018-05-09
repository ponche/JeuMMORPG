class MapRenderer extends BehaviorComposant 
{
	constructor()
	{
		super() ;
		
		// Declaration des attributs ici 
		this.tileStartX = 0;
		this.tileStartY = 0;
		
		this.hoverTileX = -1;
		this.hoverTileY = -1;
		this.tiletype_empty = 0;
		this.tile_images = [];
		
		// generation de la map 
		for(let i = 0; i < tile_quantity; ++i) 
		{
		  let img = new Image();
		if(i == 0) { img.src = ""; } else { img.src = "assets/img/game/tiles/"+i+".png"; }
		  tile_images.push(img);
		}
		  
		 

	}
	
	update()
	{
		// appel de update
		let tile_height = 48; // Magic Number
		let tile_width = 96;
		let mouse_y = mousePosition.y-tileStartY;
		let mouse_x = mousePosition.x-tileStartX;

		this.hoverTileX = Math.floor((mouse_y / tile_height) + (mouse_x / tile_width)) -1;
		this.hoverTileY = Math.floor((-mouse_x / tile_width) + (mouse_y / tile_height));
		
	}
	updateAfterCalcul()
	{
		// update après que tous les actor on fait leurs update classique 
	}
	
	render()
	{
		// fonction de dessin 
		this.renderTile(tileStartX, tileStartY) ; 
	}
	renderTiles(x, y) 
	{
		let tileWidth = 96;
		let tileHeight = 48;
		let tile_half_width = tileWidth / 2;
		let tile_half_height = tileHeight / 2;
		for (let tileX = 0; tileX < world.gridSize; ++tileX) 
		{
			for (let tileY = 0; tileY < world.gridSize; ++tileY) 
			{
				let renderX = x + (tileX - tileY) * tile_half_width;
				let renderY = y + (tileX + tileY) * tile_half_height;
				let tile = world.tileMap[tileY * world.gridSize + tileX];
				if(tile !== tiletype_empty) renderTexturedTile(tile_images[tile], renderX, renderY, 80);
				else renderTileBackground(renderX, renderY+48, tileWidth, tileHeight);
			}
		}
		
		if (hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < world.gridSize && hoverTileY < world.gridSize) 
		{
			let renderX = x + (hoverTileX - hoverTileY) * tile_half_width;
			let renderY = y + (hoverTileX + hoverTileY) * tile_half_height;
			renderTileHover(renderX, renderY+48, tileWidth, tileHeight);
		}
	}
	
	renderTileBackground(x, y, width, height) 
	{
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
	
	function renderTexturedTile(imgSrc, x, y, tileHeight) 
	{
		let offsetY = tileHeight - imgSrc.height;

		ctx.drawImage(imgSrc, x, y+offsetY);
	}
}
		
	


	