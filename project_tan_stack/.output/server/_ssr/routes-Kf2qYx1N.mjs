import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Kf2qYx1N.js
var API_URL = void 0;
var fetchStudios = async () => {
	return (await axios.get(`${API_URL}/studios`)).data;
};
var postVote = async (voteData) => {
	return (await axios.post(`${API_URL}/vote`, voteData)).data;
};
var $$splitComponentImporter = () => import("./routes-BTZP8CEk.mjs");
var Route = createFileRoute("/")({
	loader: async () => {
		try {
			return await fetchStudios();
		} catch (error) {
			console.error("Błąd pobierania:", error);
			return [];
		}
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { fetchStudios as n, postVote as r, Route as t };
