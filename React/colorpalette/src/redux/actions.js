import { UPDATE_R, UPDATE_G, UPDATE_B } from "./actionTypes";
import { type } from "os";

export const updateR = (R) => ({
	type: UPDATE_R,
	payload: {
		R: R
	}
});

export const updateG = (G) => ({
	type: UPDATE_G,
	payload: {
		G: G
	}
});

export const updateB = (B) => ({
	type: UPDATE_B,
	payload: {
		B: B
	}
});