import AModule from "modules/AModule";
import TweenLite from "lib/tweenLite/TweenLite";
import EasePack from "lib/tweenLite/easing/EasePack";

import SceneModel from "./scene/SceneModel";
import SceneController from "./scene/SceneController";
import Scene from "./scene/Scene";

import MeshCarousel from "./MeshCarousel";

export default class Main extends AModule
{
	constructor()
	{
		super();

		this.init();

		this._onResize();
	}

	init()
	{
		super.init();

		this._sceneModel = new SceneModel();
		this._scene = new Scene(this._sceneModel);
		
		this._meshCarousel = new MeshCarousel(this._scene);

		this._sceneController = new SceneController(this._sceneModel, this._meshCarousel, this._scene);
	}

	/**
	 * Drawing on requestAnimationFrame
	 */
	update()
	{
		super.update();

		this._meshCarousel.update();

		this._scene.update();
	}

	/**
	 * Triggered on window resize
	 */
	_onResize()
	{
		super._onResize();

		this._scene.resize();
	}
}

/**
 * Let's roll
 */
const onDomContentLoaded = function() 
{
	document.removeEventListener("DOMContentLoaded", onDomContentLoaded);

	const main = new Main();

	(function tick()
	{
		main.update();
		window.requestAnimationFrame(tick);
	})();
};
document.addEventListener("DOMContentLoaded", onDomContentLoaded);